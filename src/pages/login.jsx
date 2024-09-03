import React, { useEffect, useRef, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import "./css/Login.css";
import { useUserAuth } from '../components/UserAuthContext';
import FooterComponent from '../components/FooterComponent';

export default function Login() {
  const containerRef = useRef(null);
  const registerRef = useRef(null);
  const loginRef = useRef(null);
  const [email,setEmail] = useState();
  const [pass,setPass] = useState();
  const [localidade,setLocalidade] = useState();
  const [telefone,setTelefone] = useState();  
  const [nome,setNome] = useState(); 
  const [error,setError] = useState();
  const {signUp, signIn} = useUserAuth();
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const response = await signUp(email, pass, nome, telefone, localidade);

      if(response.success){
        console.log('Conta criada com sucesso');
        navigate('/siteTest/home');
      }else{
        setError(response.msg);
      }
    }catch(e){
      console.log(e);
    }

  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const response = await signIn(email, pass);

      if(response.success){
        console.log('Login com sucesso');
        navigate('/siteTest/home');
      }else{
        setError(response.msg);
      }
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    const container = containerRef.current;
    const registerBtn = registerRef.current;
    const loginBtn = loginRef.current;

    const addActiveClass = () => {container.classList.add('active'), setError("")};
    const removeActiveClass = () => {container.classList.remove('active'), setError("")};

    registerBtn.addEventListener('click', addActiveClass);
    loginBtn.addEventListener('click', removeActiveClass);

    // Limpar event listeners quando o componente for desmontado
    return () => {
      registerBtn.removeEventListener('click', addActiveClass);
      loginBtn.removeEventListener('click', removeActiveClass);
    };
  }, []);

  return (
    <div 
      className='bg-gray-200'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div ref={containerRef} id='container' className="container">
        <div className="form-container sign-up">
          <Form onSubmit={handleSignUp} action="#">
            <h1 className='text-2xl'>Create Account</h1>
            {error && <h3 variant="danger">{error}</h3>}
            <input required type="text" placeholder="Name" onChange={(e) => setNome(e.target.value)}/>
            <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input required type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
            <input required type="text" placeholder="Localidade" onChange={(e) => setLocalidade(e.target.value)}/>
            <input required type="tel" placeholder="Telefone" maxLength={9} onChange={(e) => setTelefone(e.target.value)}/>
            <div className='flex flex-col gap-4 w-full items-center mt-4 md:justify-around md:flex-row'>
              <button>Sign Up</button>
              <Link id='link' style={{color: 'white'}} to={'/siteTest/'}>Back</Link>
            </div>
          </Form>
        </div>
        <div className="form-container sign-in">
          <Form onSubmit={handleSignIn} action="#">
            <h1 className='text-2xl'>Sign in</h1>
            {error && <h3 variant="danger">{error}</h3>}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
            <a href="#">Forgot your password?</a>
            <div className='flex flex-col gap-4 w-full items-center mt-4 md:justify-around md:flex-row'>
              <button>Sign In</button>
              <Link id='link' style={{color: 'white'}} to={'/siteTest/'}>Back</Link>
            </div>
          </Form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1 className='text-2xl'>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button ref={loginRef} className="ghost" id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1 className='text-2xl'>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button ref={registerRef} className="ghost" id="register">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* <FooterComponent /> */}
    </div>
  );
};
