/** CTOR Point */

var Point = function(col, lgn)
{
	this.x = col;
	this.y = lgn;
	
	this.toString = function()
	{
		return ("("+this.x+","+this.y+")");
	}
	
	this.copie = function()
	{
		var c = new Point(this.x, this.y);
		return c;
	}
	
	// Retourne une copie de la cellule voisine dans la direction donnée.
	// Si la direction est inconnue, renvoie la meme cellule.
	this.voisin = function(dir)
	{
		var c = this.copie();
		switch(dir)
		{
			case "haut" :	c.y--;
							break;
			case "bas" :	c.y++;
							break;
			case "gch" :	c.x--;
							break;
			case "drt" : 	c.x++;
							break;
			default :		console.log("Direction inconnue : "+dir);
		}
		return c;
	}
}


/* Fonction égalité */

function sontAuMemePoint(p1, p2)
{
	return (p1.x==p2.x && p1.y==p2.y);
}