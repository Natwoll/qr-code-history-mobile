import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCeiRo7nbMFIsSPAF1RF1hI-KR7mlgnTM",
    authDomain: "luppy-climatizacao.firebaseapp.com",
    databaseURL: "https://luppy-climatizacao.firebaseio.com",
    projectId: "luppy-climatizacao",
    storageBucket: "luppy-climatizacao.appspot.com",
    messagingSenderId: "1074835362322",
    appId: "1:1074835362322:web:30fe6853ac853876c0fecb"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export function select (FbDocReference){
    const FbDocument = firestore.doc(FbDocReference);

    FbDocument.get()
    .then((doc) => {
        if(doc && doc.exists)
            return doc.data();
    })
    .catch((error) => {
        console.log('could not get: ', error);
    });
};

export function insert (FbDocReference, FbDocumentContent){
    const FbDocument = firestore.doc(FbDocReference);


    FbDocument.set(FbDocumentContent)
    .then((doc) => {
        if (doc && doc.exists) {
            console.log('insert failed for key:',FbDocReference,';Alredy exists.');
            return
        }

        console.log('action insert complete for key: ', FbDocReference, '; value: ', FbDocumentContent);
    })
    .catch((error) => {
        console.log('could not complete: ', error);
    });
};