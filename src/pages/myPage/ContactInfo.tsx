import * as React from 'react';
import styled from 'styled-components';
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
    background-color: ${(props) => props.theme.colors.LightBlue};
`;

const Tr = styled.tr`
    height: 35px;
`;

const Td = styled.td`
    height: 35px;
`;

const Cell = styled.div`
    align-items: center;
    justify-content: flex-start;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 2px;
    box-sizing: border-box;
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

const Icon = styled.div`
    margin-left: 10px;
    border-radius: 50%;
    height: 27px;
    width: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RedIcon = styled(Icon)`
    background-color: ${(props) => props.theme.colors.Red};
`;

const GreenIcon = styled(Icon)`
    background-color: ${(props) => props.theme.colors.Green};
`;

const BlueIcon = styled(Icon)`
    background-color: ${(props) => props.theme.colors.Blue};
`;

const EditOptions = styled.div`
    display: flex;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
`;

interface ContactInfoProps {
    info: { name: string; phone?: string; mail: string };
}

/**
 * Contact info component
 */
export const ContactInfo: React.FC<ContactInfoProps> = (props) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.info.name);
    const [phone, setPhone] = useState(props.info.phone);
    const [mail, setMail] = useState(props.info.mail);
    const [description, setDescription] = useState('');

    const onEditButtonClick = () => {
        setEditing(!editing);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const val = e.currentTarget.value;
        switch (e.currentTarget.name) {
            case 'name': {
                setName(val);
                break;
            }
            case 'phone': {
                setPhone(val);
                break;
            }
            case 'mail': {
                setMail(val);
                break;
            }
            case 'description': {
                setDescription(val);
                break;
            }
        }
    };

    const onCancel = () => {
        setName(props.info.name);
        setPhone(props.info.phone);
        setMail(props.info.mail);
        setDescription('');
        setEditing(false);
    };

    const onSubmit = () => {
        // TODO: Submit to server
        onCancel();
    };

    return (
        <Wrapper>
            <TableTitle>
                Kontaktinfo
                {editing ? (
                    <EditOptions>
                        <RedIcon onClick={onCancel}>
                            <StyledCross />
                        </RedIcon>
                        <GreenIcon onClick={onSubmit}>
                            <StyledCheck />
                        </GreenIcon>
                    </EditOptions>
                ) : (
                    <BlueIcon onClick={onEditButtonClick}>
                        <StyledPencil />
                    </BlueIcon>
                )}
            </TableTitle>
            <Table>
                <TableBody>
                    <Tr>
                        <Td>
                            <Cell>
                                <StyledPerson height="1em" />
                                {editing ? (
                                    <Input type="text" name="name" value={name} onChange={onChange} />
                                ) : (
                                    <CellText>{props.info.name}</CellText>
                                )}
                            </Cell>
                        </Td>
                        <Td>
                            <Cell>
                                <StyledPhone height="1em" />
                                {editing ? (
                                    <Input type="text" name="phone" value={phone} onChange={onChange} />
                                ) : (
                                    <CellText>{props.info.phone || 'N/A'}</CellText>
                                )}
                            </Cell>
                        </Td>
                        <Td>
                            <Cell>
                                <StyledMail height="1em" />
                                {editing ? (
                                    <Input type="text" name="mail" value={mail} onChange={onChange} />
                                ) : (
                                    <CellText>{props.info.mail}</CellText>
                                )}
                            </Cell>
                        </Td>
                        <Td>
                            <Cell>
                                {editing ? (
                                    <Input type="text" name="description" value={description} onChange={onChange} />
                                ) : null}
                            </Cell>
                        </Td>
                    </Tr>
                </TableBody>
            </Table>
        </Wrapper>
    );
};
