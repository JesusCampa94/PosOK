//Escribe los nombres de los equipos
! function obtenerNombres()
{
	let p = document.querySelector('#login-container>p');
	let html = '<span class="usu">' +  sessionStorage['A'] + '</span> 0 - 0  <span class="usu">' +  sessionStorage['B'] + '</span>';

	p.innerHTML = html;
}();