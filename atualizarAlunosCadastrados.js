let editandoId = null;

async function carregarCadastros() {
    const response = await fetch('http://localhost:3000/cadastrarAluno');
    const cadastros = await response.json();

    let html = '<table><tr><th>ID</th><th>Nome do Aluno</th><th>Idade do Aluno</th><th>CPF do Aluno</th><th>Data de Cadastro</th></tr>';

    cadastros.forEach(cadastro => {
        const data = cadastro.data_cadastro.split('T')[0];
        html += `<tr id="cadastro-${cadastro.id}">
        <td>${cadastro.id}</td>
        <td id="c-${cadastro.id}-0">${cadastro.nome_aluno}</td>
        <td id="c-${cadastro.id}-1">${cadastro.idade_aluno}</td>
        <td id="c-${cadastro.id}-2">${cadastro.cpf_aluno}</td>
        <td id="c-${cadastro.id}-3" data-val="${data}">${data}</td>
        <td><button class="btn-editar" onclick="editarCadastro(${cadastro.id})">✏️</button></td>
        </tr>`;
    });

    document.getElementById('tabelaCadastros').innerHTML = html + '</table>';
}

function editarCadastro(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;
    document.getElementById(`c-${id}-0`).innerHTML = `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;
    document.getElementById(`c-${id}-1`).innerHTML = `<input type="number" id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-2`).innerHTML = `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}" step="0.01">`;
    document.getElementById(`c-${id}-3`).innerHTML = `<input type="date" id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).getAttribute('data-val')}">`;

    document.querySelector(`#cadastro-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarCadastro(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>`;
}

async function salvarCadastro(id) {
    const response = await fetch(`http://localhost:3000/cadastrarAluno/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome_aluno: document.getElementById(`i-${id}-0`).value,
            idade_aluno: document.getElementById(`i-${id}-1`).value,
            cpf_aluno: document.getElementById(`i-${id}-2`).value,
            data_cadastro: document.getElementById(`i-${id}-3`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarCadastros();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarCadastros();
}

window.onload = carregarCadastros;