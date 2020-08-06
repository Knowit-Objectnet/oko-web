import { useContext, useMemo } from 'react';
import DefaultContext from './Context';

const useModal = (Context?: React.Context<any>) => {
    const modalContext = useContext(Context || DefaultContext);
    return useMemo(() => {
        return modalContext.current;
    }, [modalContext]);
};

export default useModal;
