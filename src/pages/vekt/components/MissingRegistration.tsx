import * as React from 'react';
import { colors } from '../../../theme/foundations/colors';
import { Heading, Tbody, Td, Tr } from '@chakra-ui/react';
import { RegistervektButton } from './RegistervektButton';
import { ApiHenting } from '../../../services/henting/HentingService';
import { KategoriList } from '../../../components/KategoriList';
import { EkstraHentingInfo } from '../../ekstrahenting/EkstraHentingInfo';
import { useAuth } from '../../../auth/useAuth';

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
                        <KategoriList
                            kategorier={henting.kategorier.filter((it) => it.kategori).map((it) => it.kategori!)}
                        />
                    </Td>
                    <Td>
                        <EkstraHentingInfo henting={henting} />
                    </Td>
                    <Td>
                        <RegistervektButton henting={henting} />
                    </Td>
                </Tr>
            ))}
        </Tbody>
    );
};
