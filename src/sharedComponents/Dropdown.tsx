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
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 38px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    cursor: default;
    position: relative;
    background-color: #fff;
`;

const Title = styled.div`
    font-weight: 300;
    margin: 2px 20px;
    margin-right: 30px;
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
    z-index: 10;
    position: absolute;
    width: 100%;
    border: 1px solid #dfdfdf;
    border-top: none;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 5px -1px #e8e8e8;
    box-shadow: 0 2px 5px -1px #e8e8e8;
    font-weight: 700;
    padding: 0px;
    max-height: 215px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
    overflow: auto;

    &:not(:last-child) {
        border-bottom: 0.5px solid lightgrey;
    }
`;

interface DropdownProps {
    list: Array<string>;
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
            <Header onClick={toggleList}>{open ? <AngleUp size="2em" /> : <AngleDown size="2em" />}</Header>
            {open && (
                <List>
                    {props.list.map((item) => (
                        <ListItem key={`Dropdown: ${item}`}>{item}</ListItem>
                    ))}
                </List>
            )}
        </Wrapper>
    );
};
