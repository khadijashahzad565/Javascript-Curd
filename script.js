
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove, child } 
from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3WMgcf6VY3zOmJZXVAR9O7Mqszlf6duQ",
    authDomain: "js-curd-cef0c.firebaseapp.com",
    projectId: "js-curd-cef0c",
    storageBucket: "js-curd-cef0c.appspot.com",
    messagingSenderId: "176341007022",
    appId: "1:176341007022:web:26d018bda827caf4030b3f",
    measurementId: "G-FRQG5CRTD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// References to HTML Elements
const bookNameInput = document.getElementById("bookName");
const authorInput = document.getElementById("author");
const isbnInput = document.getElementById("isbn");
const genreInput = document.getElementById("genre");

const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

// Add  Book
function createBook() {
    const bookRef = ref(db, "Books/" + isbnInput.value);  
    set(bookRef, {
        BookName: bookNameInput.value,
        Author: authorInput.value,
        ISBN: isbnInput.value,
        Genre: genreInput.value
    })
    .then(() => alert("Book added successfully"))
    .catch((error) => alert("Error: " + error));
}

//Read Function
function readBook() {
    const dbRef = ref(db);
    get(child(dbRef, "Books/" + isbnInput.value))  
        .then((snapshot) => {
            if (snapshot.exists()) {
                bookNameInput.value = snapshot.val().BookName;
                authorInput.value = snapshot.val().Author;
                genreInput.value = snapshot.val().Genre;
            } else {
                alert("No book found with this ISBN");
            }
        })
        .catch((error) => alert("Error: " + error));
}

//  Updates Book Details
function updateBook() {
    const bookRef = ref(db, "Books/" + isbnInput.value);  
    update(bookRef, {
        BookName: bookNameInput.value,
        Author: authorInput.value,
        Genre: genreInput.value
    })
    .then(() => alert("Book updated successfully"))
    .catch((error) => alert("Error: " + error));
}

// Removes a Book
function deleteBook() {
    const bookRef = ref(db, "Books/" + isbnInput.value);  
    remove(bookRef)
    .then(() => alert("Book removed successfully"))
    .catch((error) => alert("Error: " + error));
}

// Attach Functions to Buttons
createBtn.addEventListener('click', createBook);
readBtn.addEventListener('click', readBook);
updateBtn.addEventListener('click', updateBook);
deleteBtn.addEventListener('click', deleteBook);