import type { RequestHandler } from "@sveltejs/kit";

const URL = 'https://api.boilerexams.com/questions/d44531f1-3cf7-404d-bd10-e9a786484b8a'

export const GET: RequestHandler = async ({url}) => {
    const resp = await fetch(URL)
    const text = await resp.text()

    return new Response(JSON.stringify(text), {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
