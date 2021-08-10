import React from 'react';
import { Button, ButtonGroup, ButtonGroupProps, Flex, Icon } from '@chakra-ui/react';
import ArrowLeft from '../../../assets/ArrowLeft.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';

interface Props extends ButtonGroupProps {
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
}

export const DateNavigation: React.FC<Props> = ({ onPrev, onNext, onToday, ...props }) => (
    <ButtonGroup as={Flex} size="sm" {...props}>
        <Button leftIcon={<Icon as={ArrowLeft} />} flexGrow={1} aria-label="Gå til forrige periode" onClick={onPrev}>
            Forrige
        </Button>
        <Button onClick={onToday} flexGrow={1}>
            I dag
        </Button>
        <Button rightIcon={<Icon as={ArrowRight} />} flexGrow={1} aria-label="Gå til neste periode" onClick={onNext}>
            Neste
        </Button>
    </ButtonGroup>
);
