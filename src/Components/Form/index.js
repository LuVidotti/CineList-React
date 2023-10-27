import './Form.css';

function Form(props) {

    return (
        <div className='div-form'>
            <form className="form">
                <input type="text" placeholder="Digite algum filme para pesquisar..." value={props.valor} onChange={(e) => props.digitar(e)}/>
            </form>
        </div>
    )
}

export default Form;