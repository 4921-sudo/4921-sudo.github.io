// infinitySencilla e infinityDoble definidos en Calculo.js

const botonCalculate = document.getElementById('calculateBtn');
const botonClear = document.getElementById('clearBtn');
$('#mytextarea1').keypress(function(event){
    event.preventDefault();
});

$('#mytextarea2').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea3').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea4').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea5').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea6').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea7').keypress(function(event){
    event.preventDefault();
});
$('#mytextarea8').keypress(function(event){
    event.preventDefault();
});

let numeroEnTexto = "";
let esPositivo = true;
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

let exactValueSimple = document.getElementById("mytextarea1");
let signBitSimple = document.getElementById("mytextarea2");
let exponentSimple = document.getElementById("mytextarea3");
let significandSimple = document.getElementById("mytextarea7");
let exactValueDouble = document.getElementById("mytextarea4");
let signBitDouble = document.getElementById("mytextarea5");
let exponentDouble = document.getElementById("mytextarea6");
let significandDouble = document.getElementById("mytextarea8");

function limpiarPropiedades(){
    exactValueSimple.value = "Do not write here";
    exactValueDouble.value = "Do not write here";
    signBitSimple.value = "Do not write here";
    signBitDouble.value = "Do not write here";
    exponentSimple.value = "Do not write here";
    exponentDouble.value = "Do not write here";
    significandSimple.value = "Do not write here";
    significandDouble.value = "Do not write here";
}

function limpiarPropiedadesSencilla(){
    exactValueSimple.value = "Do not write here";
    signBitSimple.value = "Do not write here";
    exponentSimple.value = "Do not write here";
    significandSimple.value = "Do not write here";
}

function limpiarPropiedadesDoble(){
    exactValueDouble.value = "Do not write here";
    signBitDouble.value = "Do not write here";
    exponentDouble.value = "Do not write here";
    significandDouble.value = "Do not write here";
}

let registroAnteriorSencilla = "";
let registroAnteriorDoble = "";

entrada2.addEventListener("focus", function() {
    if(select.selectedIndex == 3 || select.selectedIndex == 4 || entrada2.value == "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0"){
        entrada1.value = "";
        entrada2.value = "";
        entrada3.value = "";
        limpiarPropiedades();
        select.selectedIndex = 0;
    }
});

entrada3.addEventListener("focus", function() {
    if(select.selectedIndex == 3 || select.selectedIndex == 4 || entrada3.value == "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0"){
        entrada1.value = "";
        entrada2.value = "";
        entrada3.value = "";
        limpiarPropiedades();
        select.selectedIndex = 0;
    }
});

let inputCalculate = "";
botonCalculate.disabled = true;

botonClear.addEventListener('click', () => {
    entrada1.value = "";
    entrada2.value = "";
    entrada3.value = "";
    limpiarPropiedades();
    select.selectedIndex = 0;
    entrada1.classList.remove("entrada_mal_inactivo");
	entrada1.classList.remove("entrada_mal_activo");
    entrada2.classList.remove("entrada_mal_inactivo");
	entrada2.classList.remove("entrada_mal_activo");
    entrada3.classList.remove("entrada_mal_inactivo");
	entrada3.classList.remove("entrada_mal_activo");
    inputCalculate = "";
    botonCalculate.disabled = true;
});

botonCalculate.addEventListener('click', () => {
    if (inputCalculate == "") return;
    //importa el orden
    else if(inputCalculate == "decimalConEjemplo"){
        return;
    }
    else if (inputCalculate == "decimal") {
        entradaNormalCalculo();
    }
    botonCalculate.disabled = true;
});

