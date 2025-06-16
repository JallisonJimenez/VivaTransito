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

// Cadastro
app.post('/cadastro', async (req, res) => {
  const { username, password, isOrientador, cpf, telefone, foto } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (username, password_hash, is_orientador, cpf, telefone, foto) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, hash, isOrientador, cpf, telefone, foto]
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
