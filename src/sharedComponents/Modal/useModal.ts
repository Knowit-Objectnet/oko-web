import { useContext, useMemo } from 'react';
import DefaultContext from './Context';

const useModal = (Context: React.Context<any>) => {
    const modalContext = useContext(Context || DefaultContext);
    const modal = useMemo(() => {
        return modalContext.current;
    }, [modalContext]);
    return modal;
};

export default useModal;
