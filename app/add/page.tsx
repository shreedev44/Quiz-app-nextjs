"use client";

import Navbar from "../components/Navbar";
import React, { useReducer } from "react";

interface stateType {
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  category: string;
}

interface actionType {
  type:
    | "category"
    | "question"
    | "answer"
    | "option1"
    | "option2"
    | "option3"
    | "option4"
    | "clear";
  payload: string;
}

function reducerFunction(prevState: stateType, action: actionType) {
  switch (action.type) {
    case "category":
      return { ...prevState, category: action.payload };
    case "question":
      return { ...prevState, question: action.payload };
    case "answer":
      return { ...prevState, answer: action.payload };
    case "option1":
      return { ...prevState, option1: action.payload };
    case "option2":
      return { ...prevState, option2: action.payload };
    case "option3":
      return { ...prevState, option3: action.payload };
    case "option4":
      return { ...prevState, option4: action.payload };
    case "clear":
      return {
        category: "",
        question: "",
        answer: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      };
    default:
      return prevState;
  }
}

export default function Add() {
  const [state, dispatch] = useReducer(reducerFunction, {
    category: "",
    question: "",
    answer: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    fetch("http://localhost:5000/add-question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    }).then(async (res) => {
        return await res.json()
    }).then((res) => {
        alert(res.message)
        dispatch({type: 'clear', payload: ''})
    }).catch((err) => {
        console.log(err)
    })
  }

  return (
    <>
      <Navbar />
      <div className="my-24 mx-28 flex flex-col bg-white rounded-lg text-black font-mono">
        <div className="flex">
          <span className="font-bold text-2xl m-4">Add Question</span>
        </div>
        <div className="flex flex-col mt-6">
          <div>
            <form action="#" onSubmit={handleSubmit}>
                <input
                type="text"
                className="w-2/3 h-12 mb-9 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Category"
                onChange={(event) => dispatch({type: "category", payload: event.target.value})}
                value={state.category}
                required
                />
                <input
                type="text"
                className="w-2/3 h-12 mb-9 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Question?"
                onChange={(event) => dispatch({type: "question", payload: event.target.value})}
                value={state.question}
                required
                />
                <input
                type="text"
                className="w-2/3 h-12 mb-5 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Answer"
                onChange={(event) => dispatch({type: "answer", payload: event.target.value})}
                value={state.answer}
                required
                />
                <hr className="w-2/3 ml-16 my-5 border-1 border-black" />
                <input
                type="text"
                className="w-2/3 h-12 mb-5 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Option 1"
                onChange={(event) => dispatch({type: "option1", payload: event.target.value})}
                value={state.option1}
                required
                />
                <input
                type="text"
                className="w-2/3 h-12 mb-5 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Option 2"
                onChange={(event) => dispatch({type: "option2", payload: event.target.value})}
                value={state.option2}
                required
                />
                <input
                type="text"
                className="w-2/3 h-12 mb-5 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Option 3"
                onChange={(event) => dispatch({type: "option3", payload: event.target.value})}
                value={state.option3}
                required
                />
                <input
                type="text"
                className="w-2/3 h-12 mb-5 border-2 border-black rounded-md ml-16 pl-4"
                placeholder="Option 4"
                onChange={(event) => dispatch({type: "option4", payload: event.target.value})}
                value={state.option4}
                required
                />
                <div className="flex justify-end w-2/3 mb-5">
                <button
                    className="bg-black rounded-md text-white py-2 px-3 text-lg border-black border-2
                        hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                >
                    Add Question
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
