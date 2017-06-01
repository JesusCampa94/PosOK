//Clase ficha
class Ficha
{
	constructor()
	{
		this.fila = 0;
		this.columna = 0;
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
var ficha = new Ficha();


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