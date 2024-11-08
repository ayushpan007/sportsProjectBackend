const mongoose = require('mongoose');

const matchSchema = mongoose.Schema(
    {
        matchName: {
            type: String,
            required: [true, 'Please add Match Name']
        },
        city: {
            type: String,
            required: [true, 'Please add City Name']
        },
        venue: {
            type: String,
            required: [true, 'Please add Venue Name']
        },
        date: {
            type: Date,
            required: [true, 'Please add Date Of the Match']
        },
        team1: {
            type: String,
            required: [true, 'Please add Team Name']
        },
        team2: {
            type: String,
            required: [true, 'Please add Team Name']
        },
        outcome: {
            type: String,
            default: null
        },
        overs: {
            type: Number,
            required: [true, 'Number of overs are required']
        },
        playerOfTheMatch: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Match', matchSchema);
