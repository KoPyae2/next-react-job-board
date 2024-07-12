import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import createCompany from "../action/workosAction";

export default async function NewCompany() {
    const { user } = await getUser();

    async function handleNewFormSubmit(data: FormData) {
        'use server'
        if(user)
        await createCompany(data.get('newCompanyName') as string, user.id)
    }

    if(!user){
        'login to use this page'
    }

    return (
        <div className="container">
            <div>
                <h2 className="text-lg mt-6">Create a new company</h2>
                <p className="text-gray-500 text-sm mb-2">To create a job listin your first need to register a company</p>
                <form className="flex gap-2" action={handleNewFormSubmit}>
                    <input className="p-2 border border-gray-400 rounded-md" type="text" name="newCompanyName" placeholder="company name" />
                    <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md" type="submit">
                        Create company
                        {/* <FontAwesomeIcon className="h-4" icon={faArrowRight} /> */}
                    </button>
                </form >
            </div>
        </div>
    )
}