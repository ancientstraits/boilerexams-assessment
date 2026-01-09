<br style="line-height: 100px;">

<div id="root">
    <div class="col">
        <b><i>BoilerExams</i></b>
    </div>
    <div class="col">
        <ul id="linklist">
            <l1><a href="whatwhat.com">GitHub page</a></l1>
            <l1><a href="">This page</a></l1>
            <l1><a href="">The actual BoilerExams page</a></l1>
        </ul>
    </div>
</div>

<style>
    #root {
        width: 100%;
        background: black;
        color: white;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    #linklist {
        display: flex;
        flex-direction: column;
    }
    #linklist a {
        padding: 5px;
        color: cyan;
    }
    #linklist a:visited {
        color: magenta;
    }
</style>
