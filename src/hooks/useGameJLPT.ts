import { useEffect, useState } from "react";
import { getWordsByLevel } from "../services/jlptApi";
import type { WordResponse } from "../types/word_response";

export function useGameJLPT() {
  const [words, setWords] = useState<WordResponse[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionWordIndex, setQuestionWordIndex] = useState<number | null>(
    null,
  );
  const [options, setOptions] = useState<WordResponse[]>([]);
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordResponse>();
  const [questionWord, setQuestionWord] = useState<WordResponse>();

  useEffect(() => {
    setInitialLoading(true);
    getWords();
  }, []);

  const getWords = () => {
    setQuestionLoading(true);
    getWordsByLevel().then((w) => {
      setWords(w);

      // select question word by random index
      const randIndex = Math.floor(Math.random() * w.length);
      const correctWord = w[randIndex];
      setQuestionWordIndex(randIndex);
      setQuestionWord(correctWord);

      // copy all words to options
      const newOptions: WordResponse[] = [...w];

      // shuffle options to randomize the correct answer position
      newOptions.sort(() => Math.random() - 0.5);

      // assign sorted options to state
      setOptions(newOptions);
      setQuestionLoading(false);
      setInitialLoading(false);
    });
  };

  const handleAnswer = (selectedWord: WordResponse) => {
    // Save the result to state
    setSelectedWord(selectedWord);
    // update score
    if (selectedWord.meaning === words[questionWordIndex!].meaning) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
    setIsModalOpen(true);
  };

  const handleNextQuestion = () => {
    setIsModalOpen(false);
    getWords();
  };

  return {
    words,
    initialLoading,
    questionLoading,
    questionWordIndex,
    options,
    score,
    isModalOpen,
    handleAnswer,
    handleNextQuestion,
    selectedWord,
    questionWord,
  };
}