function entradaNormal(llamadoPorJavascript = false){

    let huboEjemplo = false;
    //entrada_mal_inactivo y activo estan abajo de todo en el CSS.
    entrada2.classList.remove("entrada_mal_inactivo");
	entrada2.classList.remove("entrada_mal_activo");
    entrada2.value = "";
    
    entrada3.classList.remove("entrada_mal_inactivo");
	entrada3.classList.remove("entrada_mal_activo");
    entrada3.value = "";
    limpiarPropiedades();
    
    if(!llamadoPorJavascript){
        select.selectedIndex = 0;
    }
    switch(entrada1.value.toLowerCase()){
        case "+infinity":
        case "infinity":
            entrada2.value = "7F800000";
            entrada3.value = "7FF0000000000000";
            exactValueSimple.value = "+Infinity";
            exactValueDouble.value = "+Infinity";
            signBitSimple.value = "0";
            signBitDouble.value = "0";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            
            huboEjemplo = true;
            break;
        case "-infinity":
            entrada2.value = "FF800000";
            entrada3.value = "FFF0000000000000";
            exactValueSimple.value = "-Infinity";
            exactValueDouble.value = "-Infinity";
            signBitSimple.value = "1";
            signBitDouble.value = "1";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "qnan":
            entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            exactValueSimple.value = "qNaN";
            exactValueDouble.value = "qNaN";
            signBitSimple.value = "X";
            signBitDouble.value = "X";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = "1XX XXXX XXXX XXXX XXXX XXXX";
            significandDouble.value = "1XXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX";
            huboEjemplo = true;
            break;
        case "snan":
            entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
            exactValueSimple.value = "sNaN";
            exactValueDouble.value = "sNaN";
            signBitSimple.value = "X";
            signBitDouble.value = "X";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = "0XX XXXX XXXX XXXX XXXX XXXX";
            significandDouble.value = "0XXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX";
            huboEjemplo = true;
            break;
    }
    if(huboEjemplo){
        entrada1.classList.remove("entrada_mal_inactivo");
	    entrada1.classList.remove("entrada_mal_activo");
        inputCalculate = "decimalConEjemplo";
        botonCalculate.disabled = true;
    }
    else{
        if(!comprobarNumeroEnTextoParaNormal()){
            if(entrada1.value != ""){
                entrada1.classList.add("entrada_mal_inactivo");
                entrada1.classList.add("entrada_mal_activo");
                inputCalculate = ""; // para que no haga nada el boton
                botonCalculate.disabled = true;
                return;
            }
            else{
                entrada1.classList.remove("entrada_mal_inactivo");
                entrada1.classList.remove("entrada_mal_activo");
            }
        }
        else{
            entrada1.classList.remove("entrada_mal_inactivo");
            entrada1.classList.remove("entrada_mal_activo");
        }

        //saber cual es la entrada de valores
        inputCalculate = "decimal";
        botonCalculate.disabled = false;
    }
    if(entrada1.value == "") botonCalculate.disabled = true;
}

function entradaNormalCalculo(){
                let numeroAparenteCorrectoSencilla = true;
                let numeroAparenteCorrectoDoble = true;
                let errorSencilla = false;
                let errorDoble = false;
                try{
                    let entradaBig = new Big(entrada1.value);
                    const numeroMaximoSencilla = new Big("3.40282346638528859811704183484516925440e+38");
                    const numeroMinimoSencilla = new Big("1.401298464324817070923729583289916131280e-45");
                    const numeroMaximoDoble = new Big("1.797693134862315708145274237317043567981e+308");
                    const numeroMinimoDoble = new Big("4.940656458412465441765687928682213723651e-324");

                    if(entradaBig.abs().gt(numeroMaximoSencilla)){
                        numeroAparenteCorrectoSencilla = false;
                        entrada2.value = "overflow";
                        errorSencilla = true;
                    }
                    else if( (entradaBig.abs().lt(numeroMinimoSencilla)) && !(entradaBig.abs().eq(0)) ){
                        numeroAparenteCorrectoSencilla = false;
                        entrada2.value = "underflow";
                        errorSencilla = true;
                    }
            
                    if(entradaBig.abs().gt(numeroMaximoDoble)){
                        numeroAparenteCorrectoDoble = false;
                        entrada3.value = "overflow";
                        errorDoble = true;
                    }
                    else if( (entradaBig.abs().lt(numeroMinimoDoble)) && !(entradaBig.abs().eq(0)) ){
                        numeroAparenteCorrectoDoble = false;
                        entrada3.value = "underflow";
                        errorDoble = true;
                    }
                }
                catch(error){}
            
                if(numeroAparenteCorrectoSencilla || numeroAparenteCorrectoDoble){
                    let decimal = new DecimalFraccionario(numeroEnTexto, esPositivo);
                    if(numeroAparenteCorrectoSencilla)
                        entrada2.value = decimal._IEEE754Sencilla;
                    
                    if(numeroAparenteCorrectoDoble)
                        entrada3.value = decimal._IEEE754Doble;
                }
                if(errorSencilla) limpiarPropiedadesSencilla();
                if(errorDoble) limpiarPropiedadesDoble();
}

