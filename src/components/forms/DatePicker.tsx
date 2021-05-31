import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { FormLabel } from './FormLabel';

import 'react-day-picker/lib/style.css';
import { format, parse } from 'date-fns';
import Calendar from '../../assets/Calendar.svg';
import DayPicker from 'react-day-picker';
import ReactFocusLock from 'react-focus-lock';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

export const DatePicker: React.FC<Props> = ({ name, label, required, helperText }) => {
    const {
        register,
        formState: { errors, isSubmitted },
        setValue,
        getValues,
    } = useFormContext();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const isInvalid = errors[name] && isSubmitted;

    // TODO: not an ideal solution
    const handleDayInput = (): Date => {
        const values = getValues(name);
        return parse(values, 'dd/MM/yyyy', new Date());
    };

    return (
        <>
            <FormControl isInvalid={isInvalid}>
                <FormLabel label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <InputGroup>
                    <Input
                        type="text"
                        {...register(name)}
                        // TODO: The aria-required attribute is overridden by Chakra UI - based on the `isRequired` prop
                        //  on `FormControl`. We do not want to use the `isRequired` prop, because it also injects
                        //  the `required` attribute on the input, which causes the browser to use native popup alerts
                        //  – not our custom ones. We only want the `aria-required` attribute (for accessibility), but
                        //  I haven't been able to find a way to bypass this.
                        aria-required={required}
                    />
                    <InputRightElement>
                        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
                            <PopoverTrigger>
                                <IconButton
                                    aria-label="Åpne datovelger"
                                    icon={<Icon as={Calendar} />}
                                    onClick={onOpen}
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <ReactFocusLock>
                                    <PopoverCloseButton />
                                    <DayPicker
                                        onDayClick={(date) => {
                                            setValue(name, format(date, 'dd/MM/yyyy'));
                                            onClose();
                                        }}
                                        selectedDays={handleDayInput()}
                                    />
                                </ReactFocusLock>
                            </PopoverContent>
                        </Popover>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    <ErrorMessage name={name} />
                </FormErrorMessage>
            </FormControl>
        </>
    );
};
