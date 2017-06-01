//Variables globales
var fichasEquipos = new Array(),
	listos = new Array();

listos['A'] = 'STANDBY';
listos['B'] = 'STANDBY';


//Rellena los formularios si encuentra datos en sessionStorage
! function obtenerDatosSesion()
{
	let input, ficha;
	// let rect, x, y;

	if (typeof sessionStorage['A'] !== 'undefined')
	{
		input = document.getElementById('equipoA');
		input.value = sessionStorage['A'];
	}

	if (typeof sessionStorage['fichaA'] !== 'undefined')
	{
		ficha = document.getElementById('A' + sessionStorage['fichaA']);
		elegirFicha(ficha);
	}

	if (typeof sessionStorage['B'] !== 'undefined')
	{
		input = document.getElementById('equipoB');
		input.value = sessionStorage['B'];
	}

	if (typeof sessionStorage['fichaB'] !== 'undefined')
	{
		ficha = document.getElementById('B' + sessionStorage['fichaB']);
		elegirFicha(ficha);
	}

}();

//Elige una ficha para un equipo e impide que el otro equipo la elija
function elegirFicha(ficha)
{
	let equipo = ficha.parentNode.id,
		equipoContrario = (equipo == 'A' ? 'B' : 'A'),
		idContrario = ficha.id.replace(equipo, equipoContrario),
		fichaContraria = document.getElementById(idContrario),
		color = ficha.getAttribute('fill');

	// console.log(`Ficha: ${ficha} Equipo: ${equipo}, contrario: ${equipoContrario}, id contrario: ${idContrario} ficha contraria: ${fichaContraria}, color: ${color}`);

	fichasEquipos[equipo] = ficha.id.replace(equipo, '');

	//Para no desactivar mas de una ficha a la vez
	reiniciarFichas(document.getElementById(equipoContrario));

	resaltarFicha(ficha, fichaContraria);
}


//Resalta la ficha seleccionada y deshabilita la opuesta
function resaltarFicha(ficha, fichaContraria)
{
	let rect = document.getElementById(ficha.parentNode.id + 'S'),
		x = ficha.getAttribute('cx') - 28,
		y = ficha.getAttribute('cy') - 28;

	//Resaltar ficha seleccionada
	rect.setAttribute('x', x);
	rect.setAttribute('y', y);
	rect.setAttribute('fill', '#BBDEFB');

	//Colorear en gris la del equipo opuesto y evitar que pueda hacerse clic
	fichaContraria.setAttribute('fill','#455A64');
	fichaContraria.setAttribute('stroke','#263238');
	fichaContraria.removeAttribute('onclick');
}


//Reinicia una lista de fichas
function reiniciarFichas(svg)
{
	//Creamos una matriz con fills y strokes para no eliminar nodos, solo reiniciar valores
	let colores = 
	[
		['#FFAACC', '#2193F3', '#FFC107', '#8BC34A', '#009688', '#F44336'],
		['#E91E63', '#0D41A1', '#FF6F00', '#33691E', '#004D40', '#B71C1C']
	];

	fichas = svg.querySelectorAll('circle');

	for (let i = 0; i < 6; i++)
	{
		fichas[i].setAttribute('fill', colores[0][i]);
		fichas[i].setAttribute('stroke', colores[1][i]);
		fichas[i].setAttribute('onclick', 'elegirFicha(this);');
	}
}


//Valida un equipo (comprueba que tiene nombre y color)
function validarEquipo(equipo)
{
	let mensaje = document.querySelector('#' + equipo + '~.incorrecto'),
		input = document.getElementById('equipo' + equipo),
		div = document.getElementById(equipo).parentNode.parentNode.parentNode;

	//Sin nombre o color
	if (input.value == '' || fichasEquipos[equipo] === undefined)
	{
		//Sin color
		if (fichasEquipos[equipo] === undefined)
		{
			mensaje.classList.remove('oculto');
		}

		//Coloreamos el div de rojo
		div.classList.remove('equipo-listo');
		div.classList.add('equipo-incorrecto');

		return false;
	}

	//Todo bien, todo correcto
	else
	{
		mensaje.classList.add('oculto');

		//Coloreamos el div de verde
		div.classList.remove('equipo-incorrecto');
		div.classList.add('equipo-listo');

		return true;
	}
}


//Muestra un mensaje cuando ambos equipos estan listos
function mostrarMensaje()
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Listo para jugar</h3>';
		mensaje += '<p><span class="color-' + sessionStorage['fichaA'] + ' negrita">' + sessionStorage['A'] + '</span> vs. <span class="color-' + sessionStorage['fichaB'] + ' negrita">' + sessionStorage['B'] + '</span></p>';
		mensaje += '<p>Buena suerte a ambos.</p>';
		mensaje += '<a href="juego.html" onclick="this.parentNode.parentNode.remove();" class="boton">Jugar</a>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
}


//Guarda los datos del equipo en sessionStorage. Si ambos equipos estan listos, redirige al juego
function listo(form)
{
	 let equipo = form.querySelector('svg').id,
	 	input = document.getElementById('equipo' + equipo);

	if (validarEquipo(equipo))
	{
		sessionStorage[equipo] = input.value;
		sessionStorage['ficha' + equipo] = fichasEquipos[equipo];

		listos[equipo] = 'OK';

		if (listos['A'] == 'OK' && listos['B'] == 'OK')
		{
			mostrarMensaje();
		}
	}

	return false;
}