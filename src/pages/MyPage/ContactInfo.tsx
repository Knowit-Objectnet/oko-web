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

const TableHead = styled.thead`
    background-color: ${Colors.LightBlue};
`;

const Span = styled.span`
    align-items: center;
    justify-content: center;
    display: flex;
`;

const StyledPerson = styled(Person)`
    margin-right: 5px;
`;

const StyledPhone = styled(Phone)`
    margin-right: 5px;
`;

const StyledMail = styled(Mail)`
    margin-right: 5px;
`;

interface ContactInfoProps {
    contacts: Array<{ name: string; phone: string; mail: string }>;
}

/**
 * Contact info component
 */
export const ContactInfo: React.FC<ContactInfoProps> = (props) => (
    <Wrapper>
        <h3>Kontaktinfo</h3>
        <Table>
            <TableHead>
                <tr>
                    <th>
                        <Span>
                            <StyledPerson height="1em" /> Navn
                        </Span>
                    </th>
                    <th>
                        <Span>
                            <StyledPhone height="1em" /> Telefonnummer
                        </Span>
                    </th>
                    <th>
                        <Span>
                            <StyledMail height="1em" /> E-Mail
                        </Span>
                    </th>
                    <th></th>
                </tr>
            </TableHead>
            <tbody>
                {props.contacts &&
                    props.contacts.map((contact) => (
                        <tr key={contact.mail}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.mail}</td>
                            <td></td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    </Wrapper>
);
