// library --> https://sortablejs.github.io/Sortable/
// documentatie https://github.com/SortableJS/Sortable





/************************/
/* DE LIJSTEN & KNOPJES */
/************************/
var favoLijst = document.querySelector("ul:first-of-type");
var allesLijst = document.querySelector("ul:last-of-type");

// dit is een array
var alleVoegToeKnopjes = document.querySelectorAll("ul:last-of-type button");





/**********************/
/* DRAGGEN EN DROPPEN */
/**********************/
new Sortable(allesLijst, {
    group: {
        name: 'fotoLijstjes', // zelfde naam als bij favoLijstje
        pull: 'clone' // er wordt een kopie gemaakt
    },
    sort: false, // de foto kunnen in de lijst zelf niet gesorteerd worden
    forceFallback: true, // om meer controle te hebben over ghost en cursor
    animation: 300, // een kleine animatie als een foto van plek wisselt
    onStart: function (event) {
        document.body.classList.add("dragging");
    },
    onEnd: function (event) {
        document.body.classList.remove("dragging");
    }
});

new Sortable(favoLijst, {
    group: {
        name: 'fotoLijstjes', // zelfde naam als bij allesLijstje
        pull: 'false' // foto's kunnen niet uit de favo lijst gesleept worden
    },
    forceFallback: true, // om meer controle te hebben over ghost en cursor
    animation: 300, // een kleine animatie als een foto van plek wisselt
    onAdd: function (event) {
        // als een foto naar de favo lijst wordt gesleept

        // de orginele foto - de button weer naar kliks laten luisteren
        event.clone.addEventListener("click", voegFotoToeAlsFavo);

        // nieuwe foto - de button wisselen naar verwijderen
        vanVoegToeNaarVerwijderButton(event.item);
    }
});





/*******************/
/* KNOPJES KLIKKEN */
/*******************/
alleVoegToeKnopjes.forEach(eenKnopje => {
    // elk knopje in de array luistert naar kliks
    eenKnopje.addEventListener("click", voegFotoToeAlsFavo);
});

function voegFotoToeAlsFavo(event) {
    var deButtonWaaropGekliktIs = this;
    // opzoeken welke li bij de button hoort
    var deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest("li");

    // de li klonen en achteraan toevoegen aan de favo lijst
    var fotoKloon = deLiWaarDeButtonInZit.cloneNode(true);
    favoLijst.appendChild(fotoKloon);
    // nog wat dingetjes met de toegevoegde li/foto doen
    vanVoegToeNaarVerwijderButton(fotoKloon);
}


function vanVoegToeNaarVerwijderButton(deFoto) {
    // zorgen dat de nieuwe foto in beeld scrollt
    deFoto.scrollIntoView({behavior: "smooth", inline: "center"});

    // button wijzigen naar verwijderen
    // de voegToe button verwijderen
    var deButtonBijDeFoto = deFoto.querySelector("button");
    deButtonBijDeFoto.remove();

    // een nieuwe button aanmaken
    var deVerwijderButton = document.createElement("button");
    // die button laten luisteren naar kliks
    deVerwijderButton.addEventListener("click", verwijderFoto);
    // die button toevoegen aan de li
    deFoto.appendChild(deVerwijderButton);
}


function verwijderFoto() {
    var deButtonWaaropGekliktIs = this;
    // opzoeken welke li bij de button hoort
    var deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest("li");
    // weg der mee - hatseflats
    deLiWaarDeButtonInZit.remove();
}
