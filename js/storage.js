//Comprueba si esta definido un equipo
function existeEquipo(equipo)
{
	return sessionStorage[equipo] !== undefined;
}

//Comprueba si esta definida una propiedad de un equipo
function existePropiedad(equipo, propiedad)
{
	return JSON.parse(sessionStorage[equipo])[propiedad] !== undefined;
}

//Crea un equipo
function crearEquipo(equipo)
{
	let objeto = new Object();
	objeto.nombre = '';
	objeto.color = -1;
	objeto.estado = 'COLOCANDO';
	objeto.turno = (equipo == 'A' ? true : false);
	objeto.goles = 0;
	objeto.posiciones = new Array();

	sessionStorage[equipo] = JSON.stringify(objeto);
}

//Devuelve un equipo en forma de objeto
function getEquipo(equipo)
{
	return JSON.parse(sessionStorage[equipo]);
}

//Devuelve una propiedad de un equipo
function getPropiedad(equipo, propiedad)
{
	return JSON.parse(sessionStorage[equipo])[propiedad];
}

//Ajusta una propiedad de un equipo
function setPropiedad(equipo, propiedad, valor)
{
	let objeto = getEquipo(equipo);
	objeto[propiedad] = valor;
	sessionStorage[equipo] = JSON.stringify(objeto);
}