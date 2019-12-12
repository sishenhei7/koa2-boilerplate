import userController from '../controllers/user';

export default (router) => {
  router.get('/user', userController.getAllUsers);
}
