

export const get_user = '/api/confd/1.1/users/';

// WEZBINAIR #1 #2 
$("#submit").on('click', function(e){
  [...];
  })
  .then(function(myJSON){
    console.log(myJSON);
    // Swal.fire("Mon Token :", myJSON.data.token);
    sessionStorage.setItem("token", myJSON.data.token);
    sessionStorage.setItem("pbx_user_uuid", myJSON.data.metadata.pbx_user_uuid);
    sessionStorage.setItem("tenant_uuid", myJSON.data.metadata.tenant_uuid)
    document.location.href = "app/";
  })
})