// fonction fetchData() -----------------------------------------------------

export async function fetchData(url) { // async pour permettre charge desyncho et utilisation await
    const reponse = await fetch(url); // await attend que la promesse soit complétée en sérialiséé
    const reponseJSONawait = await reponse.json(); //transforme la promesse va se transformer en json  
    return reponseJSONawait; // retourne la la valeur une fois complétée
    
  }