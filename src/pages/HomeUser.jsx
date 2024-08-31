import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../components/UserAuthContext';
import { Outlet, useNavigate } from 'react-router-dom'
import { Typography, Button } from '@material-tailwind/react';
import "./css/scrolbar.css"
import CardCustom from '../components/card';
import Modal from '../components/Modal';
import {useGetPublications} from '../components/getPublications';
import FooterComponent from '../components/FooterComponent';
import Header from '../components/header';


export default function HomeUser() {
    const { logout, user } = useUserAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButton2, setLoadingButton2] = useState(false);
    const [MissingState, setMissingState] = useState(true);
    const [FoundState, setFoundState] = useState(false);
    const { dados, loading } = useGetPublications(MissingState? 'Missing' : 'Found');


    const [activeCard, setActiveCard] = useState(null);

    const handleCardClick = (id) => {
        if (activeCard === id) {
          setActiveCard(null); // Se o card já estiver ativo, desativa-o
          navigate('/siteTest/home'); // Navega para a rota "home" sem parâmetros para fechar o Outlet
        } else {
        if (isMobileView) {
          setIsModalOpen(true); // Abre o modal apenas em telas menores
        }
        setActiveCard(id); // Ativa o card clicado
        navigate(`/siteTest/home/${id}`, { state: { someData: dados } });; // Navega para a rota com o ID do card
        }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false); // Fecha o modal
      setActiveCard(null); // Se o card já estiver ativo, desativa-o
      navigate('/siteTest/home');
    };

    useEffect(() => {
      const handleResize = () => {
        setIsMobileView(window.innerWidth < 768); // Atualiza o estado conforme o tamanho da tela muda
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleFound = () => {
      setLoadingButton(true);
      setFoundState(true);
      setMissingState(false);
      setLoadingButton(false);
    }

    const handleMissing = () => {
      setLoadingButton2(true);
      setMissingState(true);
      setFoundState(false);
      setLoadingButton2(false);
    }


  return (
    <div className='bg-gray-200 min-h-screen '>
      {/* TabBar resposiva*/}

        <Header page={'HomeUser'}/>


        <div className='ca:w-[50%] px-6 flex justify-evenly mt-6'>
          <Button onClick={handleMissing} variant='gradient'  loading={loadingButton} color={`${MissingState? 'orange' : 'gray'}`}>Missing Data</Button>
          <Button onClick={handleFound} variant='gradient' loading={loadingButton2} color={`${FoundState? 'orange' : 'gray'}`}>Found Data</Button>
        </div>

        <div className='flex-grow flex flex-col md:flex-row items-start p-6 gap-5'>
          <div className='w-full ca:w-[50%] h-[calc(100vh-155px)] overflow-y-auto scrollbar-left'>
              <div className='flex flex-col gap-4'>
              {loading ? (
                  // Skeleton enquanto os dados estão sendo carregados
                  Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="animate-pulse flex space-x-4 p-4 bg-white rounded-lg shadow">
                          <div className="bg-gray-300 h-24 w-24 rounded"></div>
                          <div className="flex-1 space-y-4 py-1">
                              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                              <div className="space-y-2">
                                  <div className="h-4 bg-gray-300 rounded"></div>
                                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                              </div>
                          </div>
                      </div>
                  ))
              ) : dados.length === 0 ? (
                  // Mensagem ou outro conteúdo quando não há dados disponíveis
                  <div className='mt-10 border-y border-y-gray-400  rounded-lg justify-center items-center flex'>
                      <Typography color='gray'>No data available</Typography>
                  </div>
              ) : (
                  // Renderiza as publicações quando os dados estão disponíveis
                  dados.map((item, index) => (
                      <CardCustom key={index} index={index} data={item} onClick={MissingState && handleCardClick} />
                  ))
              )}

              </div>
          </div>

          {/* Conteúdo responsivo */}
          {isMobileView ? (
              <Modal isOpen={isModalOpen} onClose={handleCloseModal} >
                  {activeCard !== null && <Outlet />}
              </Modal>
          ) : (
              <div className='w-full md:w-[50%] flex justify-center h-auto md:h-[calc(100vh-145px)] min-w-32'>
                  {activeCard !== null && <Outlet />}
              </div>
          )}
        </div>

        {/* Footer */}
        <FooterComponent />


      </div>
    );
}