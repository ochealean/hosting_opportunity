import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Example usage:
 var username = getCookie("email");
 var pword = getCookie("password");

if(username === null && pword === null)
{
    // Redirect to login.html
    window.location.href = "opportunity_login.html";
}

var uid = getCookie("ID");
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtwT5vh0VSYQ3j-qDSjHFI3DsfdzRoCpw",
    authDomain: "opportunity-9d3bf.firebaseapp.com",
    databaseURL: "https://opportunity-9d3bf-default-rtdb.firebaseio.com",
    projectId: "opportunity-9d3bf",
    storageBucket: "opportunity-9d3bf.firebasestorage.app",
    messagingSenderId: "57906230058",
    appId: "1:57906230058:web:4bd2c2b66a97ad34536453",
    measurementId: "G-NNMZ1KHB32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

get();

function get() {
    var userRef = ref(database, 'opportunity_db/users/'+uid);
    onValue(userRef, function(snapshot) {
        var data = snapshot.val();
        document.getElementById('name').innerHTML = "Welcome, "+data.firstname + " " + data.lastname;
        // console.log(data.lastname);
    });
}


 

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

document.getElementById('logout_btn').addEventListener("click", logout);
// Example usage:
function logout()
{
    deleteCookie("email"); // Deletes the "username" cookie
    deleteCookie("password");
    deleteCookie("ID");
    // Redirect to login.html
    window.location.href = "opportunity_login.html";
}


           

            console.log('username: '+username);
            console.log('password: '+pword);
            console.log('userid:'+uid);


// scratching
// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
// .then(response => {
//     if(!response.ok)
//     {
//         throw new Error("Could not access that data");
//     }
//     return response.json();
// })
// .then(data => console.log(data))
// .catch(error => console.error(error));

document.getElementById('searchBtn').addEventListener("click", fetchData);
async function fetchData()
{
    try{
        const pokemonName = document.getElementById("pokemonSearch").value.toLowerCase();

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokemonName);

        if(!response.ok)
        {
            throw new Error("Could not access that data");
        }
        const data = await response.json();
        console.log(data);
        var pokeType = [];  //data.type[]
        var pokeAbilities = []; //data.abilities[]
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const card = document.getElementById("cardContainer");
        
        const name = document.getElementById("pokename");
        const types = document.getElementById("types");
        const abilities = document.getElementById("abilities");

        card.style.display = "block";
        imgElement.style.display = "block";
        imgElement.src = pokemonSprite;

        name.innerHTML = "Name: "+data.name;
        var htmlType = 'Types: ';
        for(var i=0; i<data.types.length; i++)
        {
            htmlType+= data.types[i].type.name;
            if(!(i==data.types.length-1)) htmlType+="/";
        }
        types.innerHTML = htmlType;
        var htmlAbilites = 'Abilites: ';
        for(var i=0; i<data.abilities.length; i++)
        {
            htmlAbilites+= data.abilities[i].ability.name;
            if(!(i==data.abilities.length-1)) htmlAbilites+=", ";
        }
        abilities.innerHTML = htmlAbilites;
    }
    catch(error){
        console.error(error);
        alert("Pokemon does not exist.");
    }
}