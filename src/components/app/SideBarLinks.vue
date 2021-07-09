<template>
    <div class="SideBarLinks">
        <RouterLink to="/">
            <i class="fal fa-home"></i>

            <span>Home Page</span>
        </RouterLink>

        <RouterLink to="/asdas">
            <i class="fal fa-home"></i>

            <span>Home Page</span>
        </RouterLink>

        <RouterLink to="/sadasdasd">
            <i class="fal fa-home"></i>

            <span>Home Page</span>
        </RouterLink>
    </div>
</template>

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