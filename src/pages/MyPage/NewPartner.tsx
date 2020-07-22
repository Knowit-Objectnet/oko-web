import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';
import { useRef, useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${Colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${Colors.LightBeige};
    padding: 10px 20px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
`;

const Content = styled.div`
    padding: 0px 50px 50px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 350px;
    height: 45px;
    margin-bottom: 20px;

    &::placeholder {
        text-align: center;
    }
`;

const File = styled.div`
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const FileButton = styled.div`
    height: 45px;
    min-width: fit-content;
    background-color: ${Colors.Blue};
    padding: 0px 10px;
    display: flex;
    align-items: center;
    user-select: none;
`;

const FileInput = styled.input`
    display: none;
`;

const Button = styled.button`
    height: 35px;
    background-color: ${Colors.Green};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
`;

interface NewPartnerProps {
    onSubmit: (name: string, contract: File | null) => void;
}

export const NewPartner: React.FC<NewPartnerProps> = (props) => {
    // General info state
    const [name, setName] = useState('');
    const [contract, setContract] = useState<File | null>(null);
    // Ref to get access to the click function on the element
    const ref = useRef<HTMLInputElement>(null);

    // Name input onchange function
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setName(e.currentTarget.value);
    };

    // onclick function for the fake file input button
    const onFakeFileButtonClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    // The actually on change function for the file input
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        // Add the files to the state
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            setContract(files[0]);
        }
    };

    // Submit function for when the new partner is to be submitted to the backend
    const onSubmit = async () => {
        props.onSubmit(name, contract);
    };

    return (
        <Wrapper>
            <Title>Legg til ny samarbeidspartner</Title>
            <Content>
                <Input type="text" placeholder="Navn på organisasjonen" value={name} onChange={onNameChange} />
                <FileInput
                    ref={ref}
                    type="file"
                    accept=".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={onFileChange}
                />
                <File>
                    <span>{contract ? contract.name : 'Last opp kontrakt'}</span>
                    <FileButton onClick={onFakeFileButtonClick}>Bla gjennom filer</FileButton>
                </File>
                <Button type="submit" onClick={onSubmit}>
                    Legg til stasjon
                </Button>
            </Content>
        </Wrapper>
    );
};
