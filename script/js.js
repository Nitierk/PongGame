window.onload = function() {
    setInterval(execucacao, 1000 / 30)
}
var xBola = yBola = 30
var velocidadeXBola = velocidadeYBola = 3
function execucacao() { 
    var folhaDesenho = document.getElementById("folha");
    var areaDesenho = folhaDesenho.getContext("2d");
    
    var wCampo = 700
    var hCampo = 500
    
    var wRede = 5
    var hRede = 500
    
    var hRaquete = 80
    var yRaquete = 200
    
    var diametroBola = 10
    
    areaDesenho.fillStyle = '#286047'
    areaDesenho.fillRect(0, 0, wCampo, hCampo) // Campo
    
    areaDesenho.fillStyle = 'white'
    areaDesenho.fillRect(wCampo/2 - wRede/2, 0, wRede, hRede) // Rede
    areaDesenho.fillRect(2, yRaquete, 10, hRaquete) // Raquete 1 
    areaDesenho.fillRect(687, 200, 10, 80) // Raquete 2
    areaDesenho.fillRect(xBola - diametroBola/2, yBola - diametroBola/2, diametroBola, diametroBola) // bola 

    
    xBola += velocidadeXBola
    yBola += velocidadeYBola

    if (yBola < 0 && velocidadeYBola < 0) {
        velocidadeYBola = -velocidadeYBola
     } //Colisão em Cima


    if (yBola > hCampo  && velocidadeYBola > 0) {
        velocidadeYBola = -velocidadeYBola
    } //Colisão em Baixo


}
