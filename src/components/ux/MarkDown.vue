<template>
    <div class="MarkDown">
        <slot />
    </div>
</template>

<style lang="less">
@import "../Config";

.MarkDown {
    h1, h2, h3, h4, h5, h6 {
        color: @text;
        font-family: @fontMain;
        font-weight: lighter;
    }

    h1, h2, h3 {
        border-bottom: 1px solid fade(@text, 10%);
        padding-bottom: 20px;
        margin: 30px 0px 5px 0px;
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
        background: @layer0;
        border-radius: 2px;
    }

    pre {
        color: @text;
        background: @layer0;
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