import { auth, currentUser } from '@clerk/nextjs/server';

export const getSessionCurrentUser = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('Not signed in');
    }

    const user = await currentUser();
    return user;
}
