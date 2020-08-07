import { createContext } from 'react';
import { ModalManager } from './Types';

const Context = createContext<ModalManager | undefined>(undefined);

export default Context;
