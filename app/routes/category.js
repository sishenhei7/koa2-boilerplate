import categoryController from '../controllers/category';

export default (router) => {
  router.get('/category', categoryController.getCategory);
}
