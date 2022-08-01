import React, { useState, useEffect } from 'react'
import './App.css'
import "./Card"
import {Card, CardProps} from './Card';

type APIresponse ={
  name:string,
  avatar_url:string;
}

type User ={
  name:string,
  avatar:string;
}

function App() {
  const [user, setUser] = useState<User>({} as User);
  const [pessoa, setPessoa] = useState('');
  const [pessoas, setPessoas] = useState<CardProps[]>([]);

  function addPessoas(){
    const newPessoa ={
      name: pessoa,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    setPessoas(prevState =>[...prevState, newPessoa])
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`https://api.github.com/users/toddynn`);
      const data = await response.json() as APIresponse;
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
                <Card key={pessoa.time} name={pessoa.name} time={pessoa.time}></Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
