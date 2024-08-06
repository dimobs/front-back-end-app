// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1ClvANfqSvQyiaVroue49StKownkmyB0",
  authDomain: "portfolio-dimo.firebaseapp.com",
  databaseURL: "https://portfolio-dimo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfolio-dimo",
  storageBucket: "portfolio-dimo.appspot.com",
  messagingSenderId: "711317394204",
  appId: "1:711317394204:web:f0f8db04ade262a5d2a0d9",
  measurementId: "G-3ETGL7E859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase, ref, set, child, update, remove}
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const db = getDatabase();

document.querySelector('.contact-form')
.addEventListener('submit', inserData)

function inserData(e) {
e.preventDefault();
const data = Object.fromEntries(new FormData(e.target));

if (data.name == "" || data.email_address == "" || data.message =="") {
    alert('Please make sure all fields are filled in correctly.')
    return
};

set(ref(db, 'Visitors/'+ Date()), {
   name: data.name,
   email: data.email_address,
   message: data.message
})
.then(()=> {
  alert('Stored successfully. Thanks!');
  // console.log( document.querySelector('.contact-form'));
  document.querySelector('.contact-form').reset();
})
.catch((err)=> {
  alert("unsuccessful, error: " + err);
});
}

