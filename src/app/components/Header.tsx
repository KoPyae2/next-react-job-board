import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
    const { user } = await getUser();
    // Get the URL to redirect the user to AuthKit to sign in
    const signInUrl = await getSignInUrl();
    return (
        <header>
            <div className="container flex items-center justify-between mx-auto my-4">
                <Link href={'/'} className="font-bold text-xl">Job Board</Link>
                <nav className="flex gap-2 items-center *:py-2 *:px-4 *:rounded-md">
                    {
                        !user ?
                            <Link href={signInUrl} className="bg-gray-200">Login</Link>
                            :
                            <form action={async () => {
                                'use server';
                                await signOut();
                            }}>
                                <button className="bg-gray-200 py-2 px-4 rounded-md">Logout</button>
                            </form>

                    }

                    <Link href={'/new-listing'} className="bg-blue-600 text-white">Post a job</Link>
                </nav>
            </div>
        </header>
    )
}