//Contador de fotos (autoincremento)
let fotos = 0;

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

//Inserta una nueva tarjeta en el DOM, ademas de un input tipo file y un textarea para el form oculto
function nuevaFoto()
{
	//Punteros
	let divGaleria = document.querySelector('.galeria'),
		botonInsertar = document.getElementById('nueva-foto'),
		formFotos = document.getElementById('form-fotos');
	
	//Aumentar contador fotos
	fotos++;

	//Nuevos elementos
	let article = document.createElement('article'),
		html = '',
		codigoInput = '<input type="file" accept="image/*"  id="input-' + fotos +'" onchange="cargarFoto(this);">',
		queryDelSelector = '#form-fotos>input:nth-of-type(' + fotos + ')';

	// console.log('Fotos: ' + fotos + ' selector: document.querySelector(\'' + queryDelSelector + '\')');

	formFotos.innerHTML += codigoInput;

	html += '<div class="no-grow">';
	html += '	<figure>';
	html += '		<img src="img/com/image.png" height="300" width="300" alt="" onclick="document.querySelector(\'' + queryDelSelector + '\').click();">';
	html += '	</figure>';
	html += '	<textarea form="form-fotos" name="desc-img-3" id="desc-img-3" cols="30" rows="6" placeholder="Escriba una descripción..." required></textarea>';
	html += '</div>';
	html += '<div>';
	html += '	<a onclick="document.querySelector(\'' + queryDelSelector + '\').click();" class="boton"><i class="material-icons">&#xE2C6;</i>Seleccionar fichero</a>';
	html += '	<a onclick="quitarFoto(this.parentNode.parentNode);" class="boton peligro"><i class="material-icons">&#xE872;</i>Suprimir</a>';
	html += '</div>';

	article.id = 'foto-' + fotos;
	article.innerHTML = html;
	divGaleria.insertBefore(article, botonInsertar);
}


//Quita una foto
function quitarFoto(article)
{
	let inputAEliminar = article.id.replace('foto-', 'input-');

	//Eliminamos el article y su input
	article.remove();
	document.getElementById(inputAEliminar).remove();
}


//Carga una foto nueva
function cargarFoto(input)
{
	let fr = new FileReader();

	fr.onload = function()
	{
		//CAMBIAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		input.parentNode.querySelector('img').src = fr.result;
		input.parentNode.querySelector('img').alt = input.files[0].name;
	};

	fr.readAsDataURL(input.files[0]);
}


//Envia las fotos de la entrada recien creada
function enviarFotos(form)
{


	return false;
}