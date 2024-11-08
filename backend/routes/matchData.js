const { getAllMatchDetails, getMatchById, updateMatch, deleteMatch } = require('../controller/matchDetails')
const {isAdmin} = require('../middleware/authMiddleware');

module.exports = (router) => {
    router.get('/matches', getAllMatchDetails);
    router.get('/matches/:id', getMatchById);
    router.put('/matches/:id', isAdmin, updateMatch);
    router.delete('/matches/:id', isAdmin, deleteMatch);  
};