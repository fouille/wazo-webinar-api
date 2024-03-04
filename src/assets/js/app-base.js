import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import Swal from 'sweetalert2';
import { access_domain, wazo_auth, get_user } from "./main";

const token = sessionStorage.getItem("token");
const mon_tenant = sessionStorage.getItem("tenant_uuid");
const utilisateur_uuid = sessionStorage.getItem("pbx_user_uuid");

const data_retention = {
  "nom": [],
  "prenom": [],
  "email": [],
  "forwards": [],
  "manouvelledata": []
 }

console.log(token);
//WEBINAIR #3

// configuration de la page d'accueil de l'utilisateur
// 1 - fin de session
$(".logout").on('click', function(e){
  e.preventDefault;
  let dataapi = {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'X-Auth-Token': token
    }
  };
  console.log(access_domain+wazo_auth+token);
  let aPromise = fetch(access_domain+wazo_auth+'/'+token, dataapi);
  aPromise
  .then(function(response) {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
  })
  .then(function(myJSON) {
    sessionStorage.clear();
    document.location.href = "../";
  })
  .catch(function(error)  {
    console.log(error);
  });

});

// 2 - exposition des données de l'utilisateur 
//generateur 
(async () => {
  const data_get = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Wazo-Tenant': mon_tenant,
      'X-Auth-Token': token
    }
  };
  const get_utilisateur = await fetch(access_domain+get_user+utilisateur_uuid, data_get).then(response => response.json());
  console.log(get_utilisateur);
  console.log(get_utilisateur.firstname);
  console.log(get_utilisateur.lastname);
  console.log(get_utilisateur.email);
  console.log(get_utilisateur.forwards.busy.enabled);
  console.log(get_utilisateur.forwards.busy.destination);
  console.log(get_utilisateur.forwards.noanswer.enabled);
  console.log(get_utilisateur.forwards.noanswer.destination);
  console.log(get_utilisateur.forwards.unconditional.enabled);
  console.log(get_utilisateur.forwards.unconditional.destination);

  data_retention.nom = get_utilisateur.lastname;
  data_retention.prenom = get_utilisateur.firstname;
  data_retention.email = get_utilisateur.email;
  data_retention.forwards = get_utilisateur.forwards; 
  console.log(data_retention);

  if(get_utilisateur.forwards.busy.enabled === true){
    console.log("busy actif");
  } else {
    console.log("busy inactif");
  }

  let test = (get_utilisateur.forwards.busy.enabled) ? console.log("busy actif") : console.log("busy inactif");
  console.log(test);



  document.getElementById("pbx_user_uuid").innerText = get_utilisateur.firstname + ' ' + get_utilisateur.lastname;
  document.getElementById("pbx_user_").innerText = get_utilisateur.firstname;
})();