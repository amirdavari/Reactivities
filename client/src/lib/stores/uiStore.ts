import { makeAutoObservable } from "mobx";

export class UIStore {
    isLoading = false;

    constructor() {
        // Initialization code if needed
        makeAutoObservable(this);
    }

    isBusy() {
        this.isLoading = true;
    }

    isIdle() {
        this.isLoading = false;
    }
}