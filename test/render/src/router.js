import VueRouter from "vue-router";

export default new VueRouter({
    routes: [
        {
            path: "/",
            component: {
                template: "<p>Home</p>"
            }
        },
        {
            path: "/plexiui",
            component: {
                template: "<p>PlexiUI</p>"
            }
        }
    ]
});