

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
	constructor(numeroEnTexto){
		let esPositivo = true;
		if(numeroEnTexto.charAt(0) == '-'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
			esPositivo = false;
		}
		super(numeroEnTexto);
		this._esPositivo = esPositivo;
		// comprobamos si sigue el formato decimal correctamente
		if(this.comprobarNumeroEnTexto()){
			this._pEnteraBinario = this.binarioABinarioCompleto(this._pEntera).replace(/^(0+)/g, '');
			this._pDecimalBinario = this.binarioABinarioCompleto(this._pDecimal);
			this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false);
			this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true);
			this._caracteristicaSencilla = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, false);
			this._caracteristicaDoble = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, true);
			this._IEEE754Sencilla = parseInt(this.binarioAIEEE754Sencilla(), 2).toString(16).toUpperCase();
			this._IEEE754Doble = BigInt('0b' + this.binarioAIEEE754Doble(), 2).toString(16).toUpperCase();
		}
	}

	comprobarNumeroEnTexto(){
		let numValido = /^[01]+(\.[01]+)?$/.test(this._numeroEnTexto);
		if(numValido) return true;
		// poner NaN
		return false;
	}

	binarioABinarioCompleto(numeroEnTexto){
		let resultadoBinario = numeroEnTexto;
		while((resultadoBinario.length % 4) != 0){ 
			resultadoBinario = '0' + resultadoBinario;
		}

    	return resultadoBinario;
	}

}

class DecimalFraccionario extends Numero{
	constructor(numeroEnTexto){
		//retiramos el + (por si lo hay)
		if(numeroEnTexto.charAt(0) == '+'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
		}

		let esPositivo = true;
		if(numeroEnTexto.charAt(0) == '-'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
			esPositivo = false;
		}

		var inputElement = document.getElementById('entrada1');
		//por si esta en notacion cientifica lo pasamos a notacion normal
		if( ((numeroEnTexto.split('e').length - 1) == 1) && (numeroEnTexto.charAt(0) != 'e') && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != 'e')  && (numeroEnTexto.charAt(numeroEnTexto.length - 1) != '.') && ((numeroEnTexto.split('.').length - 1) <= 1) && ( ( ((numeroEnTexto.split('-').length - 1) == 1) && ((numeroEnTexto.split('+').length - 1) == 0) && (numeroEnTexto.indexOf('-') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('-') != (numeroEnTexto.length - 1) ) || ((numeroEnTexto.split('-').length - 1) == 0)) && ((((numeroEnTexto.split('+').length - 1) == 1) && ((numeroEnTexto.split('-').length - 1) == 0) && (numeroEnTexto.indexOf('+') == (numeroEnTexto.indexOf('e') + 1)) && (numeroEnTexto.indexOf('+') != (numeroEnTexto.length - 1)) ) || ((numeroEnTexto.split('+').length - 1) == 0) ) ) ){
			numeroEnTexto = new Decimal(numeroEnTexto).toFixed();
		}
		else{
			//quitamos el "." por si hay un punto final
			if((numeroEnTexto.charAt(numeroEnTexto.length - 1) == ".") && ((numeroEnTexto.split('.').length - 1) == 1)){
				numeroEnTexto = numeroEnTexto.substring(0, numeroEnTexto.length - 1);
			}
		}

		super(numeroEnTexto);
		


