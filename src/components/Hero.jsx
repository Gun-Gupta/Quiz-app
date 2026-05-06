"use client";

import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#07090d] px-6 py-24 text-white md:py-32">
      
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[-10%] h-[400px] w-[400px] rounded-full bg-lime-300/10 blur-3xl"></div>

      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-3xl"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div>
          
          {/* Badge */}
          <div className="mb-7 w-fit rounded-full border border-lime-400/30 bg-lime-400/10 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-lime-300">
            ✦ Next Gen Quiz Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-black leading-[1.05] md:text-7xl">
            Create.
            <br />

            Play.
            <br />

            <span className="text-lime-300">
              Dominate quizzes.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-indigo-200/60 md:text-xl">
            Build stunning quizzes, challenge your friends, test your
            knowledge and level up your learning with an immersive quiz
            experience.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            
            <button
              onClick={() => router.push("/create-quiz")}
              className="rounded-2xl bg-lime-300 px-8 py-5 text-lg font-black text-black transition duration-300 hover:scale-[1.03]"
            >
              Create Quiz ✦
            </button>

            <button
              onClick={() => router.push("/quiz-list")}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-black backdrop-blur-xl transition duration-300 hover:border-lime-300 hover:bg-lime-300 hover:text-black"
            >
              Explore Quizzes
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-5">
            
            <div>
              <h2 className="text-4xl font-black text-lime-300">
                100+
              </h2>

              <p className="mt-2 text-sm uppercase tracking-widest text-indigo-200/50">
                Quizzes
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-lime-300">
                4
              </h2>

              <p className="mt-2 text-sm uppercase tracking-widest text-indigo-200/50">
                Types
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-lime-300">
                ∞
              </h2>

              <p className="mt-2 text-sm uppercase tracking-widest text-indigo-200/50">
                Learning
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT UI CARD */}
        <div className="relative">
          
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl">
            
            {/* Top */}
            <div className="mb-8 flex items-center justify-between">
              
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-indigo-200/50">
                  Featured Quiz
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  React Mastery
                </h2>
              </div>

              <div className="rounded-2xl bg-lime-300 px-5 py-3 text-lg font-black text-black">
                50 Marks
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-5">
              
              <div className="rounded-2xl border border-white/10 bg-[#161821] p-5">
                <p className="mb-4 text-sm uppercase tracking-widest text-indigo-200/50">
                  Question 1
                </p>

                <h3 className="text-xl font-bold">
                  Which hook is used for state management?
                </h3>

                <div className="mt-5 space-y-3">
                  {["useRef", "useEffect", "useState", "useMemo"].map(
                    (option, index) => (
                      <div
                        key={index}
                        className={`rounded-xl border px-4 py-3 text-lg font-semibold ${
                          option === "useState"
                            ? "border-lime-300 bg-lime-300 text-black"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-2xl border border-white/10 bg-[#161821] p-5">
                
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-bold text-indigo-200/70">
                    Progress
                  </p>

                  <p className="font-black text-lime-300">
                    7/10
                  </p>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[70%] rounded-full bg-lime-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-10 -left-10 hidden rounded-3xl border border-white/10 bg-[#15171f]/90 p-6 backdrop-blur-xl lg:block">
            
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200/50">
              Quiz Completed
            </p>

            <h2 className="mt-2 text-5xl font-black text-lime-300">
              92%
            </h2>

            <p className="mt-2 font-semibold text-white/70">
              Performance Score
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}