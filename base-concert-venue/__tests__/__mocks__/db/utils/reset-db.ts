import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

export const resetDB = async () => {
	// failsafe against resetting production database!
	const safeToReset = process.env.NODE_ENV === 'test' || process.env.CYPRESS;
	if (!safeToReset) {
		// eslint-disable-next-line no-console
		console.log('WARNING! Database reset unavailable outside test environment');
		return;
	}

	const { fakeBands, fakeReservations, fakeShows, fakeUsers } = await readFakeData();

	// Overwrite data in files
	await Promise.all([
		writeJSONToFile(filenames.bands, fakeBands),
		writeJSONToFile(filenames.shows, fakeShows),
		writeJSONToFile(filenames.reservations, fakeReservations),
		writeJSONToFile(filenames.users, fakeUsers),
	]);
};
