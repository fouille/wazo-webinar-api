import{doGetUserData}from"./main.js";import{access_domain}from"./main.js";import{api_confd_users}from"./main.js";import{options}from"./main.js";import{version}from"./main.js";import{session_error}from"./main.js";const api_dird_phonebook="/api/dird/0.1/directories/lookup/default?term=",api_chatd="/api/chatd/1.0/users/presences?recurse=false&user_uuid=",loaderIcon=$(".refresh"),delay=function(){let a=0;return function(e,s){clearTimeout(a),a=setTimeout(e,s)}}();$("#searchbox").keyup((function(){const a=this.value;delay((async function(){if(a.length>2){loaderIcon.find("[data-fa-i2svg]").addClass("fa-spin"),$("#searchResults >tbody").children().remove();const e=await fetch(access_domain+api_dird_phonebook+a,options),s=await e.json();401==s.status_code&&(session_error(),loaderIcon.find("[data-fa-i2svg]").removeClass("fa-spin"));let t=[];for(let a=0;a<s.results.length;a++){const e=s.results[a].relations.user_uuid;"wazo"===s.results[a].backend&&e&&t.push(s.results[a])}let i=[];for(let a=0;a<t.length;a++){const e=t[a].relations.user_uuid;i.push(e)}const o=await fetch(access_domain+api_chatd+i,options),n=(await o.json()).items;let r;for(let a=0;a<n.length;a++){const e=n[a].line_state,s=n[a];let i=t.find((e=>e.relations.user_uuid===n[a].uuid));"unavailable"==e&&(r='<i class="fa-solid fa-phone-slash text-grey"></i> non disponible',s.do_not_disturb&&(r='<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger')),"available"==e&&(r='<i class="fa-solid fa-phone text-success"></i> disponible',s.do_not_disturb&&(r='<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger')),"talking"==e&&(r='<i class="fa-solid fa-phone-volume text-danger"></i> en communication',s.do_not_disturb&&(r='<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger')),"ringing"==e?(r='<i class="fa-solid fa-phone-volume text-warning fa-beat"></i> appel entrant',s.do_not_disturb&&(r='<i class="fa-solid fa-triangle-exclamation text-danger"></i> ne pas déranger')):null==e&&(r='<i class="fa-solid fa-phone-slash text-grey"></i> statut inconnu');const o='<tr><th scope="row">'+i.column_values[0]+'</th><td><a href="tel:'+i.column_values[1]+'">'+i.column_values[1]+"</a></td><td>"+r+"</td></tr>";$("#searchResults >tbody").append(o)}loaderIcon.find("[data-fa-i2svg]").removeClass("fa-spin")}}),500)})),$(document).ready((function(){doGetUserData(access_domain+api_confd_users+sessionStorage.getItem("pbx_user_uuid"),options),$(".version").html(version)}));