import { doGetUserData } from './main.js';
import { access_domain } from './main.js';
import { api_confd_users } from './main.js';
import { options } from './main.js';
import { version } from './main.js';
import { session_error } from './main.js';

const api_dird_phonebook = '/api/dird/0.1/directories/lookup/default?term=';
const api_chatd = '/api/chatd/1.0/users/presences?recurse=false&user_uuid=';

const loaderIcon = $(".refresh");

//function permettant davoir un delais
const delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

//recherche et creation du tableau de retour lorsque trois caracteres sont saisis
$("#searchbox").keyup(function () {
  const val = this.value;
  //utilisattion du delais pour eviter les double requetes lors d'une saisie rapide
  delay(async function(){
    
    if(val.length > 2){
      loaderIcon.find('[data-fa-i2svg]').addClass('fa-spin');
      $("#searchResults >tbody").children().remove();
      const response = await fetch(access_domain+api_dird_phonebook+val, options);
      const data = await response.json();
      //check si le token est expiré 
      if (data.status_code == 401) {
        session_error();
        loaderIcon.find('[data-fa-i2svg]').removeClass('fa-spin');
      }

      //creation array avec uniquement backend dird 'wazo' et suil possede bien un uuid
      let users = [];
      for (let j = 0; j < data.results.length; j++) {
        const uuids = data.results[j].relations.user_uuid;
        const backend = data.results[j].backend;
        if (backend === "wazo") {
          if (uuids) {
            users.push(data.results[j]);
          }
        }
      }

      //creation array avec uniquement les uuid utilisateur pour l'api de chatd
      let res = [];
      for (let f = 0; f < users.length; f++) {
        const uuids = users[f].relations.user_uuid;
        res.push(uuids);
      }
      //api chatd pour retour des états de lignes utilisateurs
      const resp_chatd = await fetch(access_domain+api_chatd+res, options);
      const resp_states = await resp_chatd.json();
      const items = resp_states.items;

      //creation les ligne de table html et traitemetn des états
      let line_stat;
      for (let i = 0; i < items.length; i++) {
          const state = items[i].line_state;
          const status = items[i];
          let user_obj = users.find(o => o.relations.user_uuid === items[i].uuid);

          if (state == "unavailable") {
            line_stat = '<i class="fa-solid fa-phone-slash text-grey"></i> non disponible';
            if (status.do_not_disturb) {
              line_stat = '<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger';
            }
          }
          if (state == 'available') {
            line_stat = '<i class="fa-solid fa-phone text-success"></i> disponible';
            if (status.do_not_disturb) {
              line_stat = '<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger';
            }
          }
          if (state == 'talking') {
            line_stat = '<i class="fa-solid fa-phone-volume text-danger"></i> en communication';
            if (status.do_not_disturb) {
              line_stat = '<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger';
            }
          }
          if (state == 'ringing') {
            line_stat = '<i class="fa-solid fa-phone-volume text-warning fa-beat"></i> appel entrant';
            if (status.do_not_disturb) {
              line_stat = '<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger';
            }
          } 
          else if (state == null ) {
            line_stat = '<i class="fa-solid fa-phone-slash text-grey"></i> statut inconnu';
          }
          const setTable = '<tr><th scope="row">'+user_obj.column_values[0]+'</th><td><a href="tel:'+user_obj.column_values[1]+'">'+user_obj.column_values[1]+'</a></td><td>'+line_stat+'</td></tr>';
          $("#searchResults >tbody").append(setTable);
      }
      loaderIcon.find('[data-fa-i2svg]').removeClass('fa-spin');
    }
  }, 500)
});

$(document).ready(function(){
  doGetUserData(access_domain+api_confd_users+sessionStorage.getItem('pbx_user_uuid'), options);
  $(".version").html(version);
});
