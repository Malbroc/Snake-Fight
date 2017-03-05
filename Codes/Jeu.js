//-------- INITIALISATION DU CONTEXTE -----------

var moteur = new Moteur("Arene", 50);
var NBJoueurs = 0;
var joueursList = []

moteur.ajouterSerpent(12, "#ffff00", "bas");
joueursList[NBJoueurs++] = new JoueurHumain(1, moteur.nbColonnes(), moteur.nbLignes());

moteur.ajouterSerpent(12, "#ff0000", "haut");
joueursList[NBJoueurs++] = new JoueurMachine(2, moteur.nbColonnes(), moteur.nbLignes());

var div_bouton = document.getElementById("button");
div_bouton.__actif = false;
div_bouton.__PLAY = undefined;
div_bouton.onclick = function()
{
	if(!div_bouton.__actif)
	{
		div_bouton.__PLAY = setInterval(clap,200);
		div_bouton.__actif = true;
		div_bouton.value = "PAUSE";
	}
	else
	{
		clearInterval(div_bouton.__PLAY);
		div_bouton.__actif = false;
		div_bouton.value = "REPRENDRE";
	}
}

function clap()
{
	for(var i=0; i<NBJoueurs; i++)
	{
		moteur.proposerMouvement(i+1, joueursList[i].proposerMouvement(moteur.positionsProtagonistes()));
	}
	//moteur.visuDebug();
}