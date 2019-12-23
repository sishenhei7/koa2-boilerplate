import categoryController from '../controllers/category';

export default (router) => {
  router.get('/category', categoryController.getCategory);
  router.delete('/category/:id', categoryController.deleteCategory);
}
