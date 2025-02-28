import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import FooterComponent from '../components/FooterComponent';
import './css/about.css'; // Certifique-se de que o caminho está correto
import { Carousel, Typography } from '@material-tailwind/react';
import screenshot from '../assets/screenshot1.png';
import screenshot2 from '../assets/screenshot.png';
import { CardRating } from '../components/cardRating';
import { useRatings } from '../components/getRating';

export default function About() {
    const [image, setImage] = useState(screenshot);
    const [isFlipping, setIsFlipping] = useState(false);
    const ratings = useRatings();
    const [dadosFeedback, setDadosFeedback] = useState([]);

    const RamdomRating = () => {
        const newRatings = [];

        if (ratings.length > 8) {
            const indices = [];
            
            while (indices.length < 8) {
                let randomIndex = Math.floor(Math.random() * ratings.length);
                
                // Verifica se o índice já foi selecionado
                if (!indices.includes(randomIndex)) {
                    indices.push(randomIndex);
                    newRatings.push(ratings[randomIndex]);
                }
            }
        } else {
            // Se o array ratings tem 8 ou menos elementos, simplesmente copie-os
            newRatings.push(...ratings);
        }
        return newRatings;
    }

    useEffect(() => {
        setDadosFeedback(RamdomRating());
    },[ratings]);

    const handleClick = () => {
        setIsFlipping(true);

        setTimeout(() => {
            // Alterna a imagem após a rotação
            setImage(image === screenshot ? screenshot2 : screenshot);
            setIsFlipping(false);
        }, 500); // Duração da rotação (500ms para a rotação completa)
    };

    return (
        <div className='min-h-screen'> {/* Corrigido para min-h-screen */}
            <Header />
            <div className=' w-full py-20  flex items-center px-4 sm:px-44'>
                <div className='flex flex-col gap-2'>
                    <Typography className='font-poppins text-[#bbb8b4]' variant='h1' size='xl' bold>About</Typography>
                    <Typography className='font-poppins' variant='p' color='gray' size='base' bold>
                        We are students from a university in Portugal called Instituto Politécnico de Castelo Branco,<br />
                        specifically from the Escola Superior de Tecnologia. We are creating this project to help people <br />
                        find their pets or to assist others in finding their lost pets.
                    </Typography>
                </div>
            </div>
            <div className='border-[0.5px]'/>
            <div className=' w-full py-20 flex items-center px-4 sm:px-44 justify-end'>
                <div className='flex flex-col items-end gap-2  '>
                    <Typography className='font-poppins text-[#bbb8b4]' variant='h1' size='xl' bold>Mission</Typography>
                    <Typography className='font-poppins' variant='p' color='gray' size='base' bold>
                        This project  includes an application that will help users find, assist, communicate, and share information with others. <br />
                        With this application and website, we aim to help people avoid losing their pets and maintain hope in finding them.
                    </Typography>
                </div>
            </div>
            <div className='border-[0.5px]'/>
            <div className='container-img  w-full px-44  py-8 flex flex-col gap-20 items-center justify-between lg:flex-row'>
                <div className='flex flex-col gap-2 '>
                    <Typography className='font-poppins text-[#bbb8b4]' variant='h1' size='xl' bold>Application</Typography>
                    <Typography className='font-poppins' variant='p' color='gray' size='base' bold>
                        If you want to use more of our project, you can download our application. <br />
                    </Typography>
                    <a href={'/siteTest/assets/app-release.apk'} download className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 text-center w-[60%] md:w-[40%]">
                        Download App
                    </a>
                </div>
                <div 
                    className={`relative h-[400px] w-[200px] perspective-1000`} 
                    onMouseEnter={handleClick}
                >
                    <div className={`absolute inset-0 transition-transform duration-500 ${isFlipping ? 'rotate-y-180' : ''}`}>
                        <img src={image} className='h-full w-full' alt="screenshot application" />
                    </div>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center p-10 gap-10 '>
                <Typography className='font-poppins text-[#bbb8b4] text-xl' variant='h1' bold>Users Ratings</Typography>
                <div className='w-[95%]  md:w-[50%] mx-auto '>
                    <Carousel
                        transition={{ duration: 0.5 }}
                        className="rounded-xl"
                        navigation={({ setActiveIndex, activeIndex, length }) => (
                            <>
                            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? "w-8 bg-black" : "w-4 bg-black/50"
                                    }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                                ))}
                            </div>
                            <button
                                className="absolute top-2/4 left-4 z-50 -translate-y-2/4 text-black rounded-full p-2 hover:bg-gray-300"
                                onClick={() => setActiveIndex(activeIndex - 1 >= 0 ? activeIndex - 1 : length - 1)}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 19l-7-7 7-7"
                                />
                                </svg>
                            </button>
                            <button
                                className="absolute top-2/4 right-4 z-50 -translate-y-2/4  text-black rounded-full p-2 hover:bg-gray-300"
                                onClick={() => setActiveIndex(activeIndex + 1 < length ? activeIndex + 1 : 0)}
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                                </svg>
                            </button>
                            </>
                        )}
                    >
                            {ratings.length > 0 && (
                                dadosFeedback.map((rating, index) => (
                                    <CardRating key={index} rating={rating} />
                                ))
                            )}
                    </Carousel>
                
                </div>
            </div>

            <div className='border-[0.5px] shadow-xl shadow-orange-400'/>
            <FooterComponent />
        </div>
    );
}
