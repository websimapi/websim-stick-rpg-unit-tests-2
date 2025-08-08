// Configure Mocha
mocha.setup('bdd');

// Import test files
import './tests/player.test.js';
import './tests/game.test.js';

// Run the tests
mocha.run();

