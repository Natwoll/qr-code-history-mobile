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

export async function select(FbDocReference) {
    const FbDocument = firestore.doc(FbDocReference);

    const document = await FbDocument.get();

    return document.data() || {};
};

export async function selectWithId(FbDocReference) {
    const FbDocument = firestore.doc(FbDocReference);

    const document = await FbDocument.get();

    return { id: document.id, data: document.data() } || {};
};

export async function getAll(FbCollectionReference) {
    const FbCollection = firestore.collection(FbCollectionReference);

    const collection = await FbCollection.get();

    const collectionArr = [];

    collection.forEach(doc => {
        collectionArr.push({ id: doc.id, data: doc.data() });
    });

    return collectionArr;
}

export async function selectOneWithWhere(FbCollectionReference, field, predicate, value) {
    const FbCollection = firestore.collection(FbCollectionReference);

    const collection = await FbCollection.where(field, predicate, value).get();

    let docData = {};

    collection.forEach(doc => {
        docData = { 
            id: doc.id, 
            data: doc.data(),
        };
    });
    return docData;
}

export function insert(FbDocReference, FbDocumentContent) {
    const FbDocument = firestore.doc(FbDocReference);

    FbDocument.set(FbDocumentContent)
        .then((doc) => {
            if (doc && doc.exists) {
                console.log('insert failed for key:', FbDocReference, ';Alredy exists.');
                return
            }

            console.log('action insert complete for key: ', FbDocReference, '; value: ', FbDocumentContent);
        })
        .catch((error) => {
            console.log('could not complete: ', error);
        });
};

export function insertAdd(FbCollectionReference, FbDocumentContent) {
    const FbCollection = firestore.collection(FbCollectionReference);

    return FbCollection.add(FbDocumentContent);
        then((doc) => {
            if (doc && doc.exists) {
                console.log('insert failed for key:', FbDocReference, ';Alredy exists.');
                return
            }

            console.log('action insert complete for key: ', FbDocReference, '; value: ', FbDocumentContent);
            docResponse = doc;
        })
        .catch((error) => {
            console.log('could not complete: ', error);
        });

    
};