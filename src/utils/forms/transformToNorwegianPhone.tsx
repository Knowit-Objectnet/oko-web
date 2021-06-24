export const transformToNorwegianPhone = (value: string, originalValue: string): string => {
    if (originalValue.trim() !== '') {
        return `+47${originalValue.replace(/\s/g, '')}`;
    }
    return '';
};
