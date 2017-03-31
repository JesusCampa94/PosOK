// Loguea un usuario
function hacerLogin(form)
{
	let xhr = new XMLHttpRequest(),
		url = 'http://localhost/PosOK/rest/login/',
		fd = new FormData(form);

	xhr.open('POST', url, true);

	xhr.onload = function()
	{
		console.log(xhr.responseText);

		let obj = JSON.parse(xhr.responseText);
		
		//Confirmar inicio de sesion
		form.parentNode.querySelector('form + p').innerHTML = "Nos alegra tenerte de vuelta, <span class='usu'>" + obj.nombre + "</span>";

		if (obj.RESULTADO == 'ok')
		{
			sessionStorage['dU'] = xhr.responseText;			
		}
	};

	xhr.send(fd);

	return false;
}