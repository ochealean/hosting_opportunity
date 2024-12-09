// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  firebase.initializeApp(firebaseConfig);
 var opportunityDB = firebase.database().ref('opportunity_db');

 document.getElementById('signupForm').addEventListener("submit", submitForm);

 function submitForm(e){
    e.preventDefault();
    var email = getValue('email');
    var password = getValue('password');

    insertData(email, password);
 }

 function insertData(email, password)
 {
    var newcontactform = opportunityDB.push();

    newcontactform.set({
        user_email: email,
        user_password: password,
    })
 }

 function getValue(id)
 {
    return document.getElementById(id).value;
 }