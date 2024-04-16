import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import Swal from 'sweetalert2';

//creation de l'appel API pour obtenir de le token d'authentification 

//1- selecteur : lorsque je clique sur le bouton d'authentification de l'interface web 
// Event.preventDefault()
// La méthode preventDefault(), rattachée à l'interface Event, indique à 
// l'agent utilisateur que si l'évènement n'est pas explicitement géré, 
// l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.

//2- récupérer et convertir en base64 les champs login et password 
// La méthode btoa() crée une chaîne ASCII codée en Base64 à partir 
// d'une chaîne binaire (c'est-à-dire une chaîne dans laquelle chaque 
// caractère de la chaîne est traité comme un octet de données binaires).

//3- déclaration de la variable DATA, qui contient les paramètres nécessaire au bon fonctionnement de mon API
// La méthode statique JSON.stringify() convertit une valeur JavaScript en chaîne JSON, en remplaçant éventuellement 
// les valeurs si une fonction de remplacement est spécifiée ou en incluant éventuellement uniquement les propriétés 
// spécifiées si un tableau de remplacement est spécifié.

//4- utilisation de la méthode FETCH pour réaliser mon appel API 
// La méthode globale fetch() démarre le processus de récupération 
// d'une ressource à partir du réseau, renvoyant une promesse qui 
// est remplie une fois la réponse disponible.
// La promesse se résout en l'objet 'Response' représentant la réponse 
// à votre demande.

//5- récupérer les informations des retours de mon API

export const access_domain = 'https://webinar.wazo.io.home';
export const wazo_auth = '/api/auth/0.1/token';

//ATTENTION preciser au webi #4 l'erreur de version du endpoint
// export const get_user = '/api/confd/0.1/users/';
export const get_user = '/api/confd/1.1/users/';  //l'appel était erroné, je me suis trompé dans la version (initialement saisie "0.1")



// WEZBINAIR #1 #2 
$("#submit").on('click', function(e){
  e.preventDefault();
   //identifiant:motdepasse
  let credentials = $("#login").val()+':'+$("#password").val();
  let credentials_b64 = btoa(credentials);

  let data = {
    method: 'POST',
    body: JSON.stringify({
      "client_id": "user_webinar_token",
      "access_type": "offline",
      "backend": "wazo_user",
      "expiration": "43200",
      "domain_name": "webinar.home"
    }),
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Basic '+ credentials_b64 
    }
  };

  let aPromise = fetch(access_domain+wazo_auth, data);

  aPromise.then(function(response){
    console.log(response);
    if(!response.ok) {
      if (response.status == 401){
        Swal.fire("Zut!", "L'identifiant ou mot de passe semble être incorrecte");
      }
      throw new Error("HTTP error = " + response.status);
    }

    let myJSON_promise = response.json();
    return myJSON_promise;
  })
  .then(function(myJSON){
    console.log(myJSON);
    // Swal.fire("Mon Token :", myJSON.data.token);
    sessionStorage.setItem("token", myJSON.data.token);
    sessionStorage.setItem("pbx_user_uuid", myJSON.data.metadata.pbx_user_uuid);
    sessionStorage.setItem("tenant_uuid", myJSON.data.metadata.tenant_uuid);

    document.location.href = "app/";
  })
})