//Escribe los nombres de los equipos
! function obtenerNombres()
{
	let p = document.querySelector('#login-container>p');
	let html = '<span class="color-' + sessionStorage['fichaA'] + ' negrita">' +  sessionStorage['A'] + '</span> 0 - 0  <span class="color-' + sessionStorage['fichaB'] + ' negrita">' +  sessionStorage['B'] + '</span>';

	p.innerHTML = html;
}();