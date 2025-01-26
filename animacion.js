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
let boton4 = document.getElementById("boton4");

let entrada1 = document.getElementById("entrada1");
let entrada2 = document.getElementById("entrada2");
let entrada3 = document.getElementById("entrada3");
let select = document.getElementById("select1");

let etiqueta_principal = document.getElementById("etiqueta_principal");

let botones = [boton1, boton2, boton3, boton4];

function manejarClick(event) {
    let botonAntiguoActivo;
    for(let i = 0; i<4; i++){
        if (botones[i].classList.contains("active")){
            botonAntiguoActivo = botones[i];
            break;
        }
    }
    
    if(event.target == botonAntiguoActivo) return;

    if(event.target.id == "boton1") entrada1.placeholder = "Example: '13.3' or '-1.23e+31'";
    else if(event.target.id == "boton2") entrada1.placeholder = "Example: 'A.BC'";
    else if(event.target.id == "boton3") entrada1.placeholder = "Example: '71.1'";
    else if(event.target.id == "boton4") entrada1.placeholder = "Example: '11.01'";

    botones.forEach(boton => boton.classList.remove("active"));
    event.target.classList.add("active");
    etiqueta_principal.textContent = event.target.textContent;
    
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
}

botones.forEach(boton => boton.addEventListener("click", manejarClick));

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

entrada2.addEventListener("input", function() {
    if(select.selectedIndex == 3 || select.selectedIndex == 4 || entrada2.value == "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0"){
        entrada1.value = "";
        entrada2.value = "";
        entrada3.value = "";
        limpiarPropiedades();
        select.selectedIndex = 0;
    }
});

