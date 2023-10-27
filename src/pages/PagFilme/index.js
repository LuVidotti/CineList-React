import './PagFilme.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaDollarSign as Orcamento} from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { FaClock } from "react-icons/fa6";

function PagFilme() {
    const apiKey = '3acd99fa1b180cb1eb86ebe52bfdb5a6';
    const urlId = useParams();
    const imgUrlPadrao = 'https://image.tmdb.org/t/p/w300'

    const [filme, setFilme] = useState([]);

    useEffect(() => {
        async function PegarFilmeId() {
            const resposta = await fetch(`https://api.themoviedb.org/3/movie/${urlId.id}?api_key=${apiKey}&language=pt-BR`);
            const dados = await resposta.json();

            setFilme(dados);
        }

        PegarFilmeId();
    }, [])

    const produtoras = filme.production_companies;
    const generos = filme.genres
    
    return(
        <div className='filme-especifico'>
            <h1>{filme.title}</h1>
            <img src={`${imgUrlPadrao}${filme.poster_path}`} alt='poster do filme' className='poster'/>
            <p className='descricao'>{filme.overview}</p>
            
            <ul className='generos'>
                {generos && Array.isArray(generos) ? (
                    generos.map(genero => <li key={genero.id}>
                        <p>{genero.name}</p>
                    </li>)
                ) : (<div>Nenhum genero disponivel</div>)}
            </ul>
            
            <p>Data de Lançamento: {filme.release_date}</p>
            
            <div className='filme-info'>
                <div className='nota'><GoStarFill /> {filme.vote_average}</div>
                <div className='orcamento'><Orcamento /> {filme.budget}</div>
                <div className='duracao'><FaClock /> {filme.runtime} min</div>
            </div>

            <ul className='produtoras'>
                {produtoras && Array.isArray(produtoras) ? (
                    produtoras.map(produtora => (
                        <li key={produtora.id} className='produtora'>
                            <h2>{produtora.name}</h2>
                            <img src={`${imgUrlPadrao}${produtora.logo_path}`} alt={produtora.name} />
                        </li>
                    ))
                ) : (
                    <p>Nenhuma informação sobre as produtoras disponível.</p>
                )}
            </ul>
        </div>
    )
}

export default PagFilme;