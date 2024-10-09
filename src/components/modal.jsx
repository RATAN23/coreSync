import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import {
  parseDate
} from "@internationalized/date";
import "../App.css";
import { people } from "../../public/people";
import { sections } from "../../public/sections";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../reducers/taskReducer";
import { nanoid } from 'nanoid'

const Modal = ({
  id,
  dueDate,
  title: initialTitle,
  assignedTo,
  status,
  handleClose = () => {},
  type
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [dropDownNames, setDropDownNames] = useState(false);
  const [dropDownStatus, setDropDownStatus] = useState(false);
  const [selectedName, setSelectedName] = useState(assignedTo);
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [date, setDate] = useState(parseDate(dueDate));
  const dispatch = useDispatch();

  const sendUpdate = () => {
    const dateVal = date;
    dataSent.dueDate =
      dateVal.year +
      "-" +
      (dateVal.month < 10 ? "0" + dateVal.month : dateVal.month) +
      "-" +
      (dateVal.day < 10 ? "0" + dateVal.day : dateVal.day);
    dispatch(type ? addTask(dataSent) :updateTask(dataSent));
    handleClose();
  };

  const dataSent = {
    id: id != undefined ? id : nanoid(),
    title: title,
    assignedTo: selectedName,
    status: selectedStatus,
    dueDate: "",
  };
  
  const namesRef = useRef(null);
  const statusRef = useRef(null);

  const handleDateChange = (val) => {
    setDate(val);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleDropDown = (dropdown) => {
    if (dropdown === "names") {
      setDropDownNames(!dropDownNames);
      setDropDownStatus(false);
    } else if (dropdown === "status") {
      setDropDownStatus(!dropDownStatus);
      setDropDownNames(false);
    }
  };

  const handleNameSelection = (name) => {
    setSelectedName(name);
    setDropDownNames(false);
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
    setDropDownStatus(false);
  };

  const handleClickOutside = (event) => {
    if (namesRef.current && !namesRef.current.contains(event.target)) {
      setDropDownNames(false);
    }
    if (statusRef.current && !statusRef.current.contains(event.target)) {
      setDropDownStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="w-[300px] h-[400px] md:h-[400px] lg:h-1/2 md:w-[400px] lg:w-[500px] rounded-3xl bg-white/90 flex flex-col justify-around">
        <h1 className="flex justify-center items-center pt-2 text-3xl font-bold">
          Task
        </h1>
        <div className="flex justify-center p-2 ml-3">
          <input
            className="w-full rounded-2xl p-2 border-2 border-black/40"
            type="text"
            placeholder={title == "" ? "Editing the task" : undefined}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="relative p-3 flex items-center">
          <DatePicker
            label="Due Date"
            minValue={date}
            defaultValue={date}
            className="absolute left-5 w-[150px] rounded-2xl border-2 border-gray-400"
            color="default"
            onChange={(value) => {
              handleDateChange(value);
            }}
          />
          <div className="relative ml-auto" ref={statusRef}>
            <button
              className="w-28 h-10 rounded-2xl border-2 border-black/40 flex items-center justify-between px-2"
              onClick={() => toggleDropDown("status")}
            >
              <span className="text-black">
                {" "}
                {selectedStatus !== ""
                  ? selectedStatus
                  : status !== ""
                  ? status
                  : "Status"}
              </span>
              <svg
                className="w-4 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="gray" strokeWidth="1.5" d="m1 1 4 4 4-4"></path>
              </svg>
            </button>
            {dropDownStatus && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {sections.map((val, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleStatusSelection(val.status);
                      }}
                    >
                      {val.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="relative p-3 flex items-center">
          <div className="relative ml-auto" ref={namesRef}>
            <button
              className="w-40 h-10 rounded-2xl border-2 border-black/40 flex items-center justify-between px-2"
              onClick={() => toggleDropDown("names")}
            >
              <span className="text-black">
                {selectedName || assignedTo || "Assigned to"}
              </span>
              <svg
                className="w-4 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="gray"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m1 1 4 4 4-4"
                ></path>
              </svg>
            </button>
            {dropDownNames && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul className="max-h-16 overflow-y-auto scroll-m-4 snap-mandatory drop-down-fade">
                  {people.map((val) => (
                    <li
                      key={val.id}
                      onClick={() => {
                        handleNameSelection(val.name);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {val.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex gap-3">
          <button
            className="w-20 h-10 rounded-2xl bg-blue-600 text-white"
            onClick={() => sendUpdate()}
          >
            Save
          </button>
          <button
            className="w-20 h-10 rounded-2xl bg-blue-600 text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
