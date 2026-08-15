document.getElementById('formCadastroAluno').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome_aluno = document.getElementById('nome_aluno').value;
    const idade_aluno = document.getElementById('idade_aluno').value;
    const cpf_aluno = document.getElementById('cpf_aluno').value;
    const data_cadastro = document.getElementById('data_cadastro').value;

    const response = await fetch('http://localhost:3000/cadastrarAluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_aluno, idade_aluno, cpf_aluno, data_cadastro })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Aluno Cadastrado!';
        document.getElementById('formCadastroAluno').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


