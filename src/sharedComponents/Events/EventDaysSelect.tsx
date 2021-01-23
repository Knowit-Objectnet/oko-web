import * as React from 'react';
import styled from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';
import { ErrorMessage } from '../forms/ErrorMessage';

const Label = styled.label`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
`;

const Span = styled.span`
    width: 100%;
    margin-bottom: 5px;
`;

const DaySelection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

interface DayProps {
    selected: boolean;
}

const Day = styled.span<DayProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.colors.Blue};
    background-color: ${(props) => (props.selected ? props.theme.colors.Blue : props.theme.colors.White)};
    user-select: none;
`;

interface _Props {
    value: Array<number>;
    onChange: (index: string) => void;
}

const _EventDaysSelect: React.FC<_Props> = (props) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const stringValue = e.currentTarget.dataset['index'];
        if (stringValue) {
            props.onChange(stringValue);
        }
    };

    return (
        <DaySelection>
            <label htmlFor="monday">
                <HiddenCheckbox type="checkbox" name="monday" id="monday" />
                <Day data-index={1} selected={props.value.includes(1)} onClick={onClick}>
                    M
                </Day>
            </label>
            <label htmlFor="tuesday">
                <HiddenCheckbox type="checkbox" name="tuesday" id="tuesday" />
                <Day data-index={2} selected={props.value.includes(2)} onClick={onClick}>
                    Ti
                </Day>
            </label>
            <label htmlFor="wednesday">
                <HiddenCheckbox type="checkbox" name="wednesday" id="wednesday" />
                <Day data-index={3} selected={props.value.includes(3)} onClick={onClick}>
                    O
                </Day>
            </label>
            <label htmlFor="thursday">
                <HiddenCheckbox type="checkbox" name="thursday" id="thursday" />
                <Day data-index={4} selected={props.value.includes(4)} onClick={onClick}>
                    To
                </Day>
            </label>
            <label htmlFor="friday">
                <HiddenCheckbox type="checkbox" name="friday" id="firday" />
                <Day data-index={5} selected={props.value.includes(5)} onClick={onClick}>
                    F
                </Day>
            </label>
        </DaySelection>
    );
};

interface Props {
    name: string;
}

export const EventDaysSelect: React.FC<Props> = ({ name }) => {
    const { control } = useFormContext();

    return (
        <Label>
            <Span>Velg ukedag(er)</Span>
            <Controller
                control={control}
                name={name}
                render={({ onChange, value }) => (
                    <_EventDaysSelect
                        value={value}
                        onChange={(index: string) => {
                            if (index && parseInt(index) > 0 && parseInt(index) < 6) {
                                if (value.includes(parseInt(index))) {
                                    const newSelection = value.filter((val: number) => val !== parseInt(index));
                                    onChange(newSelection);
                                } else {
                                    onChange([...value, parseInt(index)]);
                                }
                            }
                        }}
                    />
                )}
            />
            <ErrorMessage name={name} />
        </Label>
    );
};
