import commentController from '../controllers/comment';

export default (router) => {
  router.post('/comment', commentController.createComment);
  router.delete('/comment', commentController.deleteComment);
}
