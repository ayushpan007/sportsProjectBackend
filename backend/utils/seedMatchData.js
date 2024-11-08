const matchData = require("./dataToBeSeeded.json");
const Match = require("../models/matchModel");
const ByBall = require("../models/byBallModels");

const seedMatchData = async () => {
    try {
        for (const data of matchData) {
            const existingMatch = await Match.findOne({
                matchName: data.info.event.name,
                date: new Date(data.info.dates[0])
            });

            if (existingMatch) {
                console.log(`Match ${data.info.event.name} on ${data.info.dates[0]} already exists. Skipping.`);
                continue;
            }
            const match = new Match({
                matchName: data.info.event.name,
                city: data.info.city,
                venue: data.info.venue,
                date: new Date(data.info.dates[0]),
                team1: data.info.teams[0],
                team2: data.info.teams[1],
                outcome: `${data.info.outcome.winner} Wins by ${data.info.outcome.by.runs} runs`,
                overs: data.info.overs,
                playerOfTheMatch: data.info.player_of_match[0]
            });
            const savedMatch = await match.save();

            console.log('Match data seeded successfully:', savedMatch);

            const inningsData = data.innings.map((inning) => {
                return {
                    team: inning.team,
                    overs: inning.overs.map((over) => {
                        return {
                            over: over.over,
                            
                            deliveries: over.deliveries.map((delivery) => {
                                const deliveryData = {
                                    batter: delivery.batter,
                                    bowler: delivery.bowler,
                                    non_striker: delivery.non_striker,
                                    runsPerOver: delivery.runs.total,
                                    wickets: delivery.wickets ? delivery.wickets.map((wicket) => ({
                                        kind: wicket.kind,
                                        player_out: wicket.player_out
                                    })) : []
                                };
                                return deliveryData;
                            })
                        };
                    })
                };
            });

            const playersTeam1 = {
                teamName: data.info.teams[0],
                players: data.info.players[data.info.teams[0]]
            };

            const playersTeam2 = {
                teamName: data.info.teams[1],
                players: data.info.players[data.info.teams[1]]
            };

            const byBallRecord = new ByBall({
                match: savedMatch._id,
                playersTeam1,
                playersTeam2,
                innings: inningsData,
                totalTarget:data?.innings[1]?.target?.runs,
            });
            await byBallRecord.save();
            console.log('Data saved successfully!');
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

module.exports = { seedMatchData };
