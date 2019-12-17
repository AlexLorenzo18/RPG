class Personnage {
  constructor(nom, sante, force) {
    this.nom = nom;
    this.sante = sante;
    this.force = force;
    this.xp = 0; 
  }
 
  principalattaque(cible) {
    if (this.sante > 0) {
      const degats = this.force;
      cible.sante -= degats;

      if (cible.sante > 0) {
        document.getElementById("txtcombat").innerHTML = (`${cible.nom} a encore ${cible.sante} points de vie`);
      } 

      else {
        cible.sante = 0;
        const bonusXP = 10;
        const bonusFORCE = 5;
        this.xp += bonusXP;
        this.force +=bonusFORCE;
      }
      
    } 
    
  }

  mechantattaque(cible) {
    if (this.sante > 0) {
      const degats = this.force;
      cible.sante -= degats;

      if (cible.sante > 0) {
        document.getElementById("combat").innerHTML = (`${cible.nom} a encore ${cible.sante} points de vie`);
      } 
    } 
    
  }

  stat() {
    document.getElementById("stat").innerHTML = (`${this.nom} a ${this.sante} points de vie, ${this.force} en force et ${this.xp} points d'expérience`);
  };

}

const principal = new Personnage("Pitch", 150, 25);
const mechantporte = new Personnage("Pyjaman", 45, 20);
const elfe = new Personnage("monstre2", 80, 20);
const boss = new Personnage("boss", 8000, 2000, 2000);

const textElement = document.getElementById("text")
const boutonsOptionsElement = document.getElementById("boutons")

let state = {}

function startGame() {
  state = {}
  showtextTest(1)
}

function showtextTest(textTable) {
  const textTest = textTests.find(textTest => textTest.id === textTable)
  textElement.innerText = textTest.text
  while (boutonsOptionsElement.firstChild) {
    boutonsOptionsElement.removeChild(boutonsOptionsElement.firstChild)
  }

  textTest.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      button.classList.add("btn")
      button.addEventListener("click", () => selectOption(option))
      boutonsOptionsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  let nexttextTestId = option.nextText

  if (nexttextTestId) {
    document.getElementById("stat").style.display = "none";
  }

  if (nexttextTestId == -3) {
    gentil.principalattaque(orc);
    if (orc.sante <= 0) {
      Do(nexttextTestId = 3);
    } 
    return;
    
  }

  if (nexttextTestId == -1) {
    principal.principalattaque(mechantporte);
    if (mechantporte.sante <= 0) {
      Do(nexttextTestId = 6);
      document.getElementById("combat").style.display = "none";
      document.getElementById("txtcombat").style.display = "none";
    } else {
      mechantporte.mechantattaque(principal);
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


  if (nexttextTestId <= 0) {
    return startGame()
  }

  Do()

  function Do(){

    state = Object.assign(state, option.setState)
    showtextTest(nexttextTestId)
  }

}


//setState: { blueGoo: true },
//requiredState: (currentState) => currentState.blueGoo,


 textTests = [
  {
    id: 1,
    text: "SALUT SALUT ! Je vous ai concocté une petite histoire de 10 embranchement comme vous l'aviez demandé. \n Dans cette histoire, vous jouez Pitch, une héroine qui doit aller au bout de sa mission pour récupérer les joyaux que Growser a volé",
    options: [
      {
        text: 'Lancer la partie',
        nextText: 2
      }
    ]
  },

  {
    id: 2,
    text: "Hello Pitch, je me présente je suis la fée qui t'accompagnera dans ce château, je le connais comme ma poche, nous y sommes déjà allées avec des potes, me demande pas pourquoi on était bleues. \n \n Il y a 2 entrées, par la porte d'entrée mais bon on risque de se faire repérer, ou alors par l'arrière il y a une petite trappe dans une cabane.",
    options: [
      {
        text: "Se diriger vers la porte d'entrée",
        nextText: 3
      },

      {
        text: "Se diriger vers la cabane",
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: "Vous arrivez devant une porte entrée en verre, on peut y voir à l'intérieur et il n'y a rien. La porte fait au moins 5 fois votre taille sachant que vous faites 1m60, c'est grand.",
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
        nextText: 7
      },
      {
        text: "Prendre les clés et partir à l'étage",
        setState: { clés: true },
        nextText: 7 
      },
      {
        text: "Statistique",
        nextText: -4
      },
    ]
  },

]



startGame()