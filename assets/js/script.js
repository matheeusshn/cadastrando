class Aluno {
    constructor(nome, idade, serie) {
        this.nome = nome;
        this.idade = idade;
        this.serie = serie;
    }
}

class Cadastro {
    constructor() {
        this.alunos = [];
    }

    adicionarAluno(nome, idade, serie) {
        const novoAluno = new Aluno(nome, idade, serie);
        this.alunos.push(novoAluno);
        this.atualizarLista();
    }

    atualizarLista() {
        const listaCadastrados = document.getElementById("listaCadastrados");
        listaCadastrados.innerHTML = "";
        this.alunos.forEach((aluno, index) => {
            const alunoDiv = document.createElement("div");
            alunoDiv.classList.add("aluno");
            alunoDiv.innerHTML = `
                <span>${aluno.nome}, ${aluno.idade} anos, Série: ${aluno.serie}</span>
                <button onclick="cadastro.editarAluno(${index})">Editar</button>
                <button onclick="cadastro.deletarAluno(${index})">Deletar</button>
            `;
            listaCadastrados.appendChild(alunoDiv);
        });
    }
}

const cadastro = new Cadastro();
document.getElementById("cadastrarBtn").onclick = () => {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const serie = document.getElementById("serie").value;
    cadastro.adicionarAluno(nome, idade, serie);
};
