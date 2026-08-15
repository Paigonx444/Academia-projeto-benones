-- Active: 1786650839668@@benserverplex.ddns.net@3306@api_crud

use alunos_piets;

CREATE TABLE academia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(50) NOT NULL,
    idade_aluno VARCHAR(50) NOT NULL,
    cpf_aluno VARCHAR(50) NOT NULL,
    data_cadastro DATE
);

SELECT * FROM academia;
