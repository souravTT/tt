const router  = require('express').Router();
const homeController = require('../app/controllers/homeController');
const ttAPIController = require('../app/controllers/ttAPIController');
const destinationsController = require('../app/controllers/destinationsController');


module.exports = router;

/* GET home page. */
router.get('/', homeController.index);
router.get('/github_profile/:username', homeController.profile)
router.get('/get_url_data', homeController.get_url_data)


/* TT API */ 
router.get('/signin', ttAPIController.sign_in)
router.get('/auto_login', ttAPIController.auto_login)
router.post('/tt_login', ttAPIController.tt_login)
router.get('/tt_logout', ttAPIController.tt_logout)
router.get('/destinations', destinationsController.index);
router.get('/destinations/:id/testimonials', destinationsController.testimonials);
router.get('/destinations/:id/packages', destinationsController.packages);
router.get('/tour_package/:id/:base_url', destinationsController.tour_package);
