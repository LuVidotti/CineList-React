import './Filme.css';

function Filme(props) {
    return (
        <div className='container'>
            <div className='filme'>
                <img src={props.imagem} alt='capa do filme'/>
                <h4>{props.titulo}</h4>
                <p>
                    {props.texto}
                </p>
            </div>
        </div>
        
        
    )
}

export default Filme;