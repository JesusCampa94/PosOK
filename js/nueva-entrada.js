//Pinta el borde inferior de nueva entrada en la barra de navegacion
! function estoyEnNuevaEntrada()
{
	enlace = document.querySelector('a[href="nueva-entrada.html"');
	enlace.classList.add('actual');
}();