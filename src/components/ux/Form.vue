<template>
    <form class="Form">
        <div class="header">
            <span>
                {{ title }}
            </span>
        </div>

        <div class="inputs">
            <label v-for="input in inputs">
                {{ input.label }}
                <input :placeholder="input.placeholder" />
            </label>
        </div>

        <div class="footer">
            <Button class="submit">
                {{ submit }}
            </Button>

            <div class="links" v-if="links">
                <div class="link" v-for="link in links">
                    <span v-if="link.label">
                        {{ link.label }}
                    </span>

                    <RouterLink :to="link.href">
                        {{ link.link }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </form>
</template>

<script src="../../scripts/ux/Form.js"></script>
<style lang="less" src="../../styles/ux/Form.less"></style>