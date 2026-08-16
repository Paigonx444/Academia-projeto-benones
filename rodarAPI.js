const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar vendas de combustível
app.post('/cadastrarAluno', (req, res) => {
    const { nome_aluno, idade_aluno, cpf_aluno, data_cadastro  } = req.body;

    const codigoDoMySQL = 'INSERT INTO academia (nome_aluno, idade_aluno, cpf_aluno, data_cadastro ) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [nome_aluno, idade_aluno, cpf_aluno, data_cadastro], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Aluno Cadastrado!' });
    });
});

// Listar cadastro de Alunos
app.get('/cadastrarAluno', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM academia';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar venda de combustível
app.delete('/cadastrarAluno/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM academia WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar cadastro' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cadastro não encontrado' });
        }

        res.json({ message: 'Cadastro excluído com sucesso!' });
    });
});

// Atualizar venda de combustível
app.put('/cadastrarAluno/:id', (req, res) => {
    const id = req.params.id;
    const { nome_aluno, idade_aluno, cpf_aluno, data_cadastro } = req.body;

    const codigoDoMySQL = 'UPDATE academia SET nome_aluno = ?, idade_aluno, cpf_aluno = ?, data_cadastro = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [nome_aluno, idade_aluno, cpf_aluno, data_cadastro, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar cadastro' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cadastro não encontrado' });
        }

        res.json({ message: 'Cadastro atualizado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
