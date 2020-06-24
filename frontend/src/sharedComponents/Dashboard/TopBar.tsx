import * as React from 'react';
import styled from 'styled-components';
import { Bars } from '@styled-icons/fa-solid/Bars';

const Bar = styled.div`
    height: 81px;
    background-color: #e0e0e0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledBars = styled(Bars)`
    margin-left: 42px;
`;

const ImageWrapper = styled.div`
    background-color: #ffffff;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: 88px;
`;

const Image = styled.img``;

export const TopBar: React.FC<unknown> = () => {
    return (
        <Bar>
            <StyledBars size="2em" />
            <ImageWrapper>
                <Image src="" alt="Profile picture" />
            </ImageWrapper>
        </Bar>
    );
};
