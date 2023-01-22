import Vue from 'vue';
import Router from 'vue-router';
import Programming from '@/components/Programming';
import BadGateway from '@/components/BadGateway';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hh_webusb',
      name: 'Programming & Files',
      props: { page: 2 },
      component: Programming,
      alias: '/'
    },
    {
      path: '/hh_webusb/404',
      name: 'BadGateway',
      props: { page: 5 },
      component: BadGateway
    },
    {
      path: '*',
      props: { page: 5 },
      redirect: '/hh_webusb'
    }
  ]
})