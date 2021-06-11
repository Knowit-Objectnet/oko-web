import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

test('renders loading screen', () => {
    render(<App />);

    // hello world should be rendered
    const text = screen.getByText('Laster inn...');
    expect(text).toBeInTheDocument();
});
