import { createContext, ReactNode } from 'react';

const Context = createContext<ReactNode | null>(null);

export default Context;
