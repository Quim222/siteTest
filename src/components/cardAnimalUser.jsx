import React, { useEffect, useRef, useState } from 'react';
import { useUserAuth } from './UserAuthContext';
import { Button, Input, Typography } from '@material-tailwind/react';
import { handleFound } from './foundAnimal';
import { removerAnimal } from './remover';
import {
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Checkbox,
  } from "@material-tailwind/react";
import { dogBreeds, catBreeds, birdBreeds, rabbitBreeds, reptileBreeds, rodentBreeds, fishBreeds, ferretBreeds, pigBreeds, goatBreeds, horseBreeds, exoticInsects, amphibianBreeds, chickenBreeds, sheepBreeds, duckBreeds, gooseBreeds, lostAnimalTypes } from '../utils/breedsData';
import Swal from 'sweetalert2';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Database } from '../../firebase';


export function CardAnimalUser({item}) {
    const { user } = useUserAuth();
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [open, setOpen] = useState(false);
    const [nomeAnimal, setNomeAnimal] = useState(item.nomeAnimal);
    const [racaAnimal, setRacaAnimal] = useState(item.racaAnimal);
    const [success, setSuccess] = useState(false);
    const [microchip, setMicrochip] = useState(item.Microchip);
 
    const handleOpen = () => setOpen(!open);

    const getBreedsList = (animalType) => {
        switch (animalType) {
          case 'Dog':
            return dogBreeds;
          case 'Cat':
            return catBreeds;
          case 'Bird':
            return birdBreeds;
          case 'Rabbit':
            return rabbitBreeds;
          case 'Reptile':
            return reptileBreeds;
          case 'Rodent':
            return rodentBreeds;
          case 'Fish':
            return fishBreeds;
          case 'Ferret':
            return ferretBreeds;
          case 'Pig':
            return pigBreeds;
          case 'Goat':
            return goatBreeds;
          case 'Horse':
            return horseBreeds;
          case 'Exotic Insect':
            return exoticInsects;
          case 'Amphibian':
            return amphibianBreeds;
          case 'Chicken':
            return chickenBreeds;
          case 'Sheep':
            return sheepBreeds;
          case 'Duck':
            return duckBreeds;
          case 'Goose':
            return gooseBreeds;
          default:
            return [];
        }
    };

    const breedsList = getBreedsList(item.tipo);

    useEffect(() => {
        const card = containerRef.current;

        const active = () => {
            setIsHovering(true);
        }

        const removeActive = () => {
            setIsHovering(false);
        }

        if (card) {
            card.addEventListener('mouseenter', active);
            card.addEventListener('mouseleave', removeActive);
        }

        return () => {
            if (card) {
                card.removeEventListener('mouseenter', active);
                card.removeEventListener('mouseleave', removeActive);
            }
        };
    }, [containerRef]);

    const handleChange = async (e) => {
        e.preventDefault();
    
        // Verifica se os campos obrigatórios estão preenchidos
        if (!nomeAnimal || !racaAnimal) {
            Swal.fire("Warning", "Please fill in all required fields.", "warning");
            return;
        }
    
        try {
            // Cria uma referência ao documento no Firestore
            const docData = doc(Database, 'AnimalsUser', item.id);
    
            // Realiza o update do documento com os novos dados
            await updateDoc(docData, {
                NomeAnimal: nomeAnimal,  // Certifique-se de que está usando o mesmo nome de campo no Firestore
                RacaAnimal: racaAnimal,  // Certifique-se de que está usando o mesmo nome de campo no Firestore
                Microchip: microchip
            });
    
            // Cria a query para buscar os documentos na coleção 'Post'
            const docPostQuery = query(
                collection(Database, 'Post'),
                where('NomeAnimal', '==', item.nomeAnimal),
                where('RacaAnimal', '==', item.racaAnimal),
                where('UserUid', '==', item.userUid)
            );

            console.log(docPostQuery);
            console.log(item.nomeAnimal);
            console.log(item.racaAnimal);
            console.log(item.userUid);
    
            const getDocPost = await getDocs(docPostQuery);
    
            // Atualiza todos os documentos encontrados
            const updatePromises = getDocPost.docs.map((doc) =>
                updateDoc(doc.ref, {
                    NomeAnimal: nomeAnimal,
                    RacaAnimal: racaAnimal,
                    Microchip: microchip
                })
            );
    
            // Espera todas as atualizações serem concluídas
            await Promise.all(updatePromises);
    
            // Exibe uma mensagem de sucesso
            setSuccess(true);
    
            // Após 1 segundo, chama handleOpen()
            setTimeout(() => {
                handleOpen(); // Fecha o modal (ou abre, dependendo da lógica de handleOpen)
                setSuccess(false); // Reseta o estado de sucesso
                e.target.reset(); // Reseta o formulário
                window.location.reload(); // Recarrega a página
            }, 1000);
        } catch (error) {
            console.error('Erro ao alterar o animal:', error);
            Swal.fire("Error", "An error occurred while changing the animal.", "error");
        }
    };
    
    
    

    return (
        <div ref={containerRef} className="m-3 border p-4 border-white rounded-xl shadow-lg flex flex-col">
            <div className='w-full flex items-center'>
                <div className='w-[60%]'>
                    <Typography className="truncate w-full" color="gray">Name: {item.nomeAnimal}</Typography>
                    <Typography className="truncate w-full" color="gray">Breed: {item.racaAnimal}</Typography>
                    <Typography className="truncate w-full" color="gray">Code: {item.Microchip}</Typography>
                </div>
                <div className='flex justify-center items-center w-[40%]'>
                    <img src={item.imagem} className='rounded-md' alt="Imagem do animal" />
                </div>
            </div>
            {isHovering && 
                <div className='p-4 flex justify-evenly items-center border border-white m-2 rounded-lg'>
                    <Button onClick={() => {removerAnimal(item.nomeAnimal,item.racaAnimal,item.imagem, user.uid)}} className='bg-red-500 text-white p-2 rounded-md'>Remove</Button>
                    <Button onClick={() => handleOpen()} className='bg-orange-400 text-white p-2 rounded-md'>Change</Button>
                </div>
            }
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Change Animal Data
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Animal Name
                        </Typography>
                        <Input 
                            onChange={(e) => setNomeAnimal(e.target.value)} 
                            value={nomeAnimal} 
                            label="Name" 
                            size="lg" 
                        />
                        <Typography className="-mb-2" variant="h6">
                            Code Microchip
                        </Typography>
                        <Input 
                            onChange={(e) => setMicrochip(e.target.value)} 
                            value={microchip} 
                            label="Microchip" 
                            maxLength={15}
                            size="lg" 
                        />
                        <Typography className="-mb-2" variant="h6">
                            Animal Breed
                        </Typography>
                        <select
                            className="w-full p-2 border rounded"
                            value={racaAnimal}
                            onChange={(e) => setRacaAnimal(e.target.value)}
                        >
                            {breedsList.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                        </select>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button 
                            variant="gradient" 
                            color={success ? "green" : "gray"} 
                            onClick={handleChange} 
                            fullWidth
                        >
                            Change
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>

        </div>
    );
}

export function CardPostUser({ item }) {
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [locationCity, setLocationCity] = useState('');
    const [loading, setLoading] = useState(true);



    const getAddressFromCoordinates = async (localizacao) => {
        const [latitude, longitude] = localizacao.split(',');

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.address.state;
                setLocationCity(city);
            } else {
                Swal('Error', 'Unable to fetch address.', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal('Error', 'Unable to fetch address.', 'error');
        } finally {
            setLoading(false); // Termina o carregamento
        }
    };


    useEffect(() => {
        if (item.localizacao) {
            getAddressFromCoordinates(item.localizacao);
        }

        const card = containerRef.current;

        const active = () => setIsHovering(true);
        const removeActive = () => setIsHovering(false);

        if (card) {
            card.addEventListener('mouseenter', active);
            card.addEventListener('mouseleave', removeActive);
        }

        return () => {
            if (card) {
                card.removeEventListener('mouseenter', active);
                card.removeEventListener('mouseleave', removeActive);
            }
        };
    }, [item.localizacao]);


    return (
        <div 
            ref={containerRef} 
            className="border border-white rounded-xl shadow-lg m-3 p-2"
        >
            <div className={`flex flex-col lg:flex-row m-3 gap-3 items-center ${item.estado == 'Missing' && "cursor-pointer"}`}>
                <div className='w-full lg:w-[60%]'>
                    <Typography className="truncate w-full" color="gray">Name: {item.nomeAnimal}</Typography>
                    <Typography className="truncate w-full" color="gray">Breed: {item.racaAnimal}</Typography>
                    <Typography className="truncate w-full" color="gray">Code: {item.Microchip}</Typography>
                    {item.localizacao && (
                        <Typography className="truncate w-full" color="gray">Location: {locationCity}</Typography>
                    )}
                </div>
                <div className='flex justify-center items-center w-full lg:w-[40%]'>
                    <img src={item.imagem} className='rounded-md' alt="Imagem do animal" />
                </div>
            </div>
            {isHovering && (item.estado === 'Missing') &&
                <div className='p-4 flex justify-evenly items-center border border-white m-2 rounded-lg'>
                    <Button onClick={() => handleFound(item.id)} className=' text-white p-2 rounded-md'>Found</Button>
                </div>
            }
        </div>
    );
}
