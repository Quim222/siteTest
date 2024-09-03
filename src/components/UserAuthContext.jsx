import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Database, FIREBASE_AUTH } from "../../firebase";
import { fetchCoordinates } from "./fetchCoordenatesLocation";
import { doc, getDoc, setDoc } from "firebase/firestore";
const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {
      const unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
          if(user) {
              setUser(user);
              updateUserData(user.uid);
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
              setUser(null);
          }
      });
  
      return () => {unsub()};
  }, [FIREBASE_AUTH]);

    async function signUp(email, pass, utilizador, contacto, localidade) {
        try {

            if(!email || !pass || !utilizador || !contacto || !localidade) {
              return {success: false, msg: 'Missing parameters'};
            }

            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, pass);
            console.log('response: ' ,response);
      
            const uid = response?.user?.uid;
            const coords = await fetchCoordinates(localidade + ", Portugal");
      
           
              
            // Salvar informações adicionais no Firestore
            await setDoc(doc(Database, "user", uid), {
              Nome: utilizador,
              Email: email,
              Contacto: contacto,
              Localidade: localidade,
              Coordenades: coords,
              TipoUser: "normal",
              uid: uid,
              fcmToken: "",
            });
      
            
            return {success: true, msg: 'Conta criada com sucesso'};
          } catch (error) {
            let msg = error.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
            if (msg.includes('(auth/invalid-credential)')) msg = 'Wrong parameters';
            if (msg.includes('(auth/missing-email)')) msg = 'Missing email';
            if (msg.includes('(auth/missing-password)')) msg = 'Missing password';
            if (msg.includes('(auth/wrong-password)')) msg = 'Wrong password';
            if (msg.includes('(auth/too-many-requests)')) msg = 'Too many requests, try again later';
            if (msg.includes('(auth/weak-password)')) msg = 'Password too weak, at least 6 characters';
            return {success: false, msg};
          }
    }
    
    async function signIn(email, password) {
        try {
      
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log('response: ' ,response);

            localStorage.setItem('user', JSON.stringify({
              uid: response.user.uid,
              email: response.user.email,
              token: await response.user.getIdToken(),
            }));
            return {success: true, msg: 'Login com sucesso'};
          } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg = 'Wrong email';
            if(msg.includes('(auth/invalid-credential)')) msg = 'Wrong parameters';
            if(msg.includes('(auth/missing-email)')) msg = 'Missing email';
            if(msg.includes('(auth/missing-password)')) msg = 'Missing password';
            if(msg.includes('(auth/wrong-password)')) msg = 'Wrong password';
            if(msg.includes('(auth/too-many-requests)')) msg = 'Too many requests, try again later';
            if(msg.includes('(auth/user-not-found)')) msg = 'User, not found, please register';
            return {success: false, msg};
          }
    }
    
    function logout() {
      // Remove os dados do usuário do localStorage
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
  
      return signOut(FIREBASE_AUTH);
    }

    const updateUserData = async (uid) => {
      console.log('updateUserData', uid);
      try {
          // Referência ao documento específico do usuário
          const userDocRef = doc(Database, "user", uid);
          
          // Obtém o documento
          const docSnap = await getDoc(userDocRef);
  
          if (docSnap.exists()) {
              const userData = docSnap.data();
  
              // Atualizar o estado do usuário
              setUser(prevUser => ({
                  ...prevUser, // Preserva as propriedades existentes
                  name: userData.Nome,
                  tipoUser: userData.TipoUser,
                  localidade: userData.Localidade,
                  contacto: userData.Contacto,
                  coordenadas: userData.Coordenades,
              }));
          } else {
              console.log("No matching documents.");
          }
      } catch (error) {
          console.error("Error fetching document: ", error);
      }
  };

  return <UserAuthContext.Provider value={{signIn,signUp,logout,user, setUser, isAuthenticated}}>{children}</UserAuthContext.Provider>;
}

export function useUserAuth() {
  
  return useContext(UserAuthContext);
}