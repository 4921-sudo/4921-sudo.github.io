const infinitySencilla = "000 0000 0000 0000 0000 0000";
const infinityDoble = "0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000";

// la funcion de hexadecimal hexToDecimal modifica estos valores pero los devuelve a su estado original, revisar
Big.DP = 3000; // Establece una precisión alta (3000 decimales), intentar mejorar para no tener que poner tantos decimales, revisar tambien computa decimales
Big.PE = -1025; // Permite exponentes muy pequeños

const minimoNormalizadoSencilla = new Big(1).div(new Big(2).pow(126));
const minimoNormalizadoDoble = new Big(1).div(new Big(2).pow(1022));

function anadirSeparador(str) {
    // Invertir la cadena
    let reversed = str.split('').reverse().join('');
    
    // Agregar el separador cada 4 caracteres
    let withSeparators = reversed.match(/.{1,4}/g).join(' ');
    
    // Invertir la cadena de nuevo
    return withSeparators.split('').reverse().join('');
}

class Numero{
	constructor(numeroEnTexto){
		this._numeroEnTexto = this.anadirNumeroEnTexto(numeroEnTexto);
		this._pEntera = this.anadirPEntera();
		this._pDecimal = this.anadirPDecimal();
		this._esPositivo = true; // true o false
		this._pEnteraBinario = "";
		this._pDecimalBinario = "";
		this._mantisaSencilla = "";
		this._mantisaDoble = "";
		this._caracteristicaSencilla = "";
		this._caracteristicaDoble = "";
		this._IEEE754Sencilla = "";
		this._IEEE754Doble = "";
	}

	anadirNumeroEnTexto(numeroEnTextoProvisional){
		let numeroEnTexto = numeroEnTextoProvisional.replace(",", ".");
		let caracteresPunto = 0;
		for(let i = 0; i<numeroEnTextoProvisional.length; i++){
			if(numeroEnTextoProvisional.charAt(i) == '.') caracteresPunto++;
		}
		if (caracteresPunto > 1){
			let h = 0; // poner NaN
		}
		return numeroEnTexto; 
	}

	anadirPEntera(){
		let partes = this._numeroEnTexto.split('.');
		let pEntera = partes[0];
		if(pEntera == undefined)
			pEntera = '0';
		return pEntera;
	}

	anadirPDecimal(){
		let partes = this._numeroEnTexto.split('.');
		let pDecimal = partes[1];
		if(pDecimal == undefined)
			pDecimal = '0';
		while(pDecimal.length < 200) pDecimal += '0';
		return pDecimal;
	}

	calcularMantisa(pEnteraBinario, pDecimalBinario, esDoble, desnormalizado){
		let pTotal = pEnteraBinario + pDecimalBinario;
		let mantisa = "";
		
		if(desnormalizado){
			if(esDoble){
				mantisa = (pDecimalBinario).replace(/\./g, '').substring(1022);
			}
			else{
				mantisa = (pDecimalBinario).replace(/\./g, '').substring(126);
			}
		}
		else{
			let i = 0;
			while(pTotal.charAt(i) == '0')
				i++; //guarda la posicion del primer 1
			

			for(let j = i + 1; j < pTotal.length; j++) {
				mantisa += pTotal.charAt(j);
			}

			//invertimos la cadena para quitar los ceros
			mantisa = mantisa.split('').reverse().join('').replace(/^0+/, '').split('').reverse().join('');
		}

		//INICIO REDONDEO
		let posBitGuardia;
		let posBitPegajoso;
		let posBitRedondeo;
		let esNecesarioRedondear = true; // asumismo que es necesario
		if(esDoble){
			if(mantisa.length == 54) esNecesarioRedondear = false;
			posBitGuardia = 52;
			posBitRedondeo = 53;
			posBitPegajoso = 54;
		}
		else{
			if(mantisa.length == 23) esNecesarioRedondear = false;
			posBitGuardia = 23;
			posBitRedondeo = 24;
			posBitPegajoso = 25;
		}


		return this.redondeoMantisa(mantisa, posBitGuardia, posBitRedondeo, posBitPegajoso, esNecesarioRedondear);
	}

