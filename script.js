const gridElement = document.getElementById('grid');
const statusElement = document.getElementById('status');
const replayButton = document.getElementById('replay-btn');

const colorCounts = {
    red: 8,
    blue: 8,
    beige: 7,
    black: 1
};

// Function to create a 5x5 grid
function createGrid() {
    const tiles = [];
    
    // Randomly decide which color (red or blue) will have 9 tiles
    const randomColor = Math.random() < 0.5 ? 'red' : 'blue';
    
    // Set the selected color to 9 tiles, and the other to 8 tiles
    colorCounts[randomColor] = 9;
    colorCounts[randomColor === 'red' ? 'blue' : 'red'] = 8;

    // Prepare the grid with the specified number of each color
    let gridContent = [
        ...Array(colorCounts.red).fill('red'),
        ...Array(colorCounts.blue).fill('blue'),
        ...Array(colorCounts.beige).fill('beige'),
        'black' // Only 1 black tile with an 'X'
    ];

    // Shuffle the grid content to randomize the tile distribution
    shuffle(gridContent);

    // Create grid tiles
    gridElement.innerHTML = '';
    gridContent.forEach(color => {
        const tile = document.createElement('div');
        tile.style.backgroundColor = color;
        if (color === 'black') {
            tile.innerHTML = 'X'; // Add X to the black tile
            tile.style.color = 'white'; // White X for visibility
        }
        tiles.push(tile);
        gridElement.appendChild(tile);
    });

    // Set the status text to indicate the starting color
    const startingColor = randomColor.charAt(0).toUpperCase() + randomColor.slice(1);
    statusElement.innerText = `${startingColor} starts`;
}

// Shuffle function to randomize the grid
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Initialize the grid
createGrid();

// Replay button functionality
replayButton.addEventListener('click', createGrid);
