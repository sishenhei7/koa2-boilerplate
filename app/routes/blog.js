import blogController from '../controllers/blog';

export default (router) => {
  router.get('/blog', blogController.getAllBlog);
}
