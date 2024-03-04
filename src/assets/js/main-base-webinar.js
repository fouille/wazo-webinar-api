import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import Swal from 'sweetalert2';
import {Buffer} from 'buffer';

export const access_domain = 'https://webinar.wazo.io.local';
export const token = sessionStorage.getItem("token");
export const tenant_uuid = sessionStorage.getItem("tenant_uuid");
const wazo_auth = '/api/auth/0.1/token';


//create token
$("#submit").on('click', function (e) {
  e.preventDefault();

  let credentials = $("#login").val()+':'+$("#password").val();
  let credentials_b64 = btoa(credentials);
  
  let data = {
    method: 'POST',
    body: JSON.stringify({
      "client_id": "user_webinar_token",
      "access_type": "offline",
      "backend": "wazo_user",
      "expiration": "43200",
      "domain_name": "webinar.local"
    }),
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Basic '+ credentials_b64
    }
  };

  let aPromise = fetch(access_domain+wazo_auth, data);
  aPromise
  .then(function(response) {
      if(!response.ok) {
        if (response.status == 401) {
          Swal.fire("Ooops!", "Il y a certainement une erreur dans votre identifiant ou mot de passe", "error");
        }
         throw new Error("HTTP error, status = " + response.status);
      }
      let myJSON_promise = response.json();
      return myJSON_promise;
  })
  .then(function(myJSON) {
      sessionStorage.setItem("token", myJSON.data.token);
      sessionStorage.setItem("pbx_user_uuid", myJSON.data.metadata.pbx_user_uuid);
      sessionStorage.setItem("tenant_uuid", myJSON.data.metadata.tenant_uuid)
      document.location.href = "app/";
  })
  .catch(function(error)  {
      console.log(error);
  });

});

//logout revoke token
$(".logout").on('click', function(e){
  e.preventDefault;
  let dataapi = {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'X-Auth-Token': token
    }
  };
  let aPromise = fetch(access_domain+"/api/auth/0.1/token/"+token, dataapi);
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