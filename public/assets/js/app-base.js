import"@fortawesome/fontawesome-free/js/fontawesome";import"@fortawesome/fontawesome-free/js/solid";import"@fortawesome/fontawesome-free/js/regular";import"@fortawesome/fontawesome-free/js/brands";import Swal from"sweetalert2";import{access_domain,wazo_auth,get_user}from"./main";const token=sessionStorage.getItem("token"),mon_tenant=sessionStorage.getItem("tenant_uuid"),utilisateur_uuid=sessionStorage.getItem("pbx_user_uuid"),data_retention={nom:[],prenom:[],email:[],forwards:[],manouvelledata:[]};console.log(token),$(".logout").on("click",(function(o){o.preventDefault;let e={method:"DELETE",headers:{accept:"application/json","X-Auth-Token":token}};console.log(access_domain+wazo_auth+token),fetch(access_domain+wazo_auth+"/"+token,e).then((function(o){if(!o.ok)throw new Error("HTTP error, status = "+o.status)})).then((function(o){sessionStorage.clear(),document.location.href="../"})).catch((function(o){console.log(o)}))})),(async()=>{const o={method:"GET",headers:{accept:"application/json","Wazo-Tenant":mon_tenant,"X-Auth-Token":token}},e=await fetch(access_domain+get_user+utilisateur_uuid,o).then((o=>o.json()));console.log(e),console.log(e.firstname),console.log(e.lastname),console.log(e.email),console.log(e.forwards.busy.enabled),console.log(e.forwards.busy.destination),console.log(e.forwards.noanswer.enabled),console.log(e.forwards.noanswer.destination),console.log(e.forwards.unconditional.enabled),console.log(e.forwards.unconditional.destination),data_retention.nom=e.lastname,data_retention.prenom=e.firstname,data_retention.email=e.email,data_retention.forwards=e.forwards,console.log(data_retention),!0===e.forwards.busy.enabled?console.log("busy actif"):console.log("busy inactif");let n=e.forwards.busy.enabled?console.log("busy actif"):console.log("busy inactif");console.log(n),document.getElementById("pbx_user_uuid").innerText=e.firstname+" "+e.lastname,document.getElementById("pbx_user_").innerText=e.firstname})();