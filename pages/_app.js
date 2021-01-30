import { useState } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  //const [estaLoggeado, setEstaLoggeado] = useState(false);
  const [emailLoggeado, setEmailLoggeado] = useState('');
  const ingresarUsuario = (email) => {
    setEmailLoggeado(email);
    //setEstaLoggeado(true);
  }; 
  return <Component {...pageProps} ingresarUsuario={ingresarUsuario} emailLoggeado={emailLoggeado}/>
}

export default MyApp
