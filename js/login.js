// Loguea un usuario
function iniciarSesion(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/login/',
		fd = new FormData(form);

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

	xhr.send(fd);

	return false;
}


//Muestra el mensaje de login (correcto)
function mostrarMensajeOK(nick)
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Todo bien</h3>';
		mensaje += '<p>Todo correcto.</p>';
		mensaje += '<p>Bienvenido de nuevo, <span class="usu">' + nick + '</span>.</p>';
		mensaje += '<a href="index.html" onclick="this.parentNode.parentNode.remove();" class="boton">OK</a>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
}


//Muestra el mensaje de login (error)
function mostrarMensajeError()
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Oops</h3>';
		mensaje += '<p>No se ha encontrado esa combinación de nombre de usuario y contraseña.</p>';
		mensaje += '<a href="login.html" onclick="this.parentNode.parentNode.remove();" class="boton">OK</a>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
}