import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import Swal from 'sweetalert2';

export const version = '<a href="LICENSE.md" target="_blank">Licence : MIT</a> - Wazo SAS © - [AIV]{date} - {version}[/AIV]';
export const access_domain = 'https://repertoire.lechesnay-rocquencourt.fr';
export const token = sessionStorage.getItem("token");
export const tenant_uuid = sessionStorage.getItem("tenant_uuid");
export const api_confd_users = '/api/confd/1.1/users/'; 

export const options = {
  method: "GET",
  headers: {
    'accept': 'application/json',
    'Wazo-Tenant': tenant_uuid,
    'X-Auth-Token': token
  }
};
export function session_error() {
  Swal.fire({
    title: "Ooops!", 
    text: "La session semble avoir expirée", 
    icon: "error",
    allowEscapeKey: false,
    allowOutsideClick: false
  })
  .then((result) => {
    if (result.isConfirmed) {
      document.location.href = "../";
    }
  });
}
export function doGetUserData(url, opt)  {
  let aPromise = fetch(url, opt);
  aPromise
  .then(function(response) {
      if(!response.ok) {
        if (response.status == 401) {
          session_error();
        }
        throw new Error(response.status);
      }
      let myJSON_promise = response.json();
      return myJSON_promise;
  })
  .then(function(myJSON) {
    let lastname = '';
    if(myJSON.lastname !== null){lastname = myJSON.lastname};
      $("#pbx_user_uuid").html(myJSON.firstname+" "+lastname)
  })
  .catch(function(error)  {
      console.log(error);
  });
};

//create token
$("#submit").on('click', function (e) {
  let butt = $(this);
  e.preventDefault();
  butt.html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Connexion');
  let api = '/api/auth/0.1/token';
  let credentials = $("#login").val()+':'+$("#password").val();
  let credentials_b64 = btoa(credentials);
  let data = {
    method: 'POST',
    body: JSON.stringify({
      "client_id": "user_chesnay_token",
      "access_type": "offline",
      "backend": "ldap_user",
      "expiration": "43200",
      "domain_name": "lechesnay.local"
    }),
    headers: {
      'Content-type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Basic '+credentials_b64
    }
  };

  let aPromise = fetch(access_domain+api, data);
  aPromise
  .then(function(response) {
      if(!response.ok) {
        if (response.status == 401) {
          butt.html('se connecter');
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

$(".version").html(version);