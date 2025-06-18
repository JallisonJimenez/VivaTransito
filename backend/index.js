import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import dotenv from 'dotenv';


  

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


const multer = require('multer');
const path = require('path');

// Configuração de destino e nome dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/'); // pasta onde os arquivos ficarão
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use('/Images', express.static('Images'));


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

app.post('/atividades', autenticarToken, upload.single('imagem'), async (req, res) => {
  const {
    textoPrincipal, textoSecundario,
    respostas, respostaCerta, categoria, nivelDificuldade
  } = req.body;

  const usuarioId = req.usuario.id;
  const imagem = req.file ? req.file.filename : null; // nome do arquivo salvo

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

  res.status(201).send('Atividade criada com sucesso');
});

app.get('/atividades/minhas', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  const result = await pool.query(
    'SELECT * FROM atividades WHERE usuario_id = $1 ORDER BY id DESC',
    [usuarioId]
  );

  res.json(result.rows);
});


app.get('/atividades/:id', autenticarToken, async (req, res) => {
  const atividadeId = req.params.id;

  const { rows } = await pool.query(
    'SELECT * FROM atividades WHERE id = $1',
    [atividadeId]
  );

  if (!rows.length) {
    return res.status(404).send('Atividade não encontrada');
  }

  res.json(rows[0]); // Agora qualquer usuário logado pode ver
});

app.get('/atividades/publica/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query('SELECT * FROM atividades WHERE id = $1', [id]);
  if (!rows.length) return res.status(404).send('Atividade não encontrada');
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

// POST /provas - cria uma nova prova e 30 atividades
app.post('/provas', autenticarToken, async (req, res) => {
  const { titulo, atividades } = req.body;
  const usuarioId = req.usuario.id;

  if (!titulo || !Array.isArray(atividades) || atividades.length !== 30) {
    return res.status(400).send('Prova deve conter exatamente 30 atividades.');
  }

  try {
    const result = await pool.query(
      'INSERT INTO provas (titulo, usuario_id) VALUES ($1, $2) RETURNING id',
      [titulo, usuarioId]
    );
    const provaId = result.rows[0].id;

    for (const atividade of atividades) {
      const {
        textoPrincipal, textoSecundario, imagem,
        respostas, respostaCerta, categoria, nivelDificuldade
      } = atividade;

      await pool.query(`
        INSERT INTO atividades (
          usuario_id, texto_principal, texto_secundario, imagem,
          resposta1, resposta2, resposta3, resposta4,
          resposta_certa, categoria, nivel_dificuldade, prova_id
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      `, [
        usuarioId, textoPrincipal, textoSecundario, imagem,
        respostas[0], respostas[1], respostas[2], respostas[3],
        respostaCerta, categoria, nivelDificuldade, provaId
      ]);
    }

    res.status(201).send({ provaId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar prova.');
  }
});

// GET /provas - lista todas as provas
app.get('/provas', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const result = await pool.query('SELECT * FROM provas');
  res.json(result.rows);
});

// GET /provas/:id - busca as 30 atividades de uma prova
app.get('/provas/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;

  const atividades = await pool.query(
    'SELECT * FROM atividades WHERE prova_id = $1 ORDER BY id ASC',
    [id]
  );

  if (!atividades.rowCount) return res.status(404).send('Prova não encontrada.');

  res.json(atividades.rows);
});

// POST /provas/:id/responder - recebe as respostas e contabiliza acertos
app.post('/provas/:id/responder', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const { respostas } = req.body; // [{atividadeId, resposta}]

  let acertos = 0;

  for (const r of respostas) {
    const { rows } = await pool.query('SELECT resposta_certa FROM atividades WHERE id = $1', [r.atividadeId]);
    if (!rows.length) continue;

    const correta = rows[0].resposta_certa;
    const acertou = parseInt(r.resposta) === correta;
    if (acertou) acertos++;

    // Evita duplicidade de respostas
    const jaRespondeu = await pool.query(
      'SELECT * FROM resultados WHERE usuario_id = $1 AND atividade_id = $2',
      [usuarioId, r.atividadeId]
    );
    if (jaRespondeu.rowCount === 0) {
      await pool.query(
        'INSERT INTO resultados (usuario_id, atividade_id, acertou) VALUES ($1, $2, $3)',
        [usuarioId, r.atividadeId, acertou]
      );
    }
  }

  res.json({ total: respostas.length, acertos });
});


app.get('/provas/:provaId/atividades', autenticarToken, async (req, res) => {
  const { provaId } = req.params;

  const { rows } = await pool.query(
    'SELECT * FROM atividades WHERE prova_id = $1 ORDER BY id',
    [provaId]
  );

  res.json(rows);
});


app.post('/provas/:provaId/responder', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;
  const { provaId } = req.params;
  const { respostas } = req.body; // { [atividadeId]: respostaSelecionada }

  let acertos = 0;

  for (const [atividadeId, resposta] of Object.entries(respostas)) {
    const { rows } = await pool.query(
      'SELECT resposta_certa FROM atividades WHERE id = $1 AND prova_id = $2',
      [atividadeId, provaId]
    );

    if (!rows.length) continue;

    const acertou = parseInt(resposta) === rows[0].resposta_certa;
    if (acertou) acertos++;

    // impede múltiplas respostas da mesma prova
    const exist = await pool.query(
      'SELECT 1 FROM resultados WHERE usuario_id = $1 AND atividade_id = $2',
      [usuarioId, atividadeId]
    );
    if (!exist.rows.length) {
      await pool.query(
        'INSERT INTO resultados (usuario_id, atividade_id, acertou) VALUES ($1, $2, $3)',
        [usuarioId, atividadeId, acertou]
      );
    }
  }

  res.json({ acertos });
});

