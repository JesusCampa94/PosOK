//Comprueba si el nombre de usuario esta disponible
function nickDisponible()
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/login/',
		nick = document.getElementById('login'),
		disponibilidad = document.getElementById('disponibilidad');

	url += nick.value;

	xhr.open('GET', url, true);

	xhr.onload = function()
	{
		// console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		// console.log(obj.DISPONIBLE);

		if (obj.RESULTADO = 'ok')
		{
			if (obj.DISPONIBLE === 'true')
			{
				nick.setCustomValidity(''); //Equivale a marcarlo como valido
				disponibilidad.classList.add('correcto');
				disponibilidad.classList.remove('incorrecto');
				disponibilidad.innerHTML = '¡Disponible!';

				//Input vacio
				if (nick.value == '')
				{
					nick.setCustomValidity('Completa este campo');
					disponibilidad.classList.remove('correcto');
					disponibilidad.classList.remove('incorrecto');
					disponibilidad.innerHTML = '';
				}
			}

			else
			{
				nick.setCustomValidity('El nombre de usuario ya está en uso');
				disponibilidad.classList.add('incorrecto');
				disponibilidad.classList.remove('correcto');
				disponibilidad.innerHTML = 'No disponible';
			}
		}
	};

	xhr.send();
}


//Comprueba que los pass coinciden
function passIguales()
{
	let pass = document.getElementById('pwd'), 
		pass2 = document.getElementById('pwd2'),
		coincidencia = document.getElementById('coincidencia');

	//Coinciden
	if (pass.value == pass2.value)
	{
		pass2.setCustomValidity('');
		coincidencia.classList.add('correcto');
		coincidencia.classList.remove('incorrecto');
		coincidencia.innerHTML = 'Las contraseñas coinciden';
	}

	//No coinciden
	else
	{
		pass2.setCustomValidity('Las contraseñas no coinciden');
		coincidencia.classList.add('incorrecto');
		coincidencia.classList.remove('correcto');
		coincidencia.innerHTML = 'Las contraseñas no coinciden';
	}

	//Inputs vacios
	if (pass.value == '' || pass2.value == '')
	{
		pass2.setCustomValidity('Completa este campo');
		coincidencia.classList.remove('correcto');
		coincidencia.classList.remove('incorrecto');
		coincidencia.innerHTML = '';
	}
}


//Muestra el mensaje de registro completo
function mostrarMensajeRegistrado(nick)
{
	let fondo = document.createElement('div'),
		contenedor = document.createElement('article'),
		mensaje = '';

		fondo.appendChild(contenedor);

		mensaje += '<h3>Registro completo</h3>';
		mensaje += '<p>El usuario <span class="usu">' + nick + '</span> ha sido registrado correctamente.</p>';
		mensaje += '<p>Pulse el botón para cerrar este mensaje y acceder a la página de login.</p>';
		mensaje += '<a href="login.html" onclick="this.parentNode.parentNode.remove();" class="boton">OK</a>';
		
		contenedor.innerHTML = mensaje;
		fondo.classList.add('fondo-mensaje');
		contenedor.classList.add('contenedor-mensaje');

		document.body.appendChild(fondo);
}


//Registra a un usuario
function registrar(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/usuario/',
		fd = new FormData(form);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);
		let obj = JSON.parse(xhr.responseText);
		console.log(obj);
		
		if (obj.RESULTADO == 'ok')
		{
			mostrarMensajeRegistrado(document.getElementById('login').value);			
		}
	};

	xhr.send(fd);

	return false;
}