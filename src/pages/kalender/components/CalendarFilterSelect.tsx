import * as React from 'react';
import { useState } from 'react';
import Filter from '../../../assets/Filter.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';
import { useCalendarState } from '../CalendarProvider';
import { Checkbox } from '../../../components/forms/checkbox/Checkbox';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { Flex, Icon } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';

interface Props {
    title: string;
    name: string;
    data: ApiPartner[] | ApiStasjon[] | undefined;
    filterName: 'stasjonFilter' | 'partnerFilter';
    filterFn: (id: string, henting: ApiHentingWrapper) => boolean;
}

export const CalendarFilterSelect: React.FC<Props> = ({ title, name, data, filterName, filterFn }) => {
    const [toggled, setToggled] = useState(true);
    const { setFilter } = useCalendarState();
    const [ids] = useState<Array<string>>([]);

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        const currentSelected = value === 'default' ? undefined : value;
        const index = ids.indexOf(value);
        if (!currentSelected) ids.length = 0;
        else if (!~index) ids.push(currentSelected);
        else ids.splice(index, 1);

        const filterFunction = (henting: ApiHentingWrapper) => {
            if (ids.length === 0) return true;
            else return ids.some((id) => filterFn(id, henting));
        };

        const filterFunctionObject = {
            [filterName]: filterFunction,
        };

        setFilter(filterFunctionObject);
    };

    return (
        <Flex flexDirection="column" marginTop="12" justifyContent="center">
            <Flex alignItems="center" marginBottom="4">
                <Icon as={Filter} height="100%" marginRight="2.5" />
                {title}
                {toggled ? (
                    <Icon as={ArrowRight} onClick={onToggleClick} />
                ) : (
                    <Icon as={ArrowDown} onClick={onToggleClick} />
                )}
            </Flex>
            {toggled && (
                <Flex flexDirection="column" alignItems="flex-start" justifyContent="center">
                    {data?.map((aktor) => (
                        <Checkbox
                            key={aktor.id}
                            name={name}
                            value={aktor.id}
                            isChecked={ids.some((id) => id === aktor.id)}
                            onChange={handleValueChange}
                            label={aktor.navn}
                        ></Checkbox>
                    ))}
                    <Checkbox
                        key="AllCheckboxes"
                        name={name}
                        value="default"
                        isChecked={ids.length === 0}
                        onChange={handleValueChange}
                        label="Alle"
                    ></Checkbox>
                </Flex>
            )}
        </Flex>
    );
};