function entradaSencilla(){
    inputCalculate = "";
    botonCalculate.disabled = true;
    let huboEjemplo = false;
    if(entrada2.value.length > 8){
        entrada2.value = registroAnteriorSencilla;
        return;
    }
    entrada1.value = "";
    entrada3.value = "";
    limpiarPropiedades();

    //entrada_mal_inactivo y activo estan abajo de todo en el CSS.
    entrada1.classList.remove("entrada_mal_inactivo");
	entrada1.classList.remove("entrada_mal_activo");
    entrada3.classList.remove("entrada_mal_inactivo");
	entrada3.classList.remove("entrada_mal_activo");

    switch(entrada2.value.toLowerCase()){
        case "7f800000":
            entrada1.value="+Infinity";
            entrada3.value="7FF0000000000000";
            exactValueSimple.value = "+Infinity";
            exactValueDouble.value = "+Infinity";
            signBitSimple.value = "0";
            signBitDouble.value = "0";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "ff800000":
            entrada1.value="-Infinity";
            entrada3.value="FFF0000000000000";
            exactValueSimple.value = "-Infinity";
            exactValueDouble.value = "-Infinity";
            signBitSimple.value = "1";
            signBitDouble.value = "1";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "00000000":
            entrada1.value="+0";
            entrada3.value="0000000000000000";
            exactValueSimple.value = "+0";
            exactValueDouble.value = "+0";
            signBitSimple.value = "0";
            signBitDouble.value = "0";
            exponentSimple.value = "0000 0000";
            exponentDouble.value = "000 0000 0000";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "80000000":
            entrada1.value="-0";
            entrada3.value="8000000000000000";
            exactValueSimple.value = "-0";
            exactValueDouble.value = "-0";
            signBitSimple.value = "1";
            signBitDouble.value = "1";
            exponentSimple.value = "0000 0000";
            exponentDouble.value = "000 0000 0000";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        default:
            registroAnteriorSencilla = entrada2.value;
            if( (entrada2.value != "") && (!( /^[0-9A-Fa-f]+$/.test(entrada2.value) ) || entrada2.value.length < 8) ){
                entrada2.classList.add("entrada_mal_inactivo");
                entrada2.classList.add("entrada_mal_activo");
                limpiarPropiedades();
                return;
            }
            else{
                entrada2.classList.remove("entrada_mal_inactivo");
                entrada2.classList.remove("entrada_mal_activo");
            }

            select.selectedIndex = 0;
            if(entrada2.value == ""){
                entrada1.value = "";
                entrada3.value = "";
            }

            let sencilla = new PrecSencilla(entrada2.value);
            if(sencilla._enComa == "sNaN"){
                entrada1.value = "sNaN";
                entrada3.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }
            if(sencilla._enComa == "qNaN"){
                entrada1.value = "qNaN";
                entrada3.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }

            if(!huboEjemplo){
                if(entrada2.value.length == 8){
                    entrada1.value = sencilla._enComa;
                    if(parseInt(entrada2.value[0], 16) >= 8) esPositivo = false;
                    else esPositivo = true;
                    let decimal = new DecimalFraccionario(exponencialANormal(entrada1.value), esPositivo);
                    entrada3.value = decimal._IEEE754Doble;
                }

                if( (entrada2.value != "") && (!( /^[0-9A-Fa-f]+$/.test(entrada2.value) ) || entrada2.value.length < 8) ){
                    entrada1.value = "";
                    entrada1.classList.remove("entrada_mal_inactivo");
                    entrada1.classList.remove("entrada_mal_activo");
                }
            }
    }
    if(huboEjemplo){
        entrada2.classList.remove("entrada_mal_inactivo");
	    entrada2.classList.remove("entrada_mal_activo");
    }


    registroAnteriorSencilla = entrada2.value;
}

