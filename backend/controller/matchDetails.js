const Match = require("../models/matchModel");

const getAllMatchDetails = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json({success: true,data: matches});
    } catch (err) {
        res.status(500).json({success: false,message: "Failed to retrieve match details",error: err.message});
    }
}

const getMatchById = async (req, res) => {
    try {
        const { id } = req.params;
        const match = await Match.findById(id);
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }
        res.status(200).json({
            success: true,
            data: match
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve match",
            error: err.message
        });
    }
};
const updateMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMatch = await Match.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedMatch) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Match updated successfully",
            data: updatedMatch
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update match",
            error: err.message
        });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMatch = await Match.findByIdAndDelete(id);

        if (!deletedMatch) {
            return res.status(404).json({
                success: false,
                message: "Match not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Match deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete match",
            error: err.message
        });
    }
};

module.exports = { getAllMatchDetails, getMatchById, updateMatch, deleteMatch };
