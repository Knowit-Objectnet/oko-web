import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';
import Person from '../../assets/Person.svg';
import Phone from '../../assets/Phone.svg';
import Mail from '../../assets/Mail.svg';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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

interface ContactInfoProps {
    info: { name: string; phone?: string; mail: string };
}

/**
 * Contact info component
 */
export const ContactInfo: React.FC<ContactInfoProps> = (props) => (
    <Wrapper>
        <h3>Kontaktinfo</h3>
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