function entradaDoble(){
    inputCalculate = "";
    botonCalculate.disabled = true;
    let huboEjemplo = false;
    if(entrada3.value.length > 16){
        entrada3.value = registroAnteriorDoble;
        return;
    }
    entrada1.value = "";
    entrada2.value = "";
    limpiarPropiedades();

    //entrada_mal_inactivo y activo estan abajo de todo en el CSS.
    entrada1.classList.remove("entrada_mal_inactivo");
	entrada1.classList.remove("entrada_mal_activo");
    entrada2.classList.remove("entrada_mal_inactivo");
	entrada2.classList.remove("entrada_mal_activo");


    switch(entrada3.value.toLowerCase()){
        case "7ff0000000000000":
            entrada1.value="+Infinity";
            entrada2.value="7F800000";
            exactValueSimple.value = "+Infinity";
            exactValueDouble.value = "+Infinity";
            signBitSimple.value = "0";
            signBitDouble.value = "0";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "fff0000000000000":
            entrada1.value="-Infinity";
            entrada2.value="FF800000";
            exactValueSimple.value = "-Infinity";
            exactValueDouble.value = "-Infinity";
            signBitSimple.value = "1";
            signBitDouble.value = "1";
            exponentSimple.value = "1111 1111";
            exponentDouble.value = "111 1111 1111";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "0000000000000000":
            entrada1.value="+0";
            entrada2.value="00000000";
            exactValueSimple.value = "+0";
            exactValueDouble.value = "+0";
            signBitSimple.value = "0";
            signBitDouble.value = "0";
            exponentSimple.value = "0000 0000";
            exponentDouble.value = "000 0000 0000";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        case "8000000000000000":
            entrada1.value="-0";
            entrada2.value="80000000";
            exactValueSimple.value = "-0";
            exactValueDouble.value = "-0";
            signBitSimple.value = "1";
            signBitDouble.value = "1";
            exponentSimple.value = "0000 0000";
            exponentDouble.value = "000 0000 0000";
            significandSimple.value = infinitySencilla;
            significandDouble.value = infinityDoble;
            huboEjemplo = true;
            break;
        default:
            registroAnteriorDoble = entrada3.value;
            if( (entrada3.value != "") && (!( /^[0-9A-Fa-f]+$/.test(entrada3.value) ) || entrada3.value.length < 16) ){
                entrada3.classList.add("entrada_mal_inactivo");
                entrada3.classList.add("entrada_mal_activo");
                limpiarPropiedades();
                return;
            }
            else{
                entrada3.classList.remove("entrada_mal_inactivo");
                entrada3.classList.remove("entrada_mal_activo");
            }

            select.selectedIndex = 0;
            if(entrada3.value == ""){
                entrada1.value = "";
                entrada2.value = "";
            }

            let doble = new PrecDoble(entrada3.value);
            if(doble._enComa == "sNaN"){
                entrada1.value = "sNaN";
                entrada2.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }
            if(doble._enComa == "qNaN"){
                entrada1.value = "qNaN";
                entrada2.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }

            if(!huboEjemplo){
                if(entrada3.value.length == 16){
                    entrada1.value = doble._enComa;
                    if(parseInt(entrada3.value[0], 16) >= 8) esPositivo = false;
                    else esPositivo = true;
                    console.log(entrada1.value);
                    console.log(exponencialANormal(entrada1.value));
                    let decimal = new DecimalFraccionario(exponencialANormal(entrada1.value), esPositivo);
                    const entradaBig = new Big(doble._enComa);

                    const numeroMaximoSencilla = new Big("3.40282346638528859811704183484516925440e+38");
                    const numeroMinimoSencilla = new Big("1.401298464324817070923729583289916131280e-45");
                    if(entradaBig.abs().gt(numeroMaximoSencilla)){
                        registroAnteriorDoble = entrada3.value;
                        entrada2.value = "overflow";
                        limpiarPropiedadesSencilla();
                        return;
                    }
                    else if( (entradaBig.abs().lt(numeroMinimoSencilla)) && !(entradaBig.abs().eq(0)) ){
                        entrada2.value = "underflow";
                        limpiarPropiedadesSencilla();
                        registroAnteriorDoble = entrada3.value;
                        return;
                    }
                    entrada2.value = decimal._IEEE754Sencilla;
                }

                if( (entrada3.value != "") && (!( /^[0-9A-Fa-f]+$/.test(entrada3.value) ) || entrada3.value.length < 16) ){
                    entrada1.value = "";
                    entrada1.classList.remove("entrada_mal_inactivo");
                    entrada1.classList.remove("entrada_mal_activo");
                }
            }
    }

    registroAnteriorDoble = entrada3.value;
}

