var JOGAR = 1;
var ENCERRAR = 0;
var estadoJogo = JOGAR;
var ground,groundIMG;

function preload(){
  groundIMG = loadImage("imagens/a.png");
  jogador = loadImage("imagens/bobi.png");
  obs1 = loadImage("imagens/Papel.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //personagem 
   player = createSprite(50,height-70 ,20,50);
   player.addImage("player",jogador);
   player.scale = 0.1;
  //chão
  ground = createSprite(200,height/1,400,20);
  ground.addImage("ground",groundIMG);
  
  ground.x = ground.width /2;
  ground.velocityX = -5;
  ground.shapeColor = "red";

  //profundidade
  player.depth = ground.depth;
  player.depth +=1;
  //solo invisivel
  soloInvisivel = createSprite(width/2,height-48,width,10);
  soloInvisivel.visible = false;


  grupoDeObstaculos = new Group();

  }

function draw(){
  background("#2a9df4");

 if(estadoJogo === JOGAR){

  if (ground.x < 0){
    ground.x = ground.width/2;
   } 

  if(touches.lenght > 0 || keyDown("space") && player.y >= height-300) {
    player.velocityY = -12;
    touches = [];
  }

  player.velocityY = player.velocityY + 0.8;
  player.collide(soloInvisivel);

  gerarObstaculos();

 }else if(estadoJogo === ENCERRAR){

 }
  drawSprites();
}


function gerarObstaculos() {
  if(frameCount % 60 === 0) {
   obstaculo = createSprite(600,100,40,10);
   obstaculo.x = Math.round(random(0,1000));
    obstaculo.velocityY = 7;
    
    //gerar obstáculos aleatórios
    //var rand = Math.round(random(1,4));
    switch(1) {
      case 1: obstaculo.addImage(obs1);
              break;
      default: break;
    }
    
    //atribuir escala e tempo de duração ao obstáculo           
    obstaculo.scale = 0.2;
    obstaculo.lifetime = 650;


    obstaculo.depth = ground.depth;
    obstaculo.depth +=1;

    //adicionar cada obstáculo ao grupo
    grupoDeObstaculos.add(obstaculo);
  }
}