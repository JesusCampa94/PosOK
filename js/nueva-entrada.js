//Contador de fotos (autoincremento)
let fotos = 0;

//Id de la entrada
let idEntrada = 0;

//Pinta el borde inferior de nueva entrada en la barra de navegacion
! function estoyEnNuevaEntrada()
{
	enlace = document.querySelector('a[href="nueva-entrada.html"');
	enlace.classList.add('actual');
}();


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
		codigoInput = '<input type="file" accept="image/*"  name="input-' + fotos + '" id="input-' + fotos + '" onchange="cargarFoto(this);">',
		queryDelSelector = '#form-fotos>input:nth-of-type(' + fotos + ')';

	// console.log('Fotos: ' + fotos + ' selector: document.querySelector(\'' + queryDelSelector + '\')');

	formFotos.innerHTML += codigoInput;

	html += '<div class="no-grow">';
	html += '	<figure>';
	html += '		<img src="img/com/image.png" height="300" width="300" alt="" onclick="document.querySelector(\'' + queryDelSelector + '\').click();">';
	html += '	</figure>';
	html += '	<textarea form="form-fotos" name="texto-' + fotos + '" id="texto-' + fotos + '" cols="30" rows="6" placeholder="Escriba una descripción..." required></textarea>';
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
		let article = document.getElementById(input.id.replace('input-', 'foto-'));
		article.querySelector('img').src = fr.result;
		article.querySelector('img').alt = input.files[0].name;

		// console.log('Tamaño: ' + input.files[0].size);

		//Si la imagen es muy grande
		if (input.files[0].size > 512000)
		{
			input.setCustomValidity('La imagen es demasiado grande');

			article.classList.add('foto-muy-grande');

			let p = document.createElement('p');
			let contP = document.createTextNode('La imagen es mayor de 500 KB. Por favor, elija una imagen más pequeña.');
			p.appendChild(contP);
			p.classList.add('incorrecto');

			article.querySelector('textarea').classList.add('input-oculto');
			article.querySelector('div:first-of-type').appendChild(p);
		}
		//La image es correcta
		else
		{
			if(article.classList.contains('foto-muy-grande'))
			{
				input.setCustomValidity('');
				article.classList.remove('foto-muy-grande');
				article.querySelector('p').remove();
				article.querySelector('textarea').classList.remove('input-oculto');
			}
		}
	};

	fr.readAsDataURL(input.files[0]);
}


//Muestra el mensaje de envio correcto
function mostrarMensaje()
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Entrada creada</h3>';
		mensaje += '<p>La entrada ha sido correctamente creada con los datos introducidos.</p>';
		mensaje += '<a href="index.html" onclick="this.parentNode.parentNode.remove();" class="boton">OK</a>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
}


//Recibe los datos necesarios y envia una foto
function enviarFoto(foto, texto, form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/foto/',
		fd = new FormData(form),
		clave = '';

	if (typeof sessionStorage['dU'] !== 'undefined')
	{
		let dU = JSON.parse(sessionStorage['dU']);
		clave = dU.clave;
		fd.append('login', dU.login);
	}

	//Agregamos los parametros al FormData para su envio
	fd.set('foto' , foto);
	fd.set('texto', texto);
	fd.set('id_entrada', idEntrada);

	console.log(fd);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		
		if (obj.RESULTADO == 'ok')
		{
			mostrarMensaje();
		}
	};

	xhr.setRequestHeader('Authorization', clave);
	xhr.send(fd);

	return false;
}


//Guarda los datos de las fotos para posterior envio
function guardarFotos(form)
{
	//Guardamos un array con los inputs tipo file y otro con los textarea, y el numero de fotos
	let inputs =	form.querySelectorAll('input'),
		textareas = document.querySelector('.galeria').querySelectorAll('article textarea'),
		numFotos = inputs.length;

	let i;

	for (i = 0; i < numFotos; i++)
	{
		enviarFoto(inputs[i].value, textareas[i].value, form);
	}

	return false;
}

//Comprueba que las imagenes subidas no son demasiado grandes
function comprobarImagenes()
{
	let divGaleria = document.querySelector('.galeria'),
		articles = divGaleria.querySelectorAll('article'),
		correcto = true,
		i;

	for (i = 0; i < articles.length; i++)
	{
		if (articles[i].classList.contains('foto-muy-grande'))
		{
			correcto = false;
			break;
		}
	}

	return correcto;
}


//Crea una nueva entrada en la página
function crearEntrada(form)
{
	if (comprobarImagenes())
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
				idEntrada = obj.id;

				//Entrada creada, le toca a las fotos
				// document.getElementById('form-fotos').submit();
				guardarFotos(document.getElementById('form-fotos'));
			}
		};

		xhr.setRequestHeader('Authorization', clave);
		xhr.send(fd);
	}

	return false;
}