window.onload = function() {
    setInterval(execucacao, 1000 / 30)
}
var wCampo = 700
var hCampo = 500
var wRede = 5
var hRede = 500

var diametroBola = 10
var xBola = yBola = 500

var velocidadeXBola = velocidadeYBola = -5
var velocidadeJogador2 = 8
var hRaquete = 80
var posicaoJogador1 = posicaoJogador2 = 10
var efeitoRaquete = 0.4
var pontuacaoJogador1 = pontuacaoJogador2 = 0
var folhaDesenho = document.getElementById("folha");
var areaDesenho = folhaDesenho.getContext("2d");
folhaDesenho.addEventListener('mousemove', function(e){
    posicaoJogador1 = e.clientY - hRaquete / 2
})
function execucacao() { 
    areaDesenho.fillStyle = '#286047'
    areaDesenho.fillRect(0, 0, wCampo, hCampo) // Campo
    
    areaDesenho.fillStyle = 'white'
    areaDesenho.fillRect(wCampo/2 - wRede/2, 0, wRede, hRede) // Rede
    areaDesenho.fillRect(0, posicaoJogador1, 10, hRaquete) // Raquete 1 
    areaDesenho.fillRect(690, posicaoJogador2, 10, hRaquete) // Raquete 2
    areaDesenho.fillRect(xBola - diametroBola/2, yBola - diametroBola/2, diametroBola, diametroBola) // bola 

    //Escrever Pontuação do Jogo
    areaDesenho.fillText("Jogador1 - " + pontuacaoJogador1 + " pontos", 100, 100)
    areaDesenho.fillText("Jogador2 - " + pontuacaoJogador2 + " pontos", 450, 100)
    
    xBola += velocidadeXBola
    yBola += velocidadeYBola


//Regras do Jogo

    if (yBola < 0 && velocidadeYBola < 0) {
        velocidadeYBola = -velocidadeYBola
     } //Colisão em Cima


    if (yBola > hCampo  && velocidadeYBola > 0) {
        velocidadeYBola = -velocidadeYBola
    } //Colisão em Baixo

    //Verifica se Jogador2 fez o ponto
    if (xBola < 10) {
        if (yBola > posicaoJogador1 && yBola < posicaoJogador1 + hRaquete) {
            velocidadeXBola = -velocidadeXBola
            var diferencaY = yBola - (posicaoJogador1 + hRaquete / 2)
            velocidadeYBola = diferencaY * efeitoRaquete
        }
        else{
            pontuacaoJogador2++
            xBola = wCampo/2
            yBola = hCampo / 2
            velocidadeXBola = -velocidadeXBola
            velocidadeYBola = 5
        }
    }
    

    //Verifica se Jogador1 fez o ponto
    if (xBola > wCampo - 10) {
        if (yBola > posicaoJogador2 && yBola < posicaoJogador2 + hRaquete) {
            velocidadeXBola = -velocidadeXBola
            var diferencaY = yBola - (posicaoJogador2 + hRaquete / 2)
            velocidadeYBola = diferencaY * efeitoRaquete
        }
        else{
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
