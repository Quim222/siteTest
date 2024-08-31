import React from 'react'
import { useUserAuth } from './UserAuthContext';
import { Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

export default function CardCustom({index, data, onClick }) {
    const {user} = useUserAuth();

    return (
        <div 
            onClick={() => onClick(index)} // Chama a função de clique passando o ID
            className='bg-[#f5f5f5]  p-4 rounded-lg flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-shadow duration-300'
            >            
            <Typography variant='h1' className='text-2xl font-normal'>
                Publicação de {data.nomeUser}
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
                    <Typography className="truncate w-full">Nome: {data.nomeAnimal}</Typography>
                    <Typography className="truncate w-full">Raça: {data.racaAnimal}</Typography>
                    <Typography className="truncate w-full">Localização: {data.localizacao}</Typography>
                </div>

            </div>
        </div>

    )
}