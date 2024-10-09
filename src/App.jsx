import { useState } from "react";
import "./App.css";
import { parseDate , getLocalTimeZone , now } from "@internationalized/date";
import Modal from "./components/modal";
import Card from "./components/card";
import { useSelector } from "react-redux";
import { sections } from "../public/sections";
import {useDateFormatter} from "@react-aria/i18n";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  let formatter = useDateFormatter({dateStyle: "full"});

  const openModal = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const openEmptyModal = (data) => {
     data.assignedTo = "";
     let todayDate = now(getLocalTimeZone());
     // Format the date in yyyy-mm-dd format
     const year = todayDate.year;
     const month = todayDate.month < 10 ? '0' + todayDate.month : todayDate.month;
     const day = todayDate.day < 10 ? '0' + todayDate.day : todayDate.day;
     data.dueDate = `${year}-${month}-${day}`;
     data.title = '';
     data.add = true
     openModal(data);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  // Helper function to filter tasks by status
  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());

  return (
    <div className="flex flex-col mt-16 items-center p-4 bg-gray-100">
      <div className="w-full md:h-1/2 lg:h-1/2 lg:w-3/4 md:w-1/2 xl:w-full">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4 xl:gap:3 ">
          {sections.map((section) => (
            <div key={section.status} className="h-3/4 min-w-[250px]border-2 border-gray-200/40 bg-white shadow rounded-lg flex flex-col items-center overflow-hidden overflow-y-scroll">
              <div className="m-2 flex space-x-2 justify-center items-center">
                <h2 className="text-center text-xl font-semibold ">
                  {section.title}
                </h2>
                <span onClick={() => openEmptyModal({status : section.status})}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
                  </svg>
                </span>
              </div>
            
              <div className="space-y-5 last:mb-5">
                {getTasksByStatus(section.status).map((item) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    assignedTo={item.assignedTo}
                    dueDate={item.dueDate}
                    onClick={() => openModal(item)}
                    priority={item.priority}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          id = {modalData.id}
          title={modalData.title}
          assignedTo={modalData.assignedTo}
          status = {modalData.status}
          dueDate={(modalData.dueDate)}
          handleClose={closeModal}
          type = {modalData.add}
        />
      )}
    </div>
  );
}

export default App;


// https://www.figma.com/community/file/814055731128774975/kanban-board