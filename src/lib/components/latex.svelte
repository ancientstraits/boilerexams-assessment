<script lang="ts">
    import { katexRender } from '$lib/util'

    const { value } = $props()
</script>

<span>{@html katexRender(value)}</span>
