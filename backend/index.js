import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

  

dotenv.config();

const app = express();
app.get('/', (req, res) => {
    res.send('Servidor está respondendo!');
  });

const port = 3001;
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).send('Token não fornecido');

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).send('Token inválido');
    req.usuario = usuario; // { id, username }
    next();
  });
}


// Cadastro
app.post('/cadastro', async (req, res) => {
  const { username, password, email, isOrientador, cpf, telefone, foto } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (username, password_hash, email,is_orientador, cpf, telefone, foto) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [username, hash, email, isOrientador, cpf, telefone, foto]
    );
    res.status(201).send('Usuário cadastrado');
  } catch (err) {
    console.error(err);
    res.status(400).send('Erro no cadastro');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).send('Credenciais inválidas');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, isOrientador: user.is_orientador });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no login');
  }
});

app.post('/atividades', autenticarToken, async (req, res) => {
  const {
    textoPrincipal, textoSecundario, imagem,
    respostas, respostaCerta, categoria, nivelDificuldade
  } = req.body;

  const usuarioId = req.usuario.id; // 🔐 pega do token

  await pool.query(`
    INSERT INTO atividades (
      usuario_id, texto_principal, texto_secundario, imagem,
      resposta1, resposta2, resposta3, resposta4,
      resposta_certa, categoria, nivel_dificuldade
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
  `, [
    usuarioId, textoPrincipal, textoSecundario, imagem,
    respostas[0], respostas[1], respostas[2], respostas[3],
    respostaCerta, categoria, nivelDificuldade
  ]);

  res.status(201).send('Atividade criada');
});

app.get('/atividades/:id', autenticarToken, async (req, res) => {
  const atividadeId = req.params.id;
  const usuarioId = req.usuario.id;

  const { rows } = await pool.query(
    'SELECT * FROM atividades WHERE id = $1 AND usuario_id = $2',
    [atividadeId, usuarioId]
  );

  if (rows.length === 0) {
    return res.status(403).send('Atividade não encontrada ou acesso negado');
  }

  res.json(rows[0]);
});

app.put('/atividades/:id', autenticarToken, async (req, res) => {
  const atividadeId = req.params.id;
  const usuarioId = req.usuario.id;

  const {
    textoPrincipal, textoSecundario, imagem,
    respostas, respostaCerta, categoria, nivelDificuldade
  } = req.body;

  // Verifica se o usuário é dono da atividade
  const { rows } = await pool.query(
    'SELECT usuario_id FROM atividades WHERE id = $1',
    [atividadeId]
  );

  if (!rows.length || rows[0].usuario_id !== usuarioId) {
    return res.status(403).send('Você não pode editar esta atividade');
  }

  await pool.query(`
    UPDATE atividades SET
      texto_principal = $1,
      texto_secundario = $2,
      imagem = $3,
      resposta1 = $4,
      resposta2 = $5,
      resposta3 = $6,
      resposta4 = $7,
      resposta_certa = $8,
      categoria = $9,
      nivel_dificuldade = $10
    WHERE id = $11
  `, [
    textoPrincipal, textoSecundario, imagem,
    respostas[0], respostas[1], respostas[2], respostas[3],
    respostaCerta, categoria, nivelDificuldade,
    atividadeId
  ]);

  res.send('Atividade atualizada');
});

app.delete('/atividades/:id', autenticarToken, async (req, res) => {
  const atividadeId = req.params.id;
  const usuarioId = req.usuario.id;

  const { rows } = await pool.query('SELECT usuario_id FROM atividades WHERE id = $1', [atividadeId]);

  if (!rows.length || rows[0].usuario_id !== usuarioId) {
    return res.status(403).send('Você não pode excluir esta atividade');
  }

  await pool.query('DELETE FROM atividades WHERE id = $1', [atividadeId]);
  res.send('Atividade excluída com sucesso');
});


app.get('/atividades/minhas', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  const result = await pool.query(
    'SELECT * FROM atividades WHERE usuario_id = $1 ORDER BY id DESC',
    [usuarioId]
  );

  res.json(result.rows);
});


  app.put('/atividades/:id', async (req, res) => {
    const atividadeId = req.params.id;
    const {
      usuarioId, textoPrincipal, textoSecundario,
      imagem, respostas, respostaCerta, categoria, nivelDificuldade
    } = req.body;
  
    // Verifica se é autor
    const { rows } = await pool.query('SELECT usuario_id FROM atividades WHERE id = $1', [atividadeId]);
    if (!rows.length || rows[0].usuario_id !== usuarioId) {
      return res.status(403).send('Você não tem permissão para editar esta atividade.');
    }
  
    await pool.query(`
      UPDATE atividades SET
        texto_principal = $1,
        texto_secundario = $2,
        imagem = $3,
        resposta1 = $4,
        resposta2 = $5,
        resposta3 = $6,
        resposta4 = $7,
        resposta_certa = $8,
        categoria = $9,
        nivel_dificuldade = $10
      WHERE id = $11
    `, [
      textoPrincipal, textoSecundario, imagem,
      respostas[0], respostas[1], respostas[2], respostas[3],
      respostaCerta, categoria, nivelDificuldade, atividadeId
    ]);
  
    res.send('Atividade atualizada');
  });

  
  app.get('/atividades/autor/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const result = await pool.query('SELECT * FROM atividades WHERE usuario_id = $1', [usuarioId]);
    res.json(result.rows);
  });
  

  app.get('/atividades', async (req, res) => {
    const categoria = req.query.categoria;
  
    const result = categoria
      ? await pool.query('SELECT * FROM atividades WHERE categoria = $1', [categoria])
      : await pool.query('SELECT * FROM atividades');
  
    res.json(result.rows);
  });

  app.post('/responder', async (req, res) => {
    const { usuarioId, atividadeId, resposta } = req.body;
  
    const { rows } = await pool.query('SELECT resposta_certa FROM atividades WHERE id = $1', [atividadeId]);
    const respostaCerta = rows[0]?.resposta_certa;
  
    const acertou = parseInt(resposta) === respostaCerta;
  
    await pool.query(
      'INSERT INTO resultados (usuario_id, atividade_id, acertou) VALUES ($1, $2, $3)',
      [usuarioId, atividadeId, acertou]
    );
  
    res.json({ acertou });
  });

  
  app.get('/progresso/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
  
    const { rows } = await pool.query(`
      SELECT 
        a.categoria,
        COUNT(*) FILTER (WHERE r.acertou) AS acertos,
        COUNT(*) FILTER (WHERE NOT r.acertou) AS erros
      FROM resultados r
      JOIN atividades a ON r.atividade_id = a.id
      WHERE r.usuario_id = $1
      GROUP BY a.categoria
    `, [usuarioId]);
  
    res.json(rows);
  });
  
  




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
