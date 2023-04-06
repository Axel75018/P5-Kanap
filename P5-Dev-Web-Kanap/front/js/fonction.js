// fonction fetchData() -----------------------------------------------------

export async function fetchData(url) { // async pour permettre charge desyncho et utilisation await
    const reponse = await fetch(url); // await attend que la promesse soit complétée en sérialiséé
    const reponseJSONawait = await reponse.json(); //transforme la promesse va se transformer en json  
    return reponseJSONawait; // retourne la la valeur une fois complétée
    
  }



  //fonctions cart -------------------------------------------------------------------------------

  //----------------------------sauveCart()----------------------a--

export function sauveCart(panier) {
    // sérialise avant d'ajouter au local storagr
    localStorage.setItem("panier", JSON.stringify(panier))
  };
  
// recupCart()
  export function recupCart() {
    let panier = localStorage.getItem("panier");
    // condition sur panier , renvoie un tableau vide si panier vide
    if (panier == null) {
      return []
  
    } else {
      return JSON.parse(panier);
    }
  
  };