const router = require('express').Router();
const dataMonitorRouter = require('./dataMonitor-routers');
const userMonitor = require('./user-routers');

router.use('/monitor', dataMonitorRouter);
router.use('/', userMonitor);

module.exports = router;