	redondeoMantisa(mantisa, posBitGuardia, posBitRedondeo, posBitPegajoso, esNecesarioRedondear){
		// hay que comprobar si se puede redondear, ya que si los 23 bits primeros fuesen todos 1, no se podria redondear ya que de sumarse 1 pasaria a ocupar 24 bits
		// asumimos en un principio que no se puede redondear
		let sePuedeRedondear = false;
		let hayUnoPegajoso = false;

		let mantisaProvisional = mantisa.substring(0, posBitGuardia);
		for(let i = 0; i<mantisaProvisional.length;i++){
			if(mantisaProvisional.charAt(i) == '0'){
				sePuedeRedondear = true;
				break;
			}
		}

		if(esNecesarioRedondear && sePuedeRedondear){
			mantisaProvisional = parseInt(mantisaProvisional, 2);
			let resto = mantisa.substring(posBitPegajoso, mantisa.length);
			for(let j = 0; j<resto.length; j++){
				if(resto.charAt(j) != '1') continue;
				hayUnoPegajoso = true;
				break;
			}

			if(mantisa.charAt(posBitGuardia) == '1'){
				if((mantisa.charAt(posBitRedondeo) == '1') || (hayUnoPegajoso))
					mantisaProvisional += parseInt('1', 2);
				else if(((mantisa.charAt(posBitRedondeo) == '0') && (!hayUnoPegajoso)) && (mantisa.charAt(posBitGuardia - 1) == '1'))
					mantisaProvisional += parseInt('1', 2);
				mantisaProvisional = mantisaProvisional.toString(2);
				while(mantisaProvisional.length != posBitGuardia){
					mantisaProvisional = '0' + mantisaProvisional;
				}
				mantisa = mantisaProvisional.substring(0, posBitGuardia);
			}
			else mantisa = mantisa.substring(0, posBitGuardia);

		}
		else{
			mantisa = mantisa.substring(0 , posBitGuardia);
		}
		//FINAL REDONDEO

		return mantisa;
	}

	calcularCaracteristica(pEnteraBinario, pDecimalBinario, esDoble){
		let exceso;
		let caracteristica;

		if(pEnteraBinario != '') {
			exceso = pEnteraBinario.length - 1;
		}
		else{
			let i = 0;
			while(pDecimalBinario.charAt(i) == '0') {
				i++; //guarda la posicion del primer 1
			}
			i++;
			exceso = -i;
		}

		if (esDoble == true) {
			caracteristica = 1024 - 1 + exceso;
			caracteristica = caracteristica.toString(2);
			while (caracteristica.length < 11) caracteristica = '0' + caracteristica;
		}
		else {
			caracteristica = 128 - 1 + exceso;
			caracteristica = caracteristica.toString(2);
			while (caracteristica.length < 8) caracteristica = '0' + caracteristica;
		}
		return caracteristica;
	}

	binarioAIEEE754Doble(){		
		let IEEE754Doble = "";
		let mantisa = this._mantisaDoble;
		let bitSigno = '1';
		if(this._esPositivo) bitSigno = '0';

		IEEE754Doble = bitSigno + this._caracteristicaDoble + mantisa;

		while(IEEE754Doble.length < 64)
			IEEE754Doble += '0';

		return IEEE754Doble.substring(0, 64);
	}

	binarioAIEEE754Sencilla(){
		let IEEE754Sencilla = "";
		let mantisa = this._mantisaSencilla;
		let bitSigno = '1';
		
		if(this._esPositivo) bitSigno = '0';

		IEEE754Sencilla = bitSigno + this._caracteristicaSencilla + mantisa;

		while(IEEE754Sencilla.length < 32)
			IEEE754Sencilla += '0';

		return IEEE754Sencilla.substring(0, 32);
	}

	
}

