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
        this.editIndex = null;
    }

    adicionarAluno(nome, idade, serie) {
        // Validação de idade
        if (idade < 1 || idade > 100) {
            this.exibirErro("Insira uma idade válida");
            return;
        }

        const novoAluno = new Aluno(nome, idade, serie);
        this.alunos.push(novoAluno);
        this.atualizarLista();
        this.resetForm();
        this.limparErro();
    }

    atualizarLista() {
        const listaCadastrados = document.getElementById("listaCadastrados");
        listaCadastrados.innerHTML = "";
        this.alunos.forEach((aluno, index) => {
            const alunoDiv = document.createElement("div");
            alunoDiv.classList.add("student-item");
            alunoDiv.innerHTML = `
                <span>${aluno.nome}, ${aluno.idade} anos, Série: ${aluno.serie}</span>
                <button class="update" onclick="cadastro.editarAluno(${index})">Editar</button>
                <button class="remove" onclick="cadastro.deletarAluno(${index})">Deletar</button>
            `;
            listaCadastrados.appendChild(alunoDiv);
        });
    }

    editarAluno(index) {
        const aluno = this.alunos[index];
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value = aluno.idade;
        document.getElementById("serie").value = aluno.serie;

        this.editIndex = index;
        document.getElementById("cadastrarBtn").textContent = "Atualizar";
        document.getElementById("cadastrarBtn").classList.remove("add");
        document.getElementById("cadastrarBtn").classList.add("update");
    }

    atualizarAluno() {
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const serie = document.getElementById("serie").value;

        if (idade < 1 || idade > 100) {
            this.exibirErro("Insira uma idade válida");
            return;
        }

        if (this.editIndex !== null) {
            this.alunos[this.editIndex].nome = nome;
            this.alunos[this.editIndex].idade = idade;
            this.alunos[this.editIndex].serie = serie;
            this.atualizarLista();
            this.resetForm();
            this.limparErro();
        }
    }

    deletarAluno(index) {
        this.alunos.splice(index, 1);
        this.atualizarLista();
    }

    resetForm() {
        document.getElementById("cadastroForm").reset();
        document.getElementById("cadastrarBtn").textContent = "Adicionar Aluno";
        document.getElementById("cadastrarBtn").classList.remove("update");
        document.getElementById("cadastrarBtn").classList.add("add");
        this.editIndex = null;
    }

    exibirErro(mensagem) {
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.textContent = mensagem;
    }

    limparErro() {
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.textContent = "";
    }
}

const cadastro = new Cadastro();

document.getElementById("cadastrarBtn").onclick = () => {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const serie = document.getElementById("serie").value;

    if (cadastro.editIndex === null) {
        cadastro.adicionarAluno(nome, idade, serie);
    } else {
        cadastro.atualizarAluno();
    }
};
