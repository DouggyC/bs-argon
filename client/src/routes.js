/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.js';
import Users from 'views/examples/Users.js';
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Forget from './views/examples/Forget';

const routes = [
 {
  path: '/index',
  name: 'Dashboard',
  icon: 'ni ni-tv-2 text-primary',
  component: Index,
  layout: '/admin',
 },

 {
  path: '/users',
  name: 'Users',
  icon: 'ni ni-single-02 text-yellow',
  component: Users,
  layout: '/admin',
 },

 {
  path: '/register',
  name: 'Register',
  icon: 'ni ni-circle-08 text-pink',
  component: Register,
  layout: '/auth',
 },

 {
  path: '/login',
  name: 'Login',
  icon: 'ni ni-key-25 text-info',
  component: Login,
  layout: '/auth',
 },

 {
  path: '/Forget',
  name: 'Forget',
  icon: 'ni ni-key-25 text-info',
  component: Forget,
  layout: '/auth',
 },
];
export default routes;
