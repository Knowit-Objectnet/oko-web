import * as React from 'react';
import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react';

/** Component that overrides the border-radius of Chakra UIs IconButton (cannot be overridden in theme) **/
export const IconButton: React.FC<IconButtonProps> = (props) => {
    return <ChakraIconButton borderRadius={props.isRound ? undefined : 0} {...props} />;
};
