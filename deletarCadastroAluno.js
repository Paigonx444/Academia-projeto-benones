async function carregarCadastros() {
    const response = await fetch('http://localhost:3000/cadastrarAluno');
    const cadastros = await response.json();

    let html = '<table><tr><th>ID</th><th>Nome do Aluno</th><th>Idade do Aluno</th><th>CPF do Aluno</th><th>Data de Cadastro</th><th>Ação</th></tr>';

    cadastros.forEach(cadastro => {
        html += `<tr id="venda-${cadastro.id}">
        <td>${cadastro.id}</td>
        <td>${cadastro.nome_aluno}</td>
        <td>${cadastro.idade_aluno}</td>
        <td>${cadastro.cpf_aluno}</td>
        <td>${cadastro.data_cadastro}</td>
        <td><button class="btn-deletar" onclick="deletarCadastro(${cadastro.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaCadastros').innerHTML = html;
}

async function deletarCadastro(id) {
    if (!confirm(`Excluir cadastro ID ${id}?`)) return;

    await fetch(`http://localhost:3000/cadastrarAluno/${id}`, { method: 'DELETE' });
    document.getElementById(`cadastro-${id}`).remove();
}

window.onload = carregarCadastros;
