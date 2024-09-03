import { collection, doc, getDoc, getDocs, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Database } from "../../firebase";
import Swal from "sweetalert2";

export const handleFound = async (id) => {
    try {
        const docRef = doc(Database, "Post", id);
        const postSnapshot = await getDoc(docRef);

        if (postSnapshot.exists()) {
            await updateDoc(docRef, {
                Estado: "Found",
                Localizacao: "",
                Raio: 0,
                time: Timestamp.now().toDate()
            });
        } else {
            Swal.fire("Error", "Post not found!", "error");
            return;
        }

        const routeCollectionRef = collection(Database, "Post", id, "routeAnimal");
        const routeSnapshot = await getDocs(routeCollectionRef);

        if (!routeSnapshot.empty) {
            const deletePromises = routeSnapshot.docs.map((routeDoc) => deleteDoc(routeDoc.ref));
            await Promise.all(deletePromises);
        }

        Swal.fire("Success", "Changes were made!", "success");
    } catch (error) {
        console.error("Error updating document:", error);
        Swal.fire("Error", "There was an error making changes.", "error");
    }
};

const handlePost = async (id) => {
    try {
        const docRef = doc(Database, "Post", id);
        const postSnapshot = await getDoc(docRef);

        if (postSnapshot.exists()) {
            await updateDoc(docRef, {
                Estado: "Found",
                Localizacao: ""
            });
        } else {
            Swal.fire("Error", "Post not found!", "error");
            return;
        }

        const routeCollectionRef = collection(Database, "Post", id, "routeAnimal");
        const routeSnapshot = await getDocs(routeCollectionRef);

        if (!routeSnapshot.empty) {
            const deletePromises = routeSnapshot.docs.map((routeDoc) => deleteDoc(routeDoc.ref));
            await Promise.all(deletePromises);
        }

        Swal.fire("Success", "Changes were made!", "success");
    } catch (error) {
        console.error("Error updating document:", error);
        Swal.fire("Error", "There was an error making changes.", "error");
    }
}
