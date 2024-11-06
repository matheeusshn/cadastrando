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

    editarAluno(index) {
        const aluno = this.alunos[index];
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value = aluno.idade;
        document.getElementById("serie").value = aluno.serie;

        document.getElementById("cadastrarBtn").textContent = "Atualizar";
        document.getElementById("cadastrarBtn").onclick = () => {
            this.alunos[index].nome = document.getElementById("nome").value;
            this.alunos[index].idade = document.getElementById("idade").value;
            this.alunos[index].serie = document.getElementById("serie").value;
            this.atualizarLista();
            this.resetForm();
        };
    }

    deletarAluno(index) {
        this.alunos.splice(index, 1);
        this.atualizarLista();
    }

    resetForm() {
        document.getElementById("cadastroForm").reset();
        document.getElementById("cadastrarBtn").textContent = "Cadastrar";
        document.getElementById("cadastrarBtn").onclick = () => {
            const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
            const serie = document.getElementById("serie").value;
            this.adicionarAluno(nome, idade, serie);
        };
    }
}

const cadastro = new Cadastro();
document.getElementById("cadastrarBtn").onclick = () => {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const serie = document.getElementById("serie").value;
    cadastro.adicionarAluno(nome, idade, serie);
};
