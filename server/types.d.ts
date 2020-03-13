declare namespace SocketIO {
  export interface Socket {
    nickname: string
  }
}

interface Player {
  nickname: string;
  socre: number;
  socket?: SocketIO.Socket;
}