import commentController from '../controllers/comment';

export default (router) => {
  router.get('/comment/:id', commentController.getComment);
  router.post('/comment', commentController.createComment);
  router.delete('/comment/:id', commentController.deleteComment);
}
