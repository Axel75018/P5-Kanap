// objet URL
// on recup l'url
const str = window.location.href;
const url = new URL(str);
const nameID = url.searchParams.get("id");


// affichage commande
const divParent = document.querySelector('#limitedWidthBlock');
const h2Merci = document.createElement('h2');
h2Merci.innerText = 'Merci de votre achat !';
//divParent.appendChild(h2Merci);
const divConfirmation = document.querySelector('.confirmation');
const spanOrderId = document.querySelector('#orderId');
spanOrderId.innerText = nameID;
divParent.insertBefore(h2Merci, divConfirmation);


// supprime l'historique
//nameID =0;
//history.pushState(state, title, url);

