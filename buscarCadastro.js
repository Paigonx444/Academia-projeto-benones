async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/cadastrarAluno');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>id</th><th>Nome do aluno</th><th>CPF do aluno</th><th>Data do cadastro</th></tr>';

    respostaObtida.forEach(cadastrarAluno => {
        html += `<tr>
        <td>${cadastrarAluno.id}</td>
        <td>${cadastrarAluno.nome_aluno}</td>
        <td>${cadastrarAluno.idade_aluno}</td>
        <td>${cadastrarAluno.cpf_aluno}</td>
        <td>${cadastrarAluno.data_cadastro}</td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