function comprobarNumeroEnTextoParaNormal(){
    		//retiramos el + (por si lo hay)
        numeroEnTexto = entrada1.value;
        if(numeroEnTexto == "+" || numeroEnTexto == "-" || numeroEnTexto == "."){
            return false;
        }
		if(numeroEnTexto.charAt(0) == '+'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
		}

		esPositivo = true;
		if(numeroEnTexto.charAt(0) == '-'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
			esPositivo = false;
		}

		// si tiene una ',' dara error (solo se admite . como separador decimal)
		if(((numeroEnTexto.split(',').length - 1) > 0)){
			numeroEnTexto = "a";
		}
		//por si esta en notacion cientifica lo pasamos a notacion normal
		if( ((numeroEnTexto.split('e').length - 1) == 1) && (numeroEnTexto.charAt(0) != 'e') && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != 'e')  && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != '.') && ((numeroEnTexto.split('.').length - 1) <= 1) && ( ( ((numeroEnTexto.split('-').length - 1) == 1) && ((numeroEnTexto.split('+').length - 1) == 0) && (numeroEnTexto.indexOf('-') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('-') != (numeroEnTexto.length - 1) ) || ((numeroEnTexto.split('-').length - 1) == 0)) && ((((numeroEnTexto.split('+').length - 1) == 1) && ((numeroEnTexto.split('-').length - 1) == 0) && (numeroEnTexto.indexOf('+') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('+') != (numeroEnTexto.length - 1)) ) || ((numeroEnTexto.split('+').length - 1) == 0) ) ) && (numeroEnTexto.indexOf('e') > numeroEnTexto.indexOf('.')) ){
			numeroEnTexto = new Decimal(numeroEnTexto).toFixed();
		}
		else{
			//quitamos el "." por si hay un punto final
			if((numeroEnTexto.charAt(numeroEnTexto.length - 1) == ".") && ((numeroEnTexto.split('.').length - 1) == 1)){
				numeroEnTexto = numeroEnTexto.substring(0, numeroEnTexto.length - 1);
			}
		}
        let numValido = /^[0-9]+(\.[0-9]+)?$/.test(numeroEnTexto);
        if (numeroEnTexto == "") numValido = true;
        return numValido;
}

