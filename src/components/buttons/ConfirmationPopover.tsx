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
    Heading,
    Text,
} from '@chakra-ui/react';
import Warning from '../../assets/Warning.svg';
import { Box } from '@chakra-ui/layout';
import { FocusLock } from '@chakra-ui/focus-lock';

interface Props {
    message: {
        title: string;
        body?: string;
        buttonLabel: string;
    };
    onConfirm: () => Promise<unknown>;
    isLoading?: boolean;
}

export const ConfirmationPopover: React.FC<Props> = ({ message, onConfirm, isLoading, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDeleteConfirmation = () => {
        onConfirm().then(onClose);
    };

    return (
        <Flex textAlign="start">
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement="bottom-end"
                // We have to use lazy loading and unmounting in order for the focus lock to work
                isLazy
                lazyBehavior="unmount"
            >
                <PopoverTrigger>{children}</PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <FocusLock>
                            <PopoverArrow />
                            <PopoverHeader paddingY="3">
                                <HStack spacing="3" alignItems="flex-start">
                                    <Icon as={Warning} marginTop="2px" />
                                    <Box paddingEnd="5">
                                        <Heading as="h2" fontWeight="medium" fontSize="md">
                                            {message.title}
                                        </Heading>
                                        {message.body ? (
                                            <Text fontSize="sm" paddingTop="1">
                                                {message.body}
                                            </Text>
                                        ) : null}
                                    </Box>
                                    <PopoverCloseButton aria-label="Avbryt" />
                                </HStack>
                            </PopoverHeader>
                            <PopoverBody>
                                <Button
                                    width="full"
                                    size="sm"
                                    variant="warning"
                                    onClick={onDeleteConfirmation}
                                    isLoading={isLoading}
                                    loadingText="Vennligst vent..."
                                >
                                    {message.buttonLabel}
                                </Button>
                            </PopoverBody>
                        </FocusLock>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>
    );
};
