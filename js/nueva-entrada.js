 /* ----------------------------------------------- USUARIOS ----------------------------------------------- */
// Loguea un usuario
function iniciarSesion(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/login/',
		fd = new FormData(form);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		
		if (obj.RESULTADO == 'ok')
		{
			//Confirmar inicio de sesion
			form.parentNode.querySelector('form + p').innerHTML = "Nos alegra tenerte de vuelta, <span class='usu'>" + obj.nombre + "</span>";

			//Almacenamos los datos de usuario en sessionStorage
			sessionStorage['dU'] = xhr.responseText;			
		}
	};

	xhr.send(fd);

	return false;
}










/* ----------------------------------------------- ENTRADAS ----------------------------------------------- */
//Muestra las entradas del index
function mostrarEntradasIndex()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/?pag=0&lpag=6',
		divGaleria = document.getElementsByClassName('galeria')[0];

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		// console.log(obj.FILAS);

		if (obj.RESULTADO = 'ok')
		{
			//Plantilla para cada entrada
			let html = '';

			for (let i = 0; i < obj.FILAS.length; i++)
			{
				let foto = obj.FILAS[i],
					ruta = 'fotos/' + foto.fichero;

				html += '<article>';
				html += ' 	<div class="no-grow">';
				html += '		<figure class="con-transparencia">';
				html += '			<img src="' + ruta + '" alt="' + foto.descripcion_foto + '">';
				html += '			<figcaption>';
				html += 					foto.descripcion;					
				html += '			</figcaption>';
				html += '		</figure>';
				html += '		<footer>';
				html += '			<a href="entrada.html?id=' + foto.id + '">Ver más...</a>';
				html += '		</footer>';
				html += '	</div>';
				html += '	<div>';
				html += '		<h3><a href="entrada.html?id=' + foto.id + '">' + foto.nombre + '</a></h3>';
				html += '		<p>' + foto.login + '</p>';
				html += '	</div>';
				html += '	<footer>';
				html += '		<p><time datetime="' + foto.fecha + '">' + foto.fecha + '</time></p>';
				html += '		<p>' + foto.nfotos + ' fotos</p>';
				html += '		<p>' + foto.ncomentarios + ' comentarios</p>';
				html += '	</footer>';
				html += '</article>';
			}

			//Agregamos el codigo generado dentro del div de la galeria
			divGaleria.innerHTML = html;			
		}
	};

	xhr.send();
}


//Muestra los 10 ultimos comentarios en el index
function mostrarComentariosIndex()
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
			//Plantilla para cada entrada
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
				html += '			<p class="resaltado"><time datetime="' + comentario.fecha + '">' + comentario.fecha + '</time></p>';
				html += '		</footer>';
				html += '	</article>';
				html += '</a>';
			}

			//Agregamos el codigo generado dentro del div de la galeria
			divComentarios.innerHTML = html;			
		}
	};

	xhr.send();
}









/* ----------------------------------------------- FORMULARIOS ----------------------------------------------- */