import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import Swal from 'sweetalert2';

import { access_domain, wazo_auth, get_user } from './main';

const token = sessionStorage.getItem("token");
const mon_tenant = sessionStorage.getItem("tenant_uuid");
const utilisateur_uuid = sessionStorage.getItem("pbx_user_uuid");

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

  document.getElementById("pbx_user_uuid").innerText = get_utilisateur.firstname;
  document.getElementById("pbx_user_").innerText = get_utilisateur.firstname;
})();