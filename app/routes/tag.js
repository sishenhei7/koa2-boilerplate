import tagController from '../controllers/tag';

export default (router) => {
  router.get('/tag', tagController.getTag);
}
