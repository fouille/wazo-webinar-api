$(document).ready(function(){
  //track if token is active or not
  if (sessionStorage.getItem('token')) {
    let data = {
      method: 'HEAD',
      headers: {
        'accept': 'application/json'
      }
    };
    let aPromise = fetch(access_domain+"/api/auth/0.1/token/"+sessionStorage.getItem('token'), data);
    aPromise
    .then(function(response) {
        if (!response.ok) {
          sessionStorage.removeItem('token');
          throw new Error("HTTP error, status = " + response.status);
        }
    })
    .then(function(myJSON) {
        document.location.href = "app";
    })
    .catch(function(error)  {
        console.log(error);
    });
  }
});
