let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");

let botones = [boton1, boton2, boton3];

function manejarClick(event) {
    botones.forEach(boton => boton.classList.remove("active"));
    event.target.classList.add("active");
    document.getElementById("etiqueta_principal").textContent = event.target.textContent;
}

botones.forEach(boton => boton.addEventListener("click", manejarClick));

let entrada1 = document.getElementById("entrada1");
let entrada2 = document.getElementById("entrada2");
let entrada3 = document.getElementById("entrada3");
let select = document.getElementById("select1");

let registroAnteriorSencilla = "";
let registroAnteriorDoble = "";

function procesarEntradaNormal(){
    let numeroAparenteCorrectoSencilla = true;
    let numeroAparenteCorrectoDoble = true;
    try{
        let entradaBig = new Big(entrada1.value);
        const numeroMaximoSencilla = new Big("3.40282346638528859811704183484516925440e+38");
        const numeroMinimoSencilla = new Big("1.401298464324817070923729583289916131280e-45");
        const numeroMaximoDoble = new Big("1.797693134862315708145274237317043567981e+308");
        const numeroMinimoDoble = new Big("4.940656458412465441765687928682213723651e-324");

        if(entradaBig.abs().gt(numeroMaximoSencilla)){
            numeroAparenteCorrectoSencilla = false;
            entrada2.value = "overflow";
        }
        else if( (entradaBig.abs().lt(numeroMinimoSencilla)) && !(entradaBig.abs().eq(0)) ){
            numeroAparenteCorrectoSencilla = false;
            entrada2.value = "underflow";
        }

        if(entradaBig.abs().gt(numeroMaximoDoble)){
            numeroAparenteCorrectoDoble = false;
            entrada3.value = "overflow";
        }
        else if( (entradaBig.abs().lt(numeroMinimoDoble)) && !(entradaBig.abs().eq(0)) ){
            numeroAparenteCorrectoDoble = false;
            entrada3.value = "underflow";
        }
    }
    catch(error){}

    if(numeroAparenteCorrectoSencilla || numeroAparenteCorrectoDoble){
        let decimal = new DecimalFraccionario(entrada1.value);
        if(numeroAparenteCorrectoSencilla)
            entrada2.value = decimal._IEEE754Sencilla;
        
        if(numeroAparenteCorrectoDoble)
            entrada3.value = decimal._IEEE754Doble;
    }
}

let interrupcionJavascript = false;

function entradaNormal(llamadoPorJavascript = false){
    let huboEjemplo = false;
    if(!llamadoPorJavascript){
        select.selectedIndex = 0;
    }

    switch(entrada1.value.toLowerCase()){
        case "+infinity":
        case "infinity":
            entrada2.value = "7F800000";
            entrada3.value = "7FF0000000000000";
            huboEjemplo = true;
            break;
        case "-infinity":
            entrada2.value = "FF800000";
            entrada3.value = "FFF0000000000000";
            huboEjemplo = true;
            break;
        case "qnan":
            entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            huboEjemplo = true;
            break;
        case "snan":
            entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            huboEjemplo = true;
            break;
        default:
            procesarEntradaNormal();
    }
}

function entradaSencilla(){
    if(entrada2.value.length > 8){
        entrada2.value = registroAnteriorSencilla;
        return;
    }

    select.selectedIndex = 0;
    if(entrada2.value == ""){
        entrada1.value = "";
        entrada3.value = "";
    }

    let sencilla = new PrecSencilla(entrada2.value);

    entrada1.value = sencilla._enComa;
    if(entrada2.value.length == 8)
        procesarEntradaNormal();

    registroAnteriorSencilla = entrada2.value;
}

function entradaDoble(){
    if(entrada3.value.length > 16){
        entrada3.value = registroAnteriorDoble;
        return;
    }
    select.selectedIndex = 0;
    if(entrada3.value == ""){
        entrada1.value = "";
        entrada2.value = "";
    }
        
    let doble = new PrecDoble(entrada3.value);

    entrada1.value = doble._enComa;
    if(entrada2.value.length == 16)
        procesarEntradaNormal();
    
    registroAnteriorDoble = entrada3.value;
}

function ejemplos(){
	let seleccion = select.value;

    entrada1.value = seleccion;
    entradaNormal(true);
}