/** CTOR Carre */

var Carre = function(largeur, couleur, arene, id, profZ)
{
	/* Création du carre */
	var div_carre = document.createElement(id);
	div_carre.style.backgroundColor = couleur;
	div_carre.style.width = largeur + 'px';
	div_carre.style.height = largeur + 'px';
	arene.parenterAuJeu(div_carre);
	
	// Place l'instance Carre sur la cellule donnée.
	this.placerSurCellule = function(cell)
	{
		var pix = arene.positionCentreDeCase(cell);
		div_carre.style.position = "absolute";
		div_carre.style.zIndex = profZ;
		var taille_cell = arene.tailleCellule();
		div_carre.style.left = (pix.x - largeur/2) + 'px';
		div_carre.style.top = (pix.y - largeur/2) + 'px';
	}
	
	// Place l'instance Carre entre les deux cellules données.
	this.placerEntreCellules = function(cell1, cell2)
	{
		var cellM = new Point((cell1.x+cell2.x)/2, (cell1.y+cell2.y)/2);
		var pix = arene.positionCentreDeCase(cellM);
		div_carre.style.position = "absolute";
		div_carre.style.zIndex = profZ;
		var taille_cell = arene.tailleCellule();
		div_carre.style.left = (pix.x - largeur/2) + 'px';
		div_carre.style.top = (pix.y - largeur/2) + 'px';
	}
	
	this.colorier = function(c)
	{
		div_carre.style.backgroundColor = c;
	}
}