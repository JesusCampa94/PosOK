//Elige una ficha para un equipo e impide que el otro equipo la elija
function elegirFicha(ficha)
{
	let equipo = ficha.parentNode.id,
		equipoContrario = (equipo == 'A' ? 'B' : 'A'),
		idContrario = ficha.id.replace(equipo, equipoContrario),
		fichaContraria = document.getElementById(idContrario),
		color = ficha.getAttribute('fill');

	console.log(`Ficha: ${ficha} Equipo: ${equipo}, contrario: ${equipoContrario}, id contrario: ${idContrario} ficha contraria: ${fichaContraria}, color: ${color}`);

	//Para no desactivar mas de una ficha a la vez
	reiniciarFichas(document.getElementById(equipoContrario));

	//Colorear en gris la del equipo opuesto y evitar que pueda hacerse clic
	fichaContraria.setAttribute('fill','#455A64');
	fichaContraria.setAttribute('stroke','#263238');
	fichaContraria.removeAttribute('onclick');
}


//Reinicia una lista de fichas
function reiniciarFichas(svg)
{

	//Crear matriz con fills y strokes para no eliminar nodos, solo reiniciar valores
	html = '';

	if (svg.id == 'A')
	{
		html += '<circle fill="#FAC" stroke="#E91E63" stroke-width="6" cx="28" cy="28" r="25" id="A1" onclick="elegirFicha(this);" />';
		html += '<circle fill="#2196F3" stroke="#0D41A1" stroke-width="6" cx="94" cy="28" r="25" id="A2" onclick="elegirFicha(this);" />';
		html += '<circle fill="#FFC107" stroke="#FF6F00" stroke-width="6" cx="160" cy="28" r="25" id="A3" onclick="elegirFicha(this);" />';
		html += '<circle fill="#8BC34A" stroke="#33691E" stroke-width="6" cx="28" cy="94" r="25" id="A4" onclick="elegirFicha(this);" />';
		html += '<circle fill="#009688" stroke="#004D40" stroke-width="6" cx="94" cy="94" r="25" id="A5" onclick="elegirFicha(this);" />';
		html += '<circle fill="#F44336" stroke="#B71C1C" stroke-width="6" cx="160" cy="94" r="25" id="A6" onclick="elegirFicha(this);" />';
	}

	else if (svg.id == 'B')
	{
		html += '<circle fill="#FAC" stroke="#E91E63" stroke-width="6" cx="28" cy="28" r="25" id="B1" onclick="elegirFicha(this);" />';
		html += '<circle fill="#2196F3" stroke="#0D41A1" stroke-width="6" cx="94" cy="28" r="25" id="B2" onclick="elegirFicha(this);" />';
		html += '<circle fill="#FFC107" stroke="#FF6F00" stroke-width="6" cx="160" cy="28" r="25" id="B3" onclick="elegirFicha(this);" />';
		html += '<circle fill="#8BC34A" stroke="#33691E" stroke-width="6" cx="28" cy="94" r="25" id="B4" onclick="elegirFicha(this);" />';
		html += '<circle fill="#009688" stroke="#004D40" stroke-width="6" cx="94" cy="94" r="25" id="B5" onclick="elegirFicha(this);" />';
		html += '<circle fill="#F44336" stroke="#B71C1C" stroke-width="6" cx="160" cy="94" r="25" id="B6" onclick="elegirFicha(this);" />';

	}

	svg.innerHTML = html;
}