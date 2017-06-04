/* ----------------------------------------------- CLASES ----------------------------------------------- */
class Posicion
{
	constructor(x = -1, y = -1)
	{
		this.x = x;
		this.y = y;
	}
}

class Ficha
{
	constructor(img)
	{
		this.posicion = new Posicion();
		this.equipo = '-';
		this.seleccionada = false;
		this.destinos = new Array();

		this.consultarEquipo(img);
	}

	consultarEquipo(img)
	{
		this.equipo = img.parentNode.id.replace('fichas-', '');
	}


	//comprueba que la ficha haya entrado a una porteria y llama a la funcion gol
	enPorteria()
	{
		//si esta en las filas de las porterias
		if(this.posicion.y >= 3 && this.posicion.y <= 5)
		{
			//si esta en la columna 0, es la porteria del equipo A
			if(this.posicion.x == 0)
			{
				marcador.gol('B');
				return true;
			}
			//si esta en la columna 19, es la porteria del equipo B
			else if(this.posicion.x == 19)
			{
				marcador.gol('A');
				return true;
			}
		}

		return false;
	}

	//comprueba que la posicion no coincida con ninguna ficha
	colisionaFichas(col, fil)
	{
		let filA, filB, colA, colB;
		//con las fichas del equipo A
		for(let i=0; i < fichasA.length; i++)
		{
			filA = fichasA[i].posicion.y;
			colA = fichasA[i].posicion.x;
			if(fil == filA && col == colA)
			{
				return false;
			}
		}
		//con las fichas del equipo B
		for(let i=0; i < fichasB.length; i++)
		{
			filB = fichasB[i].posicion.y;
			colB = fichasB[i].posicion.x;
			if(fil == filB && col == colB)
			{
				return false;
			}
		}

		return true;
	}

