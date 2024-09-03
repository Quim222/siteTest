import React, { useState } from 'react'
import Header from '../components/header'
import FooterComponent from '../components/FooterComponent'
import { Input, Rating, Textarea, Typography } from '@material-tailwind/react'
import { useUserAuth } from '../components/UserAuthContext'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { Database } from '../../firebase'

export default function Feedback() {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [name, setName] = useState(user?.name || '');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o refresh da página

    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    try {
      await addDoc(collection(Database, 'Feedback'), {
        user: user ? user.uid : 'anonymous',
        name: name,
        rating: rating,
        color: randomColor(),
        feedback: feedback,
      });
      alert('Feedback submitted successfully');
      navigate('/siteTest');
    } catch (error) {
      alert('Error in submitting feedback');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-300'>
      <Header />

      <div className='flex flex-grow justify-center items-center'>
        <div className='border p-4 rounded-xl shadow-lg  w-[95%]  md:w-[60%]'>
          <Typography variant='h1' className='text-2xl' color='gray'>FeedBack</Typography>
          <div>
            <form onSubmit={handleSubmit} className='mt-4 flex flex-col space-y-8'>
              <Input required label='Name' value={name} color='orange' onChange={(e) => setName(e.target.value)} />
              <Textarea required label='Feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)}></Textarea>
              <div className='flex justify-center items-center'>
                <Rating value={rating} onChange={(e) => {setRating(e)}} />
              </div>
              <button type='submit' className='bg-orange-400 shadow-lg shadow-white text-white p-2 rounded-lg'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  )
}
