import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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
const auth = getAuth(app);

// Example usage:
var user = getCookie("currentUser");

if (user === null) {
    // Redirect to login.html
    window.location.href = "opportunity_login.html";
}else{
    user = JSON.parse(user);
    document.getElementById("name").innerHTML = 'Welcome, ' + user.displayName;
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

document.getElementById("logout_btn").addEventListener("click", () => {
    auth.signOut().then(() => {
        deleteCookie("currentUser"); // Deletes the "username" cookie
        // Redirect to login.html
        window.location.href = "opportunity_login.html";
    }).catch((error) => {
        console.log(error);
    });
});
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

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
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const card = document.getElementById("cardContainer");
        
        const name = document.getElementById("pokename");
        const types = document.getElementById("types");
        const abilities = document.getElementById("abilities");
        const moves = document.getElementById("moves");

        card.style.display = "block";
        imgElement.style.display = "block";
        imgElement.src = pokemonSprite;

        // types
        name.innerHTML = "Name: "+data.name;
        var htmlType = 'Types: ';
        for(var i=0; i<data.types.length; i++)
        {
            htmlType+= data.types[i].type.name;
            if(!(i==data.types.length-1)) htmlType+="/";
        }
        types.innerHTML = htmlType;

        // abilites
        var htmlAbilites = 'Abilites: ';
        for(var i=0; i<data.abilities.length; i++)
        {
            htmlAbilites+= data.abilities[i].ability.name;
            if(!(i==data.abilities.length-1)) htmlAbilites+=", ";
        }
        abilities.innerHTML = htmlAbilites;

        // moves
        var htmlMoves = 'Moves: ';
        for(var i=0; i<15; i++)
        {
            htmlMoves+= data.moves[i].move.name;
            if(!(i==15-1)) htmlMoves+=", ";
        }
        moves.innerHTML = htmlMoves;
    }
    catch(error){
        console.error(error);
        alert("Pokemon does not exist.");
    }
}
