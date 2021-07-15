import * as React from 'react';
import { Flex, Input, Select } from '@chakra-ui/react';
import { colors } from '../../../../theme/foundations/colors';
import ChevronDown from '../../../../assets/ChevronDown.svg';
import { Unit, Vektobjekt } from '../Vektregistrering';

interface Props {
    height?: string;
    width?: string;
    vektobjekt: Vektobjekt;
    setVekt?: React.Dispatch<React.SetStateAction<Vektobjekt>>;
    onChange?: (vektobjekt: Vektobjekt) => void;
}

export const Registreringsfelt: React.FC<Props> = ({ height, width, onChange, vektobjekt, setVekt }) => {
    return (
        <>
            <Flex alignItems="center">
                <Input
                    variant="unstyled"
                    backgroundColor="white"
                    type="number"
                    textAlign="center"
                    min="0"
                    placeholder="23"
                    aria-label="Vektinput"
                    width={width || '6rem'}
                    height={height || '3rem'}
                    marginRight={2}
                    onChange={(event) => {
                        const value = parseFloat(event.target.value);
                        vektobjekt.value = value;
                        console.log(vektobjekt);
                        if (onChange) onChange(vektobjekt);
                        else if (setVekt) setVekt(vektobjekt);
                    }}
                ></Input>
                <Select
                    backgroundColor={colors.LightBeige}
                    icon={<ChevronDown />}
                    style={{ textAlignLast: 'center' }}
                    aria-label="Vektenhet"
                    height={height || '3rem'}
                    onChange={(event) => {
                        const value = parseInt(event.target.value);
                        vektobjekt.unit = value;
                        console.log(vektobjekt);
                        if (onChange) onChange(vektobjekt);
                        else if (setVekt) setVekt(vektobjekt);
                    }}
                >
                    <option value={Unit.KG}>Kg</option>
                    <option value={Unit.TONN}>Tonn</option>
                    <option value={Unit.GRAM}>Gram</option>
                </Select>
            </Flex>
        </>
    );
};
