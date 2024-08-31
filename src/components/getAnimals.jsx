import { useState, useEffect } from "react";
import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";
import { Database } from "../../firebase";

export const useAnimalsUser = (uid) => {
    const [dadosAnimais, setDadosAnimais] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collectionData = collection(Database, "AnimalsUser");
        const q = query(collectionData, where("UserUid", "==", uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id, // Adiciona um ID para ser usado como key
                nomeAnimal: doc.data().NomeAnimal,
                racaAnimal: doc.data().RacaAnimal,
                imagem: doc.data().imagem,
                tipo: doc.data().TipoAnimal,
            }));
            setDadosAnimais(data);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar animais:", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Limpeza da assinatura
    }, [uid]);

    return { dadosAnimais, loading };
};

export const usePostsUserMissing = (uid) => {
    const [dadosPost, setDadosPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collectionData = collection(Database, "Post");
        const q = query(collectionData, where("UserUid", "==", uid), where("Estado", "==", "Missing"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id, // Adiciona um ID para ser usado como key
                nomeAnimal: doc.data().NomeAnimal,
                racaAnimal: doc.data().RacaAnimal,
                imagem: doc.data().imagem,
                localizacao: doc.data().Localizacao,
                estado: doc.data().Estado,
            }));
            setDadosPost(data);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar posts:", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Limpeza da assinatura
    }, [uid]);

    return { dadosPost, loading };
};

export const usePostsUserFound = (uid) => {
    const [dadosPost, setDadosPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collectionData = collection(Database, "Post");
        const q = query(collectionData, where("UserUid", "==", uid), where("Estado", "==", "Found"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (snapshot.empty) {
                console.log("No matching documents.");
                setDadosPost([]);
                setLoading(false);
                return;
            }

            const data = snapshot.docs.map((doc) => ({
                id: doc.id, // Adiciona um ID para ser usado como key
                nomeAnimal: doc.data().NomeAnimal,
                racaAnimal: doc.data().RacaAnimal,
                imagem: doc.data().imagem,
                localizacao: doc.data().Localizacao,
                estado: doc.data().Estado,
            }));
            setDadosPost(data);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar posts:", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Limpeza da assinatura
    }, [uid]);

    return { dadosPost, loading };
};
