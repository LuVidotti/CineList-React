import './Pag404.css';
import { useNavigate } from 'react-router-dom';

function Pag404() {
    const navegar = useNavigate();

    return (
        <div className='pagina404'>
            <h1>Página não encontrada, retorne ao início:</h1>
            <button onClick={() => {navegar('/')}}>Início</button>
        </div>
    )
}

export default Pag404;