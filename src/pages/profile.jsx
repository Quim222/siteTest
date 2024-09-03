import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useUserAuth } from '../components/UserAuthContext';
import FooterComponent from '../components/FooterComponent';
import { CiUser } from "react-icons/ci";
import { countAnimals, countPosts } from '../components/countAnimals';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { fetchCoordinates } from '../components/fetchCoordenatesLocation';
import { Database } from '../../firebase';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';
import { useAnimalsUser, usePostsUserFound, usePostsUserMissing } from '../components/getAnimals';
import "./css/scrollbarRight.css";
import { CardAnimalUser, CardPostUser } from '../components/cardAnimalUser';
import Swal from 'sweetalert2';
import Estatisticas from '../components/Estatisticas';

export default function Profile() {
  const [MissingState, setMissingState] = useState(true);
  const [FoundState, setFoundState] = useState(false);
  const { user, logout } = useUserAuth();
  const containerRef = useRef(null);
  const animalsRef = useRef(null);
  const postRef = useRef(null);
  const [contAnimals, setContAnimals] = useState(0);
  const [contPosts, setContPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [contact, setContact] = useState(user?.contacto || "");
  const [place, setPlace] = useState(user?.localidade || "");
  const [pass, setPass] = useState("");
  const [activeElement, setActiveElement] = useState('animals'); // Inicia como 'animals' ativo
  const { dadosAnimais, loading: loadingAnimais } = useAnimalsUser(user.uid);
  const { dadosPost: dadosPostMissing, loading: loadingPosts } = usePostsUserMissing(user.uid);
  const { dadosPost: dadosPostFound, loading: loadingPosts2 } = usePostsUserFound(user.uid);
  const [dados, setDados] = useState([]);
  let passUser = "";
  const [windowState, setWindowState] = useState(false);

  useEffect(() => {
    if (activeElement === 'animals' && !loadingAnimais) {
      setDados(dadosAnimais);
      setLoading(false);
    } else if (activeElement === 'posts') {
      if (MissingState && !loadingPosts) {
        setDados(dadosPostMissing);
        setLoading(false);
      } else if (FoundState && !loadingPosts2) {
        setDados(dadosPostFound);
        setLoading(false);
      }
    }
  }, [activeElement, dadosAnimais, dadosPostMissing, dadosPostFound, loadingAnimais, loadingPosts, loadingPosts2, MissingState, FoundState]);


  useEffect(() => {
    const fetchData = async () => {
      const countA = await countAnimals(user.uid);
      const countP = await countPosts(user.uid);
      setContAnimals(countA);
      setContPosts(countP);
    }
    fetchData();

    setName(user.name);
    setEmail(user.email);
    setContact(user.contacto);
    setPlace(user.localidade);
  },[user]);

  useEffect(() => {
    const animals = animalsRef.current;
    const post = postRef.current;

    const activateAnimals = () => {
      setActiveElement('animals');
      setDados(dadosAnimais);
    };

    const activatePosts = () => {
      setWindowState(true);
    };

    if (animals && post) {
      animals.addEventListener('click', activateAnimals);
      post.addEventListener('click', activatePosts);
    }

    return () => {
      if (animals && post) {
        animals.removeEventListener('click', activateAnimals);
        post.removeEventListener('click', activatePosts);
      }
    };
  });

  const handlePasswordChange = async (userEmail) => {
    const user = getAuth().currentUser;
    try {
      const credential = EmailAuthProvider.credential(userEmail, passUser);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, pass);
      return { success: true };
    } catch (error) {
      Swal.fire('Erro', error.message, 'error');
      return { success: false };
    }
  };

  const handleEmailChange = async (emailToUse) => {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const credential = EmailAuthProvider.credential(emailToUse, passUser);
      console.log("New Email: ", email);
      console.log("Old Email: ", emailToUse);
      console.log("pass: ", passUser);
    
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, email);
      return { success: true }; // Retorne como um objeto
    } catch (error) {
      Swal.fire('Erro', error.message, 'error');
      return { success: false }; // Retorne o erro para que você possa lidar com ele
    }
  };

  const handleMissingClick = () => {
    setMissingState(true);
    setFoundState(false);
    setDados(dadosPostMissing);
    setActiveElement('posts');
    setWindowState(false);
  }

  const handleFoundClick = () => {
    setFoundState(true);
    setMissingState(false);
    setDados(dadosPostFound);
    setActiveElement('posts');
    setWindowState(false);
  }
  


  const saveItems = async () => {
    try {
      // Verifique se houve alterações no name, tele, local ou email
      if (name === user.name && contact === user.contacto && place === user.localidade && email === user.email && pass === "") {
        Swal.fire('No changes were made.', '', 'info');
        return;
      }
  
      // Verifique se a senha é válida se ela foi alterada
      if (pass !== "" && pass.length < 6) {
        Swal.fire('Error', 'The password must be at least 6 characters long.', 'error');
        return;
      }

      const { value: password } = await Swal.fire({
        title: 'Enter your current password to validate changes',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: 'Enter your password',
        showCancelButton: true,
        confirmButtonText: 'Validate',
        cancelButtonText: 'Cancel',
        showLoaderOnConfirm: true,
        preConfirm: async (pass) => {
          if (!pass) {
            Swal.showValidationMessage('Password is required');
            return;
          }
          try {
            const auth = getAuth();
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, pass);
            await reauthenticateWithCredential(user, credential);
            return pass; // Retorna a senha se a reautenticação for bem-sucedida
          } catch (error) {
            let msg = error.message;
            if (msg.includes('(auth/wrong-password)')) msg = 'Wrong password';
            Swal.showValidationMessage(`Error: ${msg}. Please check your password and try again.`);
            return; // Retorna undefined para evitar resolver a promessa com sucesso
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
  
      if (!password){
        return;
      } else{
        passUser = password;
      };
  
       // Obter referência à coleção 'user'
      const collectionData = collection(Database, 'user');
      const collectionPostData = collection(Database, 'Post');
      const collectionAnimalsData = collection(Database, 'AnimalsUser');
  
      // Criar uma consulta para encontrar o usuário pelo nome
      const q = query(collectionData, where("uid", "==", user.uid));
      const qPost = query(collectionPostData, where("UserUid", "==", user.uid));
      const qAnimals = query(collectionAnimalsData, where("UserUid", "==", user.uid));

      const querySnapshot = await getDocs(q);
      const querySnapshotPost = await getDocs(qPost);
      const querySnapshotAnimals = await getDocs(qAnimals);

      const userDocRef = querySnapshot.docs[0].ref;
  
      let newLocal;
  
      // Atualizar nome, email e campos relacionados se houver alterações
      if (name !== user.name) {
        
  
        await updateDoc(userDocRef, {
          Nome: name,
        });
        
        
        querySnapshotAnimals.forEach(async (doc) => {
          const ref = doc.ref;
          await updateDoc(ref, {
            User: name,
          });
        })

        querySnapshotPost.forEach(async (doc) => {
          const ref = doc.ref;
          await updateDoc(ref, {
            Nome: name,
          });
        })

        
  
        user.name = name;
      }
      
      if(email !== user.email){
        const {success} = await handleEmailChange(user.email);
        if (success) {
          await updateDoc(userDocRef, { Email: email });
          user.email = email;
        }

      }
  
      // Atualizar contacto
      if (contact !== user.contacto) {
        await updateDoc(userDocRef, {
          Contacto: contact,
        });
        user.contacto = contact;
      }
  
      // Atualizar localidade e coordenadas
      if (place !== user.localidade) {
        newLocal = await fetchCoordinates(place + ", Portugal");
        await updateDoc(userDocRef, {
          Localidade: place,
          Coordenadas: newLocal,
        });
        user.localidade = place;
        user.coordenadas = newLocal;
      }
  
      if (pass !== "") {
        const { success } = await handlePasswordChange(email);
        if (success) {
          Swal.fire({
            title: 'Success',
            text: 'Password updated successfully. Log in again.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              logout(); // Realiza o logout
            }
          });
        }
      } else {
        // Exibir mensagem de sucesso sem logout, caso a senha não tenha sido alterada
        Swal.fire({
          title: 'Success',
          text: 'Data updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // Recarrega a página
          }
        });
      }
  
    } catch (error) {
      console.log('Error updating data:', error);
      Swal.fire('Error', `An error occurred while updating the data. Please try again. ${error}`, 'error');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />

      <div className='flex-grow pb-10 border-t border-t-gray-300'>
        { loading ? (
          <div className='bg-orange-400 pt-[100px] px-10 h-[400px] flex flex-col gap-5'>
            <div className="animate-pulse h-6 bg-gray-500 rounded w-1/4"></div>
            <div className="animate-pulse h-6 bg-gray-500 rounded w-1/2"></div>
            <div className="animate-pulse h-6 bg-gray-500 rounded w-3/4"></div>
          </div>
        ):(
          <div className='bg-orange-400 mb-16 pt-[100px] px-10 h-[400px] flex flex-col gap-5 lg:mb-0'>
            <div>
              <Typography variant='h1' color='gray'>Welcome {user.name}</Typography>
            </div>
            <div>
              <Typography variant='paragraph' color='gray'>This is your Profile page. You can see your data and modify it.</Typography>
            </div>
          </div>
        )}
      </div>

        <div className='relative -top-40 flex flex-col gap-12 items-center sx:m-14 xl:items-start xl:flex-row'>
          <div className='w-[90%] sx:w-[70%] bg-gray-300 rounded-lg shadow-lg'>
            <div className='w-full p-8 rounded-t-lg flex flex-col gap-10 md:items-center md:justify-between md:flex-row'>
              <Typography variant='h4' color='gray'>My Profile</Typography>
              <Button variant="gradient" loading={loadingButton} color='gray' size='md' onClick={saveItems} >Save Changes</Button>
            </div>
            <div className='p-6 h-[800px] flex flex-col justify-center lg:p-10 lg:h-[550px]'>
              {loading ? (
                // Skeleton while loading
                <div className="animate-pulse flex flex-col gap-5">
                  <div className="h-6 bg-gray-500 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-500 rounded w-3/4"></div>
                </div>
              ) : (
                <>
                  <div className='pb-8 flex flex-col gap-5'>
                    <Typography variant='paragraph' className='text-lg' color='gray'>User Information</Typography>
                    <div className='flex flex-col gap-16 lg:flex-row lg:px-10'>
                      <div className='flex flex-col gap-2 flex-1'>
                        <Typography className='font-medium' variant='paragraph' color='gray'>Username</Typography>
                        <Input className='shadow w-full' type='text' color='gray' value={name} label='Name' onChange={(e) => {setName(e.target.value)}} />
                      </div>
                      <div className='flex flex-col gap-2 flex-1'>
                        <Typography className='font-medium' variant='paragraph' color='gray'>Password</Typography>
                        <Input className='shadow w-full' type='password' color='gray' label='Password' value={pass} onChange={(e) => {setPass(e.target.value)}} />
                      </div>
                    </div>
                    <div className='mt-10  lg:px-10'>
                      <div className='flex flex-col gap-2 flex-1'>
                        <Typography className='font-medium' variant='paragraph' color='gray'>Email</Typography>
                        <Input className='shadow w-full' type='email' color='gray' value={email} label='Email' onChange={(e) => {setEmail(e.target.value)}} />
                      </div>
                    </div>
                  </div>
                  <div className='w-full my-10 h-[1px] bg-gray-500'/>
                  <div className='pb-8 flex flex-col gap-5'>
                    <Typography variant='paragraph' className='text-lg' color='gray'>Contact Information</Typography>
                    <div className='flex flex-col gap-16 lg:flex-row lg:px-10'>
                      <div className='flex flex-col gap-2 flex-1'>
                        <Typography className='font-medium' variant='paragraph' color='gray'>Contact</Typography>
                        <Input maxLength={9} className='shadow w-full' type='tel' color='gray' label='Contact' value={contact} onChange={(e) => {setContact(e.target.value)}} />
                      </div>
                      <div className='flex flex-col gap-2 flex-1'>
                        <Typography className='font-medium' variant='paragraph' color='gray'>Place</Typography>
                        <Input className='shadow w-full' type='text' color='gray' label='Place' value={place} onChange={(e) => {setPlace(e.target.value)}} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className='w-[90%] h-[100%] sx:w-[70%] flex flex-col xl:w-[30%]'>
            <div className='bg-gray-300 rounded-lg shadow-lg'>
              {loading ? (
                <div className='p-10 flex flex-col items-center justify-center gap-4'>
                  <div className="h-6 bg-gray-400 rounded w-14"></div>
                  <div className="h-6 bg-gray-400 rounded w-14"></div>              
                </div> 
              ) : (
                <div className='p-10 flex flex-col items-center justify-center '>
                  <CiUser size={35} />
                  <Typography variant='paragraph' className='text-2xl' color='gray'>{user.name}</Typography>
                </div>
              )}
              <div ref={containerRef} className='flex flex-col gap-5 lg:justify-around p-5 lg:flex-row'>
                <div className='flex flex-col justify-center items-center'>
                  {loading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-6 bg-gray-400 rounded w-14 mb-2"></div>
                      <div className="h-6 bg-gray-400 rounded w-14"></div>
                    </div>
                  ) : (
                    <div
                      ref={animalsRef}
                      className={`flex flex-col items-center w-22 h-18 rounded-lg p-2 cursor-pointer hover:bg-gray-400 ${activeElement === 'animals' ? 'bg-gray-400 text-white' : ''}`}
                    >
                      <Typography className={`${activeElement === 'animals' ? 'text-white' : ''}`} variant='paragraph' color='gray'>{contAnimals}</Typography>
                      <Typography className={`${activeElement === 'animals' ? 'text-white' : ''}`} variant='paragraph' color='gray'>Animals</Typography>
                    </div>
                  )}
                </div>
                <div className='flex flex-col justify-center items-center '>
                  {loading ? (
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-6 bg-gray-400 rounded w-14 mb-2"></div>
                      <div className="h-6 bg-gray-400 rounded w-14"></div>
                    </div>
                  ) : (
                    <div
                      ref={postRef}
                      className={`flex flex-col items-center w-22 h-18 rounded-xl p-2 cursor-pointer hover:bg-gray-400 ${activeElement === 'posts' ? 'bg-gray-400 text-white' : ''}`}
                    >
                      <Typography className={`${activeElement === 'posts' ? 'text-white' : ''}`} variant='paragraph' color='gray'>{contPosts}</Typography>
                      <Typography className={`${activeElement === 'posts' ? 'text-white' : ''}`} variant='paragraph' color='gray'>Posts</Typography>
                    </div>
                  )}
                  {windowState && (
                    <div className='absolute top-[1350px] md:top-[1300px] lg:top-[950px] xl:top-60 xl:-right-2 border w-[200px] flex flex-col gap-5 bg-gray-400 p-4 rounded-xl'>
                      <Button color='blue-gray' size='sm' onClick={() => handleMissingClick()}>Missing</Button>
                      <div className='border'/>
                      <Button color='blue-gray' size='sm' onClick={() => handleFoundClick()}>Found</Button>               
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='w-full mt-6 max-h-[375px] overflow-y-auto scrollbar-left bg-gray-300 rounded-lg shadow-lg'>
              <Typography variant='h5' color='gray' className='p-4'>
                {activeElement === 'animals' ? "My animals" : `My ${MissingState? "Missing" : "Found"} Posts`}
              </Typography>              
              <div className='flex flex-col gap-4 '>
                {loading ? (
                  // Skeleton enquanto os dados estão sendo carregados
                  Array.from({ length: 4 }).map((_, index) => (
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
                ) : (
                  // Renderiza as publicações quando os dados estão disponíveis
                  dados.length === 0 ? (
                    <div className='p-4'>
                      <Typography color='gray'>No data available</Typography>
                    </div>
                  ) : activeElement === 'animals' ? (
                    dados.map((item, index) => (
                      <CardAnimalUser key={index} item={item} />
                    ))
                  ) : (
                    dados.map((item, index) => (
                      <CardPostUser key={index} item={item} />
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {user.tipoUser === 'admin' && (
          <div className='flex flex-col items-center justify-center mb-10'>
            <Typography variant='paragraph' color='gray'>Statistics</Typography>
            <Estatisticas />
          </div>
        )}

      <FooterComponent />
    </div>
  );
}
