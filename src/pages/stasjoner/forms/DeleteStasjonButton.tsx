import { DeleteButton } from '../../../components/buttons/DeleteButton';
import * as React from 'react';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { useDeleteStasjon } from '../../../services/stasjon/useDeleteStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import {
    Button,
    Flex,
    HStack,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
    Portal,
} from '@chakra-ui/react';
import Warning from '../../../assets/Warning.svg';
import { Box } from '@chakra-ui/layout';
import { FocusLock } from '@chakra-ui/focus-lock';

interface Props {
    stasjon: ApiStasjon;
}

export const DeleteStasjonButton: React.FC<Props> = ({ stasjon }) => {
    const deleteStasjonMutation = useDeleteStasjon();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteStasjon = () => {
        deleteStasjonMutation.mutate(stasjon.id, {
            onSuccess: () => {
                onClose();
                showSuccessToast({ title: `Stasjonen ${stasjon.navn} ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av ${stasjon.navn}` });
            },
        });
    };

    return (
        <Flex textAlign="start">
            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
                <PopoverTrigger>
                    <DeleteButton label="Slett" aria-label={`Slett stasjonen ${stasjon.navn}`} />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <FocusLock>
                            <PopoverArrow />
                            <PopoverHeader>
                                <HStack spacing="2" alignItems="flex-start">
                                    <Icon as={Warning} marginTop="2px" />
                                    <Box fontWeight="medium">Du er i ferd med å slette stasjonen. Er du sikker?</Box>
                                    <PopoverCloseButton aria-label="Avbryt sletting" />
                                </HStack>
                            </PopoverHeader>
                            <PopoverBody>
                                {/* TODO: add description/helper text */}
                                <Button
                                    width="full"
                                    size="sm"
                                    variant="warning"
                                    onClick={handleDeleteStasjon}
                                    isLoading={deleteStasjonMutation.isLoading}
                                >
                                    Slett stasjonen
                                </Button>
                            </PopoverBody>
                        </FocusLock>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>
    );
};
