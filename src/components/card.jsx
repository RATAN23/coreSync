import React from 'react'
import { User } from 'lucide-react';

const Card = ({title = "" , assignedTo = "" , dueDate = "" , onClick = () => {} , priority = ""}) => {
  const handleClick = () => {
    onClick();
  }

  return (
    <div onClick={handleClick} className="mb-4">
      <div className="w-[250px] bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <span style={{backgroundColor :  priority === "low" ? "#7cfc00" : 
      priority === "medium" ? "#ff9913" : 
      priority === "high" ? "#ff2800" : ""}} 
      className='ml-3 px-2  rounded-md text-sm font-semibold'>{priority}</span>
        <div className="m-2 flex flex-col h-full">
          <h3 className="text-lg font-medium mb-2 line-clamp-2">{title}</h3>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Due:</span> {dueDate.toString()}
          </div>
          <div className="mt-auto flex justify-end items-center">
            <span className="text-sm mr-2 rounded-lg">{assignedTo}</span>
            <User size={30} className="text-gray-500 border-2 rounded-full border-gray-400" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card