entrada3.addEventListener("input", function() {
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
            entrada2.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
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
            entrada2.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
            entrada3.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
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
                let hexadecimalMasPequenoSencilla = false;
                let hexadecimalMasPequenoDoble = false;
                let hexadecimalMasGrandeSencilla = false;
                let hexadecimalMasGrandeDoble = false;

                let binarioMasPequenoSencilla = false;
                let binarioMasPequenoDoble = false;
                let binarioMasGrandeSencilla = false;
                let binarioMasGrandeDoble = false;

                let octalMasPequenoSencilla = false;
                let octalMasPequenoDoble = false;
                let octalMasGrandeSencilla = false;
                let octalMasGrandeDoble = false;

                try{
                    if(etiqueta_principal.textContent == "Decimal")
                        var entradaBig = new Big(numeroEnTexto);
                    const numeroMaximoSencilla = new Big(2).pow(218).minus(new Big(2).pow(104));
                    const numeroMinimoSencilla = new Big(1).div(new Big(2).pow(149));
                    const numeroMaximoDoble = new Big(2).pow(1024).minus(new Big(2).pow(971));
                    const numeroMinimoDoble = new Big(1).div(new Big(2).pow(1074));

                    if(etiqueta_principal.textContent == "Hexadecimal"){
                        hexadecimalMasPequenoSencilla = isHexFractionLessThan(numeroEnTexto, numeroMinimoSencilla);
                        hexadecimalMasPequenoDoble = isHexFractionLessThan(numeroEnTexto, numeroMinimoDoble);
                        hexadecimalMasGrandeSencilla = isHexFractionMoreThan(numeroEnTexto, numeroMaximoSencilla);
                        hexadecimalMasGrandeDoble = isHexFractionMoreThan(numeroEnTexto, numeroMaximoDoble);
                    }

                    else if(etiqueta_principal.textContent == "Binary"){
                        binarioMasPequenoSencilla = isBinFractionLessThan(numeroEnTexto, numeroMinimoSencilla);
                        binarioMasPequenoDoble = isBinFractionLessThan(numeroEnTexto, numeroMinimoDoble);
                        binarioMasGrandeSencilla = isBinFractionMoreThan(numeroEnTexto, numeroMaximoSencilla);
                        binarioMasGrandeDoble = isBinFractionMoreThan(numeroEnTexto, numeroMaximoDoble);
                    }

                    else if(etiqueta_principal.textContent == "Octal"){
                        octalMasPequenoSencilla = isOctFractionLessThan(numeroEnTexto, numeroMinimoSencilla);
                        octalMasPequenoDoble = isOctFractionLessThan(numeroEnTexto, numeroMinimoDoble);
                        octalMasGrandeSencilla = isOctFractionMoreThan(numeroEnTexto, numeroMaximoSencilla);
                        octalMasGrandeDoble = isOctFractionMoreThan(numeroEnTexto, numeroMaximoDoble);
                    }
                    
                    if(entradaBig.abs().gt(numeroMaximoSencilla) || (hexadecimalMasGrandeSencilla) || (octalMasGrandeSencilla) || (binarioMasGrandeSencilla) ){
                        numeroAparenteCorrectoSencilla = false;
                        entrada2.value = "overflow";
                        errorSencilla = true;
                    }
                    else if( !(entradaBig.abs().eq(0)) && ( (entradaBig.abs().lt(numeroMinimoSencilla)) || (hexadecimalMasPequenoSencilla) || (octalMasPequenoSencilla) || (binarioMasPequenoSencilla) ) ){
                        numeroAparenteCorrectoSencilla = false;
                        entrada2.value = "underflow";
                        errorSencilla = true;
                    }
            
                    if(entradaBig.abs().gt(numeroMaximoDoble) || (hexadecimalMasGrandeDoble) || (octalMasGrandeDoble) || (binarioMasGrandeDoble)){
                        numeroAparenteCorrectoDoble = false;
                        entrada3.value = "overflow";
                        errorDoble = true;
                    }
                    else if( !(entradaBig.abs().eq(0)) && ( (entradaBig.abs().lt(numeroMinimoDoble)) || (hexadecimalMasPequenoDoble) || (octalMasPequenoDoble) || (binarioMasPequenoDoble) ) ){                        numeroAparenteCorrectoDoble = false;
                        entrada3.value = "underflow";
                        errorDoble = true;
                    }
                }
                catch(error){}
            
                if(numeroAparenteCorrectoSencilla || numeroAparenteCorrectoDoble){
                    let decimal;
                    if(etiqueta_principal.textContent == "Decimal"){
                        decimal = new DecimalFraccionario(numeroEnTexto, esPositivo);
                        if(numeroAparenteCorrectoSencilla)
                            entrada2.value = decimal._IEEE754Sencilla;

                        if(numeroAparenteCorrectoDoble)
                            entrada3.value = decimal._IEEE754Doble;
                    }
                    else if(etiqueta_principal.textContent == "Hexadecimal"){
                        decimal = new Hexadecimal(numeroEnTexto, esPositivo);
                        if(numeroAparenteCorrectoSencilla)
                            entrada2.value = decimal._IEEE754Sencilla;
                        
                        if(numeroAparenteCorrectoDoble)
                            entrada3.value = decimal._IEEE754Doble;
                    }
                    else if(etiqueta_principal.textContent == "Octal"){
                        decimal = new Octal(numeroEnTexto, esPositivo);
                        if(numeroAparenteCorrectoSencilla)
                            entrada2.value = decimal._IEEE754Sencilla;
                        
                        if(numeroAparenteCorrectoDoble)
                            entrada3.value = decimal._IEEE754Doble;
                    }
                    else if(etiqueta_principal.textContent == "Binary"){
                        decimal = new Binario(numeroEnTexto, esPositivo, "binary" );
                        if(numeroAparenteCorrectoSencilla)
                            entrada2.value = decimal[0];
                        
                        if(numeroAparenteCorrectoDoble)
                            entrada3.value = decimal[1];
                    }
                    
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

            let sencilla = new PrecSencilla(entrada2.value, etiqueta_principal.textContent);
            if(sencilla._enComa[0] == "sNaN"){
                entrada1.value = "sNaN";
                entrada3.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }
            if(sencilla._enComa[0] == "qNaN"){
                entrada1.value = "qNaN";
                entrada3.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }

            if(!huboEjemplo){
                if(entrada2.value.length == 8){
                    entrada1.value = sencilla._enComa[0];
                    if(parseInt(entrada2.value[0], 16) >= 8) esPositivo = false;
                    else esPositivo = true;
                    let decimal;
                    decimal = new DecimalFraccionario(exponencialANormal(sencilla._enComa[1]), esPositivo);
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

            let doble = new PrecDoble(entrada3.value, etiqueta_principal.textContent);
            if(doble._enComa[0] == "sNaN"){
                entrada1.value = "sNaN";
                entrada2.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }
            if(doble._enComa[0] == "qNaN"){
                entrada1.value = "qNaN";
                entrada2.value = "Look the properties. The X represents that it doesn't matter if the bit is 1 or 0";
                huboEjemplo = true;
            }

            if(!huboEjemplo){
                if(entrada3.value.length == 16){
                    entrada1.value = doble._enComa[0];
                    if(parseInt(entrada3.value[0], 16) >= 8) esPositivo = false;
                    else esPositivo = true;
                    let decimal = new DecimalFraccionario(exponencialANormal(doble._enComa[1]), esPositivo);
                    const entradaBig = new Big(doble._enComa[1]);

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
		if(numeroEnTexto.charAt(0) == '+' && numeroEnTexto.charAt(1) != '-'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
		}
		esPositivo = true;
		if(numeroEnTexto.charAt(0) == '-' && numeroEnTexto.charAt(1) != '+'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
			esPositivo = false;
		}

		// si tiene una ',' dara error (solo se admite . como separador decimal)
		if(((numeroEnTexto.split(',').length - 1) > 0) || (numeroEnTexto.indexOf(' ') != -1)){
			numeroEnTexto = "p";
		}
		//por si esta en notacion cientifica lo pasamos a notacion normal (solo para notacion decimal)
		if( (etiqueta_principal.textContent == "Decimal") && ( ((numeroEnTexto.split('e').length - 1) == 1) && (numeroEnTexto.charAt(0) != 'e') && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != 'e')  && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != '.') && ((numeroEnTexto.split('.').length - 1) <= 1) && ( ( ((numeroEnTexto.split('-').length - 1) == 1) && ((numeroEnTexto.split('+').length - 1) == 0) && (numeroEnTexto.indexOf('-') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('-') != (numeroEnTexto.length - 1) ) || ((numeroEnTexto.split('-').length - 1) == 0)) && ((((numeroEnTexto.split('+').length - 1) == 1) && ((numeroEnTexto.split('-').length - 1) == 0) && (numeroEnTexto.indexOf('+') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('+') != (numeroEnTexto.length - 1)) ) || ((numeroEnTexto.split('+').length - 1) == 0) ) ) && (numeroEnTexto.indexOf('e') > numeroEnTexto.indexOf('.')) ) ){
			numeroEnTexto = new Decimal(numeroEnTexto).toFixed();
		}
		else{
			//quitamos el "." por si hay un punto final
			if((numeroEnTexto.charAt(numeroEnTexto.length - 1) == ".") && ((numeroEnTexto.split('.').length - 1) == 1)){
				numeroEnTexto = numeroEnTexto.substring(0, numeroEnTexto.length - 1);
			}
		}
        let numValido;
        if (etiqueta_principal.textContent == "Decimal")
            numValido = /^[0-9]+(\.[0-9]+)?$/.test(numeroEnTexto);
        else if (etiqueta_principal.textContent == "Hexadecimal"){
            numValido = /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(numeroEnTexto);
        }
        else if(etiqueta_principal.textContent == "Binary"){
            numValido = /^[01]+(\.[01]+)?$/.test(numeroEnTexto);
        }
        else if(etiqueta_principal.textContent == "Octal"){
            numValido = /^[0-7]+(\.[0-7]+)?$/.test(numeroEnTexto);
        }
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
                entrada2.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
                entrada3.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
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
                entrada2.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
                entrada3.value = "Look the properties. The X represents that doesn't matter if the bit is 1 or 0";
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
    if(((numero.split('e').length - 1) == 1) && (numero.charAt(0) != 'e') && (numero.charAt(numero.length - 1) != 'e')  && (numero.charAt(numero.length - 1) != '.') && ((numero.split('.').length - 1) <= 1) && ( ( ((numero.split('-').length - 1) == 1) && ((numero.split('+').length - 1) == 0) && (numero.indexOf('-') == (numero.indexOf('e') + 1)) && (numero.indexOf('-') != (numero.length - 1) ) || ((numero.split('-').length - 1) == 0)) && ((((numero.split('+').length - 1) == 1) && ((numero.split('-').length - 1) == 0) && (numero.indexOf('+') == (numero.indexOf('e') + 1)) && (numero.indexOf('+') != (numero.length - 1)) ) || ((numero.split('+').length - 1) == 0) ) ) && (numero.indexOf('e') > numero.indexOf('.')) ){
        numero = new Decimal(numero).toFixed();
    }
    return numero;
}

function hexFractionToBig(hexString) {
    const [intPart = '', fracPart = ''] = hexString.split('.');
    
    // Comenzamos con 0
    let result = new Big(0);
  
    // 1. Convertir la parte entera
    for (let i = 0; i < intPart.length; i++) {
      // Multiplicamos por 16
      result = result.times(16);
  
      // Convierto el dígito hex a decimal (0-15)
      const digitValue = parseInt(intPart[i], 16); 
      if (isNaN(digitValue)) {
        return;
      }
  
      // Sumamos ese valor
      result = result.plus(digitValue);
    }
  
    // 2. Convertir la parte fraccionaria
    //    factor se inicia en 1/16, luego 1/16^2, etc.
    let fraction = new Big(0);
    let factor = new Big(1).div(16);
  
    for (let i = 0; i < fracPart.length; i++) {
      const digitValue = parseInt(fracPart[i], 16);
      if (isNaN(digitValue)) {
        return;
      }
      if (digitValue > 0) {
        fraction = fraction.plus(new Big(digitValue).times(factor));
      }
      // Dividir el factor para el próximo dígito
      factor = factor.div(16);
    }
  
    // 3. Sumar parte entera y fraccionaria
    return result.plus(fraction);
  }

  function isHexFractionLessThan(hexString, bigValue) {
    const converted = hexFractionToBig(hexString);
    return converted.lt(bigValue);
  }

  function isHexFractionMoreThan(hexString, bigValue) {
    const converted = hexFractionToBig(hexString);
    return converted.gt(bigValue);
  }

  function octFractionToBig(octString) {
    const [intPart = '', fracPart = ''] = octString.split('.');
    
    let result = new Big(0);
  
    // 1. Convertir la parte entera (octal -> decimal)
    for (let i = 0; i < intPart.length; i++) {
      result = result.times(8);
  
      // Convierte el carácter octal a decimal (0-7)
      const digitValue = parseInt(intPart[i], 8); 
      if (isNaN(digitValue)) {
        throw new Error(`Dígito octal inválido: '${intPart[i]}'`);
      }
  
      result = result.plus(digitValue);
    }
  
    // 2. Convertir la parte fraccionaria
    //    factor se inicia en 1/8, luego 1/8^2, etc.
    let fraction = new Big(0);
    let factor = new Big(1).div(8);
  
    for (let i = 0; i < fracPart.length; i++) {
      const digitValue = parseInt(fracPart[i], 8);
      if (isNaN(digitValue)) {
        throw new Error(`Dígito octal inválido: '${fracPart[i]}'`);
      }
      if (digitValue > 0) {
        fraction = fraction.plus(new Big(digitValue).times(factor));
      }
      factor = factor.div(8);
    }
  
    return result.plus(fraction);
  }

  function isOctFractionLessThan(octString, bigValue) {
    const converted = octFractionToBig(octString);
    return converted.lt(bigValue);
  }

  function isOctFractionMoreThan(octString, bigValue) {
    const converted = octFractionToBig(octString);
    return converted.gt(bigValue);
  }

  function binFractionToBig(binString) {
    const [intPart = '', fracPart = ''] = binString.split('.');
    
    let result = new Big(0);
  
    // 1. Convertir la parte entera (binario -> decimal)
    for (let i = 0; i < intPart.length; i++) {
      result = result.times(2);
  
      // Convierte el carácter binario a decimal (0 o 1)
      const digitValue = parseInt(intPart[i], 2); 
      if (isNaN(digitValue)) {
        throw new Error(`Dígito binario inválido: '${intPart[i]}'`);
      }
  
      result = result.plus(digitValue);
    }
  
    // 2. Convertir la parte fraccionaria
    //    factor se inicia en 1/2, luego 1/2^2, etc.
    let fraction = new Big(0);
    let factor = new Big(1).div(2);
  
    for (let i = 0; i < fracPart.length; i++) {
      const digitValue = parseInt(fracPart[i], 2);
      if (isNaN(digitValue)) {
        throw new Error(`Dígito binario inválido: '${fracPart[i]}'`);
      }
      if (digitValue > 0) {
        fraction = fraction.plus(new Big(digitValue).times(factor));
      }
      factor = factor.div(2);
    }
  
    return result.plus(fraction);
  }

  function isBinFractionLessThan(binString, bigValue) {
    const converted = binFractionToBig(binString);
    return converted.lt(bigValue);
  }
  
  function isBinFractionMoreThan(binString, bigValue) {
    const converted = binFractionToBig(binString);
    return converted.gt(bigValue);
  }



const botonClearBase = document.getElementById('clear-base');
const botonCalculateBase  = document.getElementById('calculate-base');
const botonInterchangeBase  = document.getElementById('interchange-base');

const inputNumber  = document.getElementById('input-number');
const textResult  = document.getElementById('text-result');
const selectToBase  = document.getElementById('select-tobase');
const selectFromBase  = document.getElementById('select-frombase');

inputNumber.addEventListener("input", function() {
    if(inputNumber.value == ""){
        textResult.value = "Do not write here";
    }
});

botonClearBase.addEventListener('click', () => {
    inputNumber.value = "";
    textResult.value = "Do not write here";
    selectToBase.selectedIndex = 0;
    selectFromBase.selectedIndex = 0;
    inputNumber.classList.remove("entrada_mal_inactivo");
	inputNumber.classList.remove("entrada_mal_activo");
    textResult.classList.remove("entrada_mal_inactivo");
	textResult.classList.remove("entrada_mal_activo");
});

botonInterchangeBase.addEventListener('click', () => {
    let select1 = selectFromBase.selectedIndex;
    let select2 = selectToBase.selectedIndex;

    selectFromBase.selectedIndex = select2;
    selectToBase.selectedIndex = select1;
});

botonCalculateBase.addEventListener('click', () => {
let fromBase = selectFromBase.selectedIndex;
let toBase = selectToBase.selectedIndex;

let entradaNumber = inputNumber.value;
let numValido = true;;

if(inputNumber.value == ""){
    textResult.value = "Do not write here";
    return;
}

if(fromBase == 0){
    numValido = /^[0-9]+(\.[0-9]+)?$/.test(entradaNumber);
    if(!numValido){
        textResult.value = "Error in the Number's input";
        return;
    }
    if(toBase == 1){
        textResult.value = decimalAHexadecimal(entradaNumber);
    }
    else if(toBase == 2){
        textResult.value = decimalAOctal(entradaNumber);
    }
    else if(toBase == 3){
        textResult.value = decimalABinario(entradaNumber);
    }
}

else if(fromBase == 1){
    numValido = /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(entradaNumber);
    if(!numValido){
        textResult.value = "Error in the Number's input";
        return;
    }
    if(toBase == 0){
        textResult.value = new Big(hexadecimalADecimal(entradaNumber)).toFixed();
    }
    else if(toBase == 2){
        textResult.value = hexadecimalAOctal(entradaNumber);
    }
    else if(toBase == 3){
        textResult.value = hexadecimalABinario(entradaNumber);
    }
}

else if(fromBase == 2){
    numValido = /^[0-7]+(\.[0-7]+)?$/.test(entradaNumber);
    if(!numValido){
        textResult.value = "Error in the Number's input";
        return;
    }
    if(toBase == 0){
        textResult.value = new Big(octalADecimal(entradaNumber)).toFixed();
    }
    else if(toBase == 1){
        textResult.value = octalAHexadecimal(entradaNumber);
    }
    else if(toBase == 3){
        textResult.value = octalABinario(entradaNumber);
    }
}

else if(fromBase == 3){
    numValido = /^[01]+(\.[01]+)?$/.test(entradaNumber);
    if(!numValido){
        textResult.value = "Error in the Number's input";
        return;
    }
    if(toBase == 0){
        textResult.value = new Big(binarioADecimal(entradaNumber)).toFixed();
    }
    else if(toBase == 1){
        textResult.value = binarioAHexadecimal(entradaNumber);
    }
    else if(toBase == 2){
        textResult.value = binarioAOctal(entradaNumber);
    }
}
if((fromBase == toBase) && numValido){
    textResult.value = inputNumber.value;
    return;
}

});

function decimalAHexadecimal(decimalString) {
	decimalString = new Decimal(decimalString).toFixed();
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = decimalString.split(".");

    // Convertir la parte entera a hexadecimal
    const integerHex = BigInt(integerPart).toString(16).toUpperCase();

    if (!fractionalPart) {
        // Si no hay parte fraccionaria, devolver solo la parte entera
        return integerHex;
    }
    // Procesar la parte fraccionaria
    let fractionalDecimal = BigInt(fractionalPart); // Tratar parte fraccionaria como BigInt
    let fractionalBase = BigInt(10) ** BigInt(fractionalPart.length); // Base decimal para normalizar
    let fractionalHex = "";
    const base16 = BigInt(16);

	let i = 0;
    // Convertir fracción a hexadecimal con precisión arbitraria
    while (fractionalDecimal > 0 && i < 500) {
		i++;
        fractionalDecimal *= base16; // Multiplica la fracción por 16
        const digit = fractionalDecimal / fractionalBase; // Obtener el dígito entero
        fractionalHex += digit.toString(16).toUpperCase(); // Convertir el dígito a hexadecimal
        fractionalDecimal %= fractionalBase; // Obtener el resto
    }
    // Combinar la parte entera y la fraccionaria
    let numero = `${integerHex}.${fractionalHex}`;
    return numero.endsWith('.') ? numero.slice(0, -1) : numero;
}

function decimalAOctal(decimalString) {
	decimalString = new Decimal(decimalString).toFixed();
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = decimalString.split(".");

    // Convertir la parte entera a octal
    const integerOctal = BigInt(integerPart).toString(8);

    if (!fractionalPart) {
        // Si no hay parte fraccionaria, devolver solo la parte entera
        return integerOctal;
    }

    // Procesar la parte fraccionaria
    let fractionalDecimal = BigInt(fractionalPart); // Parte fraccionaria como BigInt
    let fractionalBase = BigInt(10) ** BigInt(fractionalPart.length); // Base decimal para normalizar
    let fractionalOctal = "";
    const base8 = BigInt(8);

    let i = 0;
    // Convertir fracción a hexadecimal con precisión arbitraria
    while (fractionalDecimal > 0 && i < 500) {
		i++;
        fractionalDecimal *= base8; // Multiplica la fracción por 8
        const digit = fractionalDecimal / fractionalBase; // Obtener el dígito entero
        fractionalOctal += digit.toString(8); // Convertir el dígito a octal
        fractionalDecimal %= fractionalBase; // Obtener el resto
    }

    // Combinar la parte entera y la fraccionaria
    let numero = `${integerOctal}.${fractionalOctal}`;
    return numero.endsWith('.') ? numero.slice(0, -1) : numero;
}

function decimalABinario(decimalString) {
	decimalString = new Decimal(decimalString).toFixed();
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = decimalString.split(".");

    // Convertir la parte entera a binario
    const integerBinary = BigInt(integerPart).toString(2);

    if (!fractionalPart) {
        // Si no hay parte fraccionaria, devolver solo la parte entera
        return integerBinary;
    }

    // Procesar la parte fraccionaria
    let fractionalDecimal = BigInt(fractionalPart); // Parte fraccionaria como BigInt
    let fractionalBase = BigInt(10) ** BigInt(fractionalPart.length); // Base decimal para normalizar
    let fractionalBinary = "";
    const base2 = BigInt(2);

    let i = 0;
    // Convertir fracción a hexadecimal con precisión arbitraria
    while (fractionalDecimal > 0 && i < 500) {
		i++;
        fractionalDecimal *= base2; // Multiplica la fracción por 2
        const digit = fractionalDecimal / fractionalBase; // Obtener el dígito entero
        fractionalBinary += digit.toString(2); // Convertir el dígito a binario
        fractionalDecimal %= fractionalBase; // Obtener el resto
    }

    // Combinar la parte entera y la fraccionaria
    let numero = `${integerBinary}.${fractionalBinary}`;
    return numero.endsWith('.') ? numero.slice(0, -1) : numero;
}

function hexadecimalADecimal(hexNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = hexNumber.split(".");
  
    // Convertir la parte entera a decimal
    const decimalInteger = new Big(parseInt(integerPart, 16));
  
    // Convertir la parte fraccionaria a decimal
    let decimalFraction = new Big(0);
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        const hexDigit = parseInt(fractionalPart[i], 16);
        const divisor = new Big(16).pow(i + 1); // 16^(i+1)
        decimalFraction = decimalFraction.plus(new Big(hexDigit).div(divisor));
      }
    }
  
    // Sumar parte entera y fraccionaria
    const decimalNumber = decimalInteger.plus(decimalFraction);
    return decimalNumber.toString();
  }

  function hexadecimalAOctal(hexNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = hexNumber.split(".");
  
    // Convertir la parte entera de hexadecimal a octal
    const integerOctal = parseInt(integerPart, 16).toString(8);
  
    // Convertir la parte fraccionaria de hexadecimal a octal
    let fractionalOctal = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        fractionalDecimal += parseInt(fractionalPart[i], 16) / Math.pow(16, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a octal
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 8;
        const octalDigit = Math.floor(fractionalDecimal);
        fractionalOctal += octalDigit.toString(8);
        fractionalDecimal -= octalDigit;
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en octal
    return fractionalOctal.length > 0 ? `${integerOctal}.${fractionalOctal}` : integerOctal;
  }

  function hexadecimalABinario(hexNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = hexNumber.split(".");
  
    // Convertir la parte entera de hexadecimal a binario
    const integerBinary = parseInt(integerPart, 16).toString(2);
  
    // Convertir la parte fraccionaria de hexadecimal a binario
    let fractionalBinary = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        fractionalDecimal += parseInt(fractionalPart[i], 16) / Math.pow(16, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a binario
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 2;
        if (fractionalDecimal >= 1) {
          fractionalBinary += "1";
          fractionalDecimal -= 1;
        } else {
          fractionalBinary += "0";
        }
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en binario
    return fractionalBinary.length > 0 ? `${integerBinary}.${fractionalBinary}` : integerBinary;
  }

  function octalADecimal(octalNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = octalNumber.split(".");
  
    // Convertir la parte entera de octal a decimal
    const decimalInteger = new Big(parseInt(integerPart, 8));
  
    // Convertir la parte fraccionaria de octal a decimal
    let decimalFraction = new Big(0);
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        const octalDigit = parseInt(fractionalPart[i], 8);
        const divisor = new Big(8).pow(i + 1); // 8^(i+1)
        decimalFraction = decimalFraction.plus(new Big(octalDigit).div(divisor));
      }
    }
  
    // Sumar parte entera y fraccionaria
    const decimalNumber = decimalInteger.plus(decimalFraction);
    return decimalNumber.toString();
  }

  function octalAHexadecimal(octalNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = octalNumber.split(".");
  
    // Convertir la parte entera de octal a decimal
    const integerDecimal = parseInt(integerPart, 8);
    const integerHex = integerDecimal.toString(16);
  
    // Convertir la parte fraccionaria de octal a decimal
    let fractionalHex = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        fractionalDecimal += parseInt(fractionalPart[i], 8) / Math.pow(8, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a hexadecimal
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 16;
        const hexDigit = Math.floor(fractionalDecimal);
        fractionalHex += hexDigit.toString(16);
        fractionalDecimal -= hexDigit;
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en hexadecimal
    return fractionalHex.length > 0 ? `${integerHex}.${fractionalHex}` : integerHex;
  }

  function octalABinario(octalNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = octalNumber.split(".");
  
    // Convertir la parte entera de octal a binario
    const integerBinary = parseInt(integerPart, 8).toString(2);
  
    // Convertir la parte fraccionaria de octal a binario
    let fractionalBinary = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        fractionalDecimal += parseInt(fractionalPart[i], 8) / Math.pow(8, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a binario
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 2;
        if (fractionalDecimal >= 1) {
          fractionalBinary += "1";
          fractionalDecimal -= 1;
        } else {
          fractionalBinary += "0";
        }
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en binario
    return fractionalBinary.length > 0 ? `${integerBinary}.${fractionalBinary}` : integerBinary;
  }

  function binarioADecimal(binaryNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = binaryNumber.split(".");
  
    // Convertir la parte entera de binario a decimal
    const decimalInteger = new Big(parseInt(integerPart, 2));
  
    // Convertir la parte fraccionaria de binario a decimal
    let decimalFraction = new Big(0);
    if (fractionalPart) {
      for (let i = 0; i < fractionalPart.length; i++) {
        const binaryDigit = parseInt(fractionalPart[i], 2);
        const divisor = new Big(2).pow(i + 1); // 2^(i+1)
        decimalFraction = decimalFraction.plus(new Big(binaryDigit).div(divisor));
      }
    }
  
    // Sumar parte entera y fraccionaria
    const decimalNumber = decimalInteger.plus(decimalFraction);
    return decimalNumber.toString();
  }

  function binarioAHexadecimal(binaryNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = binaryNumber.split(".");
  
    // Convertir la parte entera de binario a hexadecimal
    const integerHex = parseInt(integerPart, 2).toString(16);
  
    // Convertir la parte fraccionaria de binario a hexadecimal
    let fractionalHex = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        const binaryDigit = parseInt(fractionalPart[i], 2);
        fractionalDecimal += binaryDigit / Math.pow(2, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a hexadecimal
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 16;
        const hexDigit = Math.floor(fractionalDecimal);
        fractionalHex += hexDigit.toString(16).toUpperCase();
        fractionalDecimal -= hexDigit;
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en hexadecimal
    let result = fractionalHex.length > 0 ? `${integerHex}.${fractionalHex}` : integerHex;
    // Retornar el resultado final en formato correcto
    return result;
  }

  function binarioAOctal(binaryNumber) {
    // Separar parte entera y fraccionaria
    const [integerPart, fractionalPart] = binaryNumber.split(".");
  
    // Convertir la parte entera de binario a octal
    const integerDecimal = parseInt(integerPart, 2); // Parte entera como decimal
    const integerOctal = integerDecimal.toString(8); // Convertir a octal
  
    // Convertir la parte fraccionaria de binario a octal
    let fractionalOctal = "";
    if (fractionalPart) {
      let fractionalDecimal = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        const binaryDigit = parseInt(fractionalPart[i], 2);
        fractionalDecimal += binaryDigit / Math.pow(2, i + 1);
      }
  
      // Convertir la parte fraccionaria decimal a octal
      let iterations = 0;
      const maxIterations = 50; // Limitar precisión para evitar ciclos infinitos
      while (fractionalDecimal > 0 && iterations < maxIterations) {
        fractionalDecimal *= 8;
        const octalDigit = Math.floor(fractionalDecimal);
        fractionalOctal += octalDigit.toString();
        fractionalDecimal -= octalDigit;
        iterations++;
      }
    }
  
    // Combinar parte entera y fraccionaria en octal
    const result = fractionalOctal.length > 0 ? `${integerOctal}.${fractionalOctal}` : integerOctal;
  
    // Retornar el resultado final en formato correcto
    return result;
  }