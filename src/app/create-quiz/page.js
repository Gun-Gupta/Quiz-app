"use client";

import { useState } from "react";

export default function CreateQuizPage() {
  const categories = [
    "Programming",
    "React",
    "JavaScript",
    "HTML & CSS",
    "Science",
    "Maths",
    "General Knowledge",
    "Aptitude",
    "English",
    "Other"
  ];

  const questionTypes = [
    "Single Answer",
    "Multiple Answer",
    "Fill in the blanks",
    "True/False",
  ];

  const emptyQuestion = {
    questionText: "",
    questionType: "Single Answer",
    options: ["", "", "", ""],
    correctAnswer: "",
    questionMarks: "",
  };

  const [quiz, setQuiz] = useState({
    title: "",
    category: "",
    totalMarks: "",
    questions: [emptyQuestion],
  });

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const updated = [...quiz.questions];
    updated[index][e.target.name] = e.target.value;

    if (e.target.name === "questionType") {
      updated[index].correctAnswer =
        e.target.value === "Multiple Answer" ? [] : "";
    }

    setQuiz({ ...quiz, questions: updated });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...quiz.questions];
    updated[qIndex].options[optIndex] = value;
    setQuiz({ ...quiz, questions: updated });
  };

  const handleMultipleAnswer = (qIndex, option) => {
    if (!option.trim()) return;

    const updated = [...quiz.questions];
    let answers = updated[qIndex].correctAnswer || [];

    if (answers.includes(option)) {
      answers = answers.filter((ans) => ans !== option);
    } else {
      answers = [...answers, option];
    }

    updated[qIndex].correctAnswer = answers;
    setQuiz({ ...quiz, questions: updated });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { ...emptyQuestion }],
    });
  };

  const submitQuiz = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    });

    if (res.ok) {
      alert("Quiz created successfully ✅");

      setQuiz({
        title: "",
        category: "",
        totalMarks: "",
        questions: [{ ...emptyQuestion }],
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#07090d] px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mx-auto mb-8 w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-7 py-3 text-sm font-black uppercase tracking-[0.18em] text-lime-300">
            ✦ Quiz Builder
          </div>

          <h1 className="text-6xl font-black leading-tight md:text-7xl">
            Make ur quiz
            <br />
            <span className="text-lime-300">no cap.</span>
          </h1>

          <p className="mt-5 text-xl text-indigo-200/60">
            Add questions, options, and correct answers. It's giving smart.
          </p>
        </div>

        <form onSubmit={submitQuiz} className="mt-16 space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-[#101018] p-8 md:p-12">
            <div className="grid gap-6 md:grid-cols-3">
              <Field label="Quiz Title">
                <input
                  name="title"
                  value={quiz.title}
                  onChange={handleQuizChange}
                  placeholder="React Basics or smth"
                  className="input-style"
                  required
                />
              </Field>

              <Field label="Category">
                <select
                  name="category"
                  value={quiz.category}
                  onChange={handleQuizChange}
                  className="input-style"
                  required
                >
                  <option value="">Pick one ↓</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Total Marks">
                <input
                  name="totalMarks"
                  type="number"
                  value={quiz.totalMarks}
                  onChange={handleQuizChange}
                  placeholder="100"
                  className="input-style"
                  required
                />
              </Field>
            </div>
          </div>

          <p className="text-right text-indigo-200/60">
            Questions:{" "}
            <span className="font-black text-lime-300">
              {quiz.questions.length}
            </span>
          </p>

          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className="rounded-[2rem] border border-white/10 bg-[#101018] p-8 md:p-10"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-2xl font-black text-black">
                  {i + 1}
                </div>
                <h2 className="text-lg font-black text-indigo-200/60">
                  {q.questionType}
                </h2>
              </div>

              <textarea
                name="questionText"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(i, e)}
                placeholder="Ask something fire..."
                className="input-style min-h-36 resize-none"
                required
              />

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Field label="Type">
                  <select
                    name="questionType"
                    value={q.questionType}
                    onChange={(e) => handleQuestionChange(i, e)}
                    className="input-style"
                  >
                    {questionTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Marks">
                  <input
                    name="questionMarks"
                    type="number"
                    value={q.questionMarks}
                    onChange={(e) => handleQuestionChange(i, e)}
                    placeholder="5"
                    className="input-style"
                    required
                  />
                </Field>
              </div>

              {(q.questionType === "Single Answer" ||
                q.questionType === "Multiple Answer") && (
                <>
                  <Divider />

                  <Field label="Options">
                    <div className="grid gap-4 md:grid-cols-2">
                      {q.options.map((opt, idx) => (
                        <div key={idx} className="relative">
                          <span className="absolute left-5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-200/60 text-xs text-indigo-200/70">
                            {idx + 1}
                          </span>

                          <input
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(i, idx, e.target.value)
                            }
                            placeholder={`Option ${idx + 1}`}
                            className="input-style pl-12"
                          />
                        </div>
                      ))}
                    </div>
                  </Field>
                </>
              )}

              <Divider />

              <Field label="Correct Answer">
                {q.questionType === "Multiple Answer" ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {q.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-[#30302d] px-5 py-4 text-lg font-semibold text-white"
                      >
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(q.correctAnswer) &&
                            q.correctAnswer.includes(opt)
                          }
                          onChange={() => handleMultipleAnswer(i, opt)}
                        />
                        {opt || `Option ${idx + 1}`}
                      </label>
                    ))}
                  </div>
                ) : q.questionType === "True/False" ? (
                  <select
                    name="correctAnswer"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(i, e)}
                    className="input-style"
                    required
                  >
                    <option value="">Choose True or False</option>
                    <option>True</option>
                    <option>False</option>
                  </select>
                ) : (
                  <input
                    name="correctAnswer"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(i, e)}
                    placeholder="Type the answer..."
                    className="input-style"
                    required
                  />
                )}
              </Field>
            </div>
          ))}

          <div className="grid gap-5 md:grid-cols-[250px_1fr]">
            <button
              type="button"
              onClick={addQuestion}
              className="rounded-xl border border-white/30 px-6 py-4 text-xl font-black transition hover:border-lime-300 hover:bg-lime-300 hover:text-black"
            >
              + Add Question
            </button>

            <button
              type="submit"
              className="rounded-xl border border-white/30 px-6 py-4 text-xl font-black transition hover:border-lime-300 hover:bg-lime-300 hover:text-black"
            >
              Ship it ✦
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-indigo-200/60">
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-8 h-px w-full bg-white/10" />;
}