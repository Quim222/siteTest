import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import BarHorizontal from './barHorizontal'; // Importa o componente BarHorizontal
import { fetchAnimalData } from './DataFetchScreen';
import { Database } from '../../firebase';
import Bar from './bar';

export default function Estatisticas() {
  const [raceData, setRaceData] = useState([]);
  const [animalData, setAnimalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnimalData = async () => {
      const data = await fetchAnimalData();
      setAnimalData(data);
    };

    const unsubscribe = onSnapshot(collection(Database, 'RaceCounts'), (querySnapshot) => {
      const raceCounts = [];
      querySnapshot.forEach(doc => {
        raceCounts.push({
          name: doc.id,
          count: doc.data().count,
        });
      });
      setRaceData(raceCounts);
      setLoading(false);
    });

    getAnimalData();

    // Função de limpeza ao desmontar o componente
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='mt-5 w-[100%] flex justify-between px-10 flex-col items-center gap-20 md:flex-row'>
      <div className='w-[100%] md:w-[40%] '>
        <h2>Breed Distribution</h2>
        <Bar raceCounts={raceData} />
      </div>
      <div className='w-[100%] md:w-[40%] '>
        <BarHorizontal raceCounts={animalData} />
      </div>
    </div>
  );
}
