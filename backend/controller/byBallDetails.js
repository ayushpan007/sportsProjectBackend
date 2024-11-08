const ByBall = require("../models/byBallModels");

const getAllByBallDetails = async (req, res) => {
    try {
        const byBalls = await ByBall.find().populate('match');
        res.status(200).json({ success: true, data: byBalls });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to retrieve by-ball details", error: err.message });
    }
};

// const getByBallById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const byBall = await ByBall.findById(id).populate('match');

//         if (!byBall) {
//             return res.status(404).json({
//                 success: false,
//                 message: "By-ball data not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: byBall
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve by-ball data",
//             error: err.message
//         });
//     }
// };

// const updateByBall = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedByBall = await ByBall.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedByBall) {
//             return res.status(404).json({
//                 success: false,
//                 message: "By-ball data not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "By-ball data updated successfully",
//             data: updatedByBall
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update by-ball data",
//             error: err.message
//         });
//     }
// };

// const deleteByBall = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedByBall = await ByBall.findByIdAndDelete(id);

//         if (!deletedByBall) {
//             return res.status(404).json({
//                 success: false,
//                 message: "By-ball data not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "By-ball data deleted successfully"
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete by-ball data",
//             error: err.message
//         });
//     }
// };

const getByBallByMatchId = async (req, res) => {
    try {
        const { matchId } = req.params;
        const byBall = await ByBall.findOne({ match: matchId }).populate('match');

        if (!byBall) {
            return res.status(404).json({
                success: false,
                message: "By-ball data not found for this match ID"
            });
        }

        res.status(200).json({
            success: true,
            data: byBall
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve by-ball data",
            error: err.message
        });
    }
};

const updateByBallByMatchId = async (req, res) => {
    try {
        const { matchId } = req.params;
        const updatedByBall = await ByBall.findOneAndUpdate({ match: matchId }, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedByBall) {
            return res.status(404).json({
                success: false,
                message: "By-ball data not found for this match ID"
            });
        }

        res.status(200).json({
            success: true,
            message: "By-ball data updated successfully",
            data: updatedByBall
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update by-ball data",
            error: err.message
        });
    }

};

const deleteByBallByMatchId = async (req, res) => {
    try {
        const { matchId } = req.params;
        const deletedByBall = await ByBall.findOneAndDelete({ match: matchId });

        if (!deletedByBall) {
            return res.status(404).json({
                success: false,
                message: "By-ball data not found for this match ID"
            });
        }

        res.status(200).json({
            success: true,
            message: "By-ball data deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete by-ball data",
            error: err.message
        });
    }
};



module.exports = { getAllByBallDetails,getByBallByMatchId,updateByBallByMatchId,deleteByBallByMatchId };
