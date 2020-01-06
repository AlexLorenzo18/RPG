class Personnage {
  constructor(nom, sante, force) {
    this.nom = nom;
    this.sante = sante;
    this.force = force;
    this.xp = 0; 
  }
 
  principalattaque(cible) {
    if (this.sante > 0) {

      cible.sante -= this.force;

      if (cible.sante > 0) {
        document.getElementById("txtcombat").innerHTML = (`${cible.nom} a encore ${cible.sante} points de vie`);
      } 

      else {
        cible.sante = 0;
        const bonusXP = 10;
        const bonusFORCE = 20;
        this.xp += bonusXP;
        this.force +=bonusFORCE;
      }
      
    } 

  }

  mechantattaque(cible) {

    if (this.sante > 0) {

      cible.sante -= this.force;

      if (cible.sante > 0) {
        document.getElementById("combat").innerHTML = (`${cible.nom} a encore ${cible.sante} points de vie`);
      } 
    } 
    
  }

  stat() {
    document.getElementById("stat").innerHTML = (`${this.nom} a ${this.sante}/250 points de vie , ${this.force} en force et ${this.xp} points d'expérience`);
  };

  potion() {
    const potion = 200;
    this.sante += potion;

  } 

}

let username = prompt("Quel est ton nom ?");
const principal = new Personnage(username, 250, 40);
const mechantporte = new Personnage("Pyjaman", 200, 20);
const chien = new Personnage("Chien", 220, 60);
const boss = new Personnage("boss", 8000, 2000);

const textElement = document.getElementById("text");
const boutonsOptionsElement = document.getElementById("boutons");

let state = {};

function startGame() {
  state = {};
  showtextTest(1);
}

