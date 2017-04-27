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