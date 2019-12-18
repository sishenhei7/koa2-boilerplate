import blogController from '../controllers/blog';

export default (router) => {
  router.get('/blog', blogController.getBlog);
  router.post('/blog', blogController.createBlog);
  router.get('/blog/:id', blogController.getBlogById);
  router.put('/blog/:id', blogController.updateBlog);
  router.delete('/blog/:id', blogController.deleteBlog);
}
