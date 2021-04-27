import { useEffect, useState } from 'react';

/**
 * Utility hook for storing state in localStorage, so that it is persisted across user sessions.
 * Credit: https://blogg.bekk.no/kaptein-krok-%EF%B8%8F-usepersistedstate-d08f9b027e1c
 * @param key           Identifier for the state item, used when interacting with localStorage
 * @param initialState  The default state value, used if there is no state persisted in localStorage
 */
export const usePersistedState = <ItemType>(
    key: string,
    initialState: ItemType,
): [ItemType, (item: ItemType) => void] => {
    const localStorageItem = localStorage.getItem(key);

    const [state, setState] = useState<ItemType>(localStorageItem ? JSON.parse(localStorageItem) : initialState);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
};
