import chai from 'chai';
const { expect } = chai;
import { initGameUI, handleAction, render, getGameState } from 'src/ui';
import { createPlayer } from 'src/player';

describe('UI Logic', () => {
    let container;

    beforeEach(() => {
        // Create a container for the UI to be rendered into for each test
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Clean up the container after each test
        document.body.removeChild(container);
        container = null;
    });

    describe('initGameUI()', () => {
        it('should create the basic HTML structure for the game', () => {
            initGameUI(container);
            expect(container.querySelector('#player-stats')).to.not.be.null;
            expect(container.querySelector('#actions')).to.not.be.null;
            expect(container.querySelector('button[data-action="Sleep (Next Day)"]')).to.not.be.null;
        });

        it('should initialize the game state with a default player', () => {
            initGameUI(container);
            const gameState = getGameState();
            expect(gameState).to.exist;
            expect(gameState.player.name).to.equal('Hero');
            expect(gameState.day).to.equal(1);
        });
    });

    describe('render()', () => {
        it('should display the correct player stats', () => {
            initGameUI(container);
            const gameState = getGameState();
            gameState.player.money = 500;
            gameState.player.energy = 50;
            gameState.player.stats.str = 15;
            render(); // Manually call render to update the UI with new state

            const moneyEl = container.querySelector('.stat-item:nth-child(2) span');
            const energyEl = container.querySelector('.stat-item:nth-child(3) span');
            const strEl = container.querySelector('.stat-item:nth-child(5) span');
            
            expect(moneyEl.textContent).to.equal('$500');
            expect(energyEl.textContent).to.equal('50/100');
            expect(strEl.textContent).to.equal('15');
        });

        it('should disable buttons when requirements are not met', () => {
            initGameUI(container);
            const gameState = getGameState();
            
            // Player has 10 int, job needs 20.
            gameState.player.energy = 100;
            render();
            const tutorButton = container.querySelector('button[data-action="Tutor Students"]');
            expect(tutorButton.disabled).to.be.true;
            expect(tutorButton.title).to.equal('Requires 20 int.');

            // Player has enough int, but not enough energy.
            gameState.player.stats.int = 21;
            gameState.player.energy = 30; // Job needs 40.
            render();
            expect(tutorButton.disabled).to.be.true;
            expect(tutorButton.title).to.equal('Not enough energy.');
        });
    });

    describe('handleAction()', () => {
        it('should update player stats when training', () => {
            initGameUI(container);
            const initialGameState = { ...getGameState() };
            
            // Click the "Train Strength" button
            const trainButton = container.querySelector('button[data-action="Train Strength"]');
            trainButton.click();

            const newGameState = getGameState();
            expect(newGameState.player.stats.str).to.be.greaterThan(initialGameState.player.stats.str);
            expect(newGameState.player.energy).to.be.lessThan(initialGameState.player.energy);
        });

        it('should advance the day when sleeping', () => {
            initGameUI(container);
            const initialGameState = { ...getGameState() };
            initialGameState.player.energy = 20; // Make player tired
            
            const sleepButton = container.querySelector('button[data-action="Sleep (Next Day)"]');
            sleepButton.click();

            const newGameState = getGameState();
            expect(newGameState.day).to.equal(initialGameState.day + 1);
            expect(newGameState.player.energy).to.equal(100); // Energy should be restored
        });
    });
});