import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

document.getElementById('button_get').addEventListener("click", get);

function get() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var userRef = ref(database, 'opportunity_db/users/');
    onValue(userRef, function(snapshot) {
        var data = snapshot.val();
        var emails = [];
        var passwords = [];
        var userID = [];
        // email
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                emails.push(data[key].email);
            }
        }
        // password
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                passwords.push(data[key].password);
            }
        }
        // userID
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                userID.push(data[key].ID);
            }
        }

        var counter_email = 0;
        for(var i=0; i<emails.length; i++){
            counter_email++;
            if(emails[i] === email)
                {
                    setCookie("ID", userID[i], 7);
                    break;
                }
        }
        var counter_password = 0;
        for(var i=0; i<passwords.length; i++){
            counter_password++;
            if(passwords[i] === password)
                {
                    break;
                }
        }
console.log(counter_email);
console.log(counter_password);
        if(counter_email!== null &&counter_email==counter_password){
            // Example usage:
            setCookie("email", email, 7);
            setCookie("password", password, 7);
            alert('successfully logged in');
            window.location.href = "index.html";
        }else alert('account does not exist');
    });
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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


