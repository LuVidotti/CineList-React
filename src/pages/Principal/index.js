import Form from '../../Components/Form';
import './Principal.css';
import { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';

function Principal() {
    const LazyFilme = lazy(() => import('../../Components/Filme'));
    const apiKey = '3acd99fa1b180cb1eb86ebe52bfdb5a6';
    const urlImagem = `https://image.tmdb.org/t/p/w300`
    
    const [filmes, setFilmes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [busca, setBusca] = useState('');
    const [erro, setErro] = useState(false);

    useEffect(() => {
        async function listaFilmes() {
            const resposta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pagina}&language=pt-BR`);
            const dados = await resposta.json();
    
            setFilmes(dados.results);
        }

        listaFilmes()
    }, [pagina]);

    function aoDigitado(e) {
        setBusca(e.target.value);
    }

    useEffect(() => {
        async function buscarFilme() {
            if(busca === '') {
                setErro(false);
                return;
            }

            const resposta = await fetch(`https://api.themoviedb.org/3/search/movie?query=${busca}&page=${pagina}&api_key=${apiKey}&language=pt-BR`);
            const dados = await resposta.json();

            if(dados.results.length === 0) {
                setErro(true);
            } else {
                setErro(false);
            }

            setFilmes(dados.results);
        }

        buscarFilme()

    }, [busca, pagina]);

    return (
        <div className='principal'>
            <h1>Filmes Populares</h1>
            <Form digitar={aoDigitado} valor={busca}/>

            {erro === true ? 
                <div className='erros'>
                    Erro, nenhum filme encontrado
                </div> 
            
            : 
                <ul>
                    {filmes.map(filme => <Link to={`/movie/${filme.id}`} style={{textDecoration: 'none'}}>
                        <Suspense fallback={<div className='carregar'>carregando...</div>}>
                            <LazyFilme titulo={filme.title} texto={filme.overview} imagem={`${urlImagem}${filme.poster_path}`} key={filme.id}/>
                        </Suspense>
                        </Link>) 
                    }
                </ul>
            }

            <div className='paginacao'>
                <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>Página Anterior</button>
                <button onClick={() => setPagina(pagina + 1)} disabled={filmes.length < 20}>Próxima Página</button>
            </div>
        </div>
    )
}

export default Principal;