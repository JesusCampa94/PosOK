//Variables globales
var pagEnt = 1,	//Pagina actual
	lPagEnt = 2,	//Longitud pagina
	pagsEnt = 0,	//Paginas totales
	estructuraCreada = false,
	url = 'http://localhost/PosOK/rest/entrada/'; //La url ira creciendo entre diferentes funciones

! function comprobarTipoFecha()
{
	let fI = document.getElementById('fechaInicio'), 
		fF = document.getElementById('fechaFin');

	//si el navegador no reconoce el tipo date
	if (fI.type!="date"){ 
		fI.type = '';
		fI.classList.add('datepicker');
		fF.type = '';
		fF.classList.add('datepicker');
	}

}();

//Cuenta las entradas de los resultados, necesario para determinar cuantas paginas hacen falta al mostrarlas
function contarEntradas(url)
{
	let xhr = new XMLHttpRequest();

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
	mostrarResultados();
}

//Muestra la pagina anterior de entradas
function paginaAnterior()
{
	if (pagEnt > 1)
	{
		pagEnt--;
		mostrarResultados();
	}
}


//Muestra la pagina siguiente de entradas
function paginaSiguiente()
{
	if (pagEnt < pagsEnt)
	{
		pagEnt++;
		mostrarResultados();
	}
}


//Muestra la ultima pagina de entradas
function ultimaPagina()
{
	pagEnt = pagsEnt;
	mostrarResultados();
}


//Crea los nodos del section donde se localizan los resultados (sin incluirlos)
function crearEstructura()
{
	let main = document.querySelector('main');

	//Elementos
	let section = document.createElement('section'),
		h2 = document.createElement('h2'),
		p = document.createElement('p'),
		footer = document.createElement('footer'),
		pFooter = document.createElement('p');

	//Contenido de elementos
	let contH2 = document.createTextNode('Resultado de la busqueda'),
		contP = document.createTextNode('Estas son las entradas que cumplen los filtros indicados.');

	//Incluimos los contenidos en los elementos
	p.appendChild(contP);
	h2.appendChild(contH2);
	footer.appendChild(pFooter);

	section.appendChild(h2);
	section.appendChild(p);
	section.innerHTML += '<hr />';
	section.innerHTML += '<div class="galeria"></div>';
	section.innerHTML += '<hr />';
	section.appendChild(footer);

	//Ponemos la clase al p del footer
	pFooter.classList.add('paginacion');

	//Lo incluimos en el main
	main.appendChild(section);

	estructuraCreada = true;
}


//A partir del formulario de busqueda, crea los parametros para la peticion AJAX
function camposAParametros()
{
	//Recopilamos los datos del formulario
	let titulo = document.getElementById('titulo').value,
		texto = document.getElementById('texto').value,
		autor = document.getElementById('autor').value,
		fechaInicio = document.getElementById('fechaInicio').value,
		fechaFin = document.getElementById('fechaFin').value;

	//El caracter delante del nombre del atributo. Primero es '?' y luego '&'
	let separador = '?';

	if (titulo != '')
	{
		url += separador + 'n=' + titulo;
		separador = '&';
	}

	if (texto != '')
	{
		url += separador + 'd=' + texto;
		separador = '&';
	}

	if (autor != '')
	{
		url += separador + 'l=' + autor;
		separador = '&';
	}

	if (fechaInicio != '')
	{
		url += separador + 'fi=' + fechaInicio;
		separador = '&';
	}

	if (fechaFin != '')
	{
		url += separador + 'ff=' + fechaFin;
		separador = '&';
	}
}


//Recibe la url con los filtros y muestra los resultados de busqueda
function mostrarResultados()
{
	let xhr = new XMLHttpRequest(),
		urlPaginada = url;
		divGaleria = document.querySelector('.galeria');


	//Agregamos la paginacion a la url con los parametros de busqueda
	urlPaginada += '&pag=' + (pagEnt-1) + '&lpag=' + lPagEnt;

	mostrarPaginacion();

	xhr.open('GET', urlPaginada, true);

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


//Llama a las demas funciones
function buscar()
{
	//Operaciones previas
	camposAParametros();
	contarEntradas(url);

 	if (estructuraCreada == false)
	{
		crearEstructura();
	}

	mostrarResultados(url);

	return false;
}