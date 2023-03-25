const urlAPI = "http://localhost:3000/api/products/"
const reponse = await fetch(urlAPI);
//transforme en json exploitable
const reponseJSON = await reponse.json();

//----------------------------sauveCart----------------------a--

export function sauveCart(panier) {

    localStorage.setItem("panier", JSON.stringify(panier))
};

//----------------------------recupCart------------------------

export function recupCart() {
    let panier = localStorage.getItem("panier");
    if (panier == null) {
        return []

    } else {
        return JSON.parse(panier);
    }

};
// calcul et affichage du total
function calculTotal(panier) {

    let totalQ = 0;
    let totalPrix = 0;
   
    for (let t = 0; t < panier.length; t++) {
        let pdtJSON = reponseJSON.find(p => p._id == panier[t].ID);
      
        //total des Q    
        totalQ = totalQ + panier[t].Q;
       


        //Total prix
        let Prix = pdtJSON.price;
        totalPrix = totalPrix + (panier[t].Q * Prix);

    }


    //fonction affichage Q et Prix

    const spanTotalQ = document.querySelector("#totalQuantity");
    spanTotalQ.innerText = totalQ;

    const spanTotalPrix = document.querySelector("#totalPrice");
    spanTotalPrix.innerText = totalPrix;

};

//----------------------------addCart------------------------

export function addCart(id, couleur, quantite) {
    const produit = { 'ID': id, 'couleur': couleur, 'Q': quantite };
    // faire condition sur panier vide !
    const panier = recupCart();

    if (panier == "") {

        panier.push(produit);
        sauveCart(panier);
        alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');


    }

    else {


        //check produit même couleur déja présent    
        const foundProduct = panier.find(p => p.ID + p.couleur == produit.ID + produit.couleur);


        //produit existant dans la même couleur
        if (foundProduct != undefined && produit.couleur == foundProduct.couleur) {

            let somA = parseInt(quantite, 10);
            let somB = parseInt(foundProduct.Q, 10);
            let somQ = somA + somB;
            // check que nouvelle plus ancienne Q ok
            if (somQ <= 0 || somQ > 100) {
                let messAlerte = 'Attention vous avez déja ' + somB + ' unités dans le panier ! Vous allez dépasser les 100 unités';
                alert(messAlerte);
            }
            else {
                produit.Q = somQ;
                foundProduct.Q = somQ;
                sauveCart(panier);
                alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
            }

        } else { // Cas ou combi coul id non existant
            panier.push(produit);
            sauveCart(panier);
            alert(quantite + ' canapé(s) ' + couleur + ' ajouté(s) dans le panier');
        }

    }
}

// Sup

export function supCart(idCoul) {

    let panier = recupCart();
    panier = panier.filter(p => p.ID + p.couleur != idCoul);
    sauveCart(panier);
    calculTotal(panier);
}


//liste panier----------------------------------------


