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
			console.log(obj.FILAS);

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
		console.log(obj.FILAS);

		if (obj.RESULTADO = 'ok')
		{
			let html = '';

			for (let i = 0; i < obj.FILAS.length; i++)
			{
				let comentario = obj.FILAS[i];

				html += '<article class="comentario">';
				html += '	<h3>' + comentario.titulo + '</h3>';
				html += '	<p><span class="resaltado">De: </span>' + comentario.login + '</p>';
				html += '	<hr>';
				html += '	<p>' + comentario.texto + '</p>';
				html += '	<hr>';
				html += '	<footer>';
				html += '		<p class="resaltado"><time datetime="' + comentario.fecha + '">' + formatearFecha(comentario.fecha, 3) + '</time></p>';
				//Logueado
				if (typeof sessionStorage['dU'] !== 'undefined')
				{
					html += '		<a href="#escribir-comentario" class="boton">Responder</a>';
				}
				html += '	</footer>';
				html += '</article>';
			}

			divComentarios.innerHTML = html;
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
		html += '		<p><label for="titulo-comentario">Título del comentario</label></p>';
		html += '		<p><input type="text" name="titulo-comentario" id="titulo-comentario" placeholder="Escribe un título de máximo 50 carácteres" maxlength="50" required></p>';
		html += '		<p><label for="texto-comentario">Comentario</label></p>';
		html += '		<p><textarea rows="6" cols="50" name="texto-comentario" id="texto-comentario" placeholder="Escribe tu comentario..." required></textarea></p>';				
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
		url = 'http://localhost/PosOK/rest/entrada/',
		fd = new FormData(form),
		clave = '';

	if (typeof sessionStorage['dU'] !== 'undefined')
		{
			let dU = JSON.parse(sessionStorage['dU']);
			//obtiene el id en numérico desde la url
			let id = parseInt(window.location.href.split("id=")[1]);
			clave = dU.clave;
			fd.append('login', dU.login);
			fd.append('id_entrada', id);
		}

	xhr.open('POST', url, true);

	xhr.setRequestHeader('Authorization', clave);
	xhr.send(fd);

	return false;
}