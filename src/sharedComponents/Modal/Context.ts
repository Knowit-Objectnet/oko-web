import { createContext } from 'react';
import { ModalManager } from './Type';

const Context = createContext<ModalManager | undefined>(undefined);

export default Context;
