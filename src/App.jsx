import { useState } from 'react';
import './App.css';
import { parseDate } from "@internationalized/date";
import Modal from './components/modal';
import Card from './components/card';
import { useSelector } from 'react-redux';
import { sections } from '../public/sections';

function App() {
  const tasks = useSelector(state => state.tasks.tasks);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const openModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }


  // Helper function to filter tasks by status
  const getTasksByStatus = (status) => tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className='w-full h-screen md:h-1/2 lg:h-1/2 lg:w-3/4 md:w-1/2 xl:w-full'>
       <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4 xl:gap:3">
        {sections.map(section => (
          <div key={section.status} className="flex flex-col items-center">
            <h2 className="text-center text-xl font-semibold mb-4">{section.title}</h2>
            <div className="space-y-5 ">
              {getTasksByStatus(section.status).map(item => (
                <Card
                  key={item.id}
                  title={item.title}
                  assignedTo={item.assignedTo}
                  dueDate={item.dueDate}
                  onClick={() => openModal(item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
      
      {isModalOpen && (
        <Modal
          title={modalData.title}
          assignedTo={modalData.assignedTo}
          dueDate={parseDate(modalData.dueDate)}
          handleClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;