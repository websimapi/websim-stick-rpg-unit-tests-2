// src/player.js

// This file will contain the Player class and related logic.
// For now, it's a placeholder to make tests fail.

export const createPlayer = (name) => {
    return {
        name: name,
        stats: { str: 10, int: 10, cha: 10 },
        money: 100,
        energy: 100,
    };
};

export const trainStat = (player, stat) => {
    const newPlayer = { ...player };
    newPlayer.stats = { ...player.stats };

    if (newPlayer.stats.hasOwnProperty(stat)) {
        newPlayer.stats[stat] += 1;
    }
    
    // In a real scenario, this would also cost energy/time.
    // For now, we just increment the stat to pass the test.
    return newPlayer;
};

export const workJob = (player, job) => {
    const newPlayer = { ...player };

    newPlayer.money += job.pay;
    newPlayer.energy -= job.energyCost;

    return newPlayer;
};