	//actualiza el array de posiciones a las que puede ir la ficha seleccionada
	actualizarDestinos(e)
	{
		let cv      = e.target,
			 dim     = cv.width / 20,
			 fichaClick = this,
			 x = fichaClick.posicion.x,
			 y = fichaClick.posicion.y,
			 num = marcador.dado,
			 noSalta = true,//booleano para comprobar si hay alguna ficha en la fila
			 ctx = cv.getContext('2d');

		//comprobamos que las posiciones validas a las que puede ir la ficha
		//casilla a la derecha
		if(comprobarLimites((x + num) * dim, y * dim + 1, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x + i, y);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[0] = new Posicion((x + num), y);
			else
				fichaClick.destinos[0] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[0] = new Posicion(-1, -1);
		}
		//casilla a la izquierda
		if(comprobarLimites((x - num) * dim + 2, y * dim + 1, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x - i, y);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[1] = new Posicion((x - num), y);
			else
				fichaClick.destinos[1] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[1] = new Posicion(-1, -1);
		}
		//casilla arriba
		if(comprobarLimites(x * dim, (y - num)* dim + 2, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x, y - i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[2] = new Posicion(x, (y - num));
			else
				fichaClick.destinos[2] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[2] = new Posicion(-1, -1);
		}
		//casilla abajo
		if(comprobarLimites(x * dim, (y + num)* dim, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x, y + i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[3] = new Posicion(x, y + num);
			else
				fichaClick.destinos[3] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[3] = new Posicion(-1, -1);
		}
		//casilla diagonal superior derecha
		if(comprobarLimites((x + num) * dim + 2, (y - num)* dim + 2, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x + i, y - i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[4] = new Posicion(x + num, y - num);
			else
				fichaClick.destinos[4] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[4] = new Posicion(-1, -1);
		}
		//casilla diagonal superior izquierda
		if(comprobarLimites((x - num) * dim + 2, (y - num)* dim + 2, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x - i, y - i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[5] = new Posicion(x - num, y - num);
			else
				fichaClick.destinos[5] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[5] = new Posicion(-1, -1);
		}
		//casilla diagonal inferior derecha
		if(comprobarLimites((x + num) * dim + 2, (y + num)* dim + 2, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x + i, y + i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[6] = new Posicion(x + num, y + num);
			else
				fichaClick.destinos[6] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[6] = new Posicion(-1, -1);
		}
		//casilla diagonal inferior izquierda
		if(comprobarLimites((x - num) * dim + 2, (y + num)* dim + 2, cv, dim))
		{
			//la casilla es valida, ahora vamos a ver si se salta alguna por el camino
			for(let i=1; i <= num; i++)
			{
				noSalta = fichaClick.colisionaFichas(x - i, y + i);
				if(!noSalta)
					break;
			}
			if(noSalta)
				fichaClick.destinos[7] = new Posicion(x - num, y + num);
			else
				fichaClick.destinos[7] = new Posicion(-1, -1);
		}
		else
		{
			fichaClick.destinos[7] = new Posicion(-1, -1);
		}
	}

	//comprueba que las coordenadas pasadas estan dentro de los posibles destinos de la ficha
	enDestino(fil, col)
	{
		let fichaClick = this;

		for(let i=0; i < 8; i++)
		{
			//si es un destino
			if(fichaClick.destinos[i].x == col && fichaClick.destinos[i].y == fil)
				return true;
		}
		//si no lo ha encontrado dentro de sus destinos
		return false;
	}

	//marca en el campo las casillas a las que puede ir la ficha seleccionada
	dibujarDestinos(e)
	{
		let cv   = e.target,
			 dim  = cv.width / 20,
			 y    = -1,
			 x    = -1,
			 ctx  = cv.getContext('2d'),
			 fichaClick = this;

		//recorremos los destinos de la ficha para marcarlos en el campo
		for(let i=0; i < 8; i++)
		{
			//si el destino es una posicion valida
			if(fichaClick.destinos[i].x != -1)
			{
			 	col = fichaClick.destinos[i].x;
				fil = fichaClick.destinos[i].y;

				ctx.fillStyle = '#C8E6C9';
				ctx.lineWidth = 3;
				ctx.fillRect(col * dim, fil * dim, dim, dim);
				ctx.strokeRect(col * dim, fil * dim, dim, dim);
			}
		}
	}
}

class Marcador
{
	constructor()
	{
		this.goles = new Array();
		this.goles['A'] = 0;
		this.goles['B'] = 0;
		this.dado = 0;
		this.turno = 'A';
		this.puedoTirar = true;
	}

	refrescar()
	{
		let puntosA = document.getElementById('puntos-A'),
			golesA = document.getElementById('goles-A'),
			puntosB = document.getElementById('puntos-B'),
			golesB = document.getElementById('goles-B');

		puntosA.innerHTML = golesA.innerHTML = this.goles['A'];
		puntosB.innerHTML = golesB.innerHTML = this.goles['B'];
	}

	mensajeGanador(ganador)
	{
		let fondo = document.createElement('div'),
			contenedor = document.createElement('article'),
			mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Fin del partido</h3>';
		mensaje += '<p><span class="color-' + getPropiedad(ganador, 'color') + ' negrita">' + getPropiedad(ganador, 'nombre') + '</span> ha ganado</p>';
		mensaje += '<p>Resultado: ' + this.goles['A'] + ' - ' + this.goles['B'] + '</p>';
		mensaje += '<button onclick="marcador.abandonarPartido();" class="boton">Jugar de nuevo</button>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
	}

	mensajeGol(equipo)
	{
		let fondo = document.createElement('div'),
			contenedor = document.createElement('article'),
			mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>GOOOL!!!</h3>';
		mensaje += '<p>Gol de <span class="color-' + getPropiedad(equipo, 'color') + ' negrita">' + getPropiedad(equipo, 'nombre') + '</p>';
		mensaje += '<p>Vais ' + this.goles['A'] + ' - ' + this.goles['B'] + '</p>';
		mensaje += '<button onclick="this.parentNode.parentNode.remove();" class="boton">Aceptar</button>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
	}

	heGanado(equipo)
	{
		if (this.goles[equipo] >= 5)
		{
			let equipoContrario =  (equipo == 'A' ? 'B' : 'A');

			if (this.goles[equipo] - this.goles[equipoContrario] >= 2)
			{
				// console.log("Ha ganado el equipo " + equipo);
				this.mensajeGanador(equipo);
			}
		}
	}

	gol(equipo)
	{
		this.goles[equipo]++;
		this.refrescar();
		setPropiedad(equipo, 'goles', this.goles[equipo]);
		this.mensajeGol(equipo);
		this.heGanado(equipo);
	}

	cambiarTurno()
	{
		let spanTurno = document.getElementById('turno'),
			spanDado = document.getElementById('dado');	
		
		//Quitamos la clase del turno anterior y ponemos la del nuevo
		spanTurno.classList.remove('color-' + getPropiedad(this.turno, 'color'));
		this.turno = (this.turno == 'A' ? 'B' : 'A');
		sessionStorage.turno = this.turno;
		spanTurno.innerHTML = getPropiedad(this.turno, 'nombre');
		spanTurno.classList.add('color-' + getPropiedad(this.turno, 'color'));
		this.puedoTirar = true;

		//reiniciamos el dado a 0
		this.dado = 0;
		spanDado.innerHTML = 'Esperando...';
	}

	tirarDado()
	{
		if (!this.puedoTirar)
			return;

		let spanDado = document.getElementById('dado');			

		this.dado = Math.floor(Math.random() * (7 - 1) + 1);
		sessionStorage.dado = this.dado;
		spanDado.innerHTML = this.dado;
		this.puedoTirar = false;
	}

	abandonarPartido()
	{
		sessionStorage.clear();
		window.location.href = 'index.html';
	}
}

//Variables globales
var marcador = new Marcador();
var fichasA = new Array();
var fichasB = new Array();









/* ----------------------------------------------- PREPARAR ----------------------------------------------- */
//Llama a las funciones necesarias para inicializar todo
! function inicializar()
{
	// console.log(fichasA);
	// console.log(fichasB);
	obtenerDatos();
	// console.log(fichasA);
	// console.log(fichasB);
	dibujarCuadricula();
	iniciarDragNDrop();
	// console.log(fichasA);
	// console.log(fichasB);
	dibujarCuadricula();
	// console.log(fichasA);
	// console.log(fichasB);
	dibujarFichas(document.getElementById('campo'));
	// console.log(fichasA);
	// console.log(fichasB);
}();

//Escribe los nombres de los equipos y carga los colores de las fichas
function obtenerDatos()
{
	//Login
	let p = document.querySelector('#login-container>p');
	let html = '<span class="color-' + getPropiedad('A', 'color') + ' negrita">' +  getPropiedad('A', 'nombre') + '</span> <span id="puntos-A">' + getPropiedad('A', 'goles') + '</span> - <span id="puntos-B">' + getPropiedad('B', 'goles') + '</span> <span class="color-' + getPropiedad('B', 'color') + ' negrita">' +  getPropiedad('B', 'nombre') + '</span>';

	p.innerHTML = html;

	//Goles marcador
	p = document.querySelector('#zona-marcador>div>p');
	html = '<span class="color-' + getPropiedad('A', 'color') + ' negrita">' +  getPropiedad('A', 'nombre') + '</span> <span id="goles-A">' + getPropiedad('A', 'goles') + '</span> - <span id="goles-B">' + getPropiedad('B', 'goles') + '</span> <span class="color-' + getPropiedad('B', 'color') + ' negrita">' +  getPropiedad('B', 'nombre') + '</span>';
	p.innerHTML = html;
	p.classList.add('texto-grande');

	marcador.goles.A = getPropiedad('A', 'goles');
	marcador.goles.B = getPropiedad('B', 'goles');

	//Dado
	let spanDado = document.getElementById('dado');
	spanDado.innerHTML = (sessionStorage.dado == 0 ? 'Esperando...' : sessionStorage.dado);

	marcador.dado = sessionStorage.dado;

	//Turno
	let spanTurno = document.getElementById('turno');

	spanTurno.innerHTML = getPropiedad(sessionStorage.turno, 'nombre');
	spanTurno.classList.add('color-' + getPropiedad(sessionStorage.turno, 'color'));

	marcador.turno = sessionStorage.turno;

	//En la zona de fichas
	let h3 = document.querySelectorAll('#zona-fichas h3');

	html = '<span class="color-' + getPropiedad('A', 'color') + ' negrita">' +  getPropiedad('A', 'nombre') + '</span>';
	h3[0].innerHTML = html;

	html = '<span class="color-' + getPropiedad('B', 'color') + ' negrita">' +  getPropiedad('B', 'nombre') + '</span>';
	h3[1].innerHTML = html;

	cargarFichas();
	posicionarFichas();

	//Ocultar o pintar de verde los cuadros
	if (getPropiedad('A', 'estado') == 'LISTO')
		listo(document.querySelector('#fichas-A>button'));

	if (getPropiedad('B', 'estado') == 'LISTO')
		listo(document.querySelector('#fichas-B>button'));
}

//Cargamos 5 fichas para cada equipo
function cargarFichas()
{
	let nombresColores = ['rosa', 'azul', 'amarilla', 'verde', 'verde azulada', 'roja'],
		divA = document.getElementById('fichas-A'),
		divB = document.getElementById('fichas-B'),

		htmlA = '<img src="img/ficha-' + getPropiedad('A', 'color') + '.svg" alt="Ficha ' + nombresColores[getPropiedad('A', 'color')] + '">',
		htmlB = '<img src="img/ficha-' + getPropiedad('B', 'color') + '.svg" alt="Ficha ' +  nombresColores[getPropiedad('B', 'color')] + '">';

	for(let i = 0; i < 5; i++)
	{
		divA.innerHTML += htmlA;
		divB.innerHTML += htmlB;
	}	
}

//Posicionar fichas
function posicionarFichas()
{
	let posicionesA = getPropiedad('A', 'posiciones'),
		posicionesB = getPropiedad('B', 'posiciones');
		// console.log(posicionesA);
		// console.log(posicionesB);

	//si algun array esta vacio no continuamos
	if(typeof posicionesA[0] === 'undefined' && typeof posicionesB[0] === 'undefined')
		return;

	let imgA = document.querySelector('#fichas-A>img'),
		imgB = document.querySelector('#fichas-B>img'),
		imgsA = document.querySelectorAll('#fichas-A>img'),
		imgsB = document.querySelectorAll('#fichas-B>img');
		

	fichasA = new Array();
	fichasB = new Array();

	for(let i = 0; i < posicionesA.length; i++)
	{
		fichasA[i] = new Ficha(imgA);
		fichasA[i].posicion = posicionesA[i];
		imgsA[i].classList.add('oculto');
	}
	for(let i = 0; i < posicionesB.length; i++)
	{
		fichasB[i] = new Ficha(imgB);
		fichasB[i].posicion = posicionesB[i];
		imgsB[i].classList.add('oculto');
	}
	dibujarCuadricula();
	dibujarFichas(document.getElementById('campo'));

	//ahora mostramos el boton de listo
	let botonA = document.querySelector('#fichas-A>button'),
		botonB = document.querySelector('#fichas-B>button');

	if(posicionesA.length == 5)
		botonA.classList.remove('oculto');
	if(posicionesB.length == 5)
		botonB.classList.remove('oculto');
}

//Resalta la ficha seleccionada y la prepara para colocarla en el canvas
function seleccionarFicha(ficha)
{
	let fichas = document.querySelectorAll('#zona-fichas img'),
		equipo = ficha.parentNode.id.replace('fichas-', '');

	for(let i=0; i < fichas.length; i++)
	{
		fichas[i].classList.remove('ficha-resaltada');
	}

	ficha.classList.add('ficha-resaltada');
	setPropiedad(equipo, 'estado', 'INCLUYENDO');
}

//Muestra el boton "Listo" cuando no le quedan fichas a un equipo
function mostrarListo(div)
{
	let button = div.querySelector('button'),
	imgs = div.querySelectorAll('img'),
	noHayImagenes = true;

	for (let i = 0; i < imgs.length; i++)
	{
		if (!imgs[i].classList.contains('oculto'))
		{
			noHayImagenes = false;
			break;
		}
	}

	if (noHayImagenes)
	{
		button.classList.remove('oculto');
	}
}

//Marca un equipo como listo
function listo(button)
{
	let div = button.parentNode.parentNode;
	div.classList.add('equipo-listo');

	button.parentNode.innerHTML += '<p>¡LISTO!</p>';
	button.classList.add('oculto');

	let equipo = div.querySelector('div').id.replace('fichas-','');
	setPropiedad(equipo, 'estado', 'LISTO');

	//Si acabo de poner uno a LISTO, esto se cumple cuando ambos lo estan
	if (getPropiedad('A', 'estado') == getPropiedad('B', 'estado'))
	{
		setPropiedad('A', 'estado', 'JUGANDO');
		setPropiedad('B', 'estado', 'JUGANDO');

		let zonaMarcador = document.getElementById('zona-marcador'),
			zonaFichas = div.parentNode;

		zonaMarcador.classList.remove('oculto');
		zonaFichas.classList.add('oculto');
	}
}


//Coloca las fichas de un equipo aleatoriamente
function aleatorio(equipo)
{
	if (getPropiedad(equipo, 'estado') == 'LISTO')
		return;

	let cv = document.getElementById('campo'),
		i = 0, j, ocupada = false, randomF, randomC;

	if (equipo == 'A')
	{
		setPropiedad('A', 'posiciones', new Array());
		fichasA = new Array();
		dibujarCuadricula();
		let imgA = document.querySelector('#fichas-A>img');

		while(i < 5)
		{
			ocupada = false;
			randomF = Math.floor(Math.random() * (9 - 0) + 0);
			randomC = Math.floor(Math.random() * (10 - 1) + 1);

			//Comprobamos si la casilla esta ocupada
			for (j = 0; j < fichasA.length; j++)
			{
				if (randomF == fichasA[j].posicion.y && randomC == fichasA[j].posicion.x)
				{
					ocupada = true;
					break;
				}
			}

			//Solo agregamos la ficha nueva al array cuando no este ocupada, si no, se intenta con otra
			if (!ocupada)
			{
				fichasA[i] = new Ficha(imgA);
				fichasA[i].posicion.x = randomC;
				fichasA[i].posicion.y = randomF;
				let pos = new Posicion(randomC, randomF),
				    posiciones = getPropiedad('A', 'posiciones');
				posiciones.push(pos);
				setPropiedad('A', 'posiciones', posiciones);
				i++;	
			}		
		}
	}

	else
	{	
		setPropiedad('B', 'posiciones', new Array());
		fichasB = new Array();
		dibujarCuadricula();
		let imgB = document.querySelector('#fichas-B>img');

		while(i < 5)
		{
			ocupada = false;
			randomF = Math.floor(Math.random() * (9 - 0) + 0);
			randomC = Math.floor(Math.random() * (19 - 10) + 10);
			
			//Comprobamos si la casilla esta ocupada
			for (j = 0; j < fichasB.length; j++)
			{
				if (randomF == fichasB[j].posicion.y && randomC == fichasB[j].posicion.x)
				{
					ocupada = true;
					break;
				}
			}

			//Solo agregamos la ficha nueva al array cuando no este ocupada, si no, se intenta con otra
			if (!ocupada)
			{
				fichasB[i] = new Ficha(imgB);
				fichasB[i].posicion.x = randomC;
				fichasB[i].posicion.y = randomF;
				let pos = new Posicion(randomC, randomF),
				    posiciones = getPropiedad('B', 'posiciones');
				posiciones.push(pos);
				setPropiedad('B', 'posiciones', posiciones);
				i++;	
			}
		}
	}

	dibujarFichas(cv);
	//limpiamos las fichas disponibles de colocar
	let imgs = document.querySelectorAll('#fichas-' + equipo + '>img');
	for(let i=0; i < imgs.length; i++)
	{
		imgs[i].classList.add('oculto');
	}

	//ahora mostramos el boton de listo
	let boton = document.querySelector('#fichas-' + equipo + '>button');
	boton.classList.remove('oculto');
}










/* ----------------------------------------------- CANVAS ----------------------------------------------- */
function dibujarCuadricula()
{
	let cv = document.getElementById('campo'),
		ctx = cv.getContext('2d'),
		dim = cv.width/20;

	//dibujamos el campo
	ctx.beginPath();

	ctx.strokeStyle = '#4CAF50';
	ctx.lineWidth = 3;
	ctx.fillStyle = '#81C784';
	ctx.fillRect(1 * dim, 0, 18 * dim, 9 * dim);
	ctx.strokeRect(1 * dim, 0, 18 * dim, 9 * dim);

	ctx.stroke();

	//dibujamos las porterias
	ctx.beginPath();

	ctx.strokeStyle = '#4CAF50';
	ctx.fillStyle = '#A5C6A7';
	ctx.lineWidth = 3;
	ctx.fillRect(0, 3 * dim, 1 * dim, 3 * dim);
	ctx.strokeRect(0, 3 * dim, 1 * dim, 3 * dim);
	ctx.fillRect(19 * dim, 3 * dim, 1 * dim, 3 * dim);
	ctx.strokeRect(19 * dim, 3 * dim, 1 * dim, 3 * dim);

	ctx.stroke();

	//dibujamos las lineas
	ctx.beginPath();

	ctx.lineWidth = 2;
	ctx.strokeStyle = '#4CAF50';
	

	for (let i = 1; i <= 8; i++)
	{
		// Lineas horizontales
		if(i == 4 || i == 5)
		{
			ctx.moveTo(0, i * dim);
			ctx.lineTo(cv.width * dim, i * dim);	
		}
		else
		{
			ctx.moveTo(1 * dim, i * dim);
			ctx.lineTo(cv.width - 1* dim, i * dim);
		}
	}

	for (let j = 1; j <= 19; j++)
	{
		// Lineas verticales
		ctx.moveTo(j * dim, 0);
		ctx.lineTo(j * dim, cv.height);	
	}

	ctx.stroke();

	//terminamos de dibujar el resto de elementos
	ctx.beginPath();
	
	//dibujamos los elementos del campo
	ctx.lineWidth = 2.5;
	ctx.strokeStyle = '#FFF';

	//area izquierda
	ctx.strokeRect(1 * dim, 2 * dim, 3 * dim, 5 * dim);
	//dibujamos el circulo del area izquieda
	ctx.moveTo(4 * dim, dim * 4);
	//ctx.arc(centro(x), centro(y), radio, grado en el que empieza el circulo, grado en el que termina, sentido del dibujado)
	//false = sentido de las agujas del reloj
	ctx.arc(4 * dim, 4 * dim + dim/2, dim, -Math.PI/2, Math.PI/2, false);

	//area derecha
	ctx.strokeRect(16 * dim, 2 * dim, 3 * dim, 5 * dim);
	//dibujamos el circulo del area derecha
	ctx.moveTo(16 * dim, dim * 4);
	ctx.arc(16 * dim, 4 * dim + dim/2, dim, -Math.PI/2, Math.PI/2, true);

	//linea central
	ctx.moveTo(10 * dim, 0);
	ctx.lineTo(10 * dim, cv.height);
	//dibujamos el circulo central
	ctx.moveTo(10 * dim, dim * 4);
	ctx.arc(10 * dim, 4 * dim + dim/2, dim, -Math.PI/2, 2*Math.PI, false);

	ctx.stroke();
}

//Dibuja las fichas
function dibujarFichas(cv)
{
	// console.log('Fichas');
	let ctx = cv.getContext('2d'),
		dim = cv.width / 20,
		imagenA = document.querySelector('#fichas-A>img'),
		imagenB = document.querySelector('#fichas-B>img');

	// console.log(imagenA);
	// console.log(imagenB);

	//dibujamos las fichas del equipo A
	for(let i=0; i < fichasA.length; i++)
	{
		fil = fichasA[i].posicion.y;
		col = fichasA[i].posicion.x;
		ctx.drawImage(imagenA, col * dim, fil * dim, dim, dim);
	}

	//dibujamos las fichas del equipo B
	for(let j=0; j < fichasB.length; j++)
	{
		fil = fichasB[j].posicion.y;
		col = fichasB[j].posicion.x;
		// console.log('Estoy dibujando la ficha');
		ctx.drawImage(imagenB, col * dim, fil * dim, dim, dim);
	}
}

//devuelve false si intentas acceder a una posicion fuera del campo
function comprobarLimites(x, y, cv, dim)
{
	if(typeof cv !== 'undefined')
	{
		//si estoy en la fila 3, 4 o 5
		if((y > 3 * dim && y < 4 * dim) || (y > 4 * dim && y < 5 * dim) || (y > 5 * dim && y < 6 * dim))
		{
			//si estoy en la columna 0 o la 19
			if((x > 1 && x < 1 * dim) || (x > 19 * dim && x < cv.width - 1)) 
			{
				//puedo llegar hasta el final del canvas
				if(x < 1 || x > cv.width-1 || y < 1 || y > cv.height-1)
				{
					return false;
				}
			}
			//si esta a menos de la 0 o mas de la 19
			else if(x < 1 || x > cv.width - 1)
			{
				return false;
			}
		}
		//si no esta en ninguna de los lugares especiales
		else
		{
			//solo puedo llegar hasta el final del campo
			if(x < (1 * dim) || x > cv.width - 1 * dim - 1 || y < 1 || y > cv.height-1)
			{
				return false;
			}
		}
		return true;
	}
}

//Muestra distintos mensajes de error
function mensajeError(error)
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

	fondo.appendChild(contenedor);

	if (error == 'ocupada')
	{
		mensaje += '<h3>Casilla ocupada</h3>';
		mensaje += '<p>La casilla de destino ya está ocupada por otra ficha.</p>';
	}

	else if (error == 'campo equivocado')
	{
		mensaje += '<h3>Campo equivocado</h3>';
		mensaje += '<p>Las fichas deben colocarse en su campo al inicio.</p>';
	}

	else if (error == 'porteria')
	{
		mensaje += '<h3>Buen intento majo ;)</h3>';
		mensaje += '<p>Marcar un gol no puede ser tan fácil.</p>';
	}

	else if (error == 'incorrecta')
	{
		mensaje += '<h3>Posición incorrecta</h3>';
		mensaje += '<p>La posición no es correcta. Elija una de las resaltadas.</p>';
	}
	
	mensaje += '<button onclick="this.parentNode.parentNode.remove();" class="boton">Aceptar</button>';
	contenedor.innerHTML = mensaje;
	fondo.classList.add('fondo-mensaje');
	contenedor.classList.add('contenedor-mensaje');

	document.body.appendChild(fondo);
}










/* ----------------------------------------------- EVENTOS DE MOUSE ----------------------------------------------- */
function mouse_click(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

	if(!comprobarLimites(x, y, cv, dim))
		return;

	console.log(`CLICK=>fila: ${fila} - columna: ${columna}`);

	// Limpiar canvas
	dibujarCuadricula();
	dibujarFichas(cv);

	let ctx = cv.getContext('2d'),
		 img = new Image(),
		 ficha,
		 seleccionada = false;

	//Agregando fichas de fuera
	if (getPropiedad('A', 'estado') == 'INCLUYENDO' || getPropiedad('B', 'estado') == 'INCLUYENDO')
	{
		let fichaSeleccionada = document.querySelector('#zona-fichas .ficha-resaltada');

		if(posCorrecta(x, y, cv, fichaSeleccionada))
		{
			//Creamos la ficha y la metemos al array del equipo que le corresponda
			let ficha = new Ficha(fichaSeleccionada),
				pos = new Posicion(Math.floor(x / dim), Math.floor(y / dim));

			ficha.posicion = pos;
			if(ficha.equipo == 'A')
				fichasA.push(ficha);

			else
				fichasB.push(ficha);

			let posiciones = getPropiedad(ficha.equipo, 'posiciones');
			posiciones.push(pos);
			setPropiedad(ficha.equipo, 'posiciones', posiciones);

			dibujarFichas(cv);

			//Para "quitarla" de su contenedor
			fichaSeleccionada.classList.add('oculto');
			mostrarListo(fichaSeleccionada.parentNode);

			setPropiedad(ficha.equipo, 'estado', 'COLOCANDO');
		}

		else
		{
			dibujarCuadricula();
			dibujarFichas(cv);
		}
	}

	//Jugando
	else if(marcador.dado != 0)
	{
		//creamos un numero para saber la posicion del array de las fichas
		let posFi = 0;
		if(marcador.turno == 'A')
		{
			//recorremos el array de fichas para ver si hemos pinchado en alguna y la seleccionamos
			for(let i = 0; i < fichasA.length; i++)
			{
				//si hemos pinchado en una ficha
				if(fila == fichasA[i].posicion.y && columna == fichasA[i].posicion.x)
				{
					//le quitamos la seleccion al resto de fichas
					for(let j=0; j < fichasA.length; j++)
					{
						if(j != i)
						{
							fichasA[j].seleccionada = false;
						}
					}

					//Si esta seleccionada, la deseleccionamos, y viceversa
					fichasA[i].seleccionada = !fichasA[i].seleccionada;

					break;
				}
			}
			//recorremos el array y cogemos la ficha seleccionada
			for(let j = 0; j < fichasA.length; j++)
			{
				if(fichasA[j].seleccionada)
				{
					seleccionada = true;
					posFi = j;
					ficha = fichasA[j];
					break;
				}
			}
		}
		else
		{
			//recorremos el array de fichas para ver si hemos pinchado en alguna y la seleccionamos
			for(let i = 0; i < fichasB.length; i++)
			{
				//si hemos pinchado en una ficha
				if(fila == fichasB[i].posicion.y && columna == fichasB[i].posicion.x)
				{
					//le quitamos la seleccion al resto de fichas
					for(let j=0; j < fichasB.length; j++)
					{
						if(j != i)
						{
							fichasB[j].seleccionada = false;
						}
					}

					//Si esta seleccionada, la deseleccionamos, y viceversa
					fichasB[i].seleccionada = !fichasB[i].seleccionada;
					break;
				}
			}
			//recorremos el array y cogemos la ficha seleccionada
			for(let j = 0; j < fichasB.length; j++)
			{
				if(fichasB[j].seleccionada)
				{
					seleccionada = true;
					ficha = fichasB[j];
				}
			}
		}
		if(seleccionada)
		{
			//destacar casilla de la ficha
			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ctx.fillRect(ficha.posicion.x*dim, ficha.posicion.y*dim, dim, dim);
			ctx.strokeRect(ficha.posicion.x*dim, ficha.posicion.y*dim, dim, dim);
			dibujarFichas(cv);

			ficha.actualizarDestinos(e);
			if(typeof ficha.destinos[0] !== 'undefined')
			{
				//si pulsamos en alguno de los destinos disponibles
				if(ficha.enDestino(fila, columna))
				{
					//cambiamos la posicion de la ficha
					ficha.posicion.x = columna;
					ficha.posicion.y = fila;
					//la cambiamos en el session storage
					pos = new Posicion(Math.floor(columna), Math.floor(fila));
					let posiciones = getPropiedad(ficha.equipo, 'posiciones');
					posiciones[posFi] = pos;
					setPropiedad(ficha.equipo, 'posiciones', posiciones);
					//actualizamos los destinos de la ficha que hemos movido
					ficha.actualizarDestinos(e);
					//le quitamos la seleccion
					ficha.seleccionada = false;
					
					//comprobamos si ha marcado gol
					if (ficha.enPorteria())
					{
						if (ficha.equipo == 'A')
						{
							fichasA.splice(posFi,1);

							let posA = getPropiedad('A', 'posiciones');
							posA.splice(posFi, 1);
							setPropiedad('A', 'posiciones', posA);

							if (fichasA.length == 0)
								aleatorio('A');
						}

						else if (ficha.equipo == 'B')
						{
							fichasB.splice(posFi,1);

							let posB = getPropiedad('B', 'posiciones');
							posB.splice(posFi, 1);
							setPropiedad('B', 'posiciones', posB);

							if (fichasB.length == 0)
								aleatorio('B');
						}
					}

					//se cambia el turno del equipo
					marcador.cambiarTurno();
					dibujarCuadricula();
				}
				if(ficha.seleccionada)
					ficha.dibujarDestinos(e);
			}
		}
	}
	if(!seleccionada)
	{
		// Destacar casilla con click
		ctx.fillStyle = '#C8E6C9';
		ctx.lineWidth = 3;
		ctx.fillRect(columna*dim, fila*dim, dim, dim);
	}
	else
	{
		// Destacar casilla a la que no puedes ir con click
		ctx.fillStyle = '#FAC';
		ctx.lineWidth = 3;
		ctx.fillRect(columna*dim, fila*dim, dim, dim);
	}
	dibujarFichas(cv);
}

function mouse_move(e)
{
	//devuelve la posicion X e Y del raton dentro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 20,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim),
		 seleccionada = false,
		 ficha = 'undefined',
		 fichaEquipo ='undefined',
		 ctx = cv.getContext('2d');

	//solo podra moverse mientras este colocando
	if(cv.getAttribute('data-down'))
	{
		//recuperamos los atributos del canvas
		let fichaEquipo = cv.getAttribute('ficha-equipo'),
			posArray = cv.getAttribute('pos-array');

		//na vez que los tenemos, los borramos

		if(fichaEquipo == 'A')
		{
			ficha = fichasA[posArray];
			ficha.seleccionada = true;
			seleccionada = true;
		}
		else
		{
			ficha = fichasB[posArray];
			ficha.seleccionada = true;
			seleccionada = true;
		}
		if(!comprobarLimites(x, y, e, dim))
			return;

	}
	if(seleccionada)
	{
		//estoy arrastrando la ficha
		if(ficha.posicion.x != columna || ficha.posicion.y != fila)
		{
			//si es del equipo A, parte izquierda del campo
			if(fichaEquipo == 'A')
			{
				//si no esta dentro de su campo
				if(x < (1 * dim) || x > 10 * dim - 1 || y < 1 || y > cv.height-1)
					return false;
				//si esta dentro de su campo
				else
				{
					for(let i=0; i < fichasA.length; i++)
					{
						filA = fichasA[i].posicion.y;
						colA = fichasA[i].posicion.x;
						if(filF == filA && colF == colA)
							return false;
					}
				}
			}
			//si son del equipo B, parte derecha del campo
			else if(fichaEquipo == 'B')
			{
				//si no estan en su campo
				if(x < (10 * dim) - 1 || x > cv.width - 1 * dim - 1 || y < 1 || y > cv.height-1)
					return false;
				//si esta dentro de su campo
				else
				{
					for(let j=0; j < fichasB.length; j++)
					{
						filB = fichasB[j].posicion.y;
						colB = fichasB[j].posicion.x;
						if(filF == filB && colF == colB)
							return false;
					}
				}
			}
			ficha.posicion.x = columna;
			ficha.posicion.y = fila;
			dibujarCuadricula();
			//destacar casilla de la ficha
			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ctx.fillRect(ficha.posicion.x * dim, ficha.posicion.y * dim, dim, dim);

			dibujarFichas(cv);
		}
	}
}

function mouse_down(e)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

	//comprobamos si hemos seleccionado alguna ficha
	for (let i = 0; i < fichasA.length; i++)
	{
		if (fichasA[i].posicion.x == columna && fichasA[i].posicion.y == fila)
		{
			cv.setAttribute('data-down', 'true');
			cv.setAttribute('ficha-equipo', 'A');
			cv.setAttribute('pos-array', i);
			break;
		}
	}

	for (let i = 0; i < fichasB.length; i++)
	{
		if (fichasB[i].posicion.x == columna && fichasB[i].posicion.y == fila)
		{
			cv.setAttribute('data-down', 'true');
			cv.setAttribute('ficha-equipo', 'B');
			cv.setAttribute('pos-array', i);
			break;
		}
	}
}

function mouse_up(e)
{

	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY,
		dim 	  = cv.width/20,
		fila    = Math.floor(y/dim),
		columna = Math.floor(x/dim);

	cv.removeAttribute('data-down');
	cv.removeAttribute('ficha-equipo');
	cv.removeAttribute('pos-array');
}










/* ----------------------------------------------- DRAG & DROP ----------------------------------------------- */
//comprueba que la ficha se pueda colocar en la posicion que le corresponde
function posCorrecta(x, y, cv, ficha)
{
	let equipo = ficha.parentNode.id.replace('fichas-', ''),
		dim = cv.width/20,
		filF = Math.floor(y / dim),
		colF = Math.floor(x / dim);

	//si es del equipo A, parte izquierda del campo
	if(equipo == 'A')
	{
		//si no esta dentro de su campo
		if(x < (1 * dim) || x > 10 * dim - 1 || y < 1 || y > cv.height-1)
		{
			if (y > 3 * dim && y < 6 * dim)
			{
				//Porteria
				if (x < dim || x > 19 * dim)
				{
					mensajeError('porteria');
					return false;
				}
			}

			mensajeError('campo equivocado');
			return false;
		}
		//si esta dentro de su campo
		else
		{
			for(let i=0; i < fichasA.length; i++)
			{
				filA = fichasA[i].posicion.y;
				colA = fichasA[i].posicion.x;
				if(filF == filA && colF == colA)
				{
					mensajeError('ocupada');
					return false;
				}
			}
		}
	}
	//si son del equipo B, parte derecha del campo
	else
	{
		//si no estan en su campo
		if(x < (10 * dim) - 1 || x > cv.width - 1 * dim - 1 || y < 1 || y > cv.height-1)
		{
			if (y > 3 * dim && y < 6 * dim)
			{
				//Porteria
				if (x < dim || x > 19 * dim)
				{
					mensajeError('porteria');
					return false;
				}
			}

			mensajeError('campo equivocado');
			return false;
		}
		//si esta dentro de su campo
		else
		{
			for(let j=0; j < fichasB.length; j++)
			{
				filB = fichasB[j].posicion.y;
				colB = fichasB[j].posicion.x;
				if(filF == filB && colF == colB)
				{
					mensajeError('ocupada');
					return false;
				}
			}
		}
	}

	return true;
}

function iniciarDragNDrop()
{
	//Zona dragabble
	let imagenes = document.querySelectorAll('#fichas-A>img, #fichas-B>img');

	for (let i = 0; i < imagenes.length; i++)
	{
		imagenes[i].setAttribute('dragabble', 'true');
		imagenes[i].id = 'ficha' + i;
		imagenes[i].setAttribute('onclick', 'seleccionarFicha(this);');

		imagenes[i].ondragstart = function (e)
		{
			e.dataTransfer.setData('text/plain', imagenes[i].id);
		};
	}

	//Zona droppable
	let cv = document.getElementById('campo');

	cv.ondragover = function (e)
	{
		e.preventDefault();
		e.stopPropagation();
		let x = e.offsetX,
			y = e.offsetY,
			cx = cv.getContext('2d'),
			dim = cv.width/20,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim);

		dibujarCuadricula();
		dibujarFichas(cv);
		if(comprobarLimites(x, y, cv, dim))
		{
			cx.beginPath();
			cx.lineWidth = 3;
			cx.fillStyle = '#C8E6C9';
			cx.strokeRect(columna*dim, fila*dim, dim, dim);
			cx.fillRect(columna * dim, fila * dim, dim, dim);
		}
	};

	cv.ondrop = function (e)
	{
		e.preventDefault();
		e.stopPropagation();
		let x = e.offsetX,
			y = e.offsetY,
			id = e.dataTransfer.getData('text/plain'),
			cx = cv.getContext('2d'),
			dim = cv.width/20,
			fila = Math.floor(y/dim),
			columna = Math.floor(x/dim),
			img = new Image();

		let fichaArrastrada = document.getElementById(id);

		if(posCorrecta(x, y, cv, fichaArrastrada))
		{
			//creamos la ficha y la metemos al array del equipo que le corresponda
			let ficha = new Ficha(fichaArrastrada),
				pos = new Posicion(Math.floor(x / dim), Math.floor(y / dim));

			ficha.posicion = pos;
			if(ficha.equipo == 'A')
				fichasA.push(ficha);

			else
				fichasB.push(ficha);

			let posiciones = getPropiedad(ficha.equipo, 'posiciones');
			posiciones.push(pos);
			setPropiedad(ficha.equipo, 'posiciones', posiciones);

			dibujarFichas(cv);

			//Para "quitarla" de su contenedor
			fichaArrastrada.classList.add('oculto');
			mostrarListo(fichaArrastrada.parentNode);
		}
		else
		{
			dibujarCuadricula();
			dibujarFichas(cv);
		}
	};
}