app.get('/prova/:id', autenticarToken, async (req, res) => {
  const provaId = parseInt(req.params.id);
  const usuarioId = req.usuario.id;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM atividades WHERE prova_id = $1 AND usuario_id = $2 ORDER BY id LIMIT 30`,
      [provaId, usuarioId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Prova não encontrada ou sem atividades.');
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar prova');
  }
});


app.post('/prova/:id/responder', autenticarToken, async (req, res) => {
  const provaId = parseInt(req.params.id);
  const usuarioId = req.usuario.id;
  const respostas = req.body.respostas; // array: [{atividadeId, resposta}]

  if (!Array.isArray(respostas)) {
    return res.status(400).send("Formato inválido de respostas.");
  }

  try {
    let acertos = 0;

    for (const r of respostas) {
      const { atividadeId, resposta } = r;

      // Já respondeu essa atividade?
      const jaRespondeu = await pool.query(
        'SELECT 1 FROM resultados WHERE usuario_id = $1 AND atividade_id = $2',
        [usuarioId, atividadeId]
      );

      if (jaRespondeu.rowCount > 0) continue; // ignora se já respondeu

      // Busca resposta certa
      const { rows } = await pool.query(
        'SELECT resposta_certa FROM atividades WHERE id = $1 AND prova_id = $2',
        [atividadeId, provaId]
      );

      if (rows.length === 0) continue;

      const acertou = parseInt(resposta) === rows[0].resposta_certa;
      if (acertou) acertos++;

      // Salva no banco
      await pool.query(
        'INSERT INTO resultados (usuario_id, atividade_id, acertou) VALUES ($1, $2, $3)',
        [usuarioId, atividadeId, acertou]
      );
    }

    res.json({ mensagem: 'Prova registrada com sucesso!', acertos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar respostas da prova');
  }
});

app.get('/provas', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM provas ORDER BY data DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar provas');
  }
});


app.get('/provas/minhas', autenticarToken, async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const { rows } = await pool.query(
      'SELECT * FROM provas ORDER BY data DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar provas');
  }
});

app.get('/prova/:id/questoes', autenticarToken, async (req, res) => {
  const provaId = req.params.id;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM atividades
       WHERE prova_id = $1
       ORDER BY id ASC
       LIMIT 30`,
      [provaId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar questões da prova');
  }
});


  app.post('/responder', async (req, res) => {
    const { usuarioId, atividadeId, resposta } = req.body;
  
    // Verifica se já respondeu
    const { rows } = await pool.query(
      'SELECT * FROM resultados WHERE usuario_id = $1 AND atividade_id = $2',
      [usuarioId, atividadeId]
    );
  
    if (rows.length > 0) {
      return res.status(400).send('Você já respondeu essa atividade.');
    }
  
    // Busca resposta correta
    const { rows: atividadeRows } = await pool.query(
      'SELECT resposta_certa FROM atividades WHERE id = $1',
      [atividadeId]
    );
  
    if (!atividadeRows.length) return res.status(404).send('Atividade não encontrada');
  
    const respostaCerta = atividadeRows[0].resposta_certa;
    const acertou = parseInt(resposta) === respostaCerta;
  
    await pool.query(
      'INSERT INTO resultados (usuario_id, atividade_id, acertou) VALUES ($1, $2, $3)',
      [usuarioId, atividadeId, acertou]
    );
  
    res.json({ acertou });
  });
  
  app.post('/provas/data', autenticarToken, async (req, res) => {
    const { provaId, data } = req.body;
    const usuarioId = req.usuario.id;
  
    try {
      await pool.query(
        'INSERT INTO datas_prova (usuario_id, prova_id, data_prova) VALUES ($1, $2, $3)',
        [usuarioId, provaId, data]
      );
      res.send("Data da prova salva com sucesso.");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao salvar data.");
    }
  });
  

  app.delete('/revisar/:usuarioId', autenticarToken, async (req, res) => {
    const { usuarioId } = req.params;
    const { categoria } = req.query; // categoria recebida na query
  
    if (req.usuario.id !== parseInt(usuarioId)) {
      return res.status(403).send('Acesso negado');
    }
  
    if (!categoria) {
      return res.status(400).send('Categoria é obrigatória');
    }
  
    try {
      // Deleta só resultados de atividades daquela categoria e usuário
      await pool.query(`
        DELETE FROM resultados 
        WHERE usuario_id = $1 
          AND atividade_id IN (
            SELECT id FROM atividades WHERE categoria = $2
          )
      `, [usuarioId, categoria]);
  
      res.send('Respostas resetadas com sucesso para a categoria ' + categoria);
    } catch (err) {
      console.error("Erro ao deletar resultados:", err);
      res.status(500).send('Erro ao resetar progresso');
    }
  });
  
  

  app.get('/progresso', autenticarToken, async (req, res) => {
    const usuarioId = req.usuario.id;
  
    const { rows } = await pool.query(`
      SELECT 
        a.categoria,
        a.nivel_dificuldade,
        COUNT(*) FILTER (WHERE r.acertou) AS acertos,
        COUNT(*) FILTER (WHERE NOT r.acertou) AS erros
      FROM resultados r
      JOIN atividades a ON r.atividade_id = a.id
      WHERE r.usuario_id = $1
      GROUP BY a.categoria, a.nivel_dificuldade
    `, [usuarioId]);
  
    res.json(rows);
  });
  




app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
