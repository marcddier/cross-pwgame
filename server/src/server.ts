import express from "express";
import socketIO from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = socketIO(server);

let players: Player[];

/*

  TODO : multiple game at the same times to keep learning socket io and group

  let players: [[string, Player[]]];
  players = [[idGame, [player, player]], [idGame, [player, player]], [idGame, [player, player]], [idGame, [player, player]]]

*/

let magicNumber = 0;

app.get("/", (_, res) => {
  res.send("hello fellows");
});

io.on("connection", (socket: SocketIO.Socket) => {
  console.log("new connection");
  socket.emit("event::hello");

  socket.on("event::initialize", payload => {
    if (players.length >= 2) {
      socket.emit("event::gameFull");
      return;
    }

    let player: Player = {
      nickname: payload.nickname,
      socre: 0,
      socket
    };

    players.push(player);
    console.log("new name received: ", payload.nickname);
    socket.nickname = payload.nickname

    if (players.length === 2) {
      io.emit("event::gameStart");
      magicNumber = generateMagicNumber();
    }
  });

  socket.on("event::magicNumber", payload => {
    let state = "";
    if (payload.number > magicNumber) {
      state = "lower"
    }
    if (payload.number < magicNumber) {
      state = "higher"
    }
    if (payload.number == magicNumber) {
      state = "win";
      players.forEach(player => {
        player.socket?.emit("event::magicNumberWin", { winner: socket.nickname });
      });
      // io.emit("event::magicNumberWin", { winner: socket.nickname })
      players.map((player: Player) => {
        if (player.nickname == socket.nickname) {
          player.socre += 1;
        }
      });
      magicNumber = generateMagicNumber();
    }
    socket.emit("event::magicNumberState", { state })
  })
});

server.listen(PORT, () => {
  console.log("Server ready at ...");
});

const generateMagicNumber = () => {
  const magicNumber = Math.round(Math.random() * 1000);
  console.log(magicNumber);
  return magicNumber;
}
