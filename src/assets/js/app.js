  /////////////////
  // API Episode #3
  /////////////////

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import Swal from 'sweetalert2';

import { access_domain, wazo_auth, get_user } from './main';

const token = sessionStorage.getItem("token");
const mon_tenant = sessionStorage.getItem("tenant_uuid");
const utilisateur_uuid = sessionStorage.getItem("pbx_user_uuid");

const data_retention = {
  "nom": [],
  "prenom": [],
  "renvoi_busy": [],
  "renvoi_busy_dest": []
};

$(".logout").on('click', function(e){
  e.preventDefault;
  let dataapi = {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'X-Auth-Token': token
    }
  };

  let Promise = fetch(access_domain+wazo_auth+"/"+token, dataapi);
  Promise
  .then(function (response) {
    if(!response.ok){
      throw new Error("HTTP error, status = " + response.status)
    }
  })
  .then(function (myJSON) {
    sessionStorage.clear();
    document.location.href = "../";
  })
  .catch(function (error) {
    console.log(error);
  })
});

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
  /////////////////
  // FIN Episode #3
  /////////////////
  // API Episode #4
  /////////////////
  console.log(get_utilisateur.email);
  console.log("Busy Enable ? " + get_utilisateur.forwards.busy.enabled);
  console.log("Busy destination: " + get_utilisateur.forwards.busy.destination);
  console.log("Noanswer Enable ? " + get_utilisateur.forwards.noanswer.enabled);
  console.log("Noanswer destination: " + get_utilisateur.forwards.noanswer.destination);
  console.log("Unconditional Enable ? " + get_utilisateur.forwards.unconditional.enabled);
  console.log("Unconditional destination: " + get_utilisateur.forwards.unconditional.destination);

  document.getElementById("pbx_user_uuid").innerText = get_utilisateur.firstname;
  document.getElementById("pbx_user_").innerText = get_utilisateur.firstname;

  
  if(get_utilisateur.forwards.busy.enabled == true){
    document.getElementById("busy").innerText = "Activé";
    document.getElementById("busy_number").innerText = get_utilisateur.forwards.busy.destination;
  }else{
    document.getElementById("busy").innerText = "Désactivé";

    const busy_number = document.getElementById("busy_number");
    (get_utilisateur.forwards.busy.destination == null) ? busy_number.innerText = "aucun numéro saisi" : busy_number.innerText = get_utilisateur.forwards.busy.destination;
    
    // OU
    // if (get_utilisateur.forwards.busy.destination == null) {
    //   document.getElementById("busy_number").innerText = "aucun numéro saisi";
    // } else {
    //   document.getElementById("busy_number").innerText = get_utilisateur.forwards.busy.destination;
    // }
    
  }
  
  data_retention.nom = get_utilisateur.firstname;
  data_retention.prenom = get_utilisateur.firstname;
  data_retention.renvoi_busy = get_utilisateur.forwards.busy.enabled;
  data_retention.renvoi_busy_dest = get_utilisateur.forwards.busy.destination;

  localStorage.setItem("DataRetention", JSON.stringify(data_retention))
  
  document.getElementById("noanswer").innerText = get_utilisateur.forwards.noanswer.enabled;
  document.getElementById("unconditional").innerText = get_utilisateur.forwards.unconditional.enabled;

  /////////////////
  // FIN Episode #3
  /////////////////

})();