import { createGameState, advanceDay } from './game.js';
import { createPlayer, trainStat, workJob } from './player.js';

let gameState;

// Available actions in the game
const actions = {
    train: [
        { name: 'Train Strength', stat: 'str', cost: 10, energy: 20 },
        { name: 'Study Intelligence', stat: 'int', cost: 10, energy: 20 },
        { name: 'Practice Charisma', stat: 'cha', cost: 10, energy: 20 },
    ],
    work: [
        { name: 'Flip Burgers', pay: 20, energyCost: 30, req: {} },
        { name: 'Tutor Students', pay: 50, energyCost: 40, req: { int: 20 } },
        { name: 'Part-time Actor', pay: 70, energyCost: 40, req: { cha: 30 } },
    ]
};

function render() {
    const { player, day, message } = gameState;

    const playerStatsDiv = document.getElementById('player-stats-content');
    if (playerStatsDiv) {
        playerStatsDiv.innerHTML = `
            <div class="day-counter"><strong>Day:</strong> <span>${day}</span></div>
            <div class="stat-item"><strong>Money:</strong> <span>$${player.money}</span></div>
            <div class="stat-item"><strong>Energy:</strong> <span>${player.energy}/100</span></div>
            <hr>
            <div class="stat-item"><strong>Strength:</strong> <span>${player.stats.str}</span></div>
            <div class="stat-item"><strong>Intelligence:</strong> <span>${player.stats.int}</span></div>
            <div class="stat-item"><strong>Charisma:</strong> <span>${player.stats.cha}</span></div>
            ${message ? `<div class="message">${message}</div>` : ''}
        `;
    }

    // This function will be more complex once we have buttons to update
    const actionButtons = document.querySelectorAll('#actions-content button');
    actionButtons.forEach(button => {
        if (button.dataset.action === 'Sleep (Next Day)') return;

        const { action, type } = button.dataset;
        const actionDetails = actions[type].find(a => a.name === action);

        let disabled = false;
        let reason = '';
        if (actionDetails.energy > player.energy || (actionDetails.energyCost && actionDetails.energyCost > player.energy)) {
            disabled = true;
            reason = 'Not enough energy.';
        } else if (actionDetails.cost && actionDetails.cost > player.money) {
            disabled = true;
            reason = 'Not enough money.';
        } else if (actionDetails.req) {
            for (const stat in actionDetails.req) {
                if (player.stats[stat] < actionDetails.req[stat]) {
                    disabled = true;
                    reason = `Requires ${actionDetails.req[stat]} ${stat}.`;
                    break;
                }
            }
        }
        
        button.disabled = disabled;
        button.title = reason;
    });

}

function handleAction(actionName, type) {
    gameState.message = ''; // Clear previous message
    let playerStateChanged = false;

    if (type === 'train') {
        const training = actions.train.find(t => t.name === actionName);
        if (gameState.player.energy >= training.energy && gameState.player.money >= training.cost) {
            gameState.player = trainStat(gameState.player, training.stat, { energyCost: training.energy, moneyCost: training.cost });
            playerStateChanged = true;
        } else {
            gameState.message = "Cannot train: not enough energy or money.";
        }
    } else if (type === 'work') {
        const job = actions.work.find(j => j.name === actionName);
        let canWork = true;
        if (job.req) {
            for (const stat in job.req) {
                if(gameState.player.stats[stat] < job.req[stat]) canWork = false;
            }
        }
        if (canWork) {
            gameState.player = workJob(gameState.player, job);
            playerStateChanged = true;
        } else {
            gameState.message = "Cannot work: requirements not met.";
        }
    } else if (actionName === 'Sleep (Next Day)') {
        gameState = advanceDay(gameState);
        playerStateChanged = true;
    }

    if(playerStateChanged) {
        render();
    }
}


export function initGameUI(container) {
    gameState = createGameState();
    gameState.player = createPlayer('Hero');
    
    container.innerHTML = `
        <div id="player-stats">
            <h2>Player Status</h2>
            <div id="player-stats-content"></div>
        </div>
        <div id="actions">
            <h2>Actions</h2>
            <div id="actions-content">
                <div class="action-category">
                    <h3>Training</h3>
                    <div class="action-buttons">
                        ${actions.train.map(t => `<button data-action="${t.name}" data-type="train">${t.name}</button>`).join('')}
                    </div>
                </div>
                <div class="action-category">
                    <h3>Work</h3>
                    <div class="action-buttons">
                         ${actions.work.map(w => `<button data-action="${w.name}" data-type="work">${w.name}</button>`).join('')}
                    </div>
                </div>
                <hr>
                 <div class="action-category">
                    <div class="action-buttons">
                        <button data-action="Sleep (Next Day)" data-type="game" data-action="sleep">Sleep (Next Day)</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('#actions-content button').forEach(button => {
        button.addEventListener('click', () => handleAction(button.dataset.action, button.dataset.type));
    });

    render();
}