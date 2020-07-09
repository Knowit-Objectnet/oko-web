import * as React from 'react';
import styled from 'styled-components';
import { GutterGroup } from './GutterGroup';
import add from 'date-fns/add';
import format from 'date-fns/format';

const Column = styled.div`
    flex: none;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    border-right: 1px solid #ddd;
`;

interface GutterProps {
    start: Date;
    step: number;
    end: Date;
}

export const Gutter: React.FC<GutterProps> = (props) => {
    const numberOfSlots = (props.end.getTime() - props.start.getTime()) / 60000 / props.step;

    const groups = [];

    let time = props.start;

    for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
        groups.push(<GutterGroup key={'Gutter' + i} text={format(time, 'kk:mm')} />);
        time = add(time, { minutes: props.step * 2 });
    }

    return (
        <Column>
            <GutterGroup />
            {groups}
        </Column>
    );
};
