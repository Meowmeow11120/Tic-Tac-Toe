const gameboard = document.querySelector('.gameboard');
const resetbtn = document.querySelector('.reset');
const xbtn = document.querySelector('.mark-X');
const obtn = document.querySelector('.mark-O');

let player;
let computer;

class Player {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
        this.board = new Array(9).fill(null);
    }

    winner() {
        const { board } = this;
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
                return board[a]; // Return the winning mark
            }
        }
        return null; // No winner
    }

    playerPlaying(e) {
        const { mark, board } = this;
        const index = e.target.id;
        if (board[index] === null && computer.board[index] === null) {
            this.board[index] = mark;
            e.target.textContent = mark;
            const winnerMark = this.winner();
            if (winnerMark) {
                console.log(`Congratulations! ${winnerMark} is the winner!`);
                document.querySelector('.winner').textContent = 'Player ';
                gameboard.removeEventListener('click', playerMove);
            } else {
                computerPlaying();
            }
        }
    }
}

function handleMarkSelection(mark) {
    player = new Player('player', mark);
    const computerMark = mark === 'X' ? 'O' : 'X';
    computer = new Player('computer', computerMark);
}

function playerMove(e) {
    player.playerPlaying(e);
}

function computerPlaying() {
    let randomNumber = Math.floor(Math.random() * 9);
    if (player.board[randomNumber] === null && computer.board[randomNumber] === null) {
        computer.board[randomNumber] = computer.mark;
        document.querySelector(`[id="${randomNumber}"]`).textContent = computer.mark;
        const winnerMark = computer.winner();
        if (winnerMark) {
            console.log(`Congratulations! ${winnerMark} is the winner!`);
            document.querySelector('.winner').textContent = 'Computer ';
            gameboard.removeEventListener('click', playerMove);
            return; // Exit the function if the computer wins
        }
        const tie = computer.board.every(cell => cell !== null);
        if (tie) {
            console.log("It's a tie!");
            document.querySelector('.winner').textContent = 'Tie!';
            gameboard.removeEventListener('click', playerMove);
            return; // Exit the function if it's a tie
        }
    } else {
        computerPlaying(); // Try again if the cell already has a mark
    }
}

gameboard.addEventListener('click', playerMove);

function reset() {
    player.board = new Array(9).fill(null);
    computer.board = new Array(9).fill(null);
    document.querySelectorAll('.square').forEach(cell => {
        cell.textContent = '';
    });
    document.querySelector('.winner').textContent = '';
    gameboard.addEventListener('click', playerMove);
}

resetbtn.addEventListener('click', reset);

xbtn.addEventListener('click', () => {
    handleMarkSelection('X');
});

obtn.addEventListener('click', () => {
    handleMarkSelection('O');
});

handleMarkSelection('X');
