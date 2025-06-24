import 'server-only';

import { cookies } from 'next/headers';
import { initializeServerApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export async function getAuthenticatedAppForUser() {
	const authIdToken = (await cookies()).get('__session')?.value;

	const firebaseServerApp = initializeServerApp(
		firebaseConfig,
		{
			authIdToken,
		}
	);

	const auth = getAuth(firebaseServerApp);
	await auth.authStateReady();

	return { firebaseServerApp, user: auth.currentUser };
}