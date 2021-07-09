<template>
    <div class="MarkDown"></div>
</template>

<script>
import marked from "marked";
import $ from "jquery";
import hljs from "highlight.js";

export default {
    props: [
        "md"
    ],
    mounted() {
        let markdown = this.md.replace(/\\n/g, "\n");

        $(this.$el).html(marked(this.md ? markdown : "## No markdown provided"));
        hljs.highlightAll();
    }
}
</script>

<style lang="less">
@import "../Config";

.MarkDown {
    user-select: text;

    @string: fade(@accent, 70%);

    .hljs-keyword {
        color: #50ffff;
    }

    .hljs-variable {
        color: #888888;
    }

    .hljs-title {
        color: @text;

        &.function_ {
            color: @accent;
        } 

        &.class_ {
            color: @accent;
        }
    }

    .hljs-string {
        color: @string;
    }

    h1, h2, h3, h4, h5, h6 {
        color: @text;
        font-family: @fontMain;
        font-weight: lighter;
        margin: 0 0 20px 0;
        word-break: break-word;
    }

    h1, h2, h3 {
        border-bottom: 1px solid fade(@text, 10%);
        padding-bottom: 20px;
    }

    h4, h5, h6 {
        opacity: 70%;
    }

    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 20px;
    }

    h3 {
        font-size: 18px;
    }

    h4 {
        font-size: 15px;
    }

    h5 {
        font-size: 13px;
    }

    h6 {
        font-size: 11px;
    }

    p {
        color: @text;
        font-family: @fontMain;
        font-size: 13px;
    }

    a {
        transition-duration: @speedOut;
        color: @accent;
        text-decoration: none;
        word-break: break-all;
        white-space: pre-wrap;
        font-family: @fontMain;
        padding-bottom: 1px;

        &:hover {
            transition-duration: @speedIn;
            opacity: 0.6;
        }
    }

    code {
        font-family: @fontMain;
        padding: 3px 5px;
        margin: 0 3px;
        background: @layer2;
        border-radius: 2px;
    }

    pre {
        color: @text;
        background: @layer2;
        padding: 10px;
        border-radius: 4px;
        max-width: 100%;

        code {
            font-family: @fontMain;
            font-size: 12px;
            word-break: break-all;
            white-space: pre-wrap;
            max-width: 100%;
        }
    }

    ul {
        list-style: none;
        padding: 0px;

        li {
            color: @text;
            font-family: @fontMain;
            font-size: 13px;
            margin: 5px 0px;

            &:before {
                content: "-";
                padding: 0px 10px;
            }
        }
    }

    img {
        max-width: 100%;
    }
}
</style>