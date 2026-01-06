import client from '@/lib/supabaseClient'

export default async function IsAuthenticated() {
    const { data: { user }, error } = await client.auth.getUser();
    const { data } = await client.auth.getSession()
    return (
        <div><pre>{JSON.stringify(data, null, 2)}</pre></div>
    )
}
