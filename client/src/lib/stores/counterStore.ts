import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    count = 0;
    title = 'Counter Store';
    events: string[] = [
        'Initial event count set to zero.'
    ];

    constructor() {
        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount}`);
    }

    get eventCount() {
        return this.events.length;
    }
}