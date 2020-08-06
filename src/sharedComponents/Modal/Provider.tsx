import * as React from 'react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DefaultContext from './Context';
import { Wrapper } from './Wrapper';

interface Props {
    children: React.ReactNode;
    Context?: React.Context<any>;
}

interface Options {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    height?: number;
    maxHeight?: number;
    minHeight?: number;
}

const ModalProvider: ({ children, Context }: Props) => JSX.Element = ({
    children,
    Context = DefaultContext,
}: Props) => {
    const root = useRef<HTMLDivElement | null>(null);
    const modalContext = useRef<{
        content: ReactNode;
        show: (_content: ReactNode, options?: Options) => void;
        remove: () => void;
    } | null>(null);
    const [content, setContent] = useState<ReactNode | null>(null);

    useEffect(() => {
        root.current = document.createElement('div');
        root.current.id = '__modal__';
        document.body.appendChild(root.current);

        return () => {
            if (root.current) document.body.removeChild(root.current);
        };
    }, []);

    const remove = useCallback(() => {
        setContent(null);
    }, []);

    const show = useCallback(
        (_content, options: Options = {}) => {
            setContent(<Wrapper content={_content} exitModalCallback={remove} {...options} />);
        },
        [remove],
    );

    modalContext.current = {
        content,
        show,
        remove,
    };

    return (
        <Context.Provider value={modalContext}>
            {children}
            {root.current && createPortal(content, root.current)}
        </Context.Provider>
    );
};

export default ModalProvider;
