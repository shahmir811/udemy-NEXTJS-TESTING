import { render, screen } from '@testing-library/react';

import { UserReservations } from '@/components/user/UserReservations';

test('User page shows correct text on button', async () => {
	render(<UserReservations userId={1} />);

	const purchaseButton = await screen.findByRole('button', { name: /purchase more tickets/i });
	expect(purchaseButton).toBeInTheDocument();
});

test("User page shows 'purchase tickets' button and 'Your tickets' heading is not there if there are no reservations", async () => {
	render(<UserReservations userId={0} />);

	const purchaseButton = await screen.findByRole('button', { name: /purchase tickets/i });
	expect(purchaseButton).toBeInTheDocument();

	// For using not.toBeInTheDocument(), we use screen.queryByRole
	const ticketsHeading = screen.queryByRole('heading', { name: /your tickets/i });
	expect(ticketsHeading).not.toBeInTheDocument();
});
