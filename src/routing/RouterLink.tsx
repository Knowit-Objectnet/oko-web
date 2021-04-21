import * as React from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { Link as ReactRouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const RouterLink: React.FC<LinkProps | RouterLinkProps> = (props) => <Link as={ReactRouterLink} {...props} />;
