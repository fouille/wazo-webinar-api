$(document).ready((function(){sessionStorage.getItem("token")&&fetch(access_domain+"/api/auth/0.1/token/"+sessionStorage.getItem("token"),{method:"HEAD",headers:{accept:"application/json"}}).then((function(e){if(!e.ok)throw sessionStorage.removeItem("token"),new Error("HTTP error, status = "+e.status)})).then((function(e){document.location.href="app"})).catch((function(e){console.log(e)}))}));