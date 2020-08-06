import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    children: React.ReactNode;
    context: React.Context<any>;
}

const Provider = ({ children, context: Context, ...props }: Props) => {
    const root = useRef<HTMLDivElement | null>(null);
    const modalContext = useRef<{
        content: React.ReactNode;
        show: (_content: any, options?: any) => void;
        remove: () => void;
    } | null>(null);
    const [content, setContent] = useState<React.ReactNode | null>(null);

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
        (_content, options = {}) => {
            setContent(_content);
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

export default Provider;
