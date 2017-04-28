//Paginacion de entradas
let pagEnt = 1,	//Pagina actual
	lPagEnt = 2,	//Longitud pagina
	pagsEnt = 0;	//Paginas totales

//Cuenta las entradas totales, necesario para determinar cuantas paginas hacen falta al mostrarlas
! function contarEntradas()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/';

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		// console.log(obj.FILAS);

		if (obj.RESULTADO = 'ok')
		{
			let numEnt = obj.FILAS.length;

			if (numEnt == 0)
			{
				pagsEnt = 1;
			}

			else
			{
				pagsEnt = Math.ceil(numEnt/lPagEnt);
			}
				
			mostrarEntradas();
		}
	};

	xhr.send();
}();

//Muestra las 6 ultimas entradas paginadas. Es llamada justo despues de contar las entradas y en cada cambio de pagina
function mostrarEntradas()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/?pag=' + (pagEnt-1) + '&lpag=' + lPagEnt,
		divGaleria = document.querySelector('.galeria');

	mostrarPaginacion();

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		// console.log(obj.FILAS);

		if (obj.RESULTADO = 'ok')
		{
			let html = '';

			for (let i = 0; i < obj.FILAS.length; i++)
			{
				let entrada = obj.FILAS[i],
					ruta = 'fotos/' + entrada.fichero;

				html += '<article>';
				html += ' 	<div class="no-grow">';
				html += '		<figure class="con-transparencia">';
				html += '			<img src="' + ruta + '" alt="' + entrada.descripcion_foto + '">';
				html += '			<figcaption>';
				html += 					entrada.descripcion;					
				html += '			</figcaption>';
				html += '		</figure>';
				html += '		<footer>';
				html += '			<a href="entrada.html?id=' + entrada.id + '">Ver más...</a>';
				html += '		</footer>';
				html += '	</div>';
				html += '	<div>';
				html += '		<h3><a href="entrada.html?id=' + entrada.id + '">' + entrada.nombre + '</a></h3>';
				html += '		<p>' + entrada.login + '</p>';
				html += '	</div>';
				html += '	<footer>';
				html += '		<p><time datetime="' + entrada.fecha + '">' + formatearFecha(entrada.fecha, 1) + '</time></p>';
				html += '		<p>' + entrada.nfotos + ' fotos</p>';
				html += '		<p>' + entrada.ncomentarios + ' comentarios</p>';
				html += '	</footer>';
				html += '</article>';
			}

			if (obj.FILAS.length == 0)
			{
				html += '<p>No hay entradas que mostrar</p>';
			}

			divGaleria.innerHTML = html;			
		}
	};

	xhr.send();
}


//Muestra la botonera de paginacion
function mostrarPaginacion()
{
	let p = document.querySelector('.paginacion'); 
		html = '';

	html += '<a onclick="primeraPagina();" title="Primera página"><i class="material-icons">&#xE045;</i></a>';
	html += '<a onclick="paginaAnterior();" title="Página anterior"><i class="material-icons">&#xE020;</i></a>';
	html += 'Página<span class="negrita">' + pagEnt +  '</span>de<span class="negrita">' + pagsEnt + '</span>';
	html += '<a onclick="paginaSiguiente();" title="Página siguiente"><i class="material-icons">&#xE01F;</i></a>';
	html += '<a onclick="ultimaPagina();" title="Última página"><i class="material-icons">&#xE044;</i></a>';

	p.innerHTML = html;
}


//Muestra la primera pagina de entradas
function primeraPagina()
{
	pagEnt = 1;
	mostrarEntradas();
}

//Muestra la pagina anterior de entradas
function paginaAnterior()
{
	if (pagEnt > 1)
	{
		pagEnt--;
		mostrarEntradas();
	}
}


//Muestra la pagina siguiente de entradas
function paginaSiguiente()
{
	if (pagEnt < pagsEnt)
	{
		pagEnt++;
		mostrarEntradas();
	}
}


//Muestra la ultima pagina de entradas
function ultimaPagina()
{
	pagEnt = pagsEnt;
	mostrarEntradas();
}


//Muestra los 10 ultimos comentarios
! function mostrarComentarios()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/comentario/?u=10',
		divComentarios = document.getElementById('comentarios');

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		// console.log(obj.FILAS);

		if (obj.RESULTADO = 'ok')
		{
			let html = '';

			for (let i = 0; i < obj.FILAS.length; i++)
			{
				let comentario = obj.FILAS[i];

				html += '<a href="entrada.html#zona-comentarios">';
				html += '	<article class="comentario">';
				html += '		<h3>' + comentario.titulo + '</h3>';
				html += '		<p><span class="resaltado">De: </span>' + comentario.login + '</p>';
				html += '		<p><span class="resaltado">En: </span>' + comentario.nombre_entrada + '</p>';
				html += '		<hr>';
				html += '		<p>' + comentario.texto + '</p>';
				html += '		<hr>';
				html += '		<footer>';
				html += '			<p class="resaltado"><time datetime="' + comentario.fecha + '">' + formatearFecha(comentario.fecha, 3) + '</time></p>';
				html += '		</footer>';
				html += '	</article>';
				html += '</a>';
			}

			divComentarios.innerHTML = html;			
		}
	};

	xhr.send();
}();