//Comprueba si un usuario esta logueado o no. Devuelve su nick si lo esta o false si no
function logueado()
{
	//Comprobamos que la variable esta definida
	if (typeof sessionStorage['dU'] !== 'undefined')
	{
		let dU = JSON.parse(sessionStorage['dU']);

		return dU.login;
	}
	return false;
}


//Cierra la sesion
function cerrarSesion()
{
	//Primero comprobamos que hay sesion iniciada
	if (typeof sessionStorage['dU'] !== 'undefined')
	{
		sessionStorage.removeItem('dU');
	}
}


//Modifica el header segun el usuario este o no logueado
! function cambiarHeader()
{
	//Declaramos los punteros a los nodos necesarios y variables auxiliares
	let pSaludo = document.querySelector('#login-container>p'),
		divLogin = document.querySelector('#login-container>div'),
		listaNav = document.querySelector('nav>ul'),
		saludo = '';
		enlacesLogin = '',
		nick = '';


	//Si hay alguien logeado, se guarda el nick y entramos al bloque
	if (nick = logueado())
	{
		saludo = 'Hola, <span class="usu">' + nick + '</span>';
		
		enlacesLogin += '<a href="index.html" title="Cerrar Sesión" onclick="cerrarSesion();"><i class="material-icons">&#xE8AC;</i><span class="solo-en-movil">Cerrar Sesión</span></a>';

		listaNav.innerHTML += '	<li><a href="nueva-entrada.html"><i class="material-icons">&#xE89C;</i>Nueva entrada</a></li>';
	}

	//Nadie logueado
	else
	{
		saludo = 'No has iniciado sesión';
		
		enlacesLogin += '<a href="registro.html" title="Registrarse"><i class="material-icons">&#xE7FE;</i><span class="solo-en-movil">Registrarse</span></a>';
		enlacesLogin += '<a href="login.html" title="Iniciar Sesión"><i class="material-icons">&#xE879;</i><span class="solo-en-movil">Iniciar Sesión</span></a>';
	}

	//Hacemos los cambios
	pSaludo.innerHTML = saludo;
	divLogin.innerHTML = enlacesLogin;
}();


//Da formato a una fecha
function formatearFecha(cadena, tipo)
{
	let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	let fecha = new Date(cadena);

	let d = fecha.getDate(),
		m = fecha.getMonth(),
		a = fecha.getFullYear(),
		h = fecha.getHours(),
		min = fecha.getMinutes();

	let formateada = '';

	//Poner un cero delante si los minutos son 9 o menos
	if (min < 10)
	{
		min = '0' + min;
	}

	switch (tipo)
	{
		// 1/1/2017
		case 1:
		{
			formateada = d + '/' + (++m) + '/' + a;
			break;
		}

		// 1 de Enero de 2017
		case 2:
		{
			formateada = d + ' de ' + meses[m] + ' de ' + a;
			break;
		}

		// 1/1/2017 - 12:00
		case 3:
		{
			formateada = d + '/' + (++m) + '/' + a + ' - ' + h + ':' + min;
			break;
		}

		// 1 de Enero de 2017 a las  12:00
		case 4:
		{
			formateada = d + ' de ' + meses[m] + ' de ' + a + ' a las ' + h + ':' + min;
			break;
		}
	}

	return formateada;
}