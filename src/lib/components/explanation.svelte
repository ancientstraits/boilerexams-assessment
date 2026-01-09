<script lang="ts">
    import type { Explanation } from "$lib/question";

    type Props = {
        exp: Explanation
    }
    const { exp }: Props = $props()

    function getYTVideoID(url: string): string {
        const parsed = URL.parse(url)!
        if (parsed.host == 'youtu.be') {
            return parsed.pathname.substring(1)
        } else {
            // assume 'youtube.com'
            return parsed.searchParams.get('v')!
        }
    }

    function getYTStartTime(url: string): number | null {
        const parsed = URL.parse(url)!
        if (parsed.searchParams.has('t'))
            return parseInt(parsed.searchParams.get('t')!)
        else
            return null
    }

    function getYTEmbedURL(url: string): string {
        const id = getYTVideoID(url)
        const startTime = getYTStartTime(url)
        const startTimeParam = (startTime == null) ? '' : `?start=${startTime}`
        return `https://www.youtube.com/embed/${id}${startTimeParam}`
    }
</script>

{#snippet ytembed(url: string)}
    <iframe
        width="560" height="315"
        src={getYTEmbedURL(url)}
        title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
    ></iframe> 
{/snippet}

<div id="root">
    <h1>Explanation</h1>
    {exp.body}

    <h2>Resources</h2>
    {#each exp.resources as resource}
        <div id="resource">
            {#if resource.type == 'VIDEO'}
                {@render ytembed(resource.data.url)}
            {:else}
                <a href={resource.data.url}>Resource URL</a>
            {/if}
        </div>
    {/each}
</div>

<style>
    iframe {
        width: 100%;
    }
</style>
