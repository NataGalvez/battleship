import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlaysService {
  private plays = [];
  constructor() {}

  searchNewGame() {
    // validar si ya existe partida vacia

    // true
    this.assignPlayer2(10);

    // false
    this.newGame();
  }

  lastZombie(arrBoard) {
    let arrEndGame = [];
    arrBoard.forEach(element => {
      arrEndGame = arrEndGame.concat(element);
    });
    return arrEndGame.includes(1);
  }
  savePlayer(idPlayer, name, idGame) {
    this.plays.forEach(play => {
      if (play.id === idGame) {
        if (play.player1.id === idPlayer) {
          play.player1.name = name;
          console.log(play.player1.name);
        } else if (play.player2.id === idPlayer) {
          play.player2.name = name;
          console.log(play.player2.name);
        }
      }
    });
  }
  assignPlayer2(idGame) {
    // retornar el idGame y el player2 id de ese juego
  }

  generateBoard(rows, columns) {
    let board = [];
    // this.playsservive.addGrid(rows, columns, "Nata");
    for (let i = 0; i < rows; i++) {
      let row = [];
      board.push(row);
      for (let j = 0; j < columns; j++) {
        board[i].push(0);
      }
    }
    return board;
  }

  newGame(rows = 10, columns = 10) {
    let game = {
      id: this.getRandomId(),
      rows,
      columns,
      player1: {
        id: this.getRandomId(),
        name: "",
        score: 0,
        ready: false,
        selectedBoard: [],
        turn: true,
        playBoard: this.generateBoard(rows, columns)
      },
      player2: {
        id: this.getRandomId(),
        name: "ROBOCOP",
        score: 0,
        ready: false,
        selectedBoard: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        ],
        turn: false,
        playBoard: this.generateBoard(rows, columns)
      }
    };
    this.plays.push(game);
    console.log(this.plays);
    return { idGame: game.id, idPlayer: game.player1.id };
  }

  getRandomId() {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  }

  getPlay(idGame) {
    let out = [];
    this.plays.forEach(play => {
      if (play.id === idGame) {
        out = play;
      }
    });
    return out;
  }

  selectBoard(idGame, idPlayer, board) {
    this.plays.forEach(play => {
      if (play.id === idGame && play.player1.id === idPlayer) {
        play.player1.ready = true;
        play.player1.selectedBoard = board;
      } else if (play.id === idGame && play.player2.id === idPlayer) {
        play.player2.ready = true;
        play.player2.selectedBoard = board;
      }
    });
    console.log(this.plays);
  }
  playerStatus(idGame, idPlayer) {
    let output = false;
    this.plays.forEach(play => {
      if (play.id === idGame && play.player1.id === idPlayer) {
        output = play.player1.ready;
      } else if (play.id === idGame && play.player2.id === idPlayer) {
        output = play.player2.ready;
      }
    });
    return output;
  }

  shot(x, y, idGame, idPlayer) {
    // Verificar juego y jugador y que sea su turno
    this.plays.forEach(play => {
      if (
        play.id === idGame &&
        play.player1.id === idPlayer &&
        play.player1.turn
      ) {
        if (play.player1.playBoard[x][y] === 0) {
          play.player1.playBoard[x][y] = 1;
          if (play.player2.selectedBoard[x][y] === 1) {
            play.player1.playBoard[x][y] = 2;
            play.player2.selectedBoard[x][y] = 2;
          } else {
            play.player2.selectedBoard[x][y] = -1;
            console.log("no acertaste al barco");
            play.player1.turn = false;
            play.player2.turn = true;
          }
        } else {
          alert("Ya pegaste en ese espacio");
        }
        if (!this.lastZombie(play.player2.selectedBoard)) {
          alert("Player 1 Ganaste!!!");
        }
      } else if (
        play.id === idGame &&
        play.player2.id === idPlayer &&
        play.player2.turn
      ) {
        if (play.player2.playBoard[x][y] === 0) {
          play.player2.playBoard[x][y] = 1;
          if (play.player1.selectedBoard[x][y] === 1) {
            play.player2.playBoard[x][y] = 2;
            play.player1.selectedBoard[x][y] = 2;
          } else {
            play.player1.selectedBoard[x][y] = -1;
            console.log("no acertaste al barco");
            play.player2.turn = false;
            play.player1.turn = true;
          }
        } else {
          alert("Ya pegaste en ese espacio");
        }
        if (!this.lastZombie(play.player1.selectedBoard)) {
          alert("Player 2 Ganaste!!!");
        }
      }
    });
    // asignar al jugador su jugada y verificar si le dio a un barco del enemigo
    // retornar si fue 'hit' y mantener el turno en ese jugador
    console.log(this.plays);
  }
}
