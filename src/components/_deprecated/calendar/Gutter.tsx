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
    height: inherit;
    border-right: 1px solid #ddd;
`;

interface customTitleComponentGroupProps {
    height?: number;
}

const TitleGutterGroup = styled.div<customTitleComponentGroupProps>`
    display: flex;
    flex-flow: column nowrap;
    border-bottom: solid 1px transparent;
    min-height: ${(props) => (props.height ? props.height : 40)}px;
`;

interface GutterProps {
    start: Date;
    step: number;
    end: Date;
    showTitleGroup: boolean;
    titleComponentHeight?: number;
}

/*
 * Gutter for displaying time in the interval given by step from start to end
 */
export const Gutter: React.FC<GutterProps> = (props) => {
    // The number of slots in the gutter
    const numberOfSlots = (props.end.getTime() - props.start.getTime()) / 60000 / props.step;

    // The groups to render
    const groups = [];

    // The current time to render
    let time = new Date(props.start);

    // Render the gutter groups and increment the time by 2 steps
    for (let i = 0; i < Math.ceil(numberOfSlots / 2); i++) {
        groups.push(<GutterGroup key={'Gutter' + i} text={format(time, 'kk:mm')} />);
        time = add(time, { minutes: props.step * 2 });
    }

    return (
        <Column>
            {props.showTitleGroup && <TitleGutterGroup height={props.titleComponentHeight} />}
            {groups}
        </Column>
    );
};
