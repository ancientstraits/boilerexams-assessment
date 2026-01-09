import type { PageServerLoad } from "./$types";

const URL = 'https://api.boilerexams.com/questions/d44531f1-3cf7-404d-bd10-e9a786484b8a'

export const load: PageServerLoad = async ({params}) => {
    const resp = await fetch(URL)
    const json = await resp.json()

    return { question: json }
}
