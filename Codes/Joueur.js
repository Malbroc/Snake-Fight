/** CTOR JoueurHumain */

var JoueurHumain = function(indice, nbColonnes, nbLignes)
{
	var touche;

	document.onkeypress = function(evt){touche = evt.keyCode;}
	
	// Renvoie un mouvement en fonction de la liste des listes de positions occupées
	// par les autres joueurs.
	this.proposerMouvement = function(positions_protagonistes)
	{
		var mouvement;
		switch(touche)
		{
			case 37	:	mouvement = "gch";
						break;
						
			case 38 :	mouvement = "haut";
						break;
						
			case 39 :	mouvement = "drt";
						break;
						
			case 40 :	mouvement = "bas";
						break;
		}
		
		return mouvement;
	}
}


/** CTOR JoueurMachine */

var JoueurMachine = function(indice, nbColonnes, nbLignes)
{
	var grille = [];		// grille (2D) correspondant à une copie de l'occupation
	var serpPos = [];		// Positions du serpent du joueur numéro indice
	var x, y;
	for(x=0; x<nbColonnes; x++)
	{
		grille[x] = [];
		for(y=0; y<nbLignes; y++)
			grille[x][y] = 0;
	}
	
	// Met à jour la grille des positions et la liste des positions du joueur
	// a partir de la liste des positions de tous les joueurs
	function update(listePos)
	{
		for(var x=0; x<nbColonnes; x++){
			for(var y=0; y<nbLignes; y++){
				grille[x][y] = 0;
			}
		}
		for(var i=0; i<listePos.length; i++)
		{
			for(var j=0; j<listePos[i].length; j++)
			{
				var cell = listePos[i][j].copie();
				grille[cell.x][cell.y] = i+1;
			}
		}
		
		for(i=0; i<listePos[indice-1].length; i++)
		{
			serpPos[i] = listePos[indice-1][i].copie();
		}
	}
	
	// Teste si une case est libre (ou valide)
	function estLibre(cell)
	{
		if(cell.x < 0 || cell.x >= nbColonnes || cell.y < 0 || cell.y >= nbLignes)
			return false;
		return (grille[cell.x][cell.y]==0);
	}
	
	// Marque une cellule comme occupée
	function marquer(cell)
	{
		if(cell.x >= 0 && cell.x < nbColonnes && cell.y >= 0 && cell.y < nbLignes)
			grille[cell.x][cell.y] = indice;
	}
	
	// Marque une cellule comme libre
	function liberer(cell)
	{
		if(cell.x >= 0 && cell.x < nbColonnes && cell.y >= 0 && cell.y < nbLignes)
			grille[cell.x][cell.y] = 0;
	}
	
	// Evalue recursivement le nombre de possibilités pour le mouvement 
	// partant de origine et arrivant sur tete.
	function evalMouvement(tete, N, origine)
	{	
		if(N == 0)
			return 0;
		
		var evaluation = 0;
		var nouv_tete;
		
		nouv_tete = tete.voisin("gch");
		if(!sontAuMemePoint(origine, nouv_tete)){
			if(estLibre(nouv_tete)){
				evaluation++;
				marquer(nouv_tete);
				evaluation += evalMouvement(nouv_tete, N-1, tete);
				liberer(nouv_tete);
			}
		}
		
		nouv_tete = tete.voisin("haut");
		if(!sontAuMemePoint(origine, nouv_tete)){
			if(estLibre(nouv_tete)){
				evaluation++;
				marquer(nouv_tete);
				evaluation += evalMouvement(nouv_tete, N-1, tete);
				liberer(nouv_tete);
			}
		}
		
		nouv_tete = tete.voisin("drt");
		if(!sontAuMemePoint(origine, nouv_tete)){
			if(estLibre(nouv_tete)){
				evaluation++;
				marquer(nouv_tete);
				evaluation += evalMouvement(nouv_tete, N-1, tete);
				liberer(nouv_tete);
			}
		}
		
		nouv_tete = tete.voisin("bas");
		if(!sontAuMemePoint(origine, nouv_tete)){
			if(estLibre(nouv_tete)){
				evaluation++;
				marquer(nouv_tete);
				evaluation += evalMouvement(nouv_tete, N-1, tete);
				liberer(nouv_tete);
			}
		}
		
		return evaluation;
	}
	
	
	// Retourne la maximum entre 4 nombres
	function max4(a, b, c, d)
	{
		if(a>=b && a>=c && a>=d)
			return a;
		if(b>=a && b>=c && b>=d)
			return b;
		if(c>=a && c>=b && c>=d)
			return c;
		return d;
	}
	
	
	// Retourne le mouvement à effectuer selon la méthode choisie
	this.proposerMouvement = function(positions_protagonistes)
	{
		update(positions_protagonistes);
		var mouvement;
		var tete = positions_protagonistes[indice-1][0].copie();
		var origine = positions_protagonistes[indice-1][1].copie();
		var N = 0;
		/*for(var i=0; i<positions_protagonistes.length; i++){
			if(N < positions_protagonistes[i].length)
				N = positions_protagonistes[i].length;
		}*/
		
		// Une précision de 12 demande trop de calculs
		N = 9;
		
		var nouv_tete;
		var mvgch = 0;
		var mvhaut = 0;
		var mvdrt = 0;
		var mvbas = 0;
		
		nouv_tete = tete.voisin("gch");
		if(!sontAuMemePoint(origine, nouv_tete)){
			mvgch = evalMouvement(nouv_tete, N, tete);
		}
		
		nouv_tete = tete.voisin("haut");
		if(!sontAuMemePoint(origine, nouv_tete)){
			mvhaut = evalMouvement(nouv_tete, N, tete);
		}
		
		nouv_tete = tete.voisin("drt");
		if(!sontAuMemePoint(origine, nouv_tete)){
			mvdrt = evalMouvement(nouv_tete, N, tete);
		}
		
		nouv_tete = tete.voisin("bas");
		if(!sontAuMemePoint(origine, nouv_tete)){
			mvbas = evalMouvement(nouv_tete, N, tete);
		}
		
		//console.log("scores : G="+mvgch+" H="+mvhaut+" D="+mvdrt+" B="+mvbas);
		var max = max4(mvgch, mvhaut, mvdrt, mvbas);
		
		
		if(max == mvgch)
			mouvement = "gch";
		if(max == mvhaut)
			mouvement = "haut";
		if(max == mvdrt)
			mouvement = "drt";
		if(max == mvbas)
			mouvement = "bas";
		
		return mouvement;
	}
}
