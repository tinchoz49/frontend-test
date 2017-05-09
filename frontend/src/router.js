import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

const routes = [
  { name: 'home', path: '/' },
  { name: 'create', path: '/create' },
  { name: 'view', path: '/view/:id' }
];

const router = createRouter(routes, {
  trailingSlash: true,
  defaultRoute: 'home'
})
  .usePlugin(browserPlugin({
    useHash: false
  }))
  .usePlugin(listenersPlugin());

export default router;
