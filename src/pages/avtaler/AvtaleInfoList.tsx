import React from 'react';
import { ApiAvtale } from '../../services-new/AvtaleService';
import { Accordion, AccordionItem } from '@chakra-ui/react';
import { AvtaleInfo } from './AvtaleInfo';

export const AvtaleInfoList: React.FC<{ avtaler: ApiAvtale[] }> = ({ avtaler }) => (
    <Accordion allowToggle>
        {avtaler.map((avtale) => (
            <AccordionItem key={avtale.id}>
                {({ isExpanded }) => <AvtaleInfo avtale={avtale} isExpanded={isExpanded} />}
            </AccordionItem>
        ))}
    </Accordion>
);
