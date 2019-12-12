import authController from '../controllers/auth';

export default (router) => {
  router.post('/login', authController.login);
  router.get('/verify', authController.verify);
  router.post('/register', authController.register);
}
