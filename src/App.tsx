import "./App.css";
import { useGameJLPT } from "./hooks/useGameJLPT";

function App() {
  const {
    words,
    initialLoading,
    questionLoading,
    currentWordIndex,
    options,
    score,
    handleAnswer,
  } = useGameJLPT();
  if (initialLoading) return <p>Loading...</p>;

  return (
    <div className="h-screen flex flex-col bg-white w-screen">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex p-8 overflow-hidden">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex justify-center place-items-center">
          {/* MAKE COLUMN TO CENTERIZE CONTENT  */}
          <div className="flex flex-col space-y-1 text-center ">
            <p className="text-3xl font-bold text-black mb-2">
              Japanese Word Mini Game🇯🇵
            </p>
            <iframe src="https://lottie.host/embed/ef1e4243-480d-4393-bc11-675c63fd12a9/KR3CMmLqro.lottie"></iframe>
            <p className="text-black text-2xl font-bold">{score} STREAK</p>
          </div>
        </div>
        {/* RIGH COLUMN */}
        <div className="flex-1  flex items-center justify-center">
          <div className="flex-1 flex-col space-y-1 text-center">
            <p className="text-5xl text-black font-black underline decoration-dashed underline-offset-8">
              {words[currentWordIndex!].furigana}
            </p>
            <div className="mt-8">
              {questionLoading ? (
                <p>Loading Question...</p>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-2">
                    {options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.meaning)}
                        className="font-semibold text-gray-500 border-gray-400 border-2 rounded-xl bg-white border shadow-[0_2px_0_0_rgba(0,0,0,0.3)] p-2 active:translate-y-[6px] active:shadow-none transition-all
duration-150 hover:-translate-y-1
hover:shadow-[0_8px_0_0_rgba(0,0,0,0.5)] hover:text-gray-700 hover:border-gray-700 
"
                      >
                        {option.meaning}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <footer className="h-16 flex flex-col items-center justify-center border-t-3 border-gray-400 bg-white text-gray-600 text-sm">
        <p className="mb-2 font-semibold">2026 · by Fahrendra Khoirul</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/fahrendra-khoirul-ihtada/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sky-500 hover:text-sky-600 transition-colors duration-150 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.99V9h3.114v1.562h.044c.434-.823 1.494-1.69 3.074-1.69 3.287 0 3.895 2.163 3.895 4.977v6.603zM5.337 7.433a1.806 1.806 0 1 1 0-3.612 1.806 1.806 0 0 1 0 3.612zm1.559 13.019H3.779V9h3.117v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/FahrendraKhoirul"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors duration-150 font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );

  // <div className="h-screen w-screen shadow flex flex-col overflow-hidden bg-slate-100">
  //   {/* HEADER */}
  //   <header className="h-16 bg-slate-100 flex items-center justify-between px-6 border-b">
  //     <h1 className="font-bold text-gray-800">Japan Vocab Mini Game 🇯🇵</h1>
  //     <div>Profile</div>
  //   </header>

  //   {/* MAIN */}
  //   <main className="flex-1 flex overflow-hidden">
  //     {/* LEFT */}
  //     <div className="w-[40%] bg-slate-50 flex items-center justify-center">
  //       LEFT PANEL
  //     </div>

  //     {/* RIGHT */}
  //     <div className="flex-1 flex items-center justify-center">GAME AREA</div>
  //   </main>

  //   {/* FOOTER */}
  //   <footer className="h-12 border-t flex items-center justify-center text-sm text-gray-500">
  //     © Nihongo Quest
  //   </footer>
  // </div>
  // );
}

export default App;

// return (
//     <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
//         <h1 className='text-5xl text-gray-800 font-bold'>JLPT Mini Game 🇯🇵</h1>
//         <div className="mb-6">
//           <span className="bg-orange-500 text-white px-4 py-1 rounded-full font-semibold">
//             🔥 Streak {score}
//           </span>
//         </div>
//         <div>
//           {questionLoading ? <p>Loading Question...</p> : (
//             <><div className="mb-8">
//               <p className="text-5xl font-bold text-gray-900">
//                 {words[currentWordIndex!].word}
//               </p>
//               <p className="text-gray-500 mt-2">
//                 {words[currentWordIndex!].furigana}
//               </p>
//             </div>
//             <div className="flex flex-wrap justify-center gap-3">
//               {options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleAnswer(option.meaning)}
//                   className="bg-gray-100 hover:bg-orange-500 hover:text-white transition-all duration-200 p-3 rounded-xl font-medium"
//                 >
//                   {option.meaning}
//                 </button>
//               ))}
//             </div>
//           </>
//           )}
//         </div>
//       </div>
//   )
