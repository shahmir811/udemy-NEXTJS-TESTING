// src/mocks/handlers.js
import { rest } from 'msw';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { fakeUserReservations } from '@/__tests__/__mocks__/fakeData/userReservations';

const BASEURL = 'http://localhost:3000';

export const handlers = [
	// Handles a GET reservation request
	rest.get(`${BASEURL}/api/shows/:showId`, async (req, res, ctx) => {
		const { fakeShows } = await readFakeData();
		const { showId } = req.params;

		// showId = 0 has seats available in the fake data
		// showId = 1 has NO seats available

		return res(
			ctx.json({
				show: fakeShows[Number(showId)],
			})
		);
	}),

	// Handles a GET request for user-reservations
	rest.get(`${BASEURL}/api/users/:userId/reservations`, async (req, res, ctx) => {
		// if userId = 0, return an empty array
		// if  userId = 1, return data fakeUserReservations

		const { userId } = req.params;

		return res(
			ctx.json({
				userReservations: Number(userId) === 1 ? fakeUserReservations : [],
			})
		);
	}),
];
