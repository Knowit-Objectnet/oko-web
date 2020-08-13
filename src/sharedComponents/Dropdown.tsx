import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowDown from '../assets/ArrowDown.svg';
import ArrowUp from '../assets/ArrowUp.svg';

const Wrapper = styled.div`
    user-select: none;
    position: relative;
    width: fit-content;
    height: fit-content;
    color: #000;
    display: flex;
    align-items: center;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 38px;
    border-radius: 3px;
    cursor: default;
    position: relative;
`;

const Title = styled.div`
    margin: 2px 10px;
    margin-right: 20px;
    white-space: nowrap;
`;

const AngleDown = styled(ArrowDown)`
    height: 1em;
    margin-right: auto;
`;

const AngleUp = styled(ArrowUp)`
    height: 1em;
    margin-right: auto;
`;

const List = styled.ul`
    top: 0;
    z-index: 10;
    position: absolute;
    width: 100%;
    border-top: none;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 0px;
    max-height: 400px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const ListItem = styled.li`
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    line-height: 1.6rem;
    cursor: default;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
    overflow: auto;
`;

interface DropdownProps {
    selectedIndex: number;
    list: Array<React.ReactElement>;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
    // State
    const [open, setOpen] = useState(false);

    // List open toggle function
    const toggleList = () => {
        setOpen(!open);
    };

    return (
        <Wrapper>
            <Header>
                <Title>{props.list.slice(props.selectedIndex, props.selectedIndex + 1)}</Title>
                {open && (
                    <List>
                        {props.list.map((item, index) => (
                            <ListItem key={`Dropdown: ${index}`}>{item}</ListItem>
                        ))}
                    </List>
                )}
            </Header>
            {open ? <AngleUp onClick={toggleList} /> : <AngleDown onClick={toggleList} />}
        </Wrapper>
    );
};
