import { ReactNode } from 'react';
import { EqualityChecker, State, StateSelector, StoreApi } from 'zustand';
/**
 * @deprecated Use `typeof MyContext.useStore` instead.
 */
export declare type UseContextStore<T extends State> = {
    (): T;
    <U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U;
};
declare function createContext<TState extends State, CustomStoreApi extends StoreApi<TState> = StoreApi<TState>>(): {
    Provider: ({ createStore, children, }: {
        createStore: () => CustomStoreApi;
        children: ReactNode;
    }) => import("react").FunctionComponentElement<import("react").ProviderProps<CustomStoreApi | undefined>>;
    useStore: UseContextStore<TState>;
    useStoreApi: () => {
        getState: CustomStoreApi['getState'];
        setState: CustomStoreApi['setState'];
        subscribe: CustomStoreApi['subscribe'];
        destroy: CustomStoreApi['destroy'];
    };
};
export default createContext;
