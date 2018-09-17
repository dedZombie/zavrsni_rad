import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import NewCar from '@/components/NewCar';
import ViewCar from '@/components/ViewCar';
import EditCar from '@/components/EditCar';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/new',
            name: 'new-car',
            component: NewCar
        },
        {
            path: '/edit/:car_id',
            name: 'edit-car',
            component: EditCar
        },
        {
            path: '/:car_id',
            name: 'view-car',
            component: ViewCar
        }
    ]
})