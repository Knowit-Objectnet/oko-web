import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, Tbody, Td, Tr } from '@chakra-ui/react';
import { RegistervektButton } from './RegistervektButton';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategoriList } from '../../../components/KategoriList';
import { useAuth } from '../../../auth/useAuth';
import { HentingInfoSection } from '../../../components/henting/HentingInfoSection';

interface Props {
    henting: ApiHenting;
}

export const MissingRegistration: React.FC<Props> = ({ henting }) => {
    const { user } = useAuth();
    return (
        <Tbody>
            {henting.kategorier.map((kategori) => (
                <Tr
                    key={kategori.kategori.id}
                    backgroundColor={colors.Red}
                    borderBottomWidth="16px"
                    borderBottomColor="background"
                >
                    <Td>
                        <Heading fontSize="1.5rem" fontWeight="bold" textAlign="center">
                            Ikke registrert vekt
                        </Heading>
                    </Td>

                    <Td maxWidth="14rem">
                        <KategoriList kategorier={henting.kategorier.map((it) => it.kategori)} />
                    </Td>
                    <Td>
                        <HentingInfoSection henting={henting} />
                    </Td>
                    <Td>
                        <RegistervektButton henting={henting} />
                    </Td>
                </Tr>
            ))}
        </Tbody>
    );
};
