/*Definições*/
var canvas = document.getElementById("paint-canvas");
var nav = document.getElementById("nav");
var nota = document.getElementById("nota");
var context = canvas.getContext("2d");
//var boundings = canvas.getBoundingClientRect();
setupCanvas();
canvas.addEventListener('mousedown', onCanvasMouseDown);
canvas.addEventListener('mouseup', onCanvasMouseUp);
canvas.addEventListener('mousemove', onCanvasMouseMove);
/*Definições*/

/*Especificações*/
var mouseX = 0;
var mouseY = 0;
context.strokeStyle = 'black'; // initial brush color
context.lineWidth = 1; // initial brush width
var drawing = false;
/*Especificações*/

/*Ajusta a area de captura a tela*/
function setupCanvas() {
    canvas.width = nota.clientWidth;
    canvas.height = window.innerHeight - nav.clientHeight - 16;
}
/*Ajusta a area de captura a tela*/

/*Adiciona e remove a paleta #httpRequest*/
function HttpRequest(requisicaoURL, respostaID, ACAO) {
    var requisicao = new XMLHttpRequest();
    requisicao.open("GET", requisicaoURL, true);
    requisicao.send();
    requisicao.onreadystatechange = function () {
        if (requisicao.readyState == 4 && requisicao.status == 200) {
            if(ACAO == "show"){
                document.getElementById(respostaID).innerHTML = requisicao.responseText;
                setupEvtPaleta();
            }
            else{
                document.getElementById(respostaID).innerHTML = "";
            }
        }
    }
}
/*Adiciona e remove a paleta #httpRequest*/


//setupEvtPaleta();//#NOThttpRequest
function setupEvtPaleta() {
    // Setup botões de cores
    var colors = document.getElementsByClassName('colors')[0];

    colors.addEventListener('click', function(event) {
    context.strokeStyle = event.target.value || 'black';
    });

    // Setup botões de espessura
    var brushes = document.getElementsByClassName('brushes')[0];

    brushes.addEventListener('click', function(event) {
    context.lineWidth = event.target.value || 1;
    });
}


/*Converte eventos TouchScreen em enventos de Mouse*/
canvas.addEventListener('touchstart', function (evt) {
    var touch = evt.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
//
canvas.addEventListener('touchend', function (evt) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
//
canvas.addEventListener('touchmove', function (evt) {
    var touch = evt.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false );
/*Converte eventos TouchScreen em enventos de Mouse*/

function getPos(canvasDom, mouseEvent) {

    var clientRect = canvasDom.getBoundingClientRect();

    return {
        x: mouseEvent.clientX - clientRect.x,
        y: mouseEvent.clientY - clientRect.y
    }
}

function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

function onCanvasMouseDown(evt) {
    var pos = getPos(canvas, evt);
    drawing = true;
    context.beginPath();
    context.moveTo(pos.x, pos.y);
    
}

function onCanvasMouseUp(evt) {
    var pos = getPos(canvas, evt);
    drawing = false;
}

function onCanvasMouseMove(evt) {
    var pos = getPos(canvas, evt);

    if (drawing) {
        context.lineTo(pos.x, pos.y);
        context.stroke();
    }
}

// Setup botão paleta //#httpRequest
var btnPaleta = document.getElementById("btnPaleta");
var paletaObj = document.getElementById("paleta");
btnPaleta.addEventListener('click', function(){

    if (paletaObj.innerText == "") { //#httpRequest
        HttpRequest('assets/html/paleta.html', "paleta", "show");
        paletaObj.hidden = false;
    }
    else{
        HttpRequest('assets/html/paleta.html', "paleta", "hide");
        paletaObj.hidden = true;
    } //#httpRequest
     //if(paletaObj.hidden == true) paletaObj.hidden = false; //#NOThttpRequest
     //else paletaObj.hidden = true; //#NOThttpRequest
});
paletaObj.innerText = "" //#httpRequest

// Setup botão fullscreen
var btnFullScreen = document.getElementById("btnFullScreen");
btnFullScreen.addEventListener('click', function () {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    //ComponenteAsync('assets/html/paleta.html', "paleta", "hide");
    paletaObj.hidden = true;
    //setupCanvas();
})

// Setup botão limpar
document.getElementById("btnLimpar").addEventListener('click', function (evt) {
    setupCanvas();
}, false);

// Setup botão salvar
document.getElementById("btnSalvar").addEventListener('click', function (evt) {
    var imageName = prompt('Nomeie a sua anotação');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'Anotação';
    a.click();
    history.back();
}, false);