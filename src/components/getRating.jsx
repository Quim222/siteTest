import { collection, onSnapshot } from "firebase/firestore";
import { Database } from "../../firebase";
import { useState, useEffect } from "react";

export const useRatings = () => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const doc = collection(Database, 'Feedback');

        // Set up a real-time listener
        const unsubscribe = onSnapshot(doc, (querySnapshot) => {
            const fetchedRatings = [];
            querySnapshot.forEach(doc => {
                fetchedRatings.push({
                    user: doc.data().user,
                    name: doc.data().name,
                    rating: doc.data().rating,
                    color: doc.data().color,
                    feedback: doc.data().feedback,
                });
            });
            setRatings(fetchedRatings); // Update state with fetched data
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    return ratings;
};
