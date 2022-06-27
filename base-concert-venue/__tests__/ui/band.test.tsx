import { render, screen } from '@testing-library/react';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import BandComponent from '@/pages/bands/[bandId]';

test('Band component displays correct band information', async () => {
	const { fakeBands } = await readFakeData();
	render(<BandComponent band={fakeBands[0]} error={null} />);

	const heading = screen.getByRole('heading', {
		name: /The Wandering Bunnies/i,
	});

	expect(heading).toBeInTheDocument();
});

test('Band component displays an error message', () => {
	render(<BandComponent band={null} error='Oops! something went wrong' />);

	const heading = screen.getByRole('heading', {
		name: /Oops! something went wrong/i,
	});

	expect(heading).toBeInTheDocument();
});
