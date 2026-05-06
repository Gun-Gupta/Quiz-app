"use client";

import { use, useEffect, useState } from "react";

export default function QuizAttemptPage({ params }) {
  const { id } = use(params);

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!quiz) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090d] text-white">
        <h1 className="text-3xl font-black">Loading Quiz...</h1>
      </main>
    );
  }

  const question = quiz.questions[currentQuestion];

  const handleSingleAnswer = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });
  };

  const handleTextAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    });
  };

  const handleMultipleAnswer = (option) => {
    let selectedAnswers = answers[currentQuestion] || [];

    if (selectedAnswers.includes(option)) {
      selectedAnswers = selectedAnswers.filter((ans) => ans !== option);
    } else {
      selectedAnswers = [...selectedAnswers, option];
    }

    setAnswers({
      ...answers,
      [currentQuestion]: selectedAnswers,
    });
  };

  const checkMultipleAnswer = (userAnswer = [], correctAnswer = []) => {
    return (
      JSON.stringify([...userAnswer].sort()) ===
      JSON.stringify([...correctAnswer].sort())
    );
  };

  const submitQuiz = () => {
    let finalScore = 0;

    quiz.questions.forEach((q, index) => {
      const userAnswer = answers[index];

      if (q.questionType === "Multiple Answer") {
        if (checkMultipleAnswer(userAnswer || [], q.correctAnswer || [])) {
          finalScore += Number(q.questionMarks);
        }
      } else {
        if (
          String(userAnswer || "")
            .trim()
            .toLowerCase() ===
          String(q.correctAnswer || "")
            .trim()
            .toLowerCase()
        ) {
          finalScore += Number(q.questionMarks);
        }
      }
    });

    setScore(finalScore);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090d] px-6 text-white">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#101018] p-12 text-center shadow-2xl">
          <div className="mx-auto mb-6 w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-6 py-2 text-sm font-black uppercase tracking-[0.2em] text-lime-300">
            ✦ Result
          </div>

          <h1 className="text-7xl font-black text-lime-300">{score}</h1>

          <p className="mt-4 text-2xl font-bold text-indigo-200/70">
            out of {quiz.totalMarks}
          </p>

          <h2 className="mt-8 text-4xl font-black">Quiz Submitted 🎉</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07090d] px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-lime-300">
              {quiz.category}
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              {quiz.title}
            </h1>

            <p className="mt-3 text-lg text-indigo-200/60">
              Attempt all questions and submit to see your score.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101018] px-8 py-5 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-200/60">
              Question
            </p>

            <h2 className="text-4xl font-black text-lime-300">
              {currentQuestion + 1}/{quiz.questions.length}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-[#101018] p-6">
            <h2 className="mb-5 text-xl font-black">Questions</h2>

            <div className="grid grid-cols-5 gap-3 lg:grid-cols-3">
              {quiz.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`h-12 rounded-xl font-black transition ${
                    currentQuestion === index
                      ? "bg-lime-300 text-black"
                      : answers[index]
                      ? "bg-indigo-500 text-white"
                      : "bg-[#1d1d28] text-indigo-200/70"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </aside>

          <div className="rounded-[2rem] border border-white/10 bg-[#101018] p-8 md:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="rounded-xl bg-lime-300 px-4 py-2 text-lg font-black text-black">
                Q{currentQuestion + 1}
              </span>

              <span className="rounded-full border border-white/10 bg-[#1d1d28] px-5 py-2 text-sm font-black text-indigo-200/70">
                {question.questionType} • {question.questionMarks} marks
              </span>
            </div>

            <h2 className="text-3xl font-black leading-relaxed">
              {question.questionText}
            </h2>

            <div className="mt-10 space-y-4">
              {question.questionType === "Single Answer" &&
                question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 text-xl font-semibold transition ${
                      answers[currentQuestion] === option
                        ? "border-lime-300 bg-lime-300 text-black"
                        : "border-white/10 bg-[#1d1d28] hover:border-lime-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleSingleAnswer(option)}
                    />
                    {option}
                  </label>
                ))}

              {question.questionType === "Multiple Answer" &&
                question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-5 text-xl font-semibold transition ${
                      (answers[currentQuestion] || []).includes(option)
                        ? "border-lime-300 bg-lime-300 text-black"
                        : "border-white/10 bg-[#1d1d28] hover:border-lime-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={(answers[currentQuestion] || []).includes(
                        option
                      )}
                      onChange={() => handleMultipleAnswer(option)}
                    />
                    {option}
                  </label>
                ))}

              {question.questionType === "Fill in the blanks" && (
                <input
                  type="text"
                  value={answers[currentQuestion] || ""}
                  onChange={(e) => handleTextAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full rounded-2xl border border-white/10 bg-[#1d1d28] px-6 py-5 text-xl font-semibold outline-none placeholder:text-white/50 focus:border-lime-300"
                />
              )}

              {question.questionType === "True/False" && (
                <div className="grid gap-4 md:grid-cols-2">
                  {["True", "False"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSingleAnswer(option)}
                      className={`rounded-2xl border p-5 text-xl font-black transition ${
                        answers[currentQuestion] === option
                          ? "border-lime-300 bg-lime-300 text-black"
                          : "border-white/10 bg-[#1d1d28] hover:border-lime-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="rounded-xl border border-white/20 px-6 py-4 font-black transition hover:border-lime-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={submitQuiz}
                  className="rounded-xl bg-lime-300 px-8 py-4 font-black text-black transition hover:scale-[1.02]"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="rounded-xl bg-lime-300 px-8 py-4 font-black text-black transition hover:scale-[1.02]"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}