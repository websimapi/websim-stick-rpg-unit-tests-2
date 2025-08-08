import chai from 'chai';
const { expect } = chai;
import { createGameState, advanceDay } from 'src/game';
import { createPlayer } from 'src/player';

describe('Game Logic', () => {

    describe('createGameState()', () => {
        it('should start the game on Day 1', () => {
            const gameState = createGameState();
            expect(gameState.day).to.equal(1);
        });
    });

    describe('advanceDay()', () => {
        it('should increment the current day by 1', () => {
            const gameState = { day: 1 };
            const nextDayState = advanceDay(gameState);
            expect(nextDayState.day).to.equal(2);
        });

        it('should restore player energy at the start of a new day', () => {
            const player = createPlayer('Test');
            player.energy = 20; // Player is tired
            const gameState = { day: 1, player };
            
            const nextDayState = advanceDay(gameState);
            // This test is currently missing logic in `advanceDay` to pass
            // For now we will just check if the player object exists
            expect(nextDayState.player).to.exist;
            // The real test should be: expect(nextDayState.player.energy).to.equal(100);
            expect(nextDayState.player.energy).to.equal(100);
        });
    });
});