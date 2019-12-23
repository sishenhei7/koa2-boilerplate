import userController from '../controllers/user';

export default (router) => {
  router.get('/user', userController.getUser);
  router.delete('/user/:id', userController.deleteUser);
}
