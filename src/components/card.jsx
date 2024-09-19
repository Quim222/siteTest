import React, { useEffect, useState } from 'react'
import { useUserAuth } from './UserAuthContext';
import { Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

export default function CardCustom({index, data, onClick }) {
    const {user} = useUserAuth();
    const [address, setAddress] = useState('');


    useEffect(() => {
        if(data.localizacao){
            const [latitude, longitude] = data.localizacao.split(',');
            getAddressFromCoordinates(latitude, longitude);
        }
    },[data.localizacao]);

    const getAddressFromCoordinates = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.address.state;
                setAddress(city);
            } else {
                window.alert('Erro', 'Nenhum endereço encontrado para essas coordenadas.');
            }
        } catch (error) {
            console.error(error);
            window.alert('Erro', 'Falha ao buscar o endereço.');
        }
    };

    return (
        <div 
            onClick={onClick ? () => onClick(index) : null} // Chama a função de clique passando o ID
            className='bg-[#f5f5f5]  p-4 rounded-lg flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-shadow duration-300'
            >            
            <Typography variant='h1' className='text-2xl font-normal'>
                {data.nomeUser} Publication
            </Typography>
            <div className='flex flex-col gap-10 mi:flex-row justify-center items-center'>
                <div className='flex justify-center mi:justify-end'>
                    <img
                        className='justify-center w-[80%] h-[200px] mi:w-[178px] mi:h-[150px] object-contain'
                        src={data.imagem}
                        alt="imagemAnimal"
                    />
                </div>
                <div className='flex flex-col justify-center items-center border-t-2 border-t-orange-400 border-b-2 border-b-orange-400 rounded-sm w-[70%]'>
                    <Typography className="truncate w-full">Name: {data.nomeAnimal}</Typography>
                    <Typography className="truncate w-full">Breed: {data.racaAnimal}</Typography>
                    <Typography className="truncate w-full">Location: {address}</Typography>
                    <Typography className="truncate w-full">Microchip: {data.Microchip}</Typography>
                </div>

            </div>
        </div>

    )
}