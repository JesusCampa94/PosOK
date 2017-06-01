//Clase ficha
class Ficha
{
	constructor()
	{
		this.fila = -1;
		this.columna = -1;
		this.seleccionada = false;
	}
}

class Marcador
{
	constructor()
	{
		this.puntosA = 0;
		this.puntosB = 0;
	}

	refrescar()
	{

	}

	golA()
	{
		this.puntosA++;

	}
}

//Variables globales
var fichasA = new Array();
var fichasB = new Array();

fichasA = [new Ficha(), new Ficha(), new Ficha(), new Ficha(), new Ficha()];
fichasB = [new Ficha(), new Ficha(), new Ficha(), new Ficha(), new Ficha()];


//Escribe los nombres de los equipos y carga los colores de las fichas
! function obtenerDatos()
{
	let p = document.querySelector('#login-container>p');
	let html = '<span class="color-' + sessionStorage['fichaA'] + ' negrita">' +  sessionStorage['A'] + '</span> <span id="puntos-A">0</span> - <span id="puntos-B">0</span> <span class="color-' + sessionStorage['fichaB'] + ' negrita">' +  sessionStorage['B'] + '</span>';

	p.innerHTML = html;

	p = document.querySelector('#zona-marcador>div>p');
	html = '<span class="color-' + sessionStorage['fichaA'] + ' negrita">' +  sessionStorage['A'] + '</span> <span id="goles-A">0</span> - <span id="goles-B">0</span> <span class="color-' + sessionStorage['fichaB'] + ' negrita">' +  sessionStorage['B'] + '</span>'

	p.innerHTML = html;
	p.classList.add('texto-grande');

	//Cargamos 5 fichas para cada equipo
	cargarFichas();
}();

function cargarFichas()
{
	let nombresColores = ['rosa', 'azul', 'amarilla', 'verde', 'verde azulada', 'roja'],
		divA = document.getElementById('fichas-A'),
		divB = document.getElementById('fichas-B'),
		htmlA = '<img src="img/ficha-' + sessionStorage['fichaA'] + '.svg" alt="Ficha ' + nombresColores[sessionStorage['fichaA']] + '">',
		htmlB = '<img src="img/ficha-' + sessionStorage['fichaB'] + '.svg" alt="Ficha ' +  nombresColores[sessionStorage['fichaB']] + '">';

	for(let i = 0; i < 5; i++)
	{
		divA.innerHTML += htmlA;
		divB.innerHTML += htmlB;
	}	
}










/* ----------------------------------------------- CANVAS ----------------------------------------------- */
//lo unico que hace es llamar a otra funcion
!function inicializar()
{
	dibujarCanvas();
	iniciarDragNDrop();
}();

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

		for (let j = 1; j <= 19; j++)
		{
			// Lineas verticales
			ctx.moveTo(j * dim, 0);
			ctx.lineTo(j * dim, cv.height);	
		}
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

	//ahora dibujamos las porterias

}

function dibujarCanvas()
{
	let cv = document.getElementById('campo'),
		 ctx = cv.getContext('2d'),
		 dim = cv.width/20,
		 img = new Image();

	cv.width = cv.width;
	dibujarCuadricula();
	img.onload = function()
	{
		ctx.drawImage(img, ficha.columna*dim, ficha.fila*dim, dim, dim);
	};
	img.src = 'circulo.svg';
}

//Dibuja las fichas
function dibujarFichas()
{

}

//devuelve false si intentas acceder a una posicion fuera del campo
function comprobarLimites(e, dim)
{
	let cv     = e.target,
		x		  = e.offsetX,
		y 		  = e.offsetY;

	//si estoy en la fila 3, 4 o 5
	if((y > 3 * dim && y < 4 * dim) || (y > 4 * dim && y < 5 * dim) || (y > 5 * dim && y < 6 * dim))
	{
		//si estoy en la columna 0 o la 19
		if((x > 1 && x < 1 * dim) || (x > 19 * dim && x < cv.width - 1)) 
		{
			//puedo llegar hasta el final del canvas
			if(x < 1 || x > cv.width-1 || y < 1 || y>cv.height-1)
				return false;
		}
	}
	//si no esta en ninguna de los lugares especiales
	else
	{
		//solo puedo llegar hasta el final del campo
		if(x < (1 * dim) || x > cv.width - 1 * dim - 1 || y < 1 || y > cv.height-1)
			return false;
	}
	return true;
}

