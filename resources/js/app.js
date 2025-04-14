import "./bootstrap";

// Initialize loading progress indicator before everything else
import { viteLoadingTracker } from "./utils/viteLoadingProgress";
// Start loading indicator
viteLoadingTracker.init();

import "../css/app.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ZiggyVue } from "../../vendor/tightenco/ziggy";
import VueGuidedTour from "vue-guided-tour";
import "vue-guided-tour/style.css";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue"),
        ),
    setup({ el, App, props, plugin }) {
        const appInstance = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(VueGuidedTour)
            .mount(el);

        return appInstance;
    },
    progress: {
        color: 'cyan',
        showSpinner: true,
    }
});
