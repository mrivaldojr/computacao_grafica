//atividade 0 - Computação Gráfica
//Marivaldo Carneiro Mascarenhas Junior
var scene;
var camera;
var renderer;
var meshCharacter;
var ball;
var cores = [0xffff00,0x9999cc,0x33cccc];
var directionX = 1;
var directionY = 1;
var characterInitPos = -0.71;
var ballSpeed = 0.01;
var fase = 1;
var vidas = 3;
var animate = false;
var characterGeometry;
var material;
//determina msg de fim de jogo
var tipoFim;
var completou = false;

function init(){   
    //instucoes
    alert("'a'=mover para a esquerda\n'd'=mover para a direita\n'barra de espaço'=lançar a bola");
    
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );;
    renderer = new THREE.WebGLRenderer();
    
    scene.add(camera);
    
    renderer.setClearColor(new THREE.Color(0x000066));
    renderer.setSize(window.innerWidth*0.35, window.innerHeight*0.95);

    //retangulo personagem
    characterGeometry = new THREE.Geometry();
    var vertices = [new THREE.Vector3(-0.1, 0.01, 0),
                    new THREE.Vector3(0.1, 0.01, 0),
                    new THREE.Vector3(-0.1, -0.01, 0),
                    new THREE.Vector3(0.1, -0.01, 0)];
    characterGeometry.vertices = vertices;
    
    var faces = [new THREE.Face3(3,1,0),
                 new THREE.Face3(0,2,3)];
    characterGeometry.faces = faces;
    
    material = new THREE.MeshBasicMaterial({color: 0x66ffcc});
    
    meshCharacter = new THREE.Mesh(characterGeometry, material);
    
    meshCharacter.name = "char";
    scene.add(meshCharacter);
    meshCharacter.position.y = characterInitPos;
   
    //bola
    var ballGeometry = new THREE.CircleGeometry(0.02,32);
    var ballMaterial = new THREE.MeshBasicMaterial({color: 0x990000});
    ball = new THREE.Mesh(ballGeometry,ballMaterial);
    
    scene.add(ball);
    ball.position.x = 0;
    ball.position.y = -0.68;
    ball.name = "bola";
       
    meshCharacter.position = new THREE.Vector3(0.9,1,0);

    document.getElementById("webGL-output").appendChild(renderer.domElement);
    
    document.addEventListener('keypress', moveCharacter, false);
    
    document.addEventListener('keypress',start,false);
     
    criaVidas(); 
    buildRectangleLine(1);
    //alert(scene.children.length)
    renderC();
      
};

//aciona o flag para mover a bola ao apertar barra de espaco
function start(e){
    var key = e.which;
    if(key == 32){
        animate = true;
    }
};

function renderC(){    
    
    if(vidas == 0){
        tipoFim = 0;
        gameOver();
        return;
    }
    
    if(fase == 7){
        tipoFim = 1;
        gameOver();
        return;
    }
    
    //verifica se todos os blocos foram quebrados
    //camera+bola+personagem+vidas
    if(scene.children.length == vidas+3){
        fase++;
        ball.position.x = 0;
        ball.position.y = -0.68;
        meshCharacter.position.x = 0;
        animate = false;
        if(fase <7){
           buildRectangleLine(fase); 
        }
           
    }
       
    if(animate == true){
        moveBall();
    }
    requestAnimationFrame(renderC);
    renderer.render(scene, camera);
    

};

//movimenta o retangulo no eixo x ao apertar a ou d
function moveCharacter(e){
    var key = e.which;
    if(key == 100 && meshCharacter.position.x<0.8){
        //se a bola estiver parada ela se movimenta com o bloco
        if(animate == false){
            ball.position.x += 0.1;
        }
        meshCharacter.position.x = meshCharacter.position.x + 0.1;
        meshCharacter.position = new THREE.Vector3 (0,1.0,0);
    }
    if(key == 97 && meshCharacter.position.x>-0.8){
        if(animate == false){
            ball.position.x -= 0.1;
        }
        meshCharacter.position.x = meshCharacter.position.x - 0.1;
    }    
};

function moveBall(){
        
        detectaColisaoParede();
        detectaColisaoBlocos();
        detectaColisaoPersonagem();

        //alert(ball.position.x.toFixed(2));

        if(directionX == 1 && directionY == 1){
            ball.position.x = ball.position.x + ballSpeed;
            ball.position.y = ball.position.y + ballSpeed;
        }
        if(directionX == -1 && directionY == 1){
            ball.position.x = ball.position.x - ballSpeed;
            ball.position.y = ball.position.y + ballSpeed;
        }
        if(directionX == -1 && directionY == -1){
            ball.position.x = ball.position.x - ballSpeed;
            ball.position.y = ball.position.y - ballSpeed;
        }
        if(directionY == -1 && directionX == 1){
            ball.position.x = ball.position.x + ballSpeed;
            ball.position.y = ball.position.y - ballSpeed;
        } 
    
};

function criaVidas(){
    
    var posX = -0.8;
    var posY = -0.91;
    
    for(var i=0;i<vidas;i++){
        var vidaGeometry = new THREE.Geometry();
        
        var verticesVida = [new THREE.Vector3(-0.1, 0.01, 0),
                    new THREE.Vector3(0.06, 0.01, 0),
                    new THREE.Vector3(-0.1, -0.01, 0),
                    new THREE.Vector3(0.06, -0.01, 0)];
        vidaGeometry.vertices = verticesVida;
            
        

        var facesVida = [new THREE.Face3(3,1,0),
                              new THREE.Face3(0,2,3)];
        vidaGeometry.faces = facesVida;
        
        var vidaMaterial = new THREE.MeshBasicMaterial({color: 0x66ffcc});
        
        vida = new THREE.Mesh(vidaGeometry,vidaMaterial);
            
        vida.name = "vida "+i;
            
        scene.add(vida);
             
        vida.position.x = posX;
        vida.position.y = posY;
        posX += 0.25;
    }
};

