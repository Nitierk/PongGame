function Start() {
    Init()
    document.getElementById("Start").remove()
    setInterval(principal, 1000 / 30)
}

function Init() {
    dificuldade =  $('input[name=dificult]:checked', '#myForm').val()
    switch (dificuldade) {
        case 'Facil':
            velocidadeJogador2 = 4
            velocidadeXBola = velocidadeYBola = -6
            hRaquete = 70
            break;
        case 'Medio':
            velocidadeJogador2 = 6
            velocidadeXBola = velocidadeYBola = -10
            hRaquete = 50
            break;
        case 'Dificil':
            velocidadeJogador2 = 10
            velocidadeXBola = velocidadeYBola = -15
            hRaquete = 30
            break;
        default:
            velocidadeJogador2 = Number(prompt("Velocidade do jogador Adversário:"))
            velocidadeXBola = velocidadeYBola = -Number(prompt("Velocidade da Bola:"))
            hRaquete = Number(prompt("Tamanho da Raquete:"))
            break;
    }
    //Campo
    wCampo = 700
    hCampo = 500
    wRede = 5
    hRede = 500
    //Jogadores      
    wRaquete = 10
    posicaoJogador1 = posicaoJogador2 = 10
    efeitoRaquete = 0.3
    pontuacaoJogador1 = pontuacaoJogador2 = 0 
    console.log(velocidadeJogador2)                        
    //Bola  
    diametroBola = 10
    xBola = yBola = 300
    //Canva
    folhaDesenho = document.getElementById("folha");
    areaDesenho = folhaDesenho.getContext("2d");
    folhaDesenho.addEventListener('mousemove', function(e){
        posicaoJogador1 = e.clientY - hRaquete / 2
    })
}
function principal() {
    draw()
    calculos()
}
function draw() {
    areaDesenho.fillStyle = '#286047'
    areaDesenho.fillRect(0, 0, wCampo, hCampo) // Campo
    
    areaDesenho.fillStyle = 'white'
    areaDesenho.fillRect(wCampo/2 - wRede/2, 0, wRede, hRede) // Rede
    areaDesenho.fillRect(0, posicaoJogador1, wRaquete, hRaquete) // Raquete 1 
    areaDesenho.fillRect(wCampo - wRaquete, posicaoJogador2, wRaquete, hRaquete) // Raquete 2
    areaDesenho.fillRect(xBola - diametroBola/2, yBola - diametroBola/2, diametroBola, diametroBola) // bola 

    //Escrever Pontuação do Jogo
    areaDesenho.fillText("Jogador1 - " + pontuacaoJogador1 + " pontos", 100, 100)
    areaDesenho.fillText("Jogador2 - " + pontuacaoJogador2 + " pontos", 450, 100)
    
}
function calculos() { 
//Regras do Jogo
    
    xBola += velocidadeXBola
    yBola += velocidadeYBola
    if (yBola < 0 && velocidadeYBola < 0) {
        velocidadeYBola = -velocidadeYBola
     } //Colisão em Cima


    if (yBola > hCampo  && velocidadeYBola > 0) {
        velocidadeYBola = -velocidadeYBola
    } //Colisão em Baixo

    //Verifica se Jogador2 fez o ponto
    if (xBola < wRaquete) {
        if (yBola > posicaoJogador1 && yBola < posicaoJogador1 + hRaquete) {
            velocidadeXBola = -velocidadeXBola
            var diferencaY = yBola - (posicaoJogador1 + hRaquete / 2)
            velocidadeYBola = diferencaY * efeitoRaquete
        }
        else if(xBola < wRaquete/11/2){
            pontuacaoJogador2++
            xBola = wCampo/2
            yBola = hCampo / 2
            velocidadeXBola = -velocidadeXBola
            velocidadeYBola = 5
        }
    }
    

    //Verifica se Jogador1 fez o ponto
    if (xBola > wCampo - wRaquete) {
        if (yBola > posicaoJogador2 && yBola < posicaoJogador2 + hRaquete) {
            velocidadeXBola = -velocidadeXBola
            var diferencaY = yBola - (posicaoJogador2 + hRaquete / 2)
            velocidadeYBola = diferencaY * efeitoRaquete
        }
        else if(xBola > wCampo - wRaquete/11/2){
            pontuacaoJogador1++
            xBola = wCampo/2
            yBola = hCampo / 2
            velocidadeXBola = -velocidadeXBola
            velocidadeYBola = 5
        }
    }

    //Movimentação do Jogador2
    if (posicaoJogador2 + hRaquete / 2 < yBola && xBola > wCampo/2) {
        posicaoJogador2 += velocidadeJogador2
    }
    else if(xBola > wCampo/2){
        posicaoJogador2 -= velocidadeJogador2
    }
    

}
