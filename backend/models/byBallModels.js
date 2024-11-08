const mongoose = require('mongoose');

const wicketSchema = mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    player_out: {
        type: String,
        required: true
    },
});

const deliverySchema = mongoose.Schema({
    batter: {
        type: String,
        required: true
    },
    bowler: {
        type: String,
        required: true
    },
    non_striker: {
        type: String,
        required: true
    },
    runsPerOver: {
        type: Number,
        required: true
    },
    wickets: [wicketSchema]
});

const overSchema = mongoose.Schema({
    over: {
        type: Number,
        required: true
    },
    deliveries: [deliverySchema]
});

const inningsSchema = mongoose.Schema({
    team: {
        type: String,
        required: true
    },
    overs: [overSchema]
});

const teamSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'Please add the team name']
    },
    players: {
        type: [String],
        required: [true, 'Please add the players for the team']
    }
});

const byBallSchema = mongoose.Schema(
    {
        match: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match',  // Reference to 'Match' schema
            required: true
        },
        playersTeam1: {
            type: teamSchema,
            required: [true, "Please add Team 1 and its players"]
        },
        playersTeam2: {
            type: teamSchema,
            required: [true, "Please add Team 2 and its players"]
        },
        totalTarget:{
            type:Number,
            required:[true,"Please add the Target Runs"]
        },
        innings: [inningsSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('byBallSchema', byBallSchema);