//constroi os retangulos que serao usados em cada fase
function buildRectangleLine(fase){
    //posiciona os blocos no eixo Y
    var posY = 0.8;
    var controle="";
    var corIncr = 0;
    var passo = 0.194;
    
    for(var k = 0;k<fase;k++){
        for(var x = -0.86; x<1; x+=passo){
		
            if(corIncr >2){
                corIncr = 0;
            }

            var blockGeometry = new THREE.Geometry();
            var verticesBlock = [new THREE.Vector3(-0.1, 0.02, 0),
                        new THREE.Vector3(0.1, 0.02, 0),
                        new THREE.Vector3(-0.1, -0.02, 0),
                        new THREE.Vector3(0.1, -0.02, 0)];
            blockGeometry.vertices = verticesBlock;

            var facesBlock = [new THREE.Face3(3,1,0),
                              new THREE.Face3(0,2,3)];
            blockGeometry.faces = facesBlock;

            var materialBlock = new THREE.MeshBasicMaterial({color: cores[corIncr]});
            meshBlock = new THREE.Mesh(blockGeometry, materialBlock);
            meshBlock.name = "block "+scene.children.length;

            corIncr++;
        
            meshBlock.position.x = x;
            meshBlock.position.y = posY;
            
            controle = controle + meshBlock.name+" x = "+ meshBlock.position.x.toFixed(2)+" y = "+meshBlock.position.y.toFixed(2)+" \n";
            
            scene.add(meshBlock);
        }        
        posY -=0.05;
    }
    //alert(controle);
};

function detectaColisaoParede(){
	if(ball.position.x>=1){
            directionX = -1;
	}
	if(ball.position.x<=-1){
            directionX = 1;
	}
        if(ball.position.y>=1){
            directionY = -1;
        }
        if(ball.position.y<=-1){
           // loseLife();
        }
};

function detectaColisaoPersonagem(){
    
    if(animate == true && ball.position.y < meshCharacter.position.y){
        loseLife();
    }
    
    if ( (ball.position.y-0.029 <= meshCharacter.position.y)&& 
            ((ball.position.x+0.1 > meshCharacter.position.x)&&(ball.position.x-0.1 < meshCharacter.position.x)) ){
        directionY = 1;
    }
    
};

function detectaColisaoBlocos(){
    
    var vetorPosicoesX = [];
    var vetorPosicoesY = [];
    var objetos;

    objetos = scene.children;
    
    for(var i = 0; i<scene.children.length;i++){
        vetorPosicoesX[i] = objetos[i].position.x;
        vetorPosicoesY[i] = objetos[i].position.y;
    }
    
    for(var i = scene.children.length-1;i>2;i--){
       
        //alert( (parseFloat(ball.position.y.toFixed(2)) + parseFloat(0.02)).toFixed(2) );
        
        if( directionY==-1 &&
                ( ((parseFloat(ball.position.y.toFixed(2)) + parseFloat(0.04)).toFixed(2) == vetorPosicoesY[i].toFixed(2)))&&
               
                ( (parseFloat(ball.position.x)+parseFloat(0.11)).toFixed(2)>=vetorPosicoesX[i]) && 
                
                ((parseFloat(ball.position.x)-parseFloat(0.11)).toFixed(2)<=vetorPosicoesX[i])){
            directionY = 1;
            scene.remove(scene.children[i]);
            //alert(ball.position.x+0.1 +" == "+vetorPosicoesX[i]);
            return;
        }

        if( directionY==1 &&
                ( ((parseFloat(ball.position.y.toFixed(2)) + parseFloat(0.04)).toFixed(2) == vetorPosicoesY[i].toFixed(2)))&&
               
                ( (parseFloat(ball.position.x)+parseFloat(0.16)).toFixed(2)>=vetorPosicoesX[i]) && 
                
                ((parseFloat(ball.position.x)-parseFloat(0.16)).toFixed(2)<=vetorPosicoesX[i])){
            directionY = -1;
            scene.remove(scene.children[i]);
            //alert(ball.position.x+0.1 +" == "+vetorPosicoesX[i]);
            return;
        } 
        
        if( directionY==-1 && 
                ( ((parseFloat(ball.position.y.toFixed(2)) - parseFloat(0.04)).toFixed(2) == vetorPosicoesY[i].toFixed(2)))&&
               
                ( (parseFloat(ball.position.x)+parseFloat(0.16)).toFixed(2)>=vetorPosicoesX[i]) && 
                
                ((parseFloat(ball.position.x)-parseFloat(0.16)).toFixed(2)<=vetorPosicoesX[i])){
            directionY = 1;
            scene.remove(scene.children[i]);
            //alert(ball.position.x+0.1 +" == "+vetorPosicoesX[i]);
            return;
        }
        
 
        
    }
};

function gameOver(){
    if(tipoFim == 0){
        alert("Perdeu tadas as vidas! Fim de Jogo!");
    }
    else{
        alert("Parabéns você completou o jogo!");
    }
    renderer.setClearColor(new THREE.Color(0x666666));
    for(var i = scene.children.length-1;i>0;i--){
        scene.remove(scene.children[i]);
    }
    renderer.render(scene, camera);
}

function loseLife(){
    var imgVida;
    directionX = 1;
    directionY = 1;
    ball.position.x = 0;
    ball.position.y = -0.69;
    meshCharacter.position.x = 0;
    meshCharacter.position.y = characterInitPos;
    animate = false;
    imgVida = scene.getObjectByName("vida "+(vidas-1));
    vidas --;
    scene.remove(imgVida);
};