//recup url pour ne s'applique que sur la page cart
const urlCourante = document.location.href;
if (urlCourante.indexOf("cart") != -1) {
    // Récupération de l'élément du DOM qui accueillera les fiches

    let panier = recupCart();

    const sectionCart = document.querySelector("#panier");
    sectionCart.innerHTML = "";
    let totalQ = 0;
    let totalPrix = 0;
    //condition panier vide
    if (panier == "") {
        sectionCart.innerHTML = '<h2> Le panier est vide !</h2>'
        const divCommander = document.querySelector(".cart__order");
        divCommander.innerHTML=''; 

    }
    else {



        for (let i = 0; i < panier.length; i++) {

            // retrouver le produit du local storage dans l'API
            let pdtJSON = reponseJSON.find(p => p._id == panier[i].ID);

            // objets à ajouter
            const pdtArticle = document.createElement("article");
            pdtArticle.className = "cart__item";
            pdtArticle.dataset.id = panier[i].ID;
            pdtArticle.dataset.color = panier[i].couleur;

            const pdtdivIMG = document.createElement("div");
            pdtdivIMG.className = "cart__item__img";
            const pdtIMG = document.createElement("img");
            pdtIMG.src = pdtJSON.imageUrl;

            const pdtContent = document.createElement("div");
            pdtContent.className = "cart__item__content";

            const pdtDescription = document.createElement("div");
            pdtDescription.className = "cart__item__content__description";


            const pdtNom = document.createElement("h2");
            pdtNom.innerText = pdtJSON.name;
            const pdtCouleur = document.createElement("p");
            pdtCouleur.innerText = panier[i].couleur;
            const pdtPrix = document.createElement("p");
            pdtPrix.innerText = pdtJSON.price + " €";
            const pdtQ = document.createElement("p");
            pdtQ.innerText = 'Q : ' + panier[i].Q;


            const pdtSettings = document.createElement("div");
            pdtSettings.className = "cart__item__content__settings";
            const pdtdivQ = document.createElement("div");
            pdtdivQ.className = "cart__item__content__settings__quantity";

            // input
            const pdtInput = document.createElement('input');
            pdtInput.value = panier[i].Q;
            pdtInput.className = 'itemQuantity';
            pdtInput.name = 'itemQuantity';
            pdtInput.type = "number";
            pdtInput.min = 1;
            pdtInput.max = 100;
            pdtInput.id = 'idligne' + i;
            pdtInput.addEventListener("change", function () {

                changeQ(panier[i].ID, pdtInput.value, panier[i].couleur);
                pdtQ.innerText = 'Q : ' + pdtInput.value;
                if (pdtInput.value == 0) {
                    supCart(panier[i].ID+panier[i].couleur);
                    pdtArticle.remove();
                }





            });


            // lien supprimer

            const divSup = document.createElement('div');
            divSup.className = 'cart__item__content__settings__delete';
            const parSup = document.createElement('p');
            parSup.className = 'deleteItem';
            parSup.innerText = 'Supprimer';
            parSup.addEventListener('click', function () {

                supCart(panier[i].ID + panier[i].couleur);
                pdtArticle.remove();

            });





            // attache au dom
            sectionCart.appendChild(pdtArticle);
            pdtArticle.appendChild(pdtdivIMG);
            pdtdivIMG.appendChild(pdtIMG);
            pdtArticle.appendChild(pdtContent);
            pdtContent.appendChild(pdtDescription);
            pdtDescription.appendChild(pdtNom);
            pdtDescription.appendChild(pdtCouleur);
            pdtDescription.appendChild(pdtPrix);

            pdtArticle.appendChild(pdtSettings);
            pdtSettings.appendChild(pdtdivQ);
            pdtdivQ.appendChild(pdtQ);
            pdtdivQ.appendChild(pdtInput);

            pdtSettings.appendChild(divSup);
            divSup.appendChild(parSup);




        }
        // affichage Q totalet Prix
        calculTotal(panier);
        const tableauPanier = Object.values(panier[0]);
       

    }
    // validation formulaire !!!!!

    function validateForm() {
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const email = document.getElementById("email").value.trim();
  
  
      const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/
      const cityRegex = /^[a-zA-Z\u0080-\u024F]+(?:[ .'-][a-zA-Z\u0080-\u024F]+)*$/;
  
      let isValid = true;
  
      if (firstName === "") {
        document.getElementById("firstNameErrorMsg").innerText = "Le prénom est obligatoire";
        isValid = false;
      } else if (!nameRegex.test(firstName)) {
        document.getElementById("firstNameErrorMsg").innerText = "Le prénom ne doit contenir que des lettres";
        isValid = false;
      } else {
        document.getElementById("firstNameErrorMsg").innerText = "";
      }
  
      if (lastName === "") {
        document.getElementById("lastNameErrorMsg").innerText = "Le nom est obligatoire";
        isValid = false;
      } else if (!nameRegex.test(lastName)) {
        document.getElementById("lastNameErrorMsg").innerText = "Le nom ne doit contenir que des lettres";
        isValid = false;
      } else {
        document.getElementById("lastNameErrorMsg").innerText = "";
      }
  
      if (address === "") {
        document.getElementById("addressErrorMsg").innerText = "L'adresse est obligatoire";
        isValid = false;
      } else {
        document.getElementById("addressErrorMsg").innerText = "";
      }
  
      if (city === "") {
        document.getElementById("cityErrorMsg").innerText = "La ville est obligatoire";
        isValid = false;
      } else if (!cityRegex.test(city)) {
        document.getElementById("cityErrorMsg").innerText = "La ville ne doit contenir que des lettres";
        isValid = false;
      } else {
        document.getElementById("cityErrorMsg").innerText = "";
      }
  
      if (email === "") {
        document.getElementById("emailErrorMsg").innerText = "L'adresse email est obligatoire";
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          document.getElementById("emailErrorMsg").innerText = "L'adresse email est invalide";
          isValid = false;
        } else {
          document.getElementById("emailErrorMsg").innerText = "";
        }
      }
  
      if (isValid) {
        return {
          firstName,
          lastName,
          address,
          city,
          email
        };
      } else {
        return null;
      }
  
    }
  // ---------------------------------------------------------Submit bouton
 // Select the order form element in the HTML using the "cart__order__form" class
const orderForm = document.querySelector(".cart__order__form");

// Add an event listener to the order form that triggers when the form is submitted
orderForm.addEventListener("submit", (event) => {
  // Call the validateForm function to validate the form data
  const contact = validateForm();

  // If the form data is invalid, prevent the form from being submitted
  if (!contact) {
    event.preventDefault();
  } else {
    // If the form data is valid, retrieve the shopping cart data
    let panier = recupCart();
    // Transform the shopping cart data into an array of product IDs
    let products = panier.map(function (obj) {
      return obj.ID;
    });

    // Create the final order object containing the contact information and the product IDs
    let commandeFinale = { contact, products };

    // Send the final order object to the server
    envoieServeur(commandeFinale).then(retourPost => {
      console.log(retourPost);
    });

    // Prevent the form from being submitted the default way
    event.preventDefault();
  }
});

// // Usage example:
// const contact = {
//   firstName: 'John',
//   lastName: 'Doe',
//   address:'24 rue du poteau',
//   city:'Paris',
//   email: 'john.doe@example.com'
// };

// const products = ['a557292fe5814ea2b15c6ef4bd73ed83'];

// let finalOrderObject ={contact, products};


// envoieServeur(finalOrderObject).then(response => {
//   console.log('finalOrderObject');
//   console.log(finalOrderObject);

 
// });

 // fonction envoie Post 
 async function envoieServeur(finalOrderObject) {
    let chargeUtile = JSON.stringify(finalOrderObject);
  
    try {
      const envoiPost = await fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
      });
  
      if (!envoiPost.ok) {
        throw new Error(`Erreur HTTP! : ${envoiPost.status}`);
      }
  
      const retourPost = await envoiPost.json(); // désérialise
      console.log("...............envoi et recup formulaire.................");
      console.log(retourPost);
      return retourPost; // Return the parsed JSON response
    } catch (error) {
      console.error('Erreur fetch data:', error);
      alert(`Erreur: ${error.message}`);
      return null;
    }
  }
  
  
  

//Change Q

function changeQ(ID, quantite, couleur) {

    const produit = { 'ID': ID, 'couleur': couleur, 'Q': parseInt(quantite) };
    let panier = recupCart();

    let foundProduct = panier.find(p => p.ID + p.couleur == produit.ID + produit.couleur);
    //nouvelle Quantité mise dans le panier mais pas sauvegardéé      
    foundProduct.Q = produit.Q;
    // check Q avant+ Q après changement
    if (foundProduct.Q > 100) {
        let messAlerte = 'Attention vous  allez ajouter ' + quantite + 'canapé(s) de couleur' + couleur + '  Vous allez dépasser les 100 unités';
        alert(messAlerte);
        return;
    }
    //Suppresion produit
    if (foundProduct.Q <= 0) {
        supCart(foundProduct.ID + foundProduct.couleur);
       

        calculTotal(panier);
    }

    else {
        // sauvegarde du panier
        sauveCart(panier);
        calculTotal(panier);
    }





}
}