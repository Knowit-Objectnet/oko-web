import { ReactNode } from 'react';

export interface Options {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    height?: number;
    maxHeight?: number;
    minHeight?: number;
}

export interface ModalManager {
    content: ReactNode;
    show: (_content: ReactNode, options?: Options) => void;
    remove: () => void;
}
