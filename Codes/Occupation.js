/** CTOR Occupation */

var Occupation = function(arene)
{
	var grille = [];
	var nbl = arene.nbLignes();
	var nbc = arene.nbColonnes();
	var x, y;
	var LIBRE = "#00FF88";
	var OCCUPEE = "#FF0000";
	// Initialisation de l'occupation (tableau 2 dimensions)
	for(x=0; x<nbc; x++)
	{
		grille[x] = [];
		for(y=0; y<nbl; y++)
		{
			grille[x][y] = 0;
		}
	}
	
	// Fonction auxiliare : renvoie un entier aléatoire entre 0 et n exclu
	function hasard(n)
	{
		return Math.floor(n*Math.random());
	}
	
	/* SERVICES */
	
	// Marque une cellule occupée par le serpent numéro id
	this.occuper = function(cell, id)
	{
		if(id == 0)
			console.log("occuper : id erroné.");
		else
			grille[cell.x][cell.y] = id;
	}
	
	// Marque une cellule libre
	this.liberer = function(cell)
	{
		grille[cell.x][cell.y] = 0;
	}
	
	// Marque toutes les cellules libres
	this.toutLiberer = function()
	{
		var x, y;
		for(x=0; x<nbc; x++)
		{
			for(y=0; y<nbl; y++)
			{
				grille[x][y] = 0;
			}
		}
	}
	
	// Renvoie un booléen indiquant si la cellule est libre
	this.estLibre = function(cell)
	{
		if(cell.x < 0 || cell.x >= nbc || cell.y < 0 || cell.y >= nbl)
			return false;
		return (grille[cell.x][cell.y] == 0);
	}
	
	// Renvoie la liste de toutes les cellules voisines libres
	this.listeVoisinsLibres = function(cell)
	{
		var list = [];
		var voisin;
		for(var i=0; i<4; i++)
		{
			switch(i)
			{
				case 0 : voisin = cell.voisin("gch"); break;
				case 1 : voisin = cell.voisin("haut"); break;
				case 2 : voisin = cell.voisin("drt"); break;
				case 3 : voisin = cell.voisin("bas"); break;
				default : console.log("Fatal error");
			}
			
			if(this.estLibre(voisin))
				list.push(voisin);
		}
		
		return list;
	}
	
	// Construit la liste des cellules voisines libres et renvoie une
	// cellule choisie au hasard dans celle ci, ou defined si la liste est vide
	this.voisinLibreAuHasard = function(cell)
	{
		var voisinsLibres = this.listeVoisinsLibres(cell);
		var nbrv = voisinsLibres.length;
		if(nbrv == 0)
			return undefined;
		
		return (voisinsLibres[hasard(nbrv)]);
	}
	
	// Colorie les cellules libres en vert clair et les cellules occupées en rouge
	this.visuDebug = function(carrelage)
	{
		var cell;
		for(var x=0; x<nbc; x++)
		{
			for(var y=0; y<nbl; y++)
			{
				cell = new Point(x,y);
				if(this.estLibre(cell))
					carrelage.colorier(x, y, LIBRE);
				else
					carrelage.colorier(x, y, OCCUPEE);
			}
		}
	}
}