import React, { useEffect } from 'react'
import { User } from 'lucide-react';
import { useRef , useState } from 'react';
import Modal from './modal';
import { parseDate} from "@internationalized/date";

const Card = ({title = "Hello" , assignedTo = "Ratan" , dueDate = "" , onClick = () => {}}) => {
 
  const handleClick = () => {
    onClick();
  }

  return (
      <div className="w-full h-1/2" onClick={handleClick}>
      <div className="w-[300px] h-[130px] relative border-2 border-black/40 flex flex-col rounded-2xl ">
        <span className="text-2xl p-2 text-pretty overflow-auto max-h-[6rem]">{title} </span>
        <div className="p-2">
          <label className="text-xl mr-2">Due:</label>
          <span>{dueDate.toString()}</span>
        </div>
        <div className="mt-auto ml-auto m-2   flex justify-center items-center">
          <span className="text-xl mr-2">{assignedTo}</span>
          <User size={25}/>
        </div>
      </div>
    </div>
   
  )
}

export default Card
