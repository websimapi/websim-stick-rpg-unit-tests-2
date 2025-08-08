// src/player.js

// This file will contain the Player class and related logic.
// For now, it's a placeholder to make tests fail.

export const createPlayer = (name) => {
    // This should return an object with stats, but it's empty for now.
    return {
        name: name,
        stats: {}, // Should have str, int, cha
        money: 0, // Should start with 100
        energy: 10, // Should start with 100
    };
};

export const trainStat = (player, stat) => {
    // This function should increase a player's stat.
    // It currently does nothing.
    return player;
};

export const workJob = (player, job) => {
    // This function should increase money and decrease energy.
    // It currently does nothing.
    return player;
};

