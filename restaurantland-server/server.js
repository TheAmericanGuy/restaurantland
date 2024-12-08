const express = require('express');
const moment = require('moment-timezone');
const cors = require('cors');
const { Pool } = require('pg'); // Importa a biblioteca PostgreSQL
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para processar JSON no corpo das requisições

// Configuração do PostgreSQL
const pool = new Pool({
    user: 'postgres',       // Substitua pelo seu usuário PostgreSQL
    host: 'localhost',         // Geralmente localhost
    database: 'restaurantland', // Nome do banco
    password: '@Sempre234@',     // Substitua pela sua senha do banco
    port: 5432,                // Porta padrão do PostgreSQL
});

// Teste a conexão ao banco de dados
pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL', err);
    } else {
        console.log('Conectado ao PostgreSQL');
    }
});

// Endpoint para buscar data e hora
app.get('/datetime', (req, res) => {
    const timezone = req.query.timezone || 'America/New_York'; 
    const now = moment().tz(timezone);
    const date = now.format('LL');  
    const time = now.format('LTS');  
    res.json({ date, time });
});

// ** Rota para Login com PIN **
app.post('/api/login', async (req, res) => {
    console.log('Requisição recebida:', req.body);
    const { pin } = req.body; // Obtém o PIN do corpo da requisição

    try {
        // Consultar no banco de dados o PIN fornecido
        const result = await pool.query('SELECT * FROM users WHERE pin = $1', [pin]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.json({ success: true, userType: user.type });
        } else {
            res.json({ success: false, message: 'Invalid PIN' });
        }
    } catch (err) {
        console.error('Erro ao verificar o PIN:', err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});



// ** Rota para Adicionar um Novo Usuário **
app.post('/api/users', async (req, res) => {
    const { name, pin, type } = req.body;

    try {
        // Insere um novo usuário no banco
        await pool.query(
            'INSERT INTO users (name, pin, type) VALUES ($1, $2, $3)',
            [name, pin, type]
        );

        res.json({ success: true, message: 'Usuário adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar usuário:', err);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server online at http://localhost:${PORT}`);
});

// Rota para buscar todos os usuários
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT name, pin, type FROM users');
        res.json(result.rows); // Retorna todos os usuários no formato JSON
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ success: false, message: 'Erro ao buscar usuários' });
    }
});

// Rota para deletar um usuário pelo nome
app.delete('/api/users/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE name = $1', [name]);

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        res.json({ success: true, message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ success: false, message: 'Erro ao deletar usuário' });
    }
});
