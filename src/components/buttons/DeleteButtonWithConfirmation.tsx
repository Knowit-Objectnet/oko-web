import * as React from 'react';
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
import Warning from '../../assets/Warning.svg';
import { Box } from '@chakra-ui/layout';
import { FocusLock } from '@chakra-ui/focus-lock';
import { DeleteButton } from './DeleteButton';

interface Props {
    label: string;
    onConfirm: () => Promise<unknown>;
    isLoading?: boolean;
}

export const DeleteButtonWithConfirmation: React.FC<Props> = ({ label, onConfirm, isLoading }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDeleteConfirmation = () => {
        onConfirm().then(() => onClose());
    };

    return (
        <Flex textAlign="start">
            <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom-end">
                <PopoverTrigger>
                    <DeleteButton label="Slett" aria-label={`Slett ${label}`} />
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <FocusLock>
                            <PopoverArrow />
                            <PopoverHeader>
                                <HStack spacing="2" alignItems="flex-start">
                                    <Icon as={Warning} marginTop="2px" />
                                    <Box fontWeight="medium">Du er i ferd med å slette {label}. Er du sikker?</Box>
                                    <PopoverCloseButton aria-label="Avbryt sletting" />
                                </HStack>
                            </PopoverHeader>
                            <PopoverBody>
                                {/* TODO: add description/helper text */}
                                <Button
                                    width="full"
                                    size="sm"
                                    variant="warning"
                                    onClick={onDeleteConfirmation}
                                    isLoading={isLoading}
                                >
                                    Slett {label}
                                </Button>
                            </PopoverBody>
                        </FocusLock>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>
    );
};
