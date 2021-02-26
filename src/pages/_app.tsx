import '../styles/global.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';


function MyApp({ Component, pageProps }) {

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;

// Essa pagina é o layout de toda a aplicaçao todas as telas passam por aqui primeiro .