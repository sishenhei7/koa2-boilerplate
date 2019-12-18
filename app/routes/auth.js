import authController from '../controllers/auth';

export default (router) => {
  router.post('/auth/login', authController.login);
  router.get('/auth/verify', authController.verify);
  router.post('/auth/register', authController.register);
  router.post('/auth/register/admin', authController.registerAdmin);
  router.post('/auth/register/root', authController.registerRoot);
}
