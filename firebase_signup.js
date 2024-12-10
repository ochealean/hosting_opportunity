import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// ID generator
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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

document.getElementById('signupForm').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const userID = generateRandomString(15);
    const opportunityDB = ref(database, 'opportunity_db/users/' + userID);

    var ID = userID;
    var firstname = getValue('firstname');
    var lastname = getValue('lastname');
    var email = getValue('email');
    var password = getValue('password');

    insertData(ID, firstname, lastname, email, password);

    alert('Account created');
}

function insertData(ID, firstname, lastname, email, password) {
    set(ref(database, 'opportunity_db/users/' + ID), {
        ID: ID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    });
}

function getValue(id) {
    return document.getElementById(id).value;
}