function ejemplos(){
    inputCalculate = "";
    botonCalculate.disabled = true;
	let seleccion = select.value;

    entrada1.value = seleccion;
    if(true){ // antes habia una condicion, ahora no hace falta
        switch(entrada1.value.toLowerCase()){
            case "+0":
                entrada2.value = "00000000";
                entrada3.value = "0000000000000000";
                exactValueSimple.value = "+0";
                exactValueDouble.value = "+0";
                signBitSimple.value = "0";
                signBitDouble.value = "0";
                exponentSimple.value = "0000 0000";
                exponentDouble.value = "000 0000 0000";
                significandSimple.value = "000 0000 0000 0000 0000 0000";
                significandDouble.value = "0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000";
                break;
            case "-0":
                entrada2.value = "80000000";
                entrada3.value = "8000000000000000";
                exactValueSimple.value = "-0";
                exactValueDouble.value = "-0";
                signBitSimple.value = "1";
                signBitDouble.value = "1";
                exponentSimple.value = "0000 0000";
                exponentDouble.value = "000 0000 0000";
                significandSimple.value = "000 0000 0000 0000 0000 0000";
                significandDouble.value = "0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000";
                break; 
            case "+infinity":
            case "infinity":
                entrada2.value = "7F800000";
                entrada3.value = "7FF0000000000000";
                exactValueSimple.value = "+Infinity";
                exactValueDouble.value = "+Infinity";
                signBitSimple.value = "0";
                signBitDouble.value = "0";
                exponentSimple.value = "1111 1111";
                exponentDouble.value = "111 1111 1111";
                significandSimple.value = infinitySencilla;
                significandDouble.value = infinityDoble;
                break;
            case "-infinity":
                entrada2.value = "FF800000";
                entrada3.value = "FFF0000000000000";
                exactValueSimple.value = "-Infinity";
                exactValueDouble.value = "-Infinity";
                signBitSimple.value = "1";
                signBitDouble.value = "1";
                exponentSimple.value = "1111 1111";
                exponentDouble.value = "111 1111 1111";
                significandSimple.value = infinitySencilla;
                significandDouble.value = infinityDoble;
                break;
            case "qnan":
                entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
                entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
                exactValueSimple.value = "qNaN";
                exactValueDouble.value = "qNaN";
                signBitSimple.value = "X";
                signBitDouble.value = "X";
                exponentSimple.value = "1111 1111";
                exponentDouble.value = "111 1111 1111";
                significandSimple.value = "1XX XXXX XXXX XXXX XXXX XXXX";
                significandDouble.value = "1XXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX";
                break;
            case "snan":
                entrada2.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
                entrada3.value = "Look the properties. The X represents that don't matter if the bit is 1 or 0";
                exactValueSimple.value = "sNaN";
                exactValueDouble.value = "sNaN";
                signBitSimple.value = "X";
                signBitDouble.value = "X";
                exponentSimple.value = "1111 1111";
                exponentDouble.value = "111 1111 1111";
                significandSimple.value = "0XX XXXX XXXX XXXX XXXX XXXX";
                significandDouble.value = "0XXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX";
                break;
        }
    }
}

//pasamos en valor absoluto un numero exponencial a notacion normal
function exponencialANormal(numero){
    if(numero.indexOf('-') == 0) numero = numero.substring(1);
    if( ((numero.split('e').length - 1) == 1) && (numero.charAt(0) != 'e') && (numero.charAt(numero.length - 1) != 'e')  && (numero.charAt(numero.length - 1) != '.') && ((numero.split('.').length - 1) <= 1) && ( ( ((numero.split('-').length - 1) == 1) && ((numero.split('+').length - 1) == 0) && (numero.indexOf('-') == (numero.indexOf('e') + 1)) && (numero.indexOf('-') != (numero.length - 1) ) || ((numero.split('-').length - 1) == 0)) && ((((numero.split('+').length - 1) == 1) && ((numero.split('-').length - 1) == 0) && (numero.indexOf('+') == (numero.indexOf('e') + 1)) && (numero.indexOf('+') != (numero.length - 1)) ) || ((numero.split('+').length - 1) == 0) ) ) && (numero.indexOf('e') > numero.indexOf('.')) ){
        numero = new Decimal(numero).toFixed();
    }
    return numero;
}