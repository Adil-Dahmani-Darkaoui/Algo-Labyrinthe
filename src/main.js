async function loadJson() {

    const data = await fetch('labyrinthes.json')
        .then(response => response.json());

    let gridSize = 3;
    let mazeName = 'ex-1';

    return {
        gridSize: gridSize,
        cellData: data[gridSize][mazeName]
    };
}

function createMaze(mazeBoard) {

    // We destructure the object
    const {cellData, gridSize} = mazeBoard;

    // We select the element on which we will create the grid layout
    const mainDiv = document.getElementById('mainDiv');
    mainDiv.style.gridTemplateColumns = 'repeat(' + gridSize + ', 100px)';
    mainDiv.style.gridTemplateRows = 'repeat(' + gridSize + ', 100px)';

    // We loop trough to create cells and walls
    for (let i = 0; i < cellData.length; i++) {

        // We create a div for each iteration
        let cell = document.createElement('div');

        // We set the first cell in orange
        if (i === 0) {
            cell.style.backgroundColor = 'orange'
        }

        // We get the last iteration to set the cell in green
        if (i === cellData.length - 1) {
            cell.style.backgroundColor = "green"
        }

        // We apply the class for the color
        cell.className = 'cell-color cell-' + i;

        // We apply the border for the walls
        let walls = cellData[i]["walls"];
        if (walls[0]) {
            cell.style.borderTop = '1px solid'
        }
        if (walls[1]) {
            cell.style.borderRight = '1px solid'
        }
        if (walls[2]) {
            cell.style.borderBottom = '1px solid'
        }
        if (walls[3]) {
            cell.style.borderLeft = '1px solid'
        }

        mainDiv.appendChild(cell)
    }

    this.visited = false;
    this.found = false;
    this.adjacents = [];

    const visited = [];
    const stack = [];
    const root = cellData[0];
    const target = cellData[cellData.length -1];

    target.isTarget = true;
    stack.push(root);

    while(stack.length) {

        const current = stack.pop();

        if (current === target) {
            visited.push(current);
            break;
        }

        if (visited.indexOf(current) !== -1) {
            continue;
        }

        visited.push(current);

        for (let node of current.adjacents) {
            stack.push(node);
        }
        console.log(current.data)
    }
}

function getAdjacents(mazeBoard) {

    const {cellData, gridSize} = mazeBoard;

    const adjacentCells = [];
    let i;

    let top = gridSize[cellData(i, j-1)];
    let right = gridSize[cellData(i+1, j)];
    let bottom = gridSize[cellData(i, j+1)];
    let left = gridSize[cellData(i-1, j)];

    if (!top.visited) {
        adjacentCells.push(top)
    }
    if (!right.visited) {
        adjacentCells.push(right)
    }
    if (!bottom.visited) {
        adjacentCells.push(bottom)
    }
    if (!left.visited) {
        adjacentCells.push(left)
    }



    // recupere les voisins qui n'ont pas de murs
    // for (let i = 0; i < cellData.length; i++) {
    //
    //     let walls = cellData[i]["walls"];
    //
    //     for (let j = 0; j < walls.length; j++) {
    //         if (!walls[j]) {
    //             adjacentCells.push(cellData[i]['walls'])
    //         }
    //     }
    //
    //     cellData[i].adjacentsCells = adjacentCells;
    //     console.log(cellData[i].adjacentsCells)
    // }

}

async function main() {
    // Async main function to call our maze generator functions
    createMaze(await loadJson());
}

async function test() {
    getAdjacents(await loadJson())
}

test();