class Binario extends Numero{
	constructor(numeroEnTexto, esPos, deDondeV){
		esPositivo = esPos;
		super(numeroEnTexto);
		this._esPositivo = esPositivo;
		let enTexto = numeroEnTexto;
		let inputElement = document.getElementById("entrada1");
		inputElement.classList.remove("entrada_mal_inactivo");
		inputElement.classList.remove("entrada_mal_activo");
		// comprobamos si sigue el formato decimal correctamente
		if(true){
			if(!this.igualesCerosBinario(numeroEnTexto)){
				if(enTexto.indexOf('.') != -1){
					this._pEntera = enTexto.substring(0, enTexto.indexOf('.'));
					this._pDecimal = enTexto.substring(enTexto.indexOf('.') + 1);
				}
				else{
					this._pDecimal = "0000";
				}
				if(deDondeV == "hexadecimal"){
					this._pEnteraBinario = this.binarioABinarioCompletoHexadecimal(this._pEntera).replace(/^(0+)/g, '');
					this._pDecimalBinario = this.binarioABinarioCompletoHexadecimal(this._pDecimal);
				}
				else if(deDondeV == "octal"){
					this._pEnteraBinario = this.binarioABinarioCompletoOctal(this._pEntera).replace(/^(0+)/g, '');
					this._pDecimalBinario = this.binarioABinarioCompletoOctal(this._pDecimal);
				}
				else if(deDondeV == "binary"){
					this._pEnteraBinario = (this._pEntera).replace(/^(0+)/g, '');
					this._pDecimalBinario = (this._pDecimal);
				}
				const numeroEnTexto = this._pEnteraBinario + "." + this._pDecimalBinario;
				

				if(numeroEnTexto != "" && this.esMasPequeno(numeroEnTexto, minimoNormalizadoSencilla) ){
					this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false, true);
					this._caracteristicaSencilla = "00000000";
				}
				else{
					this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false, false);
					this._caracteristicaSencilla = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, false);
				}

				if(numeroEnTexto != "" && this.esMasPequeno(numeroEnTexto, minimoNormalizadoDoble) ){
					this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true, true);
					this._caracteristicaDoble = "00000000000";
				}
				else{
					this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true, false);
					this._caracteristicaDoble = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, true);
				}
				this._IEEE754Sencilla = parseInt(this.binarioAIEEE754Sencilla(), 2).toString(16).toUpperCase();
				while(this._IEEE754Sencilla.length != 8)
					this._IEEE754Sencilla = '0' + this._IEEE754Sencilla;
				this._IEEE754Doble = BigInt('0b' + this.binarioAIEEE754Doble(), 2).toString(16).toUpperCase();
				while(this._IEEE754Doble.length != 16)
					this._IEEE754Doble = '0' + this._IEEE754Doble;

				exactValueSimple.value = "+0";
				exactValueDouble.value = "+0";
				if(this._esPositivo){
					signBitSimple.value = "0";
					signBitDouble.value = "0";
				}
				else{
					signBitSimple.value = "1";
					signBitDouble.value = "1";
				}

				while(this._caracteristicaSencilla.length < 8)
					this._caracteristicaSencilla = this._caracteristicaSencilla + '0';
				while(this._caracteristicaDoble.length < 11)
					this._caracteristicaDoble = this._caracteristicaDoble + '0';
				while(this._mantisaSencilla.length < 23)
					this._mantisaSencilla = this._mantisaSencilla + '0';
				while(this._mantisaDoble.length < 52)
					this._mantisaDoble = this._mantisaDoble + '0';
				new PrecSencilla(this._IEEE754Sencilla);
				new PrecDoble(this._IEEE754Doble);
				return [this._IEEE754Sencilla, this._IEEE754Doble];
			}
			else{
				this._pEnteraBinario = "";
				this._pDecimalBinario = "";
				this._mantisaSencilla = "";
				this._mantisaDoble = "";
				this._caracteristicaSencilla = "";
				this._caracteristicaDoble = "";
				if(esPositivo){
					this._IEEE754Sencilla = "00000000";
					this._IEEE754Doble = "0000000000000000";
					exactValueSimple.value = "+0";
					exactValueDouble.value = "+0";
					signBitSimple.value = "0";
					signBitDouble.value = "0";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
				else{
					this._IEEE754Sencilla = "80000000";
					this._IEEE754Doble = "8000000000000000";
					exactValueSimple.value = "-0";
					exactValueDouble.value = "-0";
					signBitSimple.value = "1";
					signBitDouble.value = "1";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
			}
		}
	}

	binaryToBigDecimal(binaryString) {
		// Separamos la parte entera de la parte fraccionaria
		const [intPart = '', fracPart = ''] = binaryString.split('.');
	  
		let result = new Big(0);
	  
		// 1. Convertir parte entera
		//    Recorremos cada dígito y lo sumamos como si estuviéramos "armando" el número en base 2
		for (let i = 0; i < intPart.length; i++) {
		  result = result.times(2);
		  if (intPart[i] === '1') {
			result = result.plus(1);
		  }
		}
	  
		// 2. Convertir parte fraccionaria
		//    Recorremos cada dígito y lo agregamos dividiendo sucesivamente por 2
		let fraction = new Big(0);
		let factor = new Big('0.5'); // 1/2 = 0.5
	  
		for (let i = 0; i < fracPart.length; i++) {
		  if (fracPart[i] === '1') {
			fraction = fraction.plus(factor);
		  }
		  factor = factor.div(2);
		}
	  
		// Sumar la parte entera y la fraccionaria
		result = result.plus(fraction);
	  
		return result;
	}

	esMasPequeno(numeroEnTexto, numeroMinimo){
		const numeroPrimero = this.binaryToBigDecimal(numeroEnTexto);
		return numeroPrimero.lt(numeroMinimo);
	}

	// caso especifico para el 0, 0.00000, -0.0
	igualesCerosBinario(valor){
		let retorno;
		retorno =  Number(valor) == Number(0);
		if(valor.trim() == ""){
			retorno =  false;
		}
	
		return retorno;
	}

	comprobarNumeroEnTexto(){
		let numValido = /^[01]+(\.[01]+)?$/.test(this._numeroEnTexto);
		return numValido;
	}

	binarioABinarioCompletoHexadecimal(numeroEnTexto){
		let resultadoBinario = numeroEnTexto;
		while((resultadoBinario.length % 4) != 0){ 
			resultadoBinario = '0' + resultadoBinario;
		}

    	return resultadoBinario;
	}

	binarioABinarioCompletoOctal(numeroEnTexto){
		let resultadoBinario = numeroEnTexto;
		while((resultadoBinario.length % 3) != 0){ 
			resultadoBinario = '0' + resultadoBinario;
		}

    	return resultadoBinario;
	}

}

