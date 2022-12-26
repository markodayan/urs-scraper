import WebSocket, { Server } from 'ws';

class WSS {
  private static instance: WSS;
  private server: Server;
  public subscribers: number;

  public heartbeat(ws: any) {
    ws.isAlive = true;
  }

  public static init(): Server {
    if (!this.instance) {
      this.instance = new WSS();
    }

    return this.instance.server;
  }

  private constructor() {
    this.subscribers = 0;
    this.server = new WebSocket.Server({ noServer: true });

    this.server.on('connection', (ws: WebSocket & { isAlive: boolean }) => {
      ws.isAlive = true;

      ws.on('pong', () => {
        this.heartbeat(ws);
      });

      this.subscribers++;

      ws.on('close', () => {
        this.subscribers--;
      });
    });
  }
}

export { WSS };
