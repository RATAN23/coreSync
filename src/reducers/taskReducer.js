import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tasks: [
        {
          id: 1,
          title: "Design Kanban UI",
          assignedTo: "Ratan",
          dueDate: "2024-09-20",
          status: "Planning",
        },
        {
          id: 2,
          title: "Implement Task Modal",
          assignedTo: "Jarvis",
          dueDate: "2024-08-21",
          status: "Completed",
        },
        {
          id: 3,
          title: "Implement Task Modal 1",
          assignedTo: "John",
          dueDate: "2024-09-24",
          status: "Started",
        },
        {
          id: 4,
          title: "Implement Task Modal 2",
          assignedTo: "Johnny",
          dueDate: "2024-09-01",
          status: "Completed",
        },
        {
          id: 5,
          title: "Implement Task Modal 3",
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
            state.tasks.push(action.payload);
        },
        updateTask : (state , action) => {
            const { id , updatedTask} = action.payload;
            const taskIndex = state.tasks.filter((task) => task.id )
            if(taskIndex){
                state.tasks[taskIndex] = {...state.tasks[taskIndex] , ...updatedTask};
            }
        },
        removeTask : (state , action) => {
            state.tasks = state.filter((task)=> task.id != action.payload.id);
        }
    }
});



export const {addTask , updateTask , removeTask} = taskSlicer.actions;

export default taskSlicer.reducer