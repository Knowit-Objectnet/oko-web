import { ApiPartner } from '../services/partner/PartnerService';
import { ApiStasjon } from '../services/stasjon/StasjonService';
import { colors } from '../theme/foundations/colors';

export const getGradientColors = (list?: { id: string }[]) => {
    const reduced: Record<string, string> = (list || []).reduce(
        (obj, cur, index) =>
            Object.assign(obj, {
                [cur.id]: getGradientColor(colors.hentingLight, colors.hentingDark, index / (list?.length || 1)),
            }),
        {},
    );

    return reduced;
};

export const getColorOfAktor = (list: Record<string, string>, aktorId?: string): string => {
    return (aktorId ? list[aktorId] : undefined) || colors.errorBackground;
};

// Code found online, source here: https://stackoverflow.com/a/63610427
const getGradientColor = (startColor: string, endColor: string, percent: number) => {
    // strip the leading # if it's there
    startColor = startColor.replace(/^\s*#|\s*$/g, '');
    endColor = endColor.replace(/^\s*#|\s*$/g, '');

    // get colors
    const startRed = parseInt(startColor.substr(0, 2), 16),
        startGreen = parseInt(startColor.substr(2, 2), 16),
        startBlue = parseInt(startColor.substr(4, 2), 16);

    const endRed = parseInt(endColor.substr(0, 2), 16),
        endGreen = parseInt(endColor.substr(2, 2), 16),
        endBlue = parseInt(endColor.substr(4, 2), 16);

    // calculate new color
    let diffRed = endRed - startRed;
    let diffGreen = endGreen - startGreen;
    let diffBlue = endBlue - startBlue;

    diffRed = diffRed * percent + startRed;
    diffGreen = diffGreen * percent + startGreen;
    diffBlue = diffBlue * percent + startBlue;

    let diffRedStr = diffRed.toString(16).split('.')[0];
    let diffGreenStr = diffGreen.toString(16).split('.')[0];
    let diffBlueStr = diffBlue.toString(16).split('.')[0];

    // ensure 2 digits by color
    if (diffRedStr.length === 1) diffRedStr = '0' + diffRedStr;
    if (diffGreenStr.length === 1) diffGreenStr = '0' + diffGreenStr;
    if (diffBlueStr.length === 1) diffBlueStr = '0' + diffBlueStr;

    return '#' + diffRedStr + diffGreenStr + diffBlueStr;
};
