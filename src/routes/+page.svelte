<script lang="ts">
    import Footer from "$lib/components/footer.svelte";
    import Header from "$lib/components/header.svelte";
    import Question from "$lib/components/question.svelte";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props()
</script>

<Header />

<main>
    <Question question={data.question} />
</main>

<Footer />

<style>
    main {
        margin: 0 10%;
    }
</style>
