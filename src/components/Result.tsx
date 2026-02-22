import type { WordResponse } from "../types/word_response";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  questionWord?: WordResponse;
  selectedWord?: WordResponse;
}

export default function Result({
  isOpen,
  onClose,
  questionWord,
  selectedWord,
}: Props) {
  const isCorrect = questionWord?.meaning === selectedWord?.meaning;
  return (
    <Modal isOpen={isOpen}>
      <div className="text-center flex flex-col items-center">
        <h2
          className={`text-4xl font-black mb-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}
        >
          {isCorrect ? "✅ Correct!" : "❌ Wrong!"}
        </h2>

        <div className="mb-8 mt-6 w-full flex flex-col items-center">
          <p className="text-gray-500 font-bold mb-6">The word was</p>
          <div className="flex flex-col gap-4 items-center mb-6">
            <p className="text-5xl/16 text-black font-black underline decoration-dashed underline-offset-8">
              {questionWord?.furigana !== ""
                ? questionWord?.furigana
                : questionWord?.word}
            </p>
            <p className="text-2xl text-black font-bold text-gray-700">
              {questionWord?.romaji}
            </p>
            {questionWord?.word !== questionWord?.furigana && (
              <p className="text-xl text-gray-500 font-bold mt-2">
                Kanji: {questionWord?.word}
              </p>
            )}
          </div>
          <p className="text-xl text-sky-500 font-black">
            {questionWord?.meaning}
          </p>
        </div>

        {!isCorrect && (
          <div className="w-full bg-red-50 p-4 rounded-2xl mb-8 border-2 border-red-200">
            <p className="text-red-500 font-bold mb-1 text-sm">You selected</p>
            <p className="font-black text-red-600 text-lg">
              {selectedWord?.meaning}
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full font-bold text-gray-600 border-gray-400 border-2 rounded-2xl bg-white shadow-[0_4px_0_0_rgba(0,0,0,0.3)] p-4 active:translate-y-[4px] active:shadow-none transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_8px_0_0_rgba(0,0,0,0.4)] hover:text-gray-800"
        >
          Next Question ➔
        </button>
      </div>
    </Modal>
  );
}
