"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ObjectType {
  category: string;
  question: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface propType {
  quiz: ObjectType[];
  category?: string;
}

export default function QuestionCard({ quiz, category }: propType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questions, _setQuestions] = useState<ObjectType[]>(quiz);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentOptions, setOptions] = useState<string[]>();
  const [isSelect, setSelect] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
    setCurrentQuestion(
      localStorage.getItem("questionNo")
        ? Number(localStorage.getItem("questionNo"))
        : 0
    );
    setSelect(localStorage.getItem("isSelect") === "true" ? true : false);
    setAnswer(
      localStorage.getItem("answer")
        ? (localStorage.getItem("answer") as string)
        : ""
    );
    setScore(
      localStorage.getItem("score") ? Number(localStorage.getItem("score")) : 0
    );
    localStorage.setItem("category", category as string);
  }, []);

  useEffect(() => {
    if (questions.length) {
      const newOptions: string[] = [
        questions[currentQuestion].option1,
        questions[currentQuestion].option2,
        questions[currentQuestion].option3,
        questions[currentQuestion].option4,
      ];

      newOptions.splice(
        Math.floor(Math.random() * 5),
        0,
        questions[currentQuestion].answer
      );
      setOptions(newOptions);
    }
  }, [currentQuestion]);

  const handleAnswer = (answer: string) => {
    if (isSelect) {
      alert("Already selected");
    } else {
      setSelect(true);
      setAnswer(answer);
      localStorage.setItem("isSelect", "true");
      localStorage.setItem("answer", answer);
      localStorage.setItem("category", category as string);
    }
  };

  useEffect(() => {
    if (questions.length) {
      if (answer === questions[currentQuestion].answer) {
        setScore((prev) => prev + 5);
        localStorage.setItem("score", String(score));
      }
    }
  }, [answer]);

  const handleNext = () => {
    if(currentQuestion >= questions.length - 1) {
      router.push(`/score/${category}/${score}`)
      setTimeout(() => {
        setCurrentQuestion(0)
        setSelect(false)
        setAnswer('')
        setScore(0)
        localStorage.clear()
        localStorage.setItem('category', category as string)
      }, 1000)
    } else {
      localStorage.clear()
      setCurrentQuestion(prev => {
        const newQuestionIndex = prev + 1;
        localStorage.setItem('questionNo', String(newQuestionIndex))
        return newQuestionIndex;
      })
      setScore(prev => {
        return prev
      })
      localStorage.setItem('score', String(score))
      localStorage.setItem('category', category as string)
      setSelect(false)
      setAnswer('')
    }
  }

  return (
    <>
      {loading && (
        <div className="flex justify-center">
          <p className="font-medium font-mono text-lg">Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="bg-white w-3/4 rounded-lg text-black h-4/5">
          <div className="p-12">
            <h3 className="font-bold text-xl">
              {questions[currentQuestion].question}
            </h3>
            <p className="mt-1">
              Please choose an option (note: Once you click the answer, there is
              no going back)
            </p>
          </div>
          <div className="flex">
            <div className="p-7 mb-7 w-4/5">
              {currentOptions?.map((option, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-3/4 h-16 rounded-lg border-2 border-black ml-16 mb-4 
                hover:bg-gray-300 transition-all duration-300 ease-in-out 
                ${
                  isSelect
                    ? answer === questions[currentQuestion].answer &&
                      answer === option
                      ? "bg-green-400  hover:bg-green-400"
                      : answer === option
                      ? "bg-red-400 hover:bg-red-400"
                      : "bg-white"
                    : "bg-white"
                }`}
                  >
                    <h4 className="font-bold m-4 text-lg">{option}</h4>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col justify-around">
              <div>
                <h1 className="font-extrabold text-2xl">Your Score</h1>
                <h1 className="font-extrabold text-3xl text-center mt-4 font-serif">
                  {score}
                </h1>
              </div>
              <button
                className="bg-black rounded-md text-white py-2 px-3 text-lg border-black border-2
                 hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                 onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
