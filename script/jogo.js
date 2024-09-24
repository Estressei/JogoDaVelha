const quadElements = document.querySelectorAll("[data-quad]"); //seleciona todos os quad, passando o atributo data-quad
const tab = document.querySelector("[data-tab]");
const mensagemTextoElement = document.querySelector("[data-mensagem-texto]");
const mensagem = document.querySelector("[data-mensagem]");
const reiniciar = document.querySelector("[data-reiniciar]");

const nomes = () => {
    const usuario = new URLSearchParams(window.location.search);
    return {
        jogador1: usuario.get("usuario1"),
        jogador2: usuario.get("usuario2")
    };
};
// Captura os nomes dos jogadores
const { jogador1, jogador2 } = nomes();

let eCirculo; //se é a vez de circulo

const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const comecarJogo = () =>{
    eCirculo = false;

    for(const quad of quadElements){ //para add em cada quad um evento chamado click
        quad.classList.remove("x"); //quando reiniciar, retira o x e circ do tabuleiro
        quad.classList.remove("circ");
        quad.removeEventListener("click", handleClick);
        quad.addEventListener("click", handleClick, {once: true}); //evento chama handle que so acontece uma vez, no primeiro click
    }

    quadClass();
    mensagem.classList.remove("aparecer-mensagem");
    atualizarMensagemDaVez();
};

const acabarJogo = (empatou) =>{ //vai mostra tela de vitoria ou empate
    if(empatou){
        mensagemTextoElement.innerText = "Empate!"
    }else {
        mensagemTextoElement.innerText = eCirculo ? `${jogador2} venceu!` : `${jogador1} venceu!`; //usar crases mesmo
    }

    mensagem.classList.add("aparecer-mensagem");
};

const vitoria = (jogAtual) =>{
    return combinacoes.some(comb => { //verificando se alguma combinação esta preenchida
        return comb.every(jogo => { //every ve se alguma quad esta presente nas combinaçoes de vitoria
            return quadElements[jogo].classList.contains(jogAtual); //vai passando de celula em celula pra ver se contem o elemento nela
        })
    })
};

const eEmpate = () =>{
    return [...quadElements].every(quad => {//se todas as celulas estiverem preenchidas é empate
        return quad.classList.contains("x") || quad.classList.contains("circ");
    });
};

const marca = (quad, classAdd) => {
    quad.classList.add(classAdd); //marca o quadrado com "x" ou "circ"
};

const quadClass = () =>{ //quando reiniciar, nao bugar o cursor
    tab.classList.remove("circ"); //remove tanto circ como x
    tab.classList.remove("x");

    if(eCirculo){ //se for a vez do circulo
        tab.classList.add("circ"); //add o circulo
    } else {
        tab.classList.add("x");
    }
};

const trocar = () =>{
    eCirculo = !eCirculo; //o inverso doq ele é

    quadClass();
    atualizarMensagemDaVez();
};

const atualizarMensagemDaVez = () => {
    const jogadorAtual = eCirculo ? jogador2 : jogador1; //define o jogador com base na vez
    document.querySelector(".da_vez").innerText = `Vez do jogador: ${jogadorAtual}`;
};

const handleClick = (e) => { // e é o elemento do quad
    //colocar x ou circulo
    const quad = e.target;
    const classAdd = eCirculo ? "circ" : "x"; //se for a ve do circulo, coloca ele, se nao, x

    marca(quad, classAdd);
    
    //verificar se ganhou
    const venceu = vitoria(classAdd);
    //verificar se empatou
    const empatou = eEmpate();
    
    if(venceu){
        acabarJogo(false);
    } else if(empatou){
        acabarJogo(true);
    } else{
        //mudar para x ou circulo
        trocar();
    }
};

comecarJogo();
reiniciar.addEventListener("click", comecarJogo);