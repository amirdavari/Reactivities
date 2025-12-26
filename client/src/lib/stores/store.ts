import { createContext } from "react";
import CounterStore from "./counterStore";
import { UIStore } from "./uiStore";

interface Store {
    // Define common properties or methods for all stores if needed
    counterStore: CounterStore,
    uiStore: UIStore
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore()
};

export const StoreContext = createContext<Store>(store);