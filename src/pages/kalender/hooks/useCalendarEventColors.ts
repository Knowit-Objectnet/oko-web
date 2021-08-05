import { useEffect, useState } from 'react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';

const EVENT_COLOR_HUE = '190';
const EVENT_COLOR_SATURATION = '100%';
const EVENT_COLOR_LIGHTNESS_DARK = 50;
const EVENT_COLOR_LIGHTNESS_LIGHT = 95;

const generateAktorColor = (aktorIndex: number, aktorerCount: number): string => {
    const percentFactor = (aktorIndex + 1) / (aktorerCount + 1);
    return `hsla(${EVENT_COLOR_HUE}, ${EVENT_COLOR_SATURATION}, ${calculateColorLightness(percentFactor)}%)`;
};

const calculateColorLightness = (percentFactor: number): number => {
    const startLightness = EVENT_COLOR_LIGHTNESS_DARK;
    const endLightness = EVENT_COLOR_LIGHTNESS_LIGHT;
    const lightnessOffset = (endLightness - startLightness) * percentFactor;
    return startLightness + lightnessOffset;
};

type CalendarEventColorFn = (aktorId?: string) => string;

export const useCalendarEventColors = (): CalendarEventColorFn => {
    const [aktorColors, setActorColors] = useState<Map<string, string>>(new Map());

    const generateEventColors = (aktorer: Array<ApiPartner | ApiStasjon>) =>
        aktorer.forEach((aktor, index) =>
            setActorColors((currentColors) =>
                new Map(currentColors).set(aktor.id, generateAktorColor(index, aktorer.length)),
            ),
        );

    const { data: partnere } = usePartnere();
    const { data: stasjoner } = useStasjoner();

    useEffect(() => {
        if (partnere) {
            generateEventColors(partnere);
        }
    }, [partnere]);

    useEffect(() => {
        if (stasjoner) {
            generateEventColors(stasjoner);
        }
    }, [stasjoner]);

    const getAktorColor = (aktorId?: string) => {
        const defaultColor = generateAktorColor(1, 1);
        if (aktorId) {
            return aktorColors.get(aktorId) || defaultColor;
        }
        return defaultColor;
    };

    return getAktorColor;
};
