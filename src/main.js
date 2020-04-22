import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/tailwind.css'
import VueSnackbar from '@/plugins/vue-snack/vue-snack.min.js'
import '@/plugins/vue-snack/vue-snack.min.css'

Vue.config.productionTip = false

Vue.use(VueSnackbar, {
  position: 'top-right',
  time: 5000,
  methods: [{
    name: 'success',
    color: '#00ff8c'
  }, {
    name: 'error',
    color: '#ff0051'
  }]
})

new Vue({
  router,
  render: function (h) {
    return h(App)
  },
  mounted: function () {

    window.addEventListener("offline", () => {
      this.$snack.error({
        text: "Sorry, you're offline",
        button: "OK"
      });
    });
    window.addEventListener("online", () => {
      this.$snack.success({
        text: "Yaay! connectivity restored",
        button: "OK"
      });
    });
  }
}).$mount('#app')