class DecimalFraccionario extends Numero{
	constructor(numeroEnTexto, esPos){

		super(numeroEnTexto);
		let esPositivo = esPos;
		let inputElement = document.getElementById("entrada1");
		if(true){ //antes se usaba pero ahora ya no, por eso hay un true dentro del if, se debe ejecutar siempre, para no quitar todas las sangrias
			inputElement.classList.remove("entrada_mal_inactivo");
			inputElement.classList.remove("entrada_mal_activo");
			this._esPositivo = esPositivo;

			if(!this.igualesCerosDecimal(numeroEnTexto)){
				this._pEnteraBinario = this.decimalABinario(this._pEntera).replace(/^(0+)/g, '');
				this._pDecimalBinario = this.computaDecimales(new Big(numeroEnTexto));
				const numeroEnTextoBig = new Big(numeroEnTexto);
				if(numeroEnTexto != "" && (numeroEnTextoBig).lt(minimoNormalizadoSencilla) ){
					this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false, true);
					this._caracteristicaSencilla = "00000000";
				}
				else{
					this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false, false);
					this._caracteristicaSencilla = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, false);
				}
				if(numeroEnTexto != "" && (numeroEnTextoBig).lt(minimoNormalizadoDoble) ){
					this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true, true);
					this._caracteristicaDoble = "00000000000";
				}
				else{
					this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true, false);
					this._caracteristicaDoble = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, true);
				}
				this._IEEE754Sencilla = parseInt(this.binarioAIEEE754Sencilla(), 2).toString(16).toUpperCase();
				while(this._IEEE754Sencilla.length != 8)
					this._IEEE754Sencilla = '0' + this._IEEE754Sencilla;
				this._IEEE754Doble = BigInt('0b' + this.binarioAIEEE754Doble(), 2).toString(16).toUpperCase();
				while(this._IEEE754Doble.length != 16)
					this._IEEE754Doble = '0' + this._IEEE754Doble;
				exactValueSimple.value = "+0";
				exactValueDouble.value = "+0";
				if(this._esPositivo){
					signBitSimple.value = "0";
					signBitDouble.value = "0";
				}
				else{
					signBitSimple.value = "1";
					signBitDouble.value = "1";
				}

				while(this._caracteristicaSencilla.length < 8)
					this._caracteristicaSencilla = this._caracteristicaSencilla + '0';
				while(this._caracteristicaDoble.length < 11)
					this._caracteristicaDoble = this._caracteristicaDoble + '0';
				while(this._mantisaSencilla.length < 23)
					this._mantisaSencilla = this._mantisaSencilla + '0';
				while(this._mantisaDoble.length < 52)
					this._mantisaDoble = this._mantisaDoble + '0';
				new PrecSencilla(this._IEEE754Sencilla);
				new PrecDoble(this._IEEE754Doble);
			}
			else{
				this._pEnteraBinario = "";
				this._pDecimalBinario = "";
				this._mantisaSencilla = "";
				this._mantisaDoble = "";
				this._caracteristicaSencilla = "";
				this._caracteristicaDoble = "";
				if(esPositivo){
					this._IEEE754Sencilla = "00000000";
					this._IEEE754Doble = "0000000000000000";
					exactValueSimple.value = "+0";
					exactValueDouble.value = "+0";
					signBitSimple.value = "0";
					signBitDouble.value = "0";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
				else{
					this._IEEE754Sencilla = "80000000";
					this._IEEE754Doble = "8000000000000000";
					exactValueSimple.value = "-0";
					exactValueDouble.value = "-0";
					signBitSimple.value = "1";
					signBitDouble.value = "1";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
			}
		}
	}

	// caso especifico para el 0, 0.00000, -0.0
	igualesCerosDecimal(valor){
		let retorno;
		retorno =  Number(valor) == Number(0);
		if(valor.trim() == ""){
			retorno =  false;
		}
	
		return retorno;
	}

	computaDecimales(numeroEnTexto) {
		let decimalesBinario = "";
		let digitoAñadir;
		for(let i = 0; i < 3000; i++) { //antes 100.000 decimales, revisar esto
			numeroEnTexto = numeroEnTexto.minus(Math.floor(numeroEnTexto));
			digitoAñadir = numeroEnTexto.times(2);
			numeroEnTexto = digitoAñadir;
			digitoAñadir = Math.floor(digitoAñadir);
			decimalesBinario += digitoAñadir;
		}

		return decimalesBinario;
	}

	comprobarNumeroEnTexto(){
		let numValido = /^[0-9]+(\.[0-9]+)?$/.test(this._numeroEnTexto);
		if(numValido) return true;
		return false;
	}


	decimalABinario(numeroEnTexto){
		let resultadoBinario = parseInt(numeroEnTexto).toString(2);
		while((resultadoBinario.length % 4) != 0){ 
			resultadoBinario = '0' + resultadoBinario;
		}

    	return resultadoBinario;
	}

}

