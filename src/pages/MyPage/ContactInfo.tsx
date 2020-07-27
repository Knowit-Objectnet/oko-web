import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';
import Person from '../../assets/Person.svg';
import Phone from '../../assets/Phone.svg';
import Mail from '../../assets/Mail.svg';
import Pencil from '../../assets/Pencil.svg';
import Cross from '../../assets/Cross.svg';
import Check from '../../assets/Check.svg';
import { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const TableTitle = styled.h3`
    display: flex;
    align-items: center;
    margin-top: 0px;
`;

const Table = styled.table`
    table-layout: fixed;
    width: 100%;
`;

const TableBody = styled.tbody`
    background-color: ${Colors.LightBlue};
`;

const Cell = styled.div`
    align-items: center;
    justify-content: flex-start;
    display: flex;
    width: 100%;
`;

const CellText = styled.div`
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledPerson = styled(Person)`
    margin: 0px 5px;
`;

const StyledPhone = styled(Phone)`
    margin: 0px 5px;
`;

const StyledMail = styled(Mail)`
    margin: 0px 5px;
`;

const StyledPencil = styled(Pencil)`
    height: 1em;
`;

const StyledCross = styled(Cross)`
    height: 1em;
`;

const StyledCheck = styled(Check)`
    height: 0.7em;
`;

interface IconProps {
    color: Colors;
}

const Icon = styled.div<IconProps>`
    margin-left: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    height: 27px;
    width: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EditOptions = styled.div`
    display: flex;
`;

interface ContactInfoProps {
    info: { name: string; phone?: string; mail: string };
}

/**
 * Contact info component
 */
export const ContactInfo: React.FC<ContactInfoProps> = (props) => {
    const [editing, setEditing] = useState(false);

    const onEditButtonClick = () => {
        setEditing(!editing);
    };

    return (
        <Wrapper>
            <TableTitle>
                Kontaktinfo
                {editing ? (
                    <EditOptions>
                        <Icon color={Colors.Red} onClick={onEditButtonClick}>
                            <StyledCross />
                        </Icon>
                        <Icon color={Colors.Green} onClick={onEditButtonClick}>
                            <StyledCheck />
                        </Icon>
                    </EditOptions>
                ) : (
                    <Icon color={Colors.Blue} onClick={onEditButtonClick}>
                        <StyledPencil />
                    </Icon>
                )}
            </TableTitle>
            <Table>
                <TableBody>
                    <tr>
                        <td>
                            <Cell>
                                <StyledPerson height="1em" />
                                <CellText>{props.info.name}</CellText>
                            </Cell>
                        </td>
                        <td>
                            <Cell>
                                <StyledPhone height="1em" />
                                <CellText>{props.info.phone || 'N/A'}</CellText>
                            </Cell>
                        </td>
                        <td>
                            <Cell>
                                <StyledMail height="1em" />
                                <CellText>{props.info.mail}</CellText>
                            </Cell>
                        </td>
                        <td></td>
                    </tr>
                </TableBody>
            </Table>
        </Wrapper>
    );
};
