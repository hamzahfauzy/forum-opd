var Vue = require('vue');
window.Swal = require('sweetalert2')

Vue.component('index-component', require('./src/components/IndexComponent.vue').default);
Vue.component('login-component', require('./src/components/LoginComponent.vue').default);

vue = new Vue({
    el:"#app"
})
