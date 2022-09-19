import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import "./Card"
import {Card, CardProps} from './Card';

type APIresponse ={
  name:string,
  login:string,
  avatar_url:string;
}

type User ={
  name:string,
  login:string,
  avatar:string;
}

function App() {
  const [user, setUser] = useState<User>({} as User);
  const [pessoa, setPessoa] = useState('');
  const [pessoas, setPessoas] = useState<CardProps[]>([]);

  const foto = document.getElementById("imgUser");
  const bug = document.getElementById("bi-bug-fill");
  const msgBug = document.getElementById("escondido");

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    addPessoas();
  }

  function addPessoas(){
    const newPessoa ={
      name: pessoa,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    setPessoas(prevState =>[...prevState, newPessoa]);

    async function fetchData(){
      const response = await fetch(`https://api.github.com/users/${pessoa}`);
      const data = await response.json() as APIresponse;
      
      async function callBack(){ 
        setUser({
          name: data.name,
          login: data.login,
          avatar: data.avatar_url,
        })
      }
      callBack();
      if(response.status == 404){
        foto?.setAttribute("style", "display: none");
        bug?.setAttribute("style", "display: contents");
        msgBug?.setAttribute("style", "display:contents");
      }else{
        foto?.setAttribute("style" ,"width: 130px, height: 130px ,border-radius: 50%, box-shadow: 0 0 2em #213547")
        bug?.setAttribute("style", "display: none");
        msgBug?.setAttribute("style", "display: none");
        user.avatar = data.avatar_url;
      }
      user.name = data.name;
      user.login = data.login;
      }
      fetchData();
  }

  return (
    <div className="App">
      <header className='row'>
        <h1 className='col-8'>Lista de Usuários <i className="bi bi-github"></i></h1>
        <div className='col-4'>
          <strong id="escondido">Usuário Não Encontrado</strong>
          <strong>{user.name}</strong>
          <img id="imgUser" src={user.avatar} alt="" ></img>
          <i id="bi-bug-fill" className="bi bi-bug-fill"></i>
        </div>
      </header>
      <div className='row'>
        <div className='col md-3'>
          <form onSubmit={handleSubmit}>
            <input type="text" id="nome" required placeholder='Digite o nome...' onChange={e => setPessoa(e.target.value)}></input>
          </form>
          </div>
        <div className='col md-3'>
          <button type="button" id='adicionar' onClick={addPessoas}>Adicionar</button>
        </div>
      </div>
      <div className='row'>
        <div className='col md-3'>
          <hr />
          <p>Usuários : {pessoas.length}</p>
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
