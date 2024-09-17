import { useState } from 'react'
import './App.css'
import { parseDate} from "@internationalized/date";
import Modal from './components/modal'
import Card from './components/card'
import { useDispatch , useSelector } from 'react-redux';


function App() {
  const tasks = useSelector(state => state.tasks.tasks);
  const [isModalOpen , setModalOpen] = useState(false);
  const [modalData , setModalData] = useState({});

  const openModal =(data) =>{
    setModalData(data);
    setModalOpen(true);
  }

  const closeModal = () =>{
    setModalOpen(false);
  }



  return (
    <>
     <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div>
        {
        tasks.map((item) => (
          <Card key = {item.id} title={item.title} assignedTo={item.assignedTo} dueDate={item.dueDate} 
          onClick={() => openModal(item)}/>
        ))
        }
      </div>

     {
        isModalOpen && (
          <Modal  
            title={modalData.title}
            assignedTo= {modalData.assignedTo}
            dueDate={parseDate(modalData.dueDate)}
            handleClose= {closeModal}
          />
        )
      }
    
     </div>
    </>
  )
}

export default App
