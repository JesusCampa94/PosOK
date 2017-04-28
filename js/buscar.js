//Paginacion de entradas
var pagEnt = 1,	//Pagina actual
	lPagEnt = 2;	//Longitud pagina
	pagsEnt = 0;	//Paginas totales

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
				
			mostrarEntradas();
		}
	};

	xhr.send();
}

//Busca entradas segun criterios y muestra los resultados
function buscar()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/';

	//Operaciones previas
	crearEstructura();
	url += camposAParametros();
	contarEntradas(url);

	let divGaleria = document.querySelector('.galeria');

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		console.log(obj.FILAS);

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

	return false;
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
		contP = document.createTextNode('Estas son las entradas que cumplen los filtros indicados.'),
		contPFooter = '';

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

	contPFooter += '<a href="#" title="Ir al principio"><i class="material-icons">&#xE045;</i></a>';
	contPFooter += '<a href="#" title="Página anterior"><i class="material-icons">&#xE020;</i></a>';
	contPFooter += '1';
	contPFooter += '<a href="#">2</a>';
	contPFooter += '<a href="#">3</a>';
	contPFooter += '<a href="#" title="Página siguiente"><i class="material-icons">&#xE01F;</i></a>';
	contPFooter += '<a href="#" title="Ir al final"><i class="material-icons">&#xE044;</i></a>';

	pFooter.innerHTML = contPFooter;

	//Ponemos la clase al p del footer
	pFooter.classList.add('paginacion');

	//Lo incluimos en el main
	main.appendChild(section);
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

	//La cadena de parametros, ira creciendo cada vez que un campo no este vacio
	let parametros = '';

	if (titulo != '')
	{
		parametros += separador + 'n=' + titulo;
		separador = '&';
	}

	if (texto != '')
	{
		parametros += separador + 'd=' + texto;
		separador = '&';
	}

	if (autor != '')
	{
		parametros += separador + 'l=' + autor;
		separador = '&';
	}

	if (fechaInicio != '')
	{
		parametros += separador + 'fi=' + fechaInicio;
		separador = '&';
	}

	if (fechaFin != '')
	{
		parametros += separador + 'ff=' + fechaFin;
		separador = '&';
	}

	return parametros;
}