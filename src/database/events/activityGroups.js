module.exports = (bot) => {
  const activityGroupSchema = require("../Schemas/activityGroupSchema");

  bot.on("presenceUpdate", async (oldPresence, newPresence) => {
    if (newPresence.user.bot) return;
    if (newPresence.guild.id !== "701088725605548133") return;

    const [Activity] = newPresence.activities;
    if (!Activity) return;

    await activityGroupSchema.findOneAndUpdate(
      {
        appName: Activity.name,
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
  });
};
