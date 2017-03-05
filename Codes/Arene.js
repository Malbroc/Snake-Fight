/** CTOR Arene */

var Arene = function(id, taille_cell, couleur="#000000")
{
	var div_arene = document.getElementById(id);
	var style_arene = window.getComputedStyle(div_arene, null);
	
	this.tailleCellule = function()
	{
		return taille_cell;
	}
	
	this.nbColonnes = function()
	{
		var width = parseInt(style_arene.width);
		return parseInt(width/taille_cell);
	}
	
	this.nbLignes = function()
	{
		var height = parseInt(style_arene.height);
		return parseInt(height/taille_cell);
	}
	
	this.parenterAuJeu = function(div)
	{
		div_arene.appendChild(div);
	}
	
	this.positionCentreDeCase = function(p)
	{
		var posx = p.x*taille_cell + taille_cell/2;
		var posy = p.y*taille_cell + taille_cell/2;
		var c = new Point(posx, posy);
		return c;
	}
}