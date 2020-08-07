import { useContext, useMemo, Context } from 'react';
import DefaultContext from './Context';
import { ModalManager } from './Types';

const useModal: (Context?: Context<ModalManager | undefined>) => ModalManager = (Context) => {
    const modalContext = useContext(Context || DefaultContext);
    return useMemo(() => {
        if (!modalContext) {
            throw new Error('App must be wrapped in ModalProvider to use this hook');
        }
        return modalContext;
    }, [modalContext]);
};

export default useModal;
