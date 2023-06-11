const router = require('express').Router();
const thirdPartyRoutes = require('./third-party');

// put authMiddleware anywhere we need to send a token for verification of user
router.use('/thirdparty', thirdPartyRoutes);

module.exports = router;
