import React, { useState, useEffect } from 'react'
import './App.css'
import "./Card"
import Card from './Card';

function App() {
  const [user, setUser] = useState({name:'', avatar:''});
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

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/toddynn')
      const data = await response.json();
      console.log(data);
          setUser({
            name: data.name,
            avatar: data.avatar_url,
          });
    }
    fetchData();
}, []);

  return (
    <div className="App">
      <header className='row'>
        <h1 className='col-8'>Lista de presença</h1>
        <div className='col-4'>
          <strong>{user.name}</strong>
          <img id="imgUser" src={user.avatar} alt="" ></img>
        </div>
      </header>
      
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
          <p>Usuários : </p>
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
