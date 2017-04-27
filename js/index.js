//Muestra las 6 ultimas entradas
! function mostrarEntradas()
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

			divGaleria.innerHTML = html;			
		}
	};

	xhr.send();
}();


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