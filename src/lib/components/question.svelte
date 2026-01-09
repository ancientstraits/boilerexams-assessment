<script lang="ts">
    import type { Question } from '$lib/question'
    import { indexToLetter } from '$lib/util'
    import { onMount } from 'svelte';
    import Explanation from './explanation.svelte';
    import Latex from "./latex.svelte";

    type Props = { question: Question }
    const { question }: Props = $props()
    let chosenAnswer = $state<number | null>(null)
    let error = $state<string | null>(null)
    let reveal = $state(false)

    function reload() {
        const choicesDiv = document.querySelector('#choices')!
        for (const child of choicesDiv.children) {
            const input: HTMLInputElement = child.querySelector('input')!
            input.checked = false
        }
        window.location.reload()
    }

    function showCongrats(): boolean {
        return reveal && (chosenAnswer != null) && question.data.solution.includes(chosenAnswer);
    }

    function getSubmissionPercent(i: number): string {
        const submissions = question.data.answerChoices.map(choice => choice.stats.count)
        const totalSubmissions = submissions.reduce((a, b) => a + b)
        const proportion = submissions[i] / totalSubmissions
        const percent = `${Math.round(proportion * 100)}%`
        return percent
    }


    function answerChoiceClass(i: number): string {
        if (!reveal) return ''
        return question.data.solution.includes(i) ? 'correct' : 'incorrect'
    }

    let onsubmit = (e: SubmitEvent) => {
        e.preventDefault()
        if (chosenAnswer == null) {
            error = 'Please choose an answer.'
            return
        }
        error = ''
        reveal = true
    }
</script>

<div id="question">
    <form id="question-form" {onsubmit}>
        <h1><Latex value={question.data.body} /></h1>

        {#if !reveal && error != null}
            <div id="error">
                {error}
            </div>
        {/if}

        {#if reveal}
            {#if chosenAnswer != null && question.data.solution.includes(chosenAnswer)}
                <div id="congrats">
                    Great job! You got the question correct.
                </div>
            {:else}
                <div id="ohno">
                    You didn't get the question correct, but that's okay.
                    <button onclick={() => reload()}>Try again?</button>
                </div>
            {/if}
        {/if}

        <div id="choices">
            {#each question.data.answerChoices as choice, i}
                <label class={['choice', answerChoiceClass(i)]}>
                    <input
                        type="radio" name="question"
                        bind:group={chosenAnswer} value={i}
                        disabled={reveal}
                    />
                    ({indexToLetter(i)}): <Latex value={choice.body} />

                    <span class={['stats', reveal ? 'show' : '']}>({getSubmissionPercent(i)} of people answered this)</span>
                </label>
            {/each}
        </div>

        <input type="submit" value="Reveal" />
    </form>

    <div class={['explanation', reveal ? 'show' : '']}>
        <br style="line-height: 40px;" />
        <Explanation exp={question.explanation} />
    </div>
</div>

<style>
    #error, #ohno, #congrats {
        font-weight: bold;
        padding: 10px;
        border: 2px solid #AAA;
        text-align: center;
    }
    #error, #ohno {
        color: rgb(128, 0, 0);
        border-color: red;
        background-color: #FCC;
    }
    #congrats {
        color: rgb(0, 128, 0);
        border-color: green;
        background-color: #CFC;
    }
    
    h1 {
        font-weight: normal;
    }

    .stats {
        position: absolute;
        right: 15px;
        opacity: 0;
        transition: opacity 0.2s;
    }
    .stats.show {
        opacity: 0.7;
    }

    .explanation {
        opacity: 0;
        transition: opacity 0.2s;
        user-select: none;
    }
    .explanation.show {
        opacity: 1;
        user-select: text;
    }

    button {
        color: black;

        display: inline-block;
        border: 2px solid #AAA;
        margin: 0;
        padding: 5px;
        background-color: white;

        transition: all 0.2s;
    }
    button:hover {
        background-color: #AAA;
        border-color: black;
    }
    button:active {
        background-color: black;
        color: white;
    }

    input[type=submit] {
        color: white;

        display: inline-block;
        border: 2px solid #AAA;
        margin: 0;
        padding: 10px;
        background-color: black;

        font-size: x-large;

        transition: all 0.2s;
    }
    input[type=submit]:hover {
        background-color: #AAA;
        border-color: black;
    }
    input[type=submit]:active {
        background-color: white;
        color: black;
    }

    .choice:has(input:checked) {
        background-color: rgb(110, 197, 255);
        border-color: #3bb7ff;
    }

    .choice.correct:has(input:checked) {
        background-color: #86ff57;
        color: black;
    }
    .choice.incorrect:has(input:checked) {
        background-color: #ff6f6f;
        color: black;
    }

    @media (max-width: 600px) {
        .choice.correct, .choice.incorrect {
            padding-bottom: 40px !important;
        }

        .stats {
            bottom: 10px;
        }
    }

    .choice {
        display: block;

        font-size: larger;

        margin: 10px 0;
        padding: 10px;

        border-width: 2px;
        border-style: solid;
        border-color: black;

        cursor: pointer;

        position: relative;
        right: 0;
        transition: all 0.2s;
    }
    .choice:hover {
        right: 10px;
        background-color: #AAA;
    }

    .correct {
        color: white;
        background-color: darkgreen;
    }
    .incorrect {
        color: white;
        background-color: rgb(80, 0, 0);
    }
</style>
