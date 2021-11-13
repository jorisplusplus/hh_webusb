import Vue from 'vue';
import Router from 'vue-router';
import Apps from '@/components/Apps';
import Programming from '@/components/Programming';
import Update from '@/components/Update';
import Settings from '@/components/Settings';
import BadGateway from '@/components/BadGateway';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/hh_webusb/apps',
      name: 'Apps',
      component: Apps,
      props: { page: 1 },
    },
    {
      path: '/hh_webusb',
      name: 'Programming & Files',
      props: { page: 2 },
      component: Programming,
      alias: '/'
    },
    {
      path: '/hh_webusb/update',
      name: 'Update',
      props: { page: 3 },
      component: Update
    },
    {
      path: '/hh_webusb/settings',
      name: 'Settings',
      props: { page: 4 },
      component: Settings
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
      redirect: '/hh_webusb/404'
    }
  ]
})