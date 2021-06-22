import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import userMsg from './cmps/user-msg.js';
import {router} from './router.js'

const options = {
    el: '#app',
    router,
    template: `
<section>
    <app-header/>
    <router-view/>
    <user-msg/>
    <app-footer/>
</section>
`,
    components: {
        appHeader,
        appFooter,
        userMsg
    },
};

const app =new Vue(options);