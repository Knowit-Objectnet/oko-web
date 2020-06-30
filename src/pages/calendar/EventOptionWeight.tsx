import * as React from 'react';
import styled from 'styled-components';
import { WeightHanging } from '@styled-icons/fa-solid/WeightHanging';
import { EventOption } from './EventOption';
import { useState } from 'react';
import { PostToAPI } from '../../utils/PostToAPi';
import { useKeycloak } from '@react-keycloak/web';

const Suffix = styled.div`
    display: inline-block;
    position: relative;

    &::after {
        position: absolute;
        top: 2px;
        right: 0.5em;
        transition: all 0.05s ease-in-out;
    }

    &:hover::after,
    &:focus-within::after {
        right: 1.5em;
    }

    &::after {
        content: 'Tonn';
    }
`;

const GrayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
`;

interface EventOptionDateRangeProps {
    weight?: number;
    isEditing: boolean;
    onChange: (weight: number | undefined) => void;
}

/**
 * Event option that allows the user to choose a weight for the event.
 */
export const EventOptionWeight: React.FC<EventOptionDateRangeProps> = (props) => {
    const {
        keycloak: { token },
    } = useKeycloak();

    const [newWeight, setNewWeight] = useState(props.weight);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const val = e.currentTarget.value;
        setNewWeight(val === '' ? undefined : parseInt(e.currentTarget.value));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.persist();
        const val = e.charCode;
        if ((val < 48 || val > 57) && val !== 44) e.preventDefault();
    };

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const data = {
                weight: newWeight,
            };
            await PostToAPI('/api/weight', data, token);
            props.onChange(newWeight);
        } catch (err) {
            console.log(err);
            setNewWeight(props.weight);
        }
    };

    return (
        <EventOption icon={WeightHanging}>
            {props.isEditing ? (
                <>
                    <Suffix>
                        <input
                            type="number"
                            name="weight"
                            value={newWeight}
                            min={0}
                            onChange={onChange}
                            onKeyPress={onKeyDown}
                        />
                    </Suffix>
                    <button type="submit" onClick={onSubmit} disabled={newWeight === props.weight}>
                        Bekreft
                    </button>
                </>
            ) : (
                <GrayBox>{props.weight || 'n/a'}</GrayBox>
            )}
        </EventOption>
    );
};
