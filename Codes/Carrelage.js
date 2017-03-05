/** CTOR Carrelage */

var Carrelage = function(nbLignes, nbColonnes, largeur, arene, couleur)
{
	var nbr_carreaux =0;
	var carre_list = [];
	// Création du carrelage en tant que liste d'objets Carre
	for(var x=0; x<nbColonnes; x++)
	{
		for(var y=0; y<nbLignes; y++)
		{
			carre_list[nbr_carreaux] = new Carre(largeur, couleur, arene, "carreau_"+x+"_"+y, 1);
			var cell = new Point(x,y);
			carre_list[nbr_carreaux++].placerSurCellule(cell);
		}
	}
	
	// Colorie un carreau particulier (col, lgn) du carrelage
	this.colorier= function(col, lgn, couleur)
	{
		carre_list[(col*nbLignes)+lgn].colorier(couleur);
	}
	
	// Recolorie tous les carreaux du carrelage à la couleur par défaut
	this.couleurDefaut = function()
	{
		for(var i=0; i<nbLignes*nbColonnes; i++)
		{
			carre_list[i].colorier(couleur);
		}
	}
}