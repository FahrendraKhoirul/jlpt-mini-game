import { useCallback, useEffect, useState } from "react";
import type { GameStats } from "../types/game_stats";

const STORAGE_KEY = "jlptMiniGameStats";

const DEFAULT_STATS: GameStats = {
  totalWordsPlayed: 0,
  highestStreak: 0,
  highestLevel: 5,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  gamesPlayed: 0,
  lastPlayedAt: new Date().toISOString(),
};

export function useSessionGame() {
  const [gameStats, setGameStats] = useState<GameStats>(DEFAULT_STATS);

  // Load from localStorage on mount
  useEffect(() => {
    const storedStats = localStorage.getItem(STORAGE_KEY);
    if (storedStats) {
      try {
        setGameStats(JSON.parse(storedStats));
      } catch {
        // If corrupted, use defaults
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Persist to localStorage whenever gameStats changes
  const saveStats = useCallback((updatedStats: GameStats) => {
    setGameStats(updatedStats);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  }, []);

  const updateStats = useCallback((updater: (prev: GameStats) => GameStats) => {
    setGameStats((prev) => {
      const updated = updater(prev);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    gameStats,
    saveStats,
    updateStats,
  };
}
