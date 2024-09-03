import React, { useEffect, useRef } from 'react';
import FooterComponent from '../components/FooterComponent';
import { useUserAuth } from '../components/UserAuthContext';
import { Button, Input, Textarea, Typography } from '@material-tailwind/react';
import './css/contact.css'; // Importa o CSS
import { setupScroller } from '../utils/contact';
import dogs1 from '../assets/doglist1.jpg';
import dogs2 from '../assets/close-up-hand-trying-touch-cat.jpg';
import dogs3 from "../assets/cute-black-white-terrier-puppy-portrait-generative-ai.jpg"
import dogs4 from "../assets/dogs1.jpg"
import dogs5 from "../assets/dogWithWood.jpg"
import Header from '../components/header';
import dogs6  from "../assets/dogs2.jpeg"
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const { user } = useUserAuth();
    const form = useRef();
    const navigate = useNavigate();

    
    useEffect(() => {
        setupScroller();
    }, []);

    const images = [
        { src: dogs1 , a: <a className='text-[8px]' href="https://www.freepik.com">Designed by Freepik</a>},
        { src: dogs2 , a: <a className='text-[8px]' href="https://www.freepik.com">Designed by Freepik</a>},
        { src: dogs3 , a: <a className='text-[8px]' href="https://www.freepik.com">Designed by Freepik</a>},
        { src: dogs4 },
        { src: dogs5 , a: <a className='text-[8px]' href="https://www.freepik.com">Designed by Freepik</a>},
        { src: dogs6 },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
        .sendForm('service_82f5ix7', 'template_phj85mi', form.current, {
            publicKey: 'BUNwUBR9sF9VEoIVm',
        })
        .then(
            () => {
            console.log('SUCCESS!');
            navigate('/siteTest');
            e.target.reset();
            },
            (error) => {
            console.log('FAILED...', error.text);
            },
        );

        
    
        
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
                
            <div className='flex flex-grow justify-center items-center m-4 '>
                <div className='p-5 w-full h-[80%] md:w-[40%] rounded-xl border border-gray-700 my-auto bg-orange-50 shadow-lg'>
                    <form ref={form} onSubmit={handleSubmit} >
                        <div className='text-center'>
                            <Typography color='gray' variant='h4'>Contact Us</Typography>
                        </div>
                        <div className='mt-6 flex flex-col gap-3'>
                            <Input type='text' color='gray' name='user_name' label='Name' />
                            <Input type='email' color='gray' name='user_email' label='Email' />
                            <Textarea className='h-36 font-popins' name='message' label='Message' />
                        </div>
                        <div className='flex mt-14 justify-center items-center'>
                            <Button color='orange' type='submit' ripple='light' className='bg-orange-500 text-white hover:bg-orange-600'>
                                Send
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='w-full h-full'>
                <div className='scroller mt-16 mb-10 mx-0 md:mx-24'>
                    <ul className='tag-list scroller__inner'>
                        {images.map((src, index) => (
                            <li key={index}>
                                <img
                                    src={src.src}
                                    alt={`Image ${index}`}
                                    className='size-40 object-cover rounded-lg'
                                />
                                {src.a}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
                

            <FooterComponent />
        </div>
    );
}