		if(this.comprobarNumeroEnTexto()){
			inputElement.classList.remove("entrada_mal_inactivo");
			inputElement.classList.remove("entrada_mal_activo");
			this._esPositivo = esPositivo;

			if(!this.igualesCerosDecimal(numeroEnTexto)){
				this._pEnteraBinario = this.decimalABinario(this._pEntera).replace(/^(0+)/g, '');
				this._pDecimalBinario = this.computaDecimales(new Big(numeroEnTexto));
				const minimoNormalizadoSencilla = new Big("1.1754943508222875079687365372222456778186655567720876737716740188e-38");
				const minimoNormalizadoDoble = new Big("2.2250738585072013830902327173324040642192159804623319354969622924e-308");

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
				}
				else{
					this._IEEE754Sencilla = "80000000";
					this._IEEE754Doble = "8000000000000000";
				}
			}
		}
		else{
			if(numeroEnTexto != ""){
				inputElement.classList.add("entrada_mal_inactivo");
				inputElement.classList.add("entrada_mal_activo");
			}
			else{
				inputElement.classList.remove("entrada_mal_inactivo");
				inputElement.classList.remove("entrada_mal_activo");
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
		for(let i = 0; i < 100000; i++) {
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
	constructor(numeroEnTexto){
		let esPositivo = true;
		if(numeroEnTexto.charAt(0) == '-'){
			numeroEnTexto = numeroEnTexto.substring(1, numeroEnTexto.length);
			esPositivo = false;
		}
		super(numeroEnTexto);
		this._esPositivo = esPositivo;
	    // comprobamos si sigue el formato decimal correctamente
		if(this.comprobarNumeroEnTexto()){
			this._pEnteraBinario = this.hexadecimalABinario(this._pEntera).replace(/^(0+)/g, '');
			this._pDecimalBinario = this.hexadecimalABinario(this._pDecimal);
			this._mantisaSencilla = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, false);
			this._mantisaDoble = this.calcularMantisa(this._pEnteraBinario, this._pDecimalBinario, true);
			this._caracteristicaSencilla = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, false);
			this._caracteristicaDoble = this.calcularCaracteristica(this._pEnteraBinario, this._pDecimalBinario, true);
			this._IEEE754Sencilla = parseInt(this.binarioAIEEE754Sencilla(), 2).toString(16).toUpperCase();
			this._IEEE754Doble = BigInt('0b' + this.binarioAIEEE754Doble(), 2).toString(16).toUpperCase();
		}
	}

	comprobarNumeroEnTexto(){
		let numValido = /^[0-9A-Fa-f]+(\.[0-9A-Fa-f]+)?$/.test(this._numeroEnTexto);
		if(numValido) return true;
		// poner NaN
		return false;
	}


	hexadecimalABinario(numeroEnTexto){
		let resultadoHexadecimal = parseInt(numeroEnTexto, 16).toString(2);
		while((resultadoHexadecimal.length % 4) != 0){ 
			resultadoHexadecimal = '0' + resultadoHexadecimal;
		}
    	return resultadoHexadecimal;
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
	constructor(numeroEnTexto){
		super(numeroEnTexto);
		if(this.comprobarNumeroEnTexto()){
			this._enComa = this.sencillaAComa();
		}
		// NaN
	}

	comprobarNumeroEnTexto(){
		return (this._numeroEnTexto.length == 8);
	}

	sencillaAComa(){
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
			
			return enComa;
		}
		caracteristica = parseInt(caracteristica, 2);

		let desplazamiento = caracteristica - 128 + 1;

		if(desplazamiento >= 0 ) {
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


		return enComa;
	}

}

class PrecDoble extends Precision{
	constructor(numeroEnTexto){
		super(numeroEnTexto);
		if(this.comprobarNumeroEnTexto()){
			this._enComa = this.dobleAComa();
		}
		// NaN
	}

	comprobarNumeroEnTexto(){
		return (this._numeroEnTexto.length == 16);
	}

	dobleAComa(){
		let enComa = "", bitSigno = "", caracteristica = "", mantisa = "";
		let numeroEnTextoBinario = this.hexToBin(this._numeroEnTexto);

		bitSigno = numeroEnTextoBinario.charAt(0);
		mantisa = numeroEnTextoBinario.substring(12);
		caracteristica = numeroEnTextoBinario.substring(1, 12);
		if(caracteristica == "00000000000"){
			const potencia = new Decimal(2).pow(-1022);
			enComa = this.desnormalizado(mantisa, 52).times(potencia).toString();
			console.log(enComa);
			if(bitSigno == '1')
				enComa = '-' + enComa;
			
			return enComa;
		}

		caracteristica = parseInt(caracteristica, 2);


		let desplazamiento = caracteristica - 1024 + 1;

		if(desplazamiento >= 0 ) {
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


		return enComa;
	}

}