const { getAllByBallDetails, getByBallByMatchId, updateByBallByMatchId, deleteByBallByMatchId } = require('../controller/byBallDetails');
const { isAdmin } = require('../middleware/authMiddleware');

module.exports = (router) => {
    router.get('/byballs', getAllByBallDetails);
    router.get('/byballs/:matchId', getByBallByMatchId);
    router.put('/byballs/:matchId', isAdmin, updateByBallByMatchId);
    router.delete('/byballs/:matchId', isAdmin, deleteByBallByMatchId);
};