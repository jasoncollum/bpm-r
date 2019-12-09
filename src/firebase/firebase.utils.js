import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBiQglNYlSQfFcpd6wgN4CFg719KLCzhe4",
    authDomain: "bpm-r-979af.firebaseapp.com",
    databaseURL: "https://bpm-r-979af.firebaseio.com",
    projectId: "bpm-r-979af",
    storageBucket: "bpm-r-979af.appspot.com",
    messagingSenderId: "734170694734",
    appId: "1:734170694734:web:4b67eb7007359e85c7ef1f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    console.log("AUTH", userAuth)

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    // console.log(userAuth);
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;