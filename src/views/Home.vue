<template>
    <div class="_view">
        <Form title="Test Form" submit="Submit" :inputs="[
            {
                label: 'Test Input A',
                placeholder: 'This is a test input',
                type: 'text'
            },
            {
                label: 'Test Input B',
                placeholder: 'This is also a test input',
                type: 'text'
            }
        ]" :links="[
            {
                label: 'Need a',
                link: 'Test?',
                href: '/'
            },
            {
                label: 'Also need a',
                link: 'Test?',
                href: '/'
            }
        ]" />
    </div>
</template>

<script>
import Form from '../components/ux/Form.vue'
import MarkDown from "../components/ux/MarkDown";

export default {
    components: {
        MarkDown, 
        Form
    },
};
</script>

<style lang="less" scoped>
@import "../components/Config";

._view {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    font-family: @fontLogo;
    color: @accent;
    letter-spacing: 10px;
    margin: 0 0 10px 0;
}
</style>
