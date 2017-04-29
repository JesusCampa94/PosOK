//Pinta el borde inferior de nueva entrada en la barra de navegacion
! function estoyEnNuevaEntrada()
{
	enlace = document.querySelector('a[href="nueva-entrada.html"');
	enlace.classList.add('actual');
}();

//Crea una nueva entrada en la página
function crearEntrada(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/entrada/',
		fd = new FormData(form),
		clave = '';

	if (typeof sessionStorage['dU'] !== 'undefined')
		{
			let dU = JSON.parse(sessionStorage['dU']);
			clave = dU.clave;
			fd.append('login', dU.login);
		}

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		
		if (obj.RESULTADO == 'ok')
		{
			//Confirmar inicio de sesion
			// form.parentNode.querySelector('form + p').innerHTML = "Nos alegra tenerte de vuelta, <span class='usu'>" + obj.nombre + "</span>";
			mostrarMensajeOK(obj.login);

			//Almacenamos los datos de usuario en sessionStorage
			sessionStorage['dU'] = xhr.responseText;			
		}

		else
		{
			mostrarMensajeError();
		}
	};

	xhr.setRequestHeader('Authorization', clave);
	xhr.send(fd);

	return false;
}

//Inserta la carta para cargar una imagen nueva
function insertarCarta()
{
	let html = '', divGaleria = document.querySelector('.galeria'), botonInserta = document.getElementById('nueva-foto');
	let article = document.createElement('article');

	html += ' 	<div class="no-grow">';
	html += '		<figure>';
	html += '			<img src="img/com/image.png" height="300" width="300" alt="" onclick="this.parentNode.querySelector(\'[type=file]\').click();">';
	html += '         <input type="file" accept="image/*" onchange="mostrarFoto(this);">';
	html += '		</figure>';
	html += '	</div>';
	html += '	<a href="#" class="boton"><i class="material-icons">&#xE2C6;</i>Seleccionar fichero</a>';
	html += '	<a href="#" class="boton peligro"><i class="material-icons">&#xE872;</i>Eliminar fichero</a>';
	html += '	<div>';
	html += '		<textarea form="form-nueva-entrada" name="desc-img-3" id="desc-img-3" cols="30" rows="6" placeholder="Escriba una descripción..." required></textarea>';
	html += '	</div>';

	article.innerHTML = html;
	divGaleria.insertBefore(article, botonInserta);
}

//muestra la foto a insertar
function mostrarFoto(input)
{
	let fr = new FileReader();

	fr.onload = function()
	{
		input.parentNode.querySelector('img').src = fr.result;
		input.parentNode.querySelector('img').alt = input.files[0].name;
	};

	fr.readAsDataURL(input.files[0]);
}