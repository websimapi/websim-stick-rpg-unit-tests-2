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

export const trainStat = (player, stat, options = { energyCost: 15, moneyCost: 0 }) => {
    if (player.energy < options.energyCost || player.money < options.moneyCost) {
        return player; // Not enough energy or money, return original state
    }

    const newPlayer = { ...player };
    newPlayer.stats = { ...player.stats };

    if (newPlayer.stats.hasOwnProperty(stat)) {
        newPlayer.stats[stat] += 1;
        newPlayer.energy -= options.energyCost;
        newPlayer.money -= options.moneyCost;
    }
    
    return newPlayer;
};

export const workJob = (player, job) => {
    if (player.energy < job.energyCost) {
        return player; // Not enough energy, return original state
    }

    const newPlayer = { ...player };

    newPlayer.money += job.pay;
    newPlayer.energy -= job.energyCost;

    return newPlayer;
};