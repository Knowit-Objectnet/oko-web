import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../src/App';

test('renders Hello World!', () => {
  const { getByText } = render(
    <App />,
  );

  // hello world should be rendered
  const text = getByText('Loading...');
  expect(text).toBeInTheDocument();
});
