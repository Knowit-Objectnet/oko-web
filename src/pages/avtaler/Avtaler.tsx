import React from 'react';
import { usePartners } from '../../services/hooks/usePartners';

export const Avtaler: React.FC = () => {
    const { data: partners } = usePartners();

    return <></>;
};
