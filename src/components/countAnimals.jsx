import { collection, getDocs, query, where } from "firebase/firestore"
import { Database } from "../../firebase"

export const countAnimals = async (uid) => {
    const collectionData = collection(Database, 'AnimalsUser');
    const q = query(collectionData, where('UserUid','==',uid));
    const getData = await getDocs(q);
    const count = getData.docs.length;


    return count;
}

export const countPosts = async (uid) => {
    const collectionData = collection(Database, 'Post');
    const q = query(collectionData, where('UserUid','==',uid));
    const getData = await getDocs(q);
    const count = getData.docs.length;


    return count;
}