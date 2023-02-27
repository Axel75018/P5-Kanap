const urlAPI = "http://localhost:3000/api/products/"

//Youtube
console.log('youtube promesse');



await fetch(urlAPI).then(response => response.json().then(data => console.log(data)));
await fetch(urlAPI).then(response => response.json().then(data => console.log(data[1])));
await fetch(urlAPI).then(response => response.json().then(data => console.log(data[1].name)));
await fetch('http://localhost:3000/api/products/77711f0e466b4ddf953f677d30b0efc9').then(response => response.json().then(data => console.log(data)));

console.log('------------openclassroom await-----------------');
const reponse = await fetch(urlAPI);
const reponseJSON = await reponse.json();
console.log(reponseJSON);
console.log(reponseJSON[1]);
console.log(reponseJSON[1].name);
const reponseID = await fetch(`${urlAPI}77711f0e466b4ddf953f677d30b0efc9`);
const reponseIDJSON = await reponseID.json();
console.log(reponseIDJSON);