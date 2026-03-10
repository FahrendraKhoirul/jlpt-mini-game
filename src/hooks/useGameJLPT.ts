import { useEffect, useState } from "react";
import { getWordsByLevel } from "../services/jlptApi";
import type { WordResponse } from "../types/word_response";
import { useSessionGame } from "./useSessionGame";

const STREAK_PER_LEVEL = 20;
const MAX_LEVEL = 1; // N1 is the hardest (lowest number)

export function useGameJLPT() {
  const [words, setWords] = useState<WordResponse[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionWordIndex, setQuestionWordIndex] = useState<number | null>(
    null,
  );
  const [options, setOptions] = useState<WordResponse[]>([]);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordResponse>();
  const [questionWord, setQuestionWord] = useState<WordResponse>();
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState<number | null>(null);
  const [isHideRomaji, setIsHideRomaji] = useState(false);

  const { gameStats, updateStats } = useSessionGame();

  // Initialize: load saved level and increment gamesPlayed
  useEffect(() => {
    const savedLevel = gameStats.highestLevel;
    if (savedLevel >= MAX_LEVEL && savedLevel <= 5) {
      setCurrentLevel(savedLevel);
    }
    updateStats((prev) => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      lastPlayedAt: new Date().toISOString(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch words on mount and whenever level changes
  useEffect(() => {
    setInitialLoading(true);
    getWords(currentLevel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  const getWords = (level: number) => {
    setQuestionLoading(true);
    getWordsByLevel(level).then((w) => {
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

  const handleAnswer = (selected: WordResponse) => {
    setSelectedWord(selected);
    setLeveledUp(false);
    setNewLevel(null);

    const isCorrect = selected.meaning === words[questionWordIndex!].meaning;

    if (isCorrect) {
      const nextScore = score + 1;
      setScore(nextScore);

      // Check for level-up: every STREAK_PER_LEVEL correct answers
      if (nextScore % STREAK_PER_LEVEL === 0 && currentLevel > MAX_LEVEL) {
        const nextLevel = currentLevel - 1;
        setCurrentLevel(nextLevel);
        setLeveledUp(true);
        setNewLevel(nextLevel);

        updateStats((prev) => ({
          ...prev,
          totalWordsPlayed: prev.totalWordsPlayed + 1,
          totalCorrectAnswers: prev.totalCorrectAnswers + 1,
          highestStreak: Math.max(prev.highestStreak, nextScore),
          highestLevel: Math.min(prev.highestLevel, nextLevel),
          lastPlayedAt: new Date().toISOString(),
        }));
      } else {
        updateStats((prev) => ({
          ...prev,
          totalWordsPlayed: prev.totalWordsPlayed + 1,
          totalCorrectAnswers: prev.totalCorrectAnswers + 1,
          highestStreak: Math.max(prev.highestStreak, nextScore),
          lastPlayedAt: new Date().toISOString(),
        }));
      }
    } else {
      setScore(0);
      updateStats((prev) => ({
        ...prev,
        totalWordsPlayed: prev.totalWordsPlayed + 1,
        totalWrongAnswers: prev.totalWrongAnswers + 1,
        lastPlayedAt: new Date().toISOString(),
      }));
    }

    setIsModalOpen(true);
  };

  const handleNextQuestion = () => {
    setIsModalOpen(false);
    setLeveledUp(false);
    setNewLevel(null);
    getWords(currentLevel);
  };

  const toggleHideRomaji = () => {
    setIsHideRomaji(!isHideRomaji);
  };

  return {
    words,
    initialLoading,
    questionLoading,
    questionWordIndex,
    options,
    score,
    currentLevel,
    isModalOpen,
    handleAnswer,
    handleNextQuestion,
    selectedWord,
    questionWord,
    gameStats,
    leveledUp,
    newLevel,
    isHideRomaji,
    toggleHideRomaji,
  };
}
