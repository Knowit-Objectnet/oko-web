import * as React from 'react';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DefaultContext from './Context';
import { Wrapper } from './Wrapper';
import { ModalManager, Options } from './Types';

interface Props {
    children: React.ReactNode;
    Context?: React.Context<ModalManager | undefined>;
}

const ModalProvider: ({ children, Context }: Props) => JSX.Element = ({
    children,
    Context = DefaultContext,
}: Props) => {
    const root = useRef<HTMLDivElement | null>(null);
    const modalContext = useRef<ModalManager | undefined>(undefined);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    useEffect(() => {
        root.current = document.createElement('div');
        root.current.id = '__modal__';
        document.body.appendChild(root.current);

        return () => {
            if (root.current) document.body.removeChild(root.current);
        };
    }, []);

    const remove = useCallback(() => {
        setModalContent(null);
    }, []);

    const show = useCallback(
        (content, options: Options = {}) => {
            setModalContent(<Wrapper content={content} exitModalCallback={remove} {...options} />);
        },
        [remove],
    );

    modalContext.current = {
        content: modalContent,
        show,
        remove,
    };

    return (
        <Context.Provider value={modalContext.current}>
            {children}
            {root.current && createPortal(modalContent, root.current)}
        </Context.Provider>
    );
};

export default ModalProvider;
