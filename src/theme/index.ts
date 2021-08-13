import { extendTheme } from '@chakra-ui/react';

// Foundational (general) style overrides (see https://chakra-ui.com/docs/theming/customize-theme)
import { colors } from './foundations/colors';
import { sizes } from './foundations/sizes';
import { breakpoints } from './foundations/breakpoints';
import { typography } from './foundations/typography';

// Styling of components (see https://chakra-ui.com/docs/theming/component-style)
import { Button } from './components/button';
import { Modal } from './components/modal';
import { Alert } from './components/alert';
import { Spinner } from './components/spinner';
import { Tag } from './components/tag';
import { Form } from './components/form';
import { FormLabel } from './components/form-label';
import { Input } from './components/input';
import { Textarea } from './components/textarea';
import { Select } from './components/select';
import { Radio } from './components/radio';
import { Checkbox } from './components/checkbox';
import { FormError } from './components/form-error';
import { Table } from './components/table';

const overrides = {
    colors,
    sizes,
    space: {
        ...sizes, // So we can reference size-values in padding, margin etc.
    },
    breakpoints,
    ...typography,
    components: {
        Button,
        Modal,
        Alert,
        Spinner,
        Tag,
        Form,
        FormLabel,
        Input,
        Textarea,
        Select,
        Radio,
        Checkbox,
        FormError,
        Table,
    },
};

export const theme = {
    ...extendTheme(overrides),
};
