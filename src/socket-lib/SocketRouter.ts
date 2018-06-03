export class SocketRouter {

    private static SEPARATOR = '&';
    private socket: WebSocket;
    private routes = new Map<string, Function>();

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.socket.addEventListener('message', event => {
            this.processMessage(event.data);
        });
    }

    setupRoutes(routes: Map<string, Function>) {
        this.routes = routes;
    }

    send(path: string, payload: any) {
        const message = path + SocketRouter.SEPARATOR + JSON.stringify(payload);
        this.socket.send(message);
    }

    private processMessage(raw: string) {
        const fullMsg = raw.split(SocketRouter.SEPARATOR, 2);
        this.handleMessages(fullMsg[0], fullMsg[1]);
    }

    private handleMessages(route: string, payload: string) {
        const handler = this.routes.get(route);
        const object = JSON.parse(payload);
        if (handler != undefined) {
            handler.call(null, object);
        }
    }
}
