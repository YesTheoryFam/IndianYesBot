module.exports = (bot) => {
  const activityGroupSchema = require("../Schemas/activityGroupSchema");

  bot.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (newPresence.user.bot) return;
    if (newPresence.guild.id !== "701088725605548133") return;

    const activities = newPresence.activities
    const [Activity] = newPresence.activities;
    if (!Activity) return;

    activities.forEach(async (eachActivity) => {
      if (eachActivity.name === 'Custom Status') return;

      const appName = eachActivity.name

      await activityGroupSchema.findOneAndUpdate(
        {
          appName
        },
        {
          $addToSet: {
            userIDs: newPresence.member.id,
          },
        },
        {
          upsert: true,
        }
      );

    })


  })

};
