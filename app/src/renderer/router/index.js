import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

const Meeting = _import('meeting/index');
const Join = _import('join/index');

Vue.use(Router);

export const constantRouterMap = [{
  path: '/',
  redirect: '/join',
  hidden: true
}, {
  path: '/join',
  component: Join,
  hidden: true
}, {
  path: '/meeting',
  component: Meeting,
  hidden: true
}]

export default new Router({
  routes: constantRouterMap
});

