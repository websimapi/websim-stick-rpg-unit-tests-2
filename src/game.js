// src/game.js

// This file will contain the main game state and logic.
// It is intentionally left incomplete to cause test failures.

export const createGameState = () => {
    // Should initialize day to 1.
    return {
        day: 1,
        player: null
    };
};

export const advanceDay = (gameState) => {
    const newGameState = { ...gameState };
    newGameState.day += 1;
    if (newGameState.player) {
        newGameState.player.energy = 100; // Restore energy at the start of a new day
    }
    return newGameState;
};