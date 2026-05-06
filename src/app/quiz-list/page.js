"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("http://localhost:5000/quizzes");
      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/quizzes/${id}`, {
      method: "DELETE",
    });

    fetchQuizzes();
  };

  return (
    <main className="min-h-screen bg-[#07090d] px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mx-auto mb-6 w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-6 py-2 text-sm font-black uppercase tracking-[0.2em] text-lime-300">
            ✦ Quiz Library
          </div>

          <h1 className="text-5xl font-black md:text-6xl">
            Pick a quiz &
            <span className="text-lime-300"> flex ur brain.</span>
          </h1>

          <p className="mt-4 text-lg text-indigo-200/60">
            Attempt quizzes, test your knowledge and level up.
          </p>
        </div>

        {quizzes.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-[#101018] p-16 text-center">
            <h2 className="text-3xl font-black text-white">
              No quizzes found 😭
            </h2>

            <p className="mt-3 text-indigo-200/60">
              Create a new quiz first.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="group rounded-[2rem] border border-white/10 bg-[#101018] p-7 transition duration-300 hover:-translate-y-2 hover:border-lime-300/40"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-lime-300/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-lime-300">
                    {quiz.category}
                  </span>

                  <span className="text-sm font-bold text-indigo-200/60">
                    {quiz.questions.length} Questions
                  </span>
                </div>

                <h2 className="text-3xl font-black leading-tight">
                  {quiz.title}
                </h2>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#1b1b25] px-4 py-3">
                    <span className="text-indigo-200/60">
                      Total Marks
                    </span>

                    <span className="text-xl font-black text-lime-300">
                      {quiz.totalMarks}
                    </span>
                  </div>

                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="flex items-center justify-center rounded-xl bg-lime-300 px-5 py-4 text-lg font-black text-black transition hover:scale-[1.02]"
                  >
                    Attempt
                  </Link>

                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-lg font-black text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}