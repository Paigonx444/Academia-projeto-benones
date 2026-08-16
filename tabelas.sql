-- Active: 1786917530242@@benserverplex.ddns.net@3306@alunos_piets

USE alunos_piets;

CREATE TABLE academia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(50) NOT NULL,
    idade_aluno VARCHAR(50) NOT NULL,
    cpf_aluno VARCHAR(50) NOT NULL,
    data_cadastro DATE
);

SELECT * FROM academia;
