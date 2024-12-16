import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5v1pvNZFDdTnk_KXDxT1FAG1MrfKrnFc",
    authDomain: "bubbleburst-ca46f.firebaseapp.com",
    projectId: "bubbleburst-ca46f",
    storageBucket: "bubbleburst-ca46f.appspot.com",
    messagingSenderId: "1083004742952",
    appId: "1:1083004742952:web:3ded2f979aa3784bc5741d",
    measurementId: "G-0BLTWVCZTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Check if user is logged in
export function checkUserLogin() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (!currentUser) {
        // Redirect to login page if no user is found
        alert("No user logged in. Redirecting to login...");
        window.location.href = "SingIn.html";
        return null;
    }

    return currentUser;
}

// Fetch user data from Firestore
export async function fetchUserData(userId) {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.error("No such document!");
        return null;
    }
}

// Save user activity or other data
export async function saveUserActivity(userId, data) {
    const userDocRef = doc(db, "users", userId);
    try {
        await setDoc(userDocRef, data, { merge: true }); // Merge to avoid overwriting
        console.log("Activity saved successfully!");
    } catch (error) {
        console.error("Error saving activity:", error);
    }
}
