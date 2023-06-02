import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import "./Card";
import { Card } from './Card';
import {AiFillBug} from 'react-icons/ai';
import {BsGithub} from 'react-icons/bs';
import Swal from 'sweetalert2';
import {BiSearchAlt} from 'react-icons/bi';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

type User ={
  name:string,
  login:string,
  avatar:string,
  id:number|undefined,
}

type Person = {
  name: string,
  id:number,
  avatar?:string,
}

function App() {
  const [user, setUser] = useState<User>({} as User);
  const [inputValue, setInputValue] = useState('');
  const [pessoas, setPessoas] = useState<Person[]>([]);
  const [inexistentUser, setInexistentUser] = useState(false);

  async function fetchData(){
    setInexistentUser(false); 
    if(inputValue !== ''){
      await axios.get(`https://api.github.com/users/${inputValue}`)
      .then(async (response)=>{
        await InsertUser(response.data);
        await addPessoas(response.data);
      })
      .catch((error) => {
        setInexistentUser(true);
        Toast.fire({
          text: 'Usuário não encontrado',
          icon: 'error'
        })
      })
    }else{
      setInexistentUser(true)
    }
  }

  async function InsertUser(pessoa:any){ 
    setUser({
      name: pessoa.name,
      login: pessoa.login,
      avatar: pessoa.avatar_url,
      id:pessoa.id
    })
  }

  async function addPessoas(data:any){
    const newPessoa ={
      name: data.name,
      id:data.id,
      avatar: data.avatar_url,
      login: data.login,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    setPessoas((prevState:any) => [...prevState, newPessoa]);
  }

  const handleDelete = (id:number) => {
    setPessoas((prevPessoas:any) => prevPessoas.filter((pessoa:any) => pessoa.id !== id))
  }

  const [search, setSearch] = useState('');

  const filteredList = useMemo(() => {
    if(!search) return pessoas;
    if(search && pessoas){
      return pessoas.filter((pessoa) => {
        return pessoa.name.toLowerCase().includes(search.toLowerCase());
      })
    }
  }, [search, pessoas])

  return (
    <>
      <div className='flex flex-col gap-8 md:w-[50%] w-full mx-auto h-screen'>
        <BsGithub className='sticky top-0' size={50}/>
        <div className='flex md:flex-row flex-col lg:gap-0 gap-8 w-full justify-between items-center'>
          <div className='w-full'>
            <h1 className='break-words'>Lista de Usuários </h1>
            <h3>Project React</h3>
          </div>
          <div className='flex flex-col gap-2 items-center h-full w-full'>
            {
                <>
                {
                  !inexistentUser &&
                  <>
                    {
                      user.avatar ?
                      <>
                        <img id="imgUser" className='object-scale-down rounded-full w-[150px] h-[150px]' src={user.avatar} alt="" ></img>
                        <p className='font-normal'>{user?.login}</p>
                      </>
                    :
                      <BsGithub size={80}></BsGithub>
                    }
                  </>
                }
                {
                  inexistentUser &&
                    <>
                      <AiFillBug size={80}></AiFillBug>
                      <p className='font-normal'>Usuário Não Encontrado</p>
                    </>
                }
                </>
            }
          </div>
        </div>
        <div className='flex md:flex-row flex-col w-full gap-4'>
            <form className='md:w-[75%] text-black'>
              <input className='px-4 focus:outline-transparent' type="text" id="nome" required placeholder='Digite o nome...' onChange={(e:any) =>setInputValue(e.target.value)}></input>
            </form>
            <div className='md:w-[25%]'>
              <button type="button" id='adicionar' onClick={fetchData}>Adicionar</button>
            </div>
        </div>
        <div className='border-y p-4 flex lg:flex-row flex-col gap-2 items-center justify-between'>
          <p>Usuários : {pessoas.length}</p>
          <div className='relative items-center flex text-black sm:w-auto w-full'>
            <input type="text" id='search' className='whitespace-nowrap overflow-hidden sm:w-80 w-full focus:outline-transparent' placeholder='pesquisar....' value={search} onChange={(e:any) => setSearch(e.target.value)} />  
            <div className='absolute items-center rounded-r-md bg-[#213547] flex right-0 p-4 h-full'>
              <BiSearchAlt color='white' size={22}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col mb-8 h-full overflow-y-auto'>
          {
            filteredList && filteredList?.map((item:any) => {
              console.log(item)
              return (
                <Card key={item.id} name={item.name ?? item.login} time={item.time} onClickDelete={() => handleDelete(item.id)}></Card>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App;
