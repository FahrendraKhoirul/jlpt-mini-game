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
      <footer className="h-16 flex items-center justify-center border-t-3 border-gray-400 bg-white text-gray-600 text-sm">
        © 2026 Japanese Word Mini Game • Built with React & Tailwind
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
