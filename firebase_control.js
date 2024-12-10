import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

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
    storageBucket: "opportunity-9d3bf.appspot.com",
    messagingSenderId: "57906230058",
    appId: "1:57906230058:web:4bd2c2b66a97ad34536453",
    measurementId: "G-NNMZ1KHB32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('signupForm').addEventListener("submit", submitForm);
    document.getElementById('button_get').addEventListener("click", get);
    document.getElementById('button_getImage').addEventListener("click", getImage);
});

function submitForm(e) {
    e.preventDefault();
    const userID = generateRandomString(15);
    const opportunityDB = ref(database, 'opportunity_db/users/' + userID);

    var ID = userID;
    var firstname = getValue('firstname');
    var lastname = getValue('lastname');
    var email = getValue('email');
    var password = getValue('password');
    var file = document.getElementById('fileInp').files[0];

    insertData(ID, firstname, lastname, email, password, file);

    alert('Account created');
}

function insertData(ID, firstname, lastname, email, password, file) {
    set(ref(database, 'opportunity_db/users/' + ID), {
        ID: ID,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    });

    if (file) {
        const storageReference = storageRef(storage, 'images/' + ID);
        uploadBytes(storageReference, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
}

function getValue(id) {
    return document.getElementById(id).value;
}

function get() {
    var userRef = ref(database, 'opportunity_db/users/');
    onValue(userRef, function(snapshot) {
        var data = snapshot.val();
        var emails = [];
        var passwords = [];
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
        console.log(emails);
        console.log(passwords);
    });
}

function getImage() {
    var userID = prompt("Enter the user ID to retrieve the image:");
    if (userID) {
        const storageReference = storageRef(storage, 'images/' + userID);
        getDownloadURL(storageReference).then((url) => {
            var img = document.getElementById('displayImage');
            img.src = url;
            img.style.display = 'block';
        }).catch((error) => {
            console.error("Error getting image URL:", error);
        });
    }
}
