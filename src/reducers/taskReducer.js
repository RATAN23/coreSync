import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tasks: [
        {
          id: 1,
          title: "Design Kanban UI",
          priority : "low",
          assignedTo: "Ratan",
          dueDate: "2024-09-20",
          status: "Planning",
        },
        {
          id: 2,
          title: "Implement Task Modal",
          priority : "low",
          assignedTo: "Jarvis",
          dueDate: "2024-08-21",
          status: "Completed",
        },
        {
          id: 3,
          title: "Implement Task Modal 1",
          priority : "medium",
          assignedTo: "John",
          dueDate: "2024-09-24",
          status: "Started",
        },
        {
          id: 4,
          title: "Implement Task Modal 2",
          priority : "high",
          assignedTo: "Johnny",
          dueDate: "2024-09-01",
          status: "Completed",
        },
        {
          id: 5,
          title: "Implement Task Modal 3",
          priority : "low",
          assignedTo: "Josh",
          dueDate: "2024-07-11",
          status: "Planning",
        },
      ],
}

const taskSlicer = createSlice({
    name : 'task',
    initialState ,
    reducers : {
        addTask : (state, action) => {
            console.log(action.payload);
            state.tasks.push(action.payload);
        },
        updateTask : (state , action) => {
            const { id , ...updatedTaskData} = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id == id);
            if(state.tasks[taskIndex]){
              state.tasks[taskIndex] = {
                ...state.tasks[taskIndex],
                ...updatedTaskData
              }
            }
           
        },
        removeTask : (state , action) => {
            state.tasks = state.filter((task)=> task.id != action.payload.id);
        }
    }
});



export const {addTask , updateTask , removeTask} = taskSlicer.actions;

export default taskSlicer.reducer