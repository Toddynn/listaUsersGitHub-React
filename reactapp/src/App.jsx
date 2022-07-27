import React, { useState } from 'react'
import './App.css'
import "./Card"
import Card from './Card';

function App() {
  const [count, setUser] = useState(0);
  const [pessoa, setPessoa] = useState('');
  const [pessoas, setPessoas] = useState([]);

  function addPessoas(){
    const newPessoa ={
      name: pessoa,
      hora: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    setPessoas(prevState =>[...prevState, newPessoa])
  }

  return (
    <div className="App">
      <h1>Lista de presença</h1>
      <div className='row'>
        <div className='col md-3'>
          <input type="text" id="nome" required placeholder='Digite o nome...' onChange={e => setPessoa(e.target.value)}></input>
        </div>
        <div className='col md-3'>
          <button type="button" id='adicionar' onClick={addPessoas}>Adicionar</button>
        </div>
      </div>
      <div className='row'>
        <div className='col md-3'>
          <hr />
          <p>Usuários : {count}</p>
          <hr /> 
          <div className='col mx-auto'>
            {
              pessoas.map(pessoa => (
                <Card key={pessoa.hora} name={pessoa.name} time={pessoa.hora}></Card>
              ))
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App;
