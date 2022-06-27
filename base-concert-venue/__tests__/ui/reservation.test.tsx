import { render, screen } from '@testing-library/react';

import { Reservation } from '@/components/reservations/Reservation';

test('Reservation page shows correct number of seats available', async () => {
	render(<Reservation showId={0} submitPurchase={jest.fn()} />);

	const seatCountText = await screen.findByText(/10 seats left/i);
	expect(seatCountText).toBeInTheDocument();
});

test("Reservation page shows 'sold out' message and No purchase button if there are not seats available", async () => {
	render(<Reservation showId={1} submitPurchase={jest.fn()} />);

	const soldOutMessage = await screen.findByRole('heading', { name: /sold out/i });
	expect(soldOutMessage).toBeInTheDocument();

	// For using not.toBeInTheDocument(), we use screen.queryByRole
	const purchaseButton = screen.queryByRole('button', { name: /purchase/i });
	expect(purchaseButton).not.toBeInTheDocument();
});
