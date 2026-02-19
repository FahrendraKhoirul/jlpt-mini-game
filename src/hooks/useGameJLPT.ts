import { useEffect, useState } from "react";
import { getWordsByLevel } from "../services/jlptApi";
import type { WordResponse } from "../types/word_response";

export function useGameJLPT() {
    const [words, setWords] = useState<WordResponse[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [questionLoading, setQuestionLoading] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<WordResponse[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        setInitialLoading(true);
        getWords(1);
    }, []);

    const getWords = (level: number = 1) => {
        setQuestionLoading(true);
        getWordsByLevel(level).then(w => {
            setWords(w);
            setCurrentWordIndex(Math.floor(Math.random() * w.length));

            const options: WordResponse[] = [];
            while (options.length < 8) {
                const randomIndex = Math.floor(Math.random() * w.length);
                if (!options.includes(w[randomIndex])) {
                    options.push(w[randomIndex]);
                }
            }
            setOptions(options);
            setQuestionLoading(false);
            setInitialLoading(false);
        });
    };


    const handleAnswer = (meaning: string) => {
        if (meaning === words[currentWordIndex!].meaning) {
            setScore(score + 1);
        } else {
            setScore(0);
        }
        // get new word by 
        getWords(1);
    };


    return { words, initialLoading, questionLoading, currentWordIndex, options, score, handleAnswer };
}