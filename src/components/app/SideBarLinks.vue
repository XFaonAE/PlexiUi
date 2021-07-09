<template>
    <div class="SideBarLinks">
        <RouterLink :to="link.href" v-for="link in links">
            <i :class="link.icon"></i>

            <span>
                {{ link.label }}
            </span>
        </RouterLink>
    </div>
</template>

<script>
export default {
    props: [
        "links"
    ]
}
</script>

<style lang="less">
@import "../Config";

.SideBarLinks {
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    display: flex;
    flex-direction: column;

    a {
        padding: 10px 20px;
        color: @text;
        text-decoration: none;
        transition-duration: @speedOut;
        opacity: 0.6;
        font-family: @fontMain;
        font-size: 13px;

        i {
            padding-right: 10px;
        }

        &:hover {
            opacity: 1;
            background: @layer1;
            transition-duration: @speedIn;
        }

        &.router-link-active {
            opacity: 1;
            color: @accent;
        }
    }
}
</style>