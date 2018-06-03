import {SocketRouter} from './SocketRouter';

export class Controller {

    constructor(private socket: SocketRouter) {
        this.onChat = this.onChat.bind(this);
    }

    onChat(msg: string) {
        console.log(msg);
        this.socket.send('object', new Person('Jack', 19));
    }

    onNameChange(name: string) {
        console.log(name);
    }

    onGetObject(person: Person) {
        console.log(person);
    }

}

class Person {
    constructor(
        private name: string,
        private age: number
    ) {}
}
