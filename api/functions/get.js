"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../FirebaseConfig";
const db = getFirestore(app);

async function getDocById(docId, collectionName) {
  const docRef = doc(db, collectionName, docId);
  try {
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      console.log("Doc not found.");
      return null;
    }
    return docSnapshot.data();
  } catch (error) {
    console.log("Error fetching Doc:", error);
  }
}

async function getCollections(collectionName) {
  try {
    const q = collection(db, collectionName);
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => doc.data());
    console.log(documents);
    return documents;
  } catch (error) {
    console.log("Something Went Wrong fetching", error);
    return false;
  }
}

export { getCollections, getDocById };
