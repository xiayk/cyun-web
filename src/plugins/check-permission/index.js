import iView from "iview";

export default {
    install(vue) {
        vue.mixin({
            methods: {
                checkPermission(routerName) {
                    return this.$store.state.app.accessRouter.includes(
                        routerName
                    );
                }
            }
        });
    }
};
