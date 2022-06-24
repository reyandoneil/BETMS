const router = require('express').Router();
const dataMonitorController = require('../controllers/dataMonitor-controller');
const authentication = require('../middleware/authentication');

router.use(authentication);
router.get('/data', dataMonitorController.getAllData);

module.exports = router;
