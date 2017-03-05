/** CTOR Moteur */

var Moteur = function(div_id, taille_cell)
{
	var arene = new Arene(div_id, taille_cell); 
	var couleur_carrelage = "#008844";
	var carrelage = new Carrelage(arene.nbLignes(), arene.nbColonnes(), (0.9*arene.tailleCellule()), arene, couleur_carrelage);
	var occupation = new Occupation(arene);
	
	this.visuDebug = function(){ occupation.visuDebug(carrelage); }

	var serp_list = []; // Liste des serpents en jeu
	var nbr_serp = 0; // Nbr de serpents en jeu
	
	this.nbLignes = function()
	{
		return arene.nbLignes();
	}
	
	this.nbColonnes = function()
	{
		return arene.nbColonnes();
	}
	
	// Ajoute à serp_list un objet de type serpent initialisé avec les arguments donnés
	this.ajouterSerpent = function(longueur, couleur, depart)
	{
		var s = new Serpent(longueur, couleur, arene, depart, occupation);
		serp_list[nbr_serp] = s;
		nbr_serp++;
	}
	
	// Retourne une liste de listes de points correspondant aux positions
	// occupées par chaque serpent.
	this.positionsProtagonistes = function()
	{
		var plist = [];
		for(var i=0; i<nbr_serp; i++)
		{
			plist[i] = serp_list[i].positions();
		}
		return plist;
	}
	
	// Effectue le mouvement demandé pour le serpent d'indice donnés
	// s'il est possible, ou un mouvement aléatoire sinon.
	this.proposerMouvement = function(indice, mouvement)
	{
		if(indice > nbr_serp)
		{
			console.log("proposerMouvement : indice erroné.");
		}
		else
		{
			var serp = serp_list[indice-1];
			var tete = serp.tete();
			var nouv_tete = tete.voisin(mouvement);
			if(occupation.estLibre(nouv_tete))
				serp.placerTete(nouv_tete);
			else
			{
				var cell = occupation.voisinLibreAuHasard(tete);
				if(cell == undefined)
				{
					alert("Le serpent "+indice+" perd la partie !");
					location.reload();
				}
				else
					serp.placerTete(cell);
			}
		}
	}
}