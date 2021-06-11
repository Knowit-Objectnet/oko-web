import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
import { NewPickUp } from '../../components/_deprecated/events/NewPickUp';
import useModal from '../../components/_deprecated/modal/useModal';
import { getStartAndEndDateTime } from '../../utils/getStartAndEndDateTime';
import { Helmet } from 'react-helmet';
import { FloatingActionButton } from '../../components/_deprecated/FloatingActionButton';
import { PickUpList } from './pickups/PickUpList';
import { useAuth } from '../../auth/useAuth';

const Wrapper = styled.div`
    position: relative;
`;

const AddPickUpButtonContainer = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
`;

const PageContent = styled.section`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 40px 0 50px;
`;

export const Notifications: React.FC = () => {
    const modal = useModal();

    const { user } = useAuth();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewPickUpModal = () => {
        const { start, end } = getStartAndEndDateTime();
        modal.show(<NewPickUp start={start} end={end} afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <>
            <Helmet>
                <title>{user.isAdmin ? 'Oversikt' : 'Varsler'}</title>
            </Helmet>
            <Wrapper>
                {user.isStasjon && (
                    <AddPickUpButtonContainer>
                        <FloatingActionButton
                            variant="positive"
                            label="Nytt ekstrauttak"
                            icon={<Plus />}
                            onClick={showNewPickUpModal}
                        />
                    </AddPickUpButtonContainer>
                )}
                <PageContent>
                    <PickUpList />
                </PageContent>
            </Wrapper>
        </>
    );
};
