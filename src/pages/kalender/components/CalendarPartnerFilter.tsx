import * as React from 'react';
import { useState } from 'react';
import Filter from '../../../assets/Filter.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';
import { useCalendarState } from '../CalendarProvider';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { usePartnere } from '../../../services/partner/usePartnere';
import { Flex, Icon } from '@chakra-ui/react';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import Henting from '../../henting';

export const CalendarPartnerFilter: React.FC = () => {
    const { data: partnere } = usePartnere();

    return (
        <CalendarFilterSelect
            title="Velg enkelte partnere"
            name="partner-select"
            data={partnere}
            filterName="partnerFilter"
            filterFn={(id, henting) => henting.aktorId === id}
        />
    );
};
