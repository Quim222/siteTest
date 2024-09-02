import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { fetchAnimalData } from './DataFetchScreen';
import { Database } from '../../firebase';
import Bar from './bar';
import BarChart from './barHorizontal';
import { Typography } from '@material-tailwind/react';

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
    <div className='mt-5 w-[100%] flex justify-around px-10 flex-col items-center gap-20 xl:flex-row'>
      <div className='w-[100%] md:w-[40%] flex justify-center items-center'>
        {raceData.length > 0 ? (
          <Bar raceCounts={raceData} />
        ):(
          <Typography className='text-center' color='gray'>No data available</Typography>
        )}
      </div>
      <div className='w-[100%] md:w-[40%] flex justify-center items-center'>
        {animalData.length > 0 ? (
          <BarChart raceCounts={animalData} />
        ):(
          <Typography color='gray'>No data available</Typography>
        )}
      </div>
    </div>
  );
}
