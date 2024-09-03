import { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { Database } from '../../firebase'; // Ajuste conforme sua configuração

export const useGetPublications = (estado) => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collectionData = collection(Database, "Post");
        const q = query(collectionData, where("Estado", "==", estado), orderBy("time", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id, // Adiciona um ID para ser usado como key
                localizacao: doc.data().Localizacao,
                nomeUser: doc.data().Nome,
                nomeAnimal: doc.data().NomeAnimal,
                racaAnimal: doc.data().RacaAnimal,
                imagem: doc.data().imagem,
                userUid: doc.data().UserUid,
                Estado: doc.data().Estado,
                Microchip: doc.data().Microchip,
            }));

            setDados(data);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar publicações:", error);
            setLoading(false);
        });

        // Limpeza para parar de escutar quando o componente desmontar
        return () => unsubscribe();
    }, [estado]); // O array vazio garante que o efeito seja executado apenas uma vez

    return { dados, loading };
};


export const useRouteAnimal = (docID) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de loading

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Define loading como true ao iniciar o fetch
                const doc = collection(Database, 'Post', docID, 'routeAnimal');
                const q = query(doc, orderBy('timestamp', 'asc'));
                const docRef = await getDocs(q);

                const fetchedData = [];

                docRef.forEach((doc) => {
                    if (doc.exists()) {
                        const latitude = parseFloat(doc.data().latitude);
                        const longitude = parseFloat(doc.data().longitude);
                        fetchedData.push({ latitude, longitude });
                    } else {
                        console.log('No such document!');
                    }
                });

                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching routeAnimal documents:', error);
            } finally {
                setLoading(false); // Define loading como false após o fetch
            }
        };

        fetchData();
    }, [docID]);

    return { data, loading }; // Retorna data e loading
};