class Hexadecimal extends Numero{
	constructor(numeroEnTexto, esPos){

		super(numeroEnTexto);
		let esPositivo = esPos;
		let inputElement = document.getElementById("entrada1");
		
		if(true){ //antes se usaba pero ahora ya no, por eso hay un true dentro del if, se debe ejecutar siempre, para no quitar todas las sangrias
			inputElement.classList.remove("entrada_mal_inactivo");
			inputElement.classList.remove("entrada_mal_activo");
			this._esPositivo = esPositivo;

			if(!this.igualesCerosHexadecimal(numeroEnTexto)){
				this._pEnteraBinario = this.hexadecimalABinario(this._pEntera).replace(/^(0+)/g, '');
				this._pDecimalBinario = this.hexadecimalABinario(this._pDecimal);
				if(this.igualesCerosHexadecimal(this._pDecimalBinario)) this._pDecimalBinario = "";
				let guardo = new Binario(this._pEnteraBinario + "." + this._pDecimalBinario, esPos, "hexadecimal");
				this._IEEE754Sencilla = guardo[0];
				this._IEEE754Doble = guardo[1];
				
			}
			else{
				this._pEnteraBinario = "";
				this._pDecimalBinario = "";
				this._mantisaSencilla = "";
				this._mantisaDoble = "";
				this._caracteristicaSencilla = "";
				this._caracteristicaDoble = "";
				if(esPositivo){
					this._IEEE754Sencilla = "00000000";
					this._IEEE754Doble = "0000000000000000";
					exactValueSimple.value = "+0";
					exactValueDouble.value = "+0";
					signBitSimple.value = "0";
					signBitDouble.value = "0";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
				else{
					this._IEEE754Sencilla = "80000000";
					this._IEEE754Doble = "8000000000000000";
					exactValueSimple.value = "-0";
					exactValueDouble.value = "-0";
					signBitSimple.value = "1";
					signBitDouble.value = "1";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
			}
		}
	}


	// caso especifico para el 0, 0.00000, -0.0
	igualesCerosHexadecimal(valor){
		let retorno;
		retorno =  Number(valor) == Number(0);
		if(valor.trim() == ""){
			retorno =  false;
		}
	
		return retorno;
	}

	comprobarNumeroEnTexto(){
		let numValido = /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(this._numeroEnTexto);
		return numValido;
	}


	hexadecimalABinario(numeroEnTexto){
		let i = 0;
		while(numeroEnTexto[i] == "0"){
			i++;
		}
		let resultadoHexadecimal = BigInt(`0x${numeroEnTexto}`).toString(2);
		for(let u = 0; u < i; u++){
			resultadoHexadecimal = '0000' + resultadoHexadecimal;
		}
		while((resultadoHexadecimal.length % 4) != 0){ 
			resultadoHexadecimal = '0' + resultadoHexadecimal;
		}
    	return resultadoHexadecimal;
	}

}

class Octal extends Numero{
	constructor(numeroEnTexto, esPos){

		super(numeroEnTexto);
		let esPositivo = esPos;
		let inputElement = document.getElementById("entrada1");
		
		if(true){ //antes se usaba pero ahora ya no, por eso hay un true dentro del if, se debe ejecutar siempre, para no quitar todas las sangrias
			inputElement.classList.remove("entrada_mal_inactivo");
			inputElement.classList.remove("entrada_mal_activo");
			this._esPositivo = esPositivo;

			if(!this.igualesCerosOctal(numeroEnTexto)){
				this._pEnteraBinario = this.octalABinario(this._pEntera).replace(/^(0+)/g, '');
				this._pDecimalBinario = this.octalABinario(this._pDecimal);
				if(this.igualesCerosOctal(this._pDecimalBinario)) this._pDecimalBinario = "";
				let guardo = new Binario(this._pEnteraBinario + "." + this._pDecimalBinario, esPos, "octal");
				this._IEEE754Sencilla = guardo[0];
				this._IEEE754Doble = guardo[1];
				
			}
			else{
				this._pEnteraBinario = "";
				this._pDecimalBinario = "";
				this._mantisaSencilla = "";
				this._mantisaDoble = "";
				this._caracteristicaSencilla = "";
				this._caracteristicaDoble = "";
				if(esPositivo){
					this._IEEE754Sencilla = "00000000";
					this._IEEE754Doble = "0000000000000000";
					exactValueSimple.value = "+0";
					exactValueDouble.value = "+0";
					signBitSimple.value = "0";
					signBitDouble.value = "0";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
				else{
					this._IEEE754Sencilla = "80000000";
					this._IEEE754Doble = "8000000000000000";
					exactValueSimple.value = "-0";
					exactValueDouble.value = "-0";
					signBitSimple.value = "1";
					signBitDouble.value = "1";
					exponentSimple.value = "0000 0000";
					exponentDouble.value = "000 0000 0000";
					significandSimple.value = infinitySencilla;
					significandDouble.value = infinityDoble;
				}
			}
		}
	}


	// caso especifico para el 0, 0.00000, -0.0
	igualesCerosOctal(valor){
		let retorno;
		retorno =  Number(valor) == Number(0);
		if(valor.trim() == ""){
			retorno =  false;
		}
	
		return retorno;
	}



	octalABinario(numeroEnTexto) { 
		// Convertir de octal a binario
		let i = 0;
		while(numeroEnTexto[i] == "0"){
			i++;
		}
		let resultadoBinario = BigInt(`0o${numeroEnTexto}`).toString(2);
		for(let u = 0; u < i; u++){
			resultadoHexadecimal = '000' + resultadoHexadecimal;
		}
		// Asegurarse de que cada dígito octal tiene exactamente 3 bits binarios
		while ((resultadoBinario.length % 3) !== 0) { 
			resultadoBinario = '0' + resultadoBinario;
		}
	
		return resultadoBinario;
	}
	

}

class Precision{
	constructor(numeroEnTexto){
		this._numeroEnTexto = numeroEnTexto;
		this._enComa = "";
	}

	binToDec(bin) {
		if (((bin.split('.').length - 1) == 0))
		{
			bin += '.';
		}
		let [integerPart, fractionalPart] = bin.split('.');
	
		// Convertir la parte entera
		let integerDecimal = new Decimal(parseInt(integerPart, 2));
	
		// Convertir la parte fraccionaria
		let fractionalDecimal = new Decimal(0);
		for (let i = 0; i < fractionalPart.length; i++) {
			let digit = new Decimal(parseInt(fractionalPart[i], 2));
			let divisor = new Decimal(2).pow(i + 1);
			fractionalDecimal = fractionalDecimal.plus(digit.div(divisor));
		}
		// Sumar ambas partes
		return integerDecimal.plus(fractionalDecimal).toString();
	}

	desnormalizado(numero, numeroMaximo){
		let resultado = new Big(0);
		let potencia = 0;
		for(let i = 0; i < numeroMaximo; i++){
			if(numero.charAt(i) == 1){
				potencia = new Decimal(2).pow(-(i + 1))
				resultado = resultado.plus(potencia);
			}
		}
		return resultado;
	}

	hexToBin(hex) {
		const hexToBinMap = {
			'0': '0000', '1': '0001', '2': '0010', '3': '0011',
			'4': '0100', '5': '0101', '6': '0110', '7': '0111',
			'8': '1000', '9': '1001', 'A': '1010', 'B': '1011',
			'C': '1100', 'D': '1101', 'E': '1110', 'F': '1111'
		};
	
		let bin = '';
		for (let i = 0; i < hex.length; i++) {
			bin += hexToBinMap[hex[i].toUpperCase()];
		}
		return bin;
	}
}

class PrecSencilla extends Precision{
	constructor(numeroEnTexto, deDondeV = "Decimal"){
		super(numeroEnTexto);
		if(this.comprobarNumeroEnTexto()){
			this._enComa = this.sencillaAComa(deDondeV);
		}
		// NaN
	}

	comprobarNumeroEnTexto(){
		return (this._numeroEnTexto.length == 8);
	}

	sencillaAComa(deDondeV){
		let enComa = "", bitSigno = "", caracteristica = "", mantisa = "";
		let numeroEnTextoBinario = this.hexToBin(this._numeroEnTexto);

		bitSigno = numeroEnTextoBinario.charAt(0);
		mantisa = numeroEnTextoBinario.substring(9);
		caracteristica = numeroEnTextoBinario.substring(1, 9);

		if(caracteristica == "00000000"){
			const potencia = new Decimal(2).pow(-126);
			enComa = this.desnormalizado(mantisa, 23).times(potencia).toString();
			if(bitSigno == '1')
				enComa = '-' + enComa;
			
			exactValueSimple.value = enComa;
			signBitSimple.value = bitSigno;
			exponentSimple.value = anadirSeparador(numeroEnTextoBinario.substring(1, 9));
			significandSimple.value = anadirSeparador(mantisa.substring(0, 23));
			return enComa;
		}
		else if(caracteristica == "11111111"){
			if(mantisa.charAt(0) == '0' && ((mantisa.split('1').length - 1) >= 1)){
				this._enComa = "sNaN";
				exactValueSimple.value = "sNaN";
				signBitSimple.value = bitSigno;
				exponentSimple.value = anadirSeparador(numeroEnTextoBinario.substring(1, 9));
				significandSimple.value = anadirSeparador(mantisa.substring(0, 23));
				return this._enComa;
			}
			if(mantisa.charAt(0) == '1'){
				this._enComa = "qNaN";
				exactValueSimple.value = "qNaN";
				signBitSimple.value = bitSigno;
				exponentSimple.value = anadirSeparador(numeroEnTextoBinario.substring(1, 9));
				significandSimple.value = anadirSeparador(mantisa.substring(0, 23));
				return this._enComa;
			}
		}
		caracteristica = parseInt(caracteristica, 2);

		let desplazamiento = caracteristica - 128 + 1;

		if(desplazamiento >= 0 ) {
			if(desplazamiento > 22){
				while(mantisa.length != (desplazamiento + 5)){
					mantisa += '0';
				}
			}
			enComa = mantisa.substring(0, desplazamiento) + '.' + mantisa.substring(desplazamiento);
			enComa = '1' + enComa;

		}

		else if(desplazamiento < 0) {
			for(let i = 0; i < -(desplazamiento + 1); i++)
				enComa = '0' + enComa;
			
			enComa = '0.' + enComa + '1' + mantisa;
		}
		
		enComa = this.binToDec(enComa);

		if(bitSigno == '1')
			enComa = '-' + enComa;

		exactValueSimple.value = enComa;
		signBitSimple.value = bitSigno;
		exponentSimple.value = anadirSeparador(numeroEnTextoBinario.substring(1, 9));
		significandSimple.value = anadirSeparador(mantisa.substring(0, 23));
		if(deDondeV == "Hexadecimal"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToHexWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		else if(deDondeV == "Octal"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToOctalWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		else if(deDondeV == "Binary"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToBinaryWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		return [enComa, exactValueSimple.value];
	}

}

function decimalToHexWithFractionInfinite(decimalString) {
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
    return `${integerHex}.${fractionalHex}`;
}

function decimalToOctalWithFractionInfinite(decimalString) {
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
    return `${integerOctal}.${fractionalOctal}`;
}

function decimalToBinaryWithFractionInfinite(decimalString) {
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
    return `${integerBinary}.${fractionalBinary}`;
}


class PrecDoble extends Precision{
	constructor(numeroEnTexto, deDondeV = "Decimal"){
		super(numeroEnTexto);
		if(this.comprobarNumeroEnTexto()){
			this._enComa = this.dobleAComa(deDondeV);
		}
		// NaN
	}

	comprobarNumeroEnTexto(){
		return (this._numeroEnTexto.length == 16);
	}

	dobleAComa(deDondeV){
		let enComa = "", bitSigno = "", caracteristica = "", mantisa = "";
		let numeroEnTextoBinario = this.hexToBin(this._numeroEnTexto);

		bitSigno = numeroEnTextoBinario.charAt(0);
		mantisa = numeroEnTextoBinario.substring(12);
		caracteristica = numeroEnTextoBinario.substring(1, 12);
		if(caracteristica == "00000000000"){
			const potencia = new Decimal(2).pow(-1022);
			enComa = this.desnormalizado(mantisa, 52).times(potencia).toString();

			if(bitSigno == '1')
				enComa = '-' + enComa;
			
			exactValueDouble.value = enComa;
			signBitDouble.value = bitSigno;
			exponentDouble.value = anadirSeparador(numeroEnTextoBinario.substring(1, 12));
			significandDouble.value = anadirSeparador(mantisa.substring(0, 52));
			return enComa;
		}
		else if(caracteristica == "11111111111"){
			if(mantisa.charAt(0) == '0' && ((mantisa.split('1').length - 1) >= 1)){
				this._enComa = "sNaN";
				exactValueDouble.value = "sNaN";
				signBitDouble.value = bitSigno;
				exponentDouble.value = anadirSeparador(numeroEnTextoBinario.substring(1, 12));
				significandDouble.value = anadirSeparador(mantisa.substring(0, 52));
				return this._enComa;
			}
			if(mantisa.charAt(0) == '1'){
				this._enComa = "qNaN";
				exactValueDouble.value = "sNaN";
				signBitDouble.value = bitSigno;
				exponentDouble.value = anadirSeparador(numeroEnTextoBinario.substring(1, 12));
				significandDouble.value = anadirSeparador(mantisa.substring(0, 52));
				return this._enComa;
			}
		}

		caracteristica = parseInt(caracteristica, 2);


		let desplazamiento = caracteristica - 1024 + 1;

		if(desplazamiento >= 0 ) {
			if(desplazamiento > 51){
				while(mantisa.length != (desplazamiento + 5)){
					mantisa += '0';
				}
			}
			enComa = mantisa.substring(0, desplazamiento) + '.' + mantisa.substring(desplazamiento);
			enComa = '1' + enComa;

		}

		else if(desplazamiento < 0) {
			for(let i = 0; i < -(desplazamiento + 1); i++)
				enComa = '0' + enComa;
			
			enComa = '0.' + enComa + '1' + mantisa;
		}

		enComa = this.binToDec(enComa);

		if(bitSigno == '1')
			enComa = '-' + enComa;

		exactValueDouble.value = enComa;
		signBitDouble.value = bitSigno;
		exponentDouble.value = anadirSeparador(numeroEnTextoBinario.substring(1, 12));
		significandDouble.value = anadirSeparador(mantisa.substring(0, 52));

		if(deDondeV == "Hexadecimal"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToHexWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		else if(deDondeV == "Octal"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToOctalWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		else if(deDondeV == "Binary"){
			if(bitSigno == '1')
			{
				enComa = enComa.substring(1);
			}
			enComa = decimalToBinaryWithFractionInfinite(enComa);
			if(bitSigno == '1')
				{
					enComa = '-' + enComa;
				}
		}
		return [enComa, exactValueDouble.value];
	}

}