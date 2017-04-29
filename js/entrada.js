//Carga la informacion de una entrada y llama a las funciones de carga de fotos y comentarios
! function cargarEntrada()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/',
		sectionEntrada = document.querySelector('main>section:first-of-type');

	//Obtener id de URL y comprobar que es numerico
	let id = parseInt(window.location.href.split("id=")[1]);

	if (!isNaN(id))
	{
		url += id;	

		xhr.open('GET', url, true);

		xhr.onload = function()
		{
			// console.log(xhr.responseText);
			let obj = JSON.parse(xhr.responseText);
			// console.log(obj.FILAS);

			if (obj.RESULTADO = 'ok')
			{
				let html = '',
					entrada = obj.FILAS[0];

				html += '<h2>' + entrada.nombre + '</h2>';
				html += '<p><time datetime="' + entrada.fecha + '">' + formatearFecha(entrada.fecha, 1) + '</time></p>';
				html += '<p><a href="#zona-galeria">' + entrada.nfotos + ' fotos</a></p>';
				html += '<p><a href="#zona-comentarios">' + entrada.ncomentarios + ' comentarios</a></p>';
				html += '<p>' + entrada.login + '</p>';
				html += '<hr>';
				html += '<article class="texto">';
				html += '	<p>' + entrada.descripcion + '</p>';
				html += '</article>';
				
				sectionEntrada.innerHTML = html;		
				
				mostrarFotos(id);
				mostrarComentarios(id);	
			}
		};

		xhr.send();
	}
}();


//Carga las fotos de una entrada
function mostrarFotos(idEntrada)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/foto/?id_entrada=' + idEntrada,
		divGaleria = document.getElementsByClassName('galeria')[0];

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
				let foto = obj.FILAS[i],
					ruta = 'fotos/' + foto.fichero;

				html += '<article>';
				html += '	<div>';
				html += '		<figure>';
				html += '			<img src="' + ruta + '" alt="' + foto.texto + '">';
				html += '			<figcaption>' + foto.texto + '</figcaption>';
				html += '		</figure>';
				html += '	</div>';
				html += '</article>';
			}

			divGaleria.innerHTML = html;
		}
	};

	xhr.send();
}


//Carga los comentarios de una entrada
function mostrarComentarios(idEntrada)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/comentario/?id_entrada=' + idEntrada,
		divComentarios = document.querySelector('#zona-comentarios>div');

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

				html += '<article class="comentario" id="' + comentario.id + '">';
				html += '	<h3>' + comentario.titulo + '</h3>';
				html += '	<p><span class="resaltado">De: </span>' + comentario.login + '</p>';
				html += '	<hr>';
				html += '	<p>' + comentario.texto + '</p>';
				html += '	<hr>';
				html += '	<footer>';
				html += '		<p class="resaltado"><time datetime="' + comentario.fecha + '">' + formatearFecha(comentario.fecha, 3) + '</time></p>';
				//Boton responder si se esta logueado
				if (typeof sessionStorage['dU'] !== 'undefined')
				{
					html += '<button class="boton" onclick="responder(this.parentNode.parentNode);">Responder</button>';
				}

				html += '	</footer>';
				html += '</article>';
			}

			divComentarios.innerHTML = html;
			encuadrar();
		}
	};

	xhr.send();
}


//Carga condicional del formulario de nuevo comentario
! function cargarFormulario()
{
	let sectionFormulario = document.querySelector('#zona-galeria+section'),
		html = '';

	//Logueado
	if (typeof sessionStorage['dU'] !== 'undefined')
	{
		html += '<form onsubmit="return comentar(this);" id="escribir-comentario">';
		html += '	<div>';
		html += '		<p><label for="titulo">Título del comentario</label></p>';
		html += '		<p><input type="text" name="titulo" id="titulo" placeholder="Escribe un título de máximo 50 carácteres" maxlength="50" required></p>';
		html += '		<p><label for="texto">Comentario</label></p>';
		html += '		<p><textarea rows="6" cols="50" name="texto" id="texto" placeholder="Escribe tu comentario..." required></textarea></p>';				
		html += '		<p><input type="submit" value="OK"></p>';
		html += '	</div>';
		html += '</form>';
	}

	//No logueado
	else
	{
		html += '<p>Debes <a href="login.html">iniciar sesión</a> para publicar un comentario.</p>';
	}

	sectionFormulario.innerHTML += html;
}();


//Publica un comentario
function comentar(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/comentario/',
		fd = new FormData(form),
		clave = '',
		id = 0;

	if (typeof sessionStorage['dU'] !== 'undefined')
		{
			let dU = JSON.parse(sessionStorage['dU']);

			//Obtiene el id en numérico desde la url
			id = parseInt(window.location.href.split("id=")[1]);

			clave = dU.clave;
			fd.append('login', dU.login);
			fd.append('id_entrada', id);
		}

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);

		if (obj.RESULTADO == 'ok')
		{
			// console.log(obj.id);

			let titulo = document.querySelector('#escribir-comentario [type="text"]'),
				texto = document.querySelector('#escribir-comentario textarea');

			//Vaciamos campos del formulario y habilitamos el campo de texto, en caso de estar desabilitado
			titulo.value = '';
			texto.value = '';

			//Recargamos comentarios, incluyendo el nuevo
			mostrarComentarios(id);
		}
	};

	xhr.setRequestHeader('Authorization', clave);
	xhr.send(fd);

	return false;
}


//Configura el titulo de una respuesta y llama a comentar.
function responder(comentario)
{
	//Datos del comentario al cual respondemos
	let idComentario = comentario.id,
		tituloComentario = comentario.querySelector('h3').innerHTML;

	//Respuesta
	let titulo = document.querySelector('#escribir-comentario [type="text"]'),
		texto = document.querySelector('#escribir-comentario textarea');

	//Ponemos el titulo
	titulo.value = 'Re: ' + tituloComentario;
	
	//Damos el foco al textarea
	texto.focus();

	//redirigir y hacer scroll extra, así evitamos que el header tape parte del contenido
	let direccion = window.location.href.replace('#escribir-comentario', '');
	direccion += '#escribir-comentario';
	window.location.href = direccion;
	window.scrollBy(0, -170);

	//El resto lo hace la funcion comentar, que se invoca al pulsar en OK
}

function encuadrar()
{
	if(window.location.href.includes('#zona-comentarios'))
	{
		let direccion = window.location.href.replace('#zona-comentarios', '');
		direccion += '#zona-comentarios';
		window.location.href = direccion;
		window.scrollBy(0, -94);
	}
}