//obtene un numero aleatorio de 1 a 6 incluidos
function tirarDado()
{
	var num = Math.floor(Math.random() * (7 - 1) + 1);
	console.log(`numero: ${num}`);
	return num;
}

//marca en el campo las casillas a las que puede ir la ficha seleccionada
function dibujarDestinos()
{
	
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

	if(!comprobarLimites(e, dim))
		return;

	console.log(`CLICK=>fila: ${fila} - columna: ${columna}`);

	// Limpiar canvas
	cv.width = cv.width;
	dibujarCuadricula();

	let ctx = cv.getContext('2d'),
		 img = new Image();

	//si al hacer click pinchamos en la ficha
	if(fila == ficha.fila && columna == ficha.columna && ficha.seleccionada == false)
	{
		ficha.seleccionada = true;
	}
	else if(fila == ficha.fila && columna == ficha.columna && ficha.seleccionada == true)
	{
		ficha.seleccionada = false;
	}

	img.onload = function()
	{
		if(ficha.seleccionada)
		{
			//destacar casilla de la ficha
			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ficha.fila = fila;
			ficha.columna = columna;
			ctx.fillRect(ficha.columna*dim, ficha.fila*dim, dim, dim);
		}
		ctx.drawImage(img, ficha.columna*dim, ficha.fila*dim, dim, dim);
	};
	img.src = 'circulo.svg';

	console.log(`Ficha=>fila: ${ficha.fila} - columna: ${ficha.columna} - seleccion: ${ficha.seleccionada}`);
	
	// Destacar casilla con click
	ctx.fillStyle = '#C8E6C9';
	ctx.lineWidth = 3;
	ctx.fillRect(columna*dim, fila*dim, dim, dim);
}

function mouse_move(e)
{
	//devuelve la posicion X e Y del raton delntro del evento
	let cv      = e.target,
		 x       = e.offsetX,
		 y       = e.offsetY
		 dim     = cv.width / 20,
		 fila    = Math.floor(y / dim),
		 columna = Math.floor(x / dim),
		 ctx = cv.getContext('2d');

	if(!comprobarLimites(e, dim))
		return;

	//console.log(`Posición: ${x} - ${y}`);//de este modo podemos interpolar variables y sustituirlas por su valor
	//console.log('Posición' + 'x' + ' - ' + 'y');//ambos son equivalentes
	if(cv.getAttribute('data-down'))
	{
		//estoy arrastrando la ficha
		if(ficha.columna != columna || ficha.fila != fila)
		{
			ficha.columna = columna;
			ficha.fila = fila;
			dibujarCanvas();

			//destacar casilla de la ficha
			ctx.fillStyle = '#C8E6C9';
			ctx.lineWidth = 3;
			ficha.fila = fila;
			ficha.columna = columna;
			ctx.fillRect(ficha.columna*dim, ficha.fila*dim, dim, dim);
			ficha.seleccionada = false;
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

	if(ficha.columna == columna && ficha.fila == fila)
	{
		//hay ficha
		cv.setAttribute('data-down', 'true');
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
}










/* ----------------------------------------------- DRAG & DROP ----------------------------------------------- */
function iniciarDragNDrop()
{
	//Zona dragabble
	let imagenes = document.querySelectorAll('#fichas-A>img, #fichas-B>img');

	for (let i = 0; i < imagenes.length; i++)
	{
		imagenes[i].setAttribute('dragabble', 'true');
		imagenes[i].id = 'ficha' + i;

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

		img.onload = function ()
		{
			cx.drawImage(img, columna*dim, fila*dim, dim, dim);
			//volvemos a dibujar la cuadricula otra vez para que las imagenes no queden por encima de las lineas de esta
			// dibujarCuadricula();
		};

		img.src = document.getElementById(id).src;
	};
}