function showtextTest(textTable) {
  const textTest = textTests.find(textTest => textTest.id === textTable);
  textElement.innerText = textTest.text;
  while (boutonsOptionsElement.firstChild) {
    boutonsOptionsElement.removeChild(boutonsOptionsElement.firstChild);
  }

  textTest.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      boutonsOptionsElement.appendChild(button);
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {

  let nexttextTestId = option.nextText;

  if (nexttextTestId == 22) {
    principal.potion()
    chien.mechantattaque(principal);
    Do(nexttextTestId = 17);
    
  }

  if (nexttextTestId == 23) {
    principal.potion()
    chien.mechantattaque(principal);
    Do(nexttextTestId = 20);
    
  }

  if (nexttextTestId) {
    document.getElementById("stat").style.display = "none";
  }

// ATTAQUE PORTE

  if (nexttextTestId == -1) {
    principal.principalattaque(mechantporte);
    if (mechantporte.sante <= 0) {
      Do(nexttextTestId = 6);
        document.getElementById("combat").style.display = "none";
        document.getElementById("txtcombat").style.display = "none";
        document.body.background = "pyjama.jpg";
    } else {
      mechantporte.mechantattaque(principal);
    }
  return;
  }


  // ATTAQUE CHIEN

  if (nexttextTestId == -2) {
    principal.principalattaque(chien);
    document.getElementById("combat").style.display = "block";
    document.getElementById("txtcombat").style.display = "block";

    if (principal.sante <= 0) {
      Do(nexttextTestId = 16);
      document.getElementById("combat").style.display = "none";
      document.getElementById("txtcombat").style.display = "none";
    }
    
    if (chien.sante <= 0) {
      Do(nexttextTestId = 12);
        document.getElementById("combat").style.display = "none";
        document.getElementById("txtcombat").style.display = "none";
     
     
      } else {
      chien.mechantattaque(principal);
    }
  return;
  }

  if (nexttextTestId == -8) {
    gentil.attaquer(boss);
    boss.attaquer(gentil);
  return;

  } 

  if (nexttextTestId == -4) {
    document.getElementById("stat").style.display = "block"; 
    principal.stat();
  return;

  } 

  if (nexttextTestId == 5){
    principal.sante = principal.sante - 20;
    document.getElementById("stat").style.display = "block"; 
    principal.stat();
  }

  if (nexttextTestId == 3) {
    document.body.background = "porte.jpg"; 
  }

  if (nexttextTestId == 4) {
    document.body.background = "crie.jpg"; 
  }
  
  if (nexttextTestId == 2) {
    document.body.background = "chateausombre.jpg";
  }

  if (nexttextTestId == 7) {
    document.body.background = "fenetre.jpg";
  }

  if (nexttextTestId == 5) {
    document.body.background = "fenetrecasse.jpg";
  }

  if (nexttextTestId == 9) {
    document.body.background = "chambre.jpg";
  }

  if (nexttextTestId == 8) {
    document.body.background = "chambre.jpg";
  }

  if (nexttextTestId == 0) {
    location.reload();
  }

  Do();

  function Do(){

    state = Object.assign(state, option.setState);
    showtextTest(nexttextTestId);
  }

}



 textTests = [
  {
    id: 1,
    text: "SALUT SALUT ! Je vous ai concocté une petite histoire de 10 embranchement comme vous l'aviez demandé. \n Dans cette histoire, vous jouez " + username + ", une héroine qui doit aller au bout de sa mission pour récupérer les joyaux que Growser a volé \n\n Se battre vous rapporte de l'XP et de la force.\n Vous aurez toujours l'initiative dans un combat.",
    options: [
      {
        text: 'Lancer la partie',
        nextText: 2
      }
    ]
  },

  {
    id: 2,
    text: "Hello " + username + ", je me présente je suis la fée qui t'accompagnera dans ce château, je le connais comme ma poche, nous y sommes déjà allées avec des potes, me demande pas pourquoi on était bleues. \n \n Il y a 2 entrées, par la porte d'entrée mais bon on risque de se faire repérer, ou alors par l'arrière il y a une petite trappe dans une cabane.",
    options: [
      {
        text: "Se diriger vers la porte d'entrée",
        nextText: 3
      },

      {
        text: "Se diriger vers la fenêtre arrière",
        nextText: 7
      }
    ]
  },
  {
    id: 3,
    text: "Vous arrivez devant une porte d'entrée en verre, on peut y voir à l'intérieur et il n'y a rien. La porte fait au moins 5 fois votre taille sachant que vous faites 1m60, c'est grand.",
    options: [
      {
        text: "Sonner comme une voisine exemplaire",
        nextText: 4
      },
      {
        text: "Exploser le carreau avec le poing",
        nextText: 5
      },
      {
        text: "Ne rien faire. (Ca ne fait vraiment rien)",
      }
    ]
  },

  {
    id: 4,
    text: "Une personne en pyjama vous attrape par le col puis vous insulte à foison. \n Pas très sympa d'interrompre la nuit de cette personne...",
    options: [
      {
        text: "Frapper",
        nextText: -1
      },
      {
        text: "Statistique",
        nextText: -4
      },
    ]
  },
  {
    id: 5,
    text: "Aie aie, en cassant la vitre vous vous ouvrez la main. Vous rentrez quand même mais avec une blessure.",
    options: [
      {
        text: "Rentrer",
        nextText: 4
      },
      {
        text: "Statistique",
        nextText: -4
      },
    ]
  },
  {
  id: 6,
    text: "Bravo ! Il est au sol, je crois que les joyaux sont à l'étage. \n\n *aboiement* \n\n Je crois qu'un animal traine par là, on doit partir vite ! \n\n Vous voyez que l'homme a des clés attachés à sa ceinture",
    options: [
      {
        text: "Partir à l'étage sans les clés",
        nextText: 9
      },
      {
        text: "Prendre les clés et partir à l'étage",
        setState: { clés: true },
        nextText: 8
      },
      {
        text: "Statistique",
        nextText: -4
      },
    ]
  },
  {
    id: 7,
    text: "Vous êtes devant la fenêtre, elle est verrouillée.",
    options: [
      {
        text: "Casser",
        nextText: 5
      },
      {
        text: "Aller à la porte d'entrée",
        nextText: 3
      },
      {
        text: "Statistique",
        nextText: -4
      },
    ]
  },
  {
    id: 8,
    text: "Vous rentrez dans une chambre. L'aboiement se rapproche.\n\n Le temps presse.",
    options: [
      {
        text: "Se cacher sous le lit",
        nextText: 10,
      },
      {
        text: "Se cacher dans l'armoire verrouillée.",
        nextText: 11,
        requiredState: (currentState) => currentState.clés,
      },
    ]
  },
  {
    id: 9,
    text: "Vous rentrez dans une chambre. L'aboiement se rapproche.\n\n Le temps presse.",
    options: [
      {
        text: "Se cacher sous le lit",
        nextText: 10
      },
      {
        text: "Vous n'avez pas la clé pour l'armoire",
      },
    ]
  },
  {
    id: 10,
    text: "Vous vous glissez sous le lit mais l'odorat du monstre vous repère. \n\n La fée vous donne une bouteille qui contient un liquide noirâtre marqué d'un étiquette 'Cherry', la boire pourra peut être vous aider lors du combat",
    options: [
      {
        text: "Frapper",
        nextText: -2
      },
      {
        text: "Boire le Cherry",
        nextText: 23,
      },
      {
        text: "Statistique",
        nextText: -4,
      },
    ]
  },
  {
    id: 20,
    text: "Vous vous glissez sous le lit mais l'odorat du monstre vous repère. \n\n La fée vous donne une bouteille qui contient un liquide noirâtre marqué d'un étiquette 'Cherry', la boire pourra peut être vous aider lors du combat",
    options: [
      {
        text: "Frapper",
        nextText: -2
      },
      {
        text: "Statistique",
        nextText: -4,
      },
    ]
  },

  {
    id: 11,
    text: "Vous ouvrez l'armoire avec la clé, vous y rentrez et vous vous sentez en sécurité.",
    options: [
      {
        text: "Sortir et affronter le monstre",
        nextText: 15
      },
      {
        text: "Attendre",
        nextText: 12,
      },
    ]
  },
  {
    id: 12,
    text: "Le monstre est distrait par une lumière à la fenêtre ! C'est l'occasion de fuir !",
    options: [
      {
        text: "Fuir dans le couloir à gauche",
        nextText: 13
      },
      {
        text: "Fuir dans le couloir à droite",
        nextText: 14
      },
    ]
  },
  {
    id: 13,
    text: "Vous rentrez dans une salle qui semble être une cuisine IKEA. \n Au fond, les joyaux dans une boite Harybeau.",
    options: [
      {
        text: "Prendre les joyaux et partir en courant !",
        nextText: 99
      },
    ]
  },
  {
    id: 14,
    text: "Vous rentrez dans une salle qui semble être une salle de bain. \n Vous croisez le regard d'une dame se démaquillant. \n\n Elle vous attrape et vous ramène chez vos parents. \n\n Fini les sorties.",
    options: [
      {
        text: "Recommencer",
        nextText: 0
      },
    ]
  },
  {
    id: 15,
    text: "Vous sortez pour affronter le monstre. \n\n La fée vous donne une bouteille qui contient un liquide noirâtre marqué d'un étiquette 'Cherry', la boire pourra peut être vous aider lors du combat",
    options: [
      {
        text: "Frapper",
        nextText: -2
      },
      {
        text: "Boire le Cherry",
        nextText: 22,
      },
      {
        text: "Statistique",
        nextText: -4,
      },
    ]
  },
  {
    id: 17,
    text: "Vous sortez pour affronter le monstre. \n\n La fée vous donne une bouteille qui contient un liquide noirâtre marqué d'un étiquette 'Cherry', la boire pourra peut être vous aider lors du combat",
    options: [
      {
        text: "Frapper",
        nextText: -2
      },
      {
        text: "Statistique",
        nextText: -4,
      },
    ]
  },
  {
    id: 16,
    text: "Le chiot aboie et alerte une dame. \n\n Elle vous attrape et vous ramène chez vos parents. \n\n Fini les sorties.",
    options: [
      {
        text: "Recommencer",
        nextText: 0
      },
      
    ]
  },
  {
    id: 99,
    text: "Vous rentrez chez vous sain et sauf. Vous allez manger vos bonbons au fond de votre couette. \n\n Félicitations.",
    options: [
      {
        text: "Recommencer",
        nextText: 0
      },
    ]
  },

]

startGame();

