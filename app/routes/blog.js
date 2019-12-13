import blogController from '../controllers/blog';

export default (router) => {
  router.get('/blog', blogController.getBlog);
  router.post('/blog', blogController.createBlog);
}
