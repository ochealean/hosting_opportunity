import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

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

document.getElementById('button_get').addEventListener("click", () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, getValue('email'), getValue('password'))
    .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
            setCookie("currentUser", JSON.stringify(user), 7);
            alert("User Logged In Successfully");
            window.location.href = "index.html";
        } else {
            alert('Email is not verified yet');
        }
    })
    .catch((error) => {
        alert('Invalid email or password');
    });
});

function getValue(id) {
    return document.getElementById(id).value;
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}