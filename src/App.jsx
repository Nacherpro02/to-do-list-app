import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './card.jsx'


function App() {
  const [cardName, setCardName] = useState('')
  const [description, setDescription] = useState ('')
  const [list, setList] = useState([])
  const [initNum, setInitNum] = useState(0)

  useEffect(() => {
    if (description.length >= 200 ) {
      toast.error('La descripción no puede superar los 200 caracteres')
    }
  }, [description])
  
  

  useEffect(() => {
    if (cardName.length >= 20 ) {
      toast.error('El nombre de la tarea no puede superar los 20 caracteres')
    }
  }, [cardName])

  function createTask(){
    if (description === ''){
      setDescription('Sin descripcion')
    }

    if (cardName === '') {
      return toast.error('El nombre de la tarea no puede estar vacío')
    }else{
    toast.success('Tarea creada con éxito, visita hadi.es')
    const newCard = {
      id:  initNum,
      name: cardName,
      description: description
    }
    setList([...list, newCard])
    setInitNum(initNum + 1)
    setCardName('')
    setDescription('')
  }}

  const deleteSingleTask = (id) => {
    setList(list.filter(task => task.id !== id))
    toast.success('Tarea borrada con éxito')
  }
 
  function deleteAllTask (){
    setList([])
    toast.success('Tareas borradas con éxito')
  }
  
  const editTask = () =>{
    
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
      <h1>To-do-List</h1>
      <p>Nombre de la tarea:</p>
      <input className='text-black' type="text" maxLength={20} style={{
          boxSizing: 'border-box',
          resize: 'both', 
          overflow: 'auto'
          }} value={cardName} onChange={e => setCardName(e.target.value)}/>
      <p>Descripción:</p>
      <textarea className='text-black' type="text" rows="4" cols="50" maxLength={200} value={description} onChange={e => setDescription(e.target.value)}/>
      <br /><button type='submit' className='bg-green-500' onClick={createTask}>Crear</button>
      <button onClick={deleteAllTask}>Borrar todo</button>
      <br />
      </div>
      
      <div className='flex flex-col items-center justify-center'>
      <h2>Tareas:</h2>
      {list.map((task => (
      <Card 
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
          deleteSingleTask={deleteSingleTask}
        />)))}
        
        </div>

      <ToastContainer/>
    </>
  )
}

export default App
