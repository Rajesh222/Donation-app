let router = require('express').Router();
const projectController = require('../controllers/project');
const userController = require('../controllers/user');

router.route('/user').get(userController.get);
router.route('/user').post(userController.create);
router.route('/user/:userId/donation').post(userController.addDonation);
router
  .route('/user/:userId/donation/:donationId')
  .delete(userController.deleteDonation);

router.route('/projects').get(projectController.get);

// Export API routes
module.exports = router;
