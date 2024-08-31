import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Database } from "../../firebase";
import { useEffect, useState } from "react";

export const fetchAnimalData = async () => {
  try {
    const animalCollection = collection(Database, 'AnimalsUser');
    const querySnapshot = await getDocs(animalCollection);

    // Função para contar o número de animais por usuário
    const getAnimalCount = () => {
      const animalCount = {};

      querySnapshot.forEach((doc) => {
        const user = doc.data().User;
        if (animalCount[user]) {
          animalCount[user] += 1;
        } else {
          animalCount[user] = 1;
        }
      });

      return animalCount;
    };

    // Função para contar quantos usuários têm um certo número de animais
    const processUserCount = () => {
      const animalCount = getAnimalCount();
      const userCount = {};

      Object.entries(animalCount).forEach(([user, count]) => {
        if (userCount[count]) {
          userCount[count] += 1;
        } else {
          userCount[count] = 1;
        }
      });

      return userCount;
    };

    // Converte o resultado em um array no formato necessário para o gráfico
    const final = () => {
      const userCount = processUserCount();
      return Object.entries(userCount).map(([count, users]) => ({
        animalsCount: Number(count),
        userCount: Number(users),
      }));
    };

    return final();

  } catch (error) {
    console.error("Error fetching animal data: ", error);
    return [];
  }
};


export const fetchBreedCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(Database, 'RaceCounts'));
      const raceCounts = [];
      querySnapshot.forEach(doc => {
        raceCounts.push({
          name: doc.id,
          count: doc.data().count,
        });
      });
      return raceCounts;
    } catch (error) {
      console.error("Error fetching breed count: ", error);
      return [];
    }
  };
