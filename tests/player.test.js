import chai from 'chai';
const { expect } = chai;
import { createPlayer, trainStat, workJob } from 'src/player';

describe('Player', () => {

    describe('createPlayer()', () => {
        it('should create a player with a name', () => {
            const player = createPlayer('John');
            expect(player.name).to.equal('John');
        });

        it('should start with 10 in Strength, Intelligence, and Charisma', () => {
            const player = createPlayer('Jane');
            expect(player.stats).to.deep.equal({ str: 10, int: 10, cha: 10 });
        });

        it('should start with $100', () => {
            const player = createPlayer('Doe');
            expect(player.money).to.equal(100);
        });

        it('should start with 100 energy', () => {
            const player = createPlayer('Doe');
            expect(player.energy).to.equal(100);
        });
    });

    describe('trainStat()', () => {
        it('should increase strength when training at the gym', () => {
            const player = { name: 'Test', stats: { str: 10, int: 10, cha: 10 }, energy: 100 };
            const updatedPlayer = trainStat(player, 'str');
            expect(updatedPlayer.stats.str).to.be.greaterThan(10);
        });

        it('should increase intelligence when studying at the library', () => {
            const player = { name: 'Test', stats: { str: 10, int: 10, cha: 10 }, energy: 100 };
            const updatedPlayer = trainStat(player, 'int');
            expect(updatedPlayer.stats.int).to.be.greaterThan(10);
        });

        it('should decrease energy when training', () => {
            const player = createPlayer('Trainer');
            player.energy = 50;
            const updatedPlayer = trainStat(player, 'str');
            expect(updatedPlayer.energy).to.be.lessThan(50);
        });

        it('should not allow training if energy is too low', () => {
            const player = createPlayer('Tired');
            player.energy = 5;
            // This action should ideally not happen, and the player object should be unchanged.
            const updatedPlayer = trainStat(player, 'int');
            expect(updatedPlayer).to.deep.equal(player);
        });
    });

    describe('workJob()', () => {
        it('should earn money when working', () => {
            const player = createPlayer('Worker');
            player.money = 100;
            const updatedPlayer = workJob(player, { name: 'Burger Flipper', pay: 20, energyCost: 30 });
            expect(updatedPlayer.money).to.equal(120);
        });

        it('should lose energy when working', () => {
            const player = createPlayer('Worker');
            player.energy = 100;
            const updatedPlayer = workJob(player, { name: 'Burger Flipper', pay: 20, energyCost: 30 });
            expect(updatedPlayer.energy).to.equal(70);
        });

        it('should not allow working if energy is too low', () => {
            const player = createPlayer('Exhausted');
            player.energy = 20;
            const job = { name: 'Burger Flipper', pay: 20, energyCost: 30 };
            const updatedPlayer = workJob(player, job);
            expect(updatedPlayer).to.deep.equal(player);
        });
    });
});