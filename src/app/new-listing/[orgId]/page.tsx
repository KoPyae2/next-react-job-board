import { getUser } from "@workos-inc/authkit-nextjs"
import { OrganizationMembership, WorkOS } from "@workos-inc/node"
import '@radix-ui/themes/styles.css';
import JobForm from "@/app/components/JobForm";


type PageProps = {
    params: {
        orgId: string
    }
}

// export async function generateStaticParams() {
//     const { user } = await getUser();
//     const workos = new WorkOS(process.env.WORKOS_API_KEY);

//     const organizationMemberships = await workos.userManagement.listOrganizationMemberships({
//         userId: user?.id,
//     });

//     const activeOrganizationMemberships: OrganizationMembership[] = organizationMemberships.data.filter(om => om.status === 'active');

//     return activeOrganizationMemberships.map((membership) => ({
//         params: { orgId: membership.organizationId },
//     }));
// }

export default async function NewListingPageForOrganization(props: PageProps) {
    console.log(props.params.orgId);
    const { user } = await getUser()
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) return 'Please Login!';

    const orgId = props.params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({ userId: user.id, organizationId: orgId })

    const hasAccess = oms.data.length > 0;

    if (!hasAccess) return 'no access!'

    return (
        <JobForm orgId={orgId} />
    )
}


