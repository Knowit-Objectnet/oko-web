import * as React from 'react';
import {
    CheckboxGroup as ChakraCheckboxGroup,
    FormControl,
    FormHelperText,
    HStack,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { Checkbox } from './Checkbox';
import { FormLabel } from './FormLabel';

export interface CheckboxOption<TName = string, TLabel = string> {
    name: TName;
    label: TLabel;
}

interface Props {
    label: string;
    options: Array<CheckboxOption>;
    required?: boolean;
    helperText?: string;
    isLoading?: boolean;
}

const CheckBoxGroupSkeleton: React.FC = () => (
    <HStack>
        <VStack width={5} paddingRight={1}>
            <Skeleton width="full" height={5} />
            <Skeleton width="full" height={5} />
            <Skeleton width="full" height={5} />
        </VStack>
        <VStack width="full">
            <Skeleton width="full" height={5} />
            <Skeleton width="full" height={5} />
            <Skeleton width="full" height={5} />
        </VStack>
    </HStack>
);

export const CheckboxGroup: React.FC<Props> = ({ label, options, required, helperText, isLoading }) => (
    <FormControl>
        <fieldset>
            <FormLabel as="legend" label={label} required={required} />
            {isLoading ? (
                <CheckBoxGroupSkeleton />
            ) : (
                <>
                    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                    <ChakraCheckboxGroup>
                        {options.map(({ name: checkboxName, label: checkboxLabel }) => (
                            <Checkbox key={checkboxName} name={checkboxName} label={checkboxLabel} />
                        ))}
                    </ChakraCheckboxGroup>
                </>
            )}
        </fieldset>
        {/* TODO: display error messages? */}
    </FormControl>
);
