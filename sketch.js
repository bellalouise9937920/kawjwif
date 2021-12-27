// variaveis
var caminho;
var jogador;
var oponente1;
var oponente2;
var oponente3;
var sino_da_bicicleta;
var fim_de_jogo;

//imagem das variaveis
var caminho_Img;
var jogador_Img1;
var jogador_Img2;
var oponente1_em_pe;
var oponente1_caido;
var oponente2_em_pe;
var oponente2_caido;
var oponente3_em_pe;
var oponente3_caido;
var fim_de_jogo_Img;

//grupos
var grupoddeobstaculos;
var grupodeoponentesrosa;
var grupodeoponentesamarelo;
var grupodeoponentesvermelho;

//som da variavel sino da bicicleta
var sino_da_bicicleta_sound;

//estados do jogo
var JOGAR= 1;
var FIM= 0;
var estadoJogo= 1;

//distancia percorrida do jogador
var distance= 0

// reinicializaçao
var restart;

function preload () {

  //carregando as imagens 
  caminho_Img= loadImage ("Road.png");
  fim_de_jogo_Img= loadImage ("gameOver.png");
  //carregando as animacoes
  jogador_Img1= loadAnimation ("mainPlayer1.png","mainPlayer2.png");
  jogador_Img2= loadAnimation ("mainPlayer3.png");
  oponente1_em_pe= loadAnimation ("opponent1.png","opponent2.png");
  oponente1_caido= loadAnimation ("opponent3.png");
  oponente2_em_pe= loadAnimation ("opponent4.png","opponent5.png");
  oponente2_caido= loadAnimation ("opponent6.png");
  oponente3_em_pe= loadAnimation ("opponent7.png","opponent8.png");
  oponente3_caido= loadAnimation ("opponent9.png");
  //carregando o som
  sino_da_bicicleta_sound= loadSound ("bell.mp3");
}

function setup () {
createCanvas (1200,300);

//movendo o fundo
caminho= createSprite (100,150);
caminho.addImage (caminho_Img);
caminho.velocityX= -5;

//criando a animacao do ciclista correndo
jogador= createSprite (70,150);
jogador.addAnimation ("correndo",jogador_Img1)
jogador.scale= 0.08;
jogador.setCollider ("rectangle",0,0,40,40);

//criando o fim de jogo
fim_de_jogo= createSprite (650,150);
fim_de_jogo.addImage (fim_de_jogo_Img);
fim_de_jogo.scale= 0.6;
fim_de_jogo.visible= false;

//criando os grupos
grupodeobstaculos= new Group ();
grupodeoponentesrosa= new Group ();
grupodeoponentesvermelho= new Group ();
grupodeoponentesamarelo= new Group ();
}

function draw () {
  background (0);
  if (estadoJogo=== JOGAR) {

  distance= distance + Math.round(getFrameRate()/50);
  caminho.velocityX= -(6 + 2*distance/150);

  //fazendo com que o ciclista se mova de acordo com o movimento do mouse
  jogador.y= World.mouseY;

  //criando as bordas
  bordas= createEdgeSprites ();

  //fazendo com que o ciclista colida nas bordas
  jogador.collide (bordas);
  
  //resetando o fundo
  if (caminho.x < 0) {
    caminho.x= width/2;
  }

  //fazendo com que o sino da bicicleta toque ao tocarmos espaco
    if (keyDown("space")) {
    sino_da_bicicleta_sound.play ();
  }

  //criando e dando continuidade aos oponentes
  var select_oponentes= Math.round(random(1,3));

  if (World.frameCount % 150== 0) {
   if (select_oponentes== 1) {
      oponentesRosa ();
   }

   else if (select_oponentes== 2) {
     oponentesAmarelo ();
   }

   else {
     oponentesVermelho ();
  }
  }

  //fazendo com que os oponentes colidem no jogador
  if (grupodeoponentesrosa.isTouching(jogador)) {
    estadoJogo= FIM;
    oponente1.velocityY= 0;
    oponente1.addAnimation ("opponentPlayer1",oponente1_caido);
  }

  if (grupodeoponentesamarelo.isTouching(jogador)) {
    estadoJogo= FIM;
    oponente2.velocityY= 0;
    oponente2.addAnimation ("opponentPlayer2",oponente2_caido);
  }

  if (grupodeoponentesvermelho.isTouching(jogador)) {
    estadoJogo= FIM;
    oponente3.velocityY= 0;
    oponente3.addAnimation ("opponentPlayer3",oponente3_caido);
    
  }
}

else if (estadoJogo=== FIM) {
  fim_de_jogo.visible= true;
  textSize(20); 
  fill(255); 
  text("Pressione Seta para Cima para Reiniciar o jogo!", 500,200);

  //deixando as variaveis paradas assim que chegar ao fim do jogo
  caminho.velocityX= 0;
  jogador.velocityY= 0;
  jogador.addAnimation ("caido",jogador_Img2);

  //removendo a velocidade dos oponentes 
  grupodeoponentesvermelho.setVelocityYEach (0);
  grupodeoponentesvermelho.setLifetimeEach (-1);

  grupodeoponentesamarelo.setVelocityYEach (0);
  grupodeoponentesamarelo.setLifetimeEach (-1);

  grupodeoponentesrosa.setVelocityYEach (0);
  grupodeoponentesrosa.setLifetimeEach (-1);

  if (keyDown("UP_ARROW")) {
    reset ();
  }
}
drawSprites (); 
text ("distance: "+ distance,900,30);
}
//chamando as minhas funcoes das variaveis
function oponentesRosa () {
  oponente1= createSprite (1100,Math.round(random(50,250)));
  oponente1.scale= 0.05;
  oponente1.velocityX= -(6 + 2*distance/150);
  oponente1.addAnimation ("opponentPlayer1",oponente1_em_pe);
  oponente1.setLifetime= 170;
  grupodeoponentesrosa.add (oponente1);
}
  function oponentesAmarelo () {
    oponente2= createSprite (1200,Math.round(random(60,300)));
    oponente2.scale= 0.05;
    oponente2.velocityX= -(10 + 2*distance/150);
    oponente2.addAnimation ("opponentPlayer2",oponente2_em_pe); 
    oponente2.setLifetime= 170;
    grupodeoponentesamarelo.add (oponente2);   
  }
 function oponentesVermelho () {
   oponente3= createSprite (1300,Math.round(random(70,350)));
   oponente3.scale= 0.05;
   oponente3.velocityX= -(15 + 2*distance/150);
   oponente3.addAnimation ("opponentPlayer3",oponente3_em_pe);
   oponente3.setLifetime= 170;
   grupodeoponentesvermelho.add (oponente3);
 }

 function reset () {
   estadoJogo= JOGAR;
   fim_de_jogo.visible= false;
   jogador.addAnimation ("mainPlayer1",jogador_Img1);
   grupodeoponentesrosa.destroyEach ();
   grupodeoponentesamarelo.destroyEach ();
   grupodeoponentesvermelho.destroyEach ();
   distance= 0;
 }