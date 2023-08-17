import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './router'
import { apolloClient } from './graphql'


import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiArrowLeft, HiArrowRight } from "oh-vue-icons/icons";

addIcons(HiArrowLeft, HiArrowRight)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')
