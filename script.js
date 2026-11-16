const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "teclado",
    "servidor",
    "variavel",
    "funcao",
    "repositorio"
];

let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let fimDeJogo = false;

const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

function iniciarJogo() {
    const indice = Math.floor(
        Math.random() * palavras.length
    );
    palavraSecreta = palavras[indice];
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    fimDeJogo = false;

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    mensagem.textContent = "Bem-vindo ao jogo!";
    inputLetra.value = "";
}

function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

function verificarLetra() {
    if (fimDeJogo) {
        return;
    }

    const letra = inputLetra.value.toLowerCase();

    if (letra === "") {
        mensagem.textContent = "Digite uma letra.";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada.";
        inputLetra.value = "";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");
    inputLetra.value = "";

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        fimDeJogo = true;
    } else if (tentativas === 0) {
        mensagem.textContent =
            "Você perdeu! A palavra era " + palavraSecreta;
        fimDeJogo = true;
    }
}

botaoTentar.addEventListener(
    "click",
    verificarLetra
);

inputLetra.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
);

iniciarJogo();
