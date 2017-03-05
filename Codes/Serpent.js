/** CTOR Serpent */

var Serpent = function(longueur, couleur, arene, pos_depart, occupation, id)
{
	/* ---FONCTIONS & VARIABLES INTERNES (CREATION DU CORPS)--- */
	
	var carre_list = [];
	var cell_list = [];
	
	function __creationCorps(longueur, couleur, arene, pos_depart, occupation, diametre)
	{
		var i;
		
		/* Création des parties du corps au centre des cases */
		for(i=0; i<longueur; i++)
		{
			carre_list[2*i] = new Carre(diametre, couleur, arene, "serpent_centre_"+i, 2);
			if(i==0){
				carre_list[i].colorier("000000");
			}
			if(pos_depart=="haut")
			{
				cell_list[i] = new Point(i, 0);
			}
			if(pos_depart=="bas")
			{
				cell_list[i] = new Point(arene.nbLignes()-1-i, arene.nbLignes()-1);
			}
			
			carre_list[2*i].placerSurCellule(cell_list[i]);
		}
		
		/* Création des parties du corps aux intersections */
		for(i=0; i<longueur-1; i++)
		{
			carre_list[2*i+1] = new Carre(diametre, couleur, arene, "serpent_inter_"+i, 2);
			carre_list[2*i+1].placerEntreCellules(cell_list[i], cell_list[i+1]);
		}
		
		/* Mise à jour de l'occupation */
		for(i=0; i<longueur; i++)
		{
			occupation.occuper(cell_list[i], id);
		}
	}
	
	var diametre = arene.tailleCellule()/2;
	if(pos_depart=="haut" || pos_depart=="bas")
		__creationCorps(longueur, couleur, arene, pos_depart, occupation, diametre);
	else
		console.log("Erreur : pos_depart invalide (haut ou bas)");
	
	
	/* -------------------SERVICES (METHODES)------------------ */
	
	// Retourne une copie du point sur lequel se trouve la tete
	this.tete = function()
	{
		return cell_list[0].copie();
	}
	
	// Retourne une copie du point sur lequel se trouve la queue
	this.queue = function()
	{
		return cell_list[longueur-1].copie();
	}
	
	// Retourne une copie de la liste des positions occupées par le serpent
	this.positions = function()
	{
		var plist = [];
		for(var i=0; i<longueur; i++)
		{
			plist[i] = cell_list[i].copie();
		}
		return plist;
	}
	
	// Avance la tete sur la cellule C et décalle le reste du corps.
	this.placerTete = function(C)
	{
		occupation.liberer(cell_list[longueur-1]);
		occupation.occuper(C, id);
		
		var i;
		for(i=longueur-1; i>0; i--)
		{
			cell_list[i] = cell_list[i-1];
		}
		cell_list[0] = C;
		
		for(i=0; i<longueur; i++)
		{
			carre_list[2*i].placerSurCellule(cell_list[i]);
			if(i<longueur-1)
				carre_list[2*i+1].placerEntreCellules(cell_list[i], cell_list[i+1]);
		}
	}
}