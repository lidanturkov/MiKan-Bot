const { Poll } = require("whatsapp-web.js");
const { DAYS, POLL_OPTIONS, WEEKEND_OPTIONS } = require("./consts.js");

/**
 * Sends a poll to a WhatsApp group.
 * @param {Object} client - The WhatsApp client instance.
 * @param {Object} groupChat - The group chat object.
 * @param {string} startDay - The starting day for the poll (default: "שישי").
 * @param {number} daysLimit - The number of days to generate polls for (default: 1).
 */
const sendPoll = async (client, groupChat, startDay, daysLimit) => {
  console.log(`📢 Found group: ${groupChat.name}`);
  let date = new Date();

  // Adjust start day if it's "שבת"
  if (startDay === "שבת") {
    startDay = "שישי";
  }

  // Find the index of the start day in the DAYS array
  const dayIndex = DAYS.indexOf(startDay);
  if (dayIndex === -1) {
    console.error(`❌ Invalid start day: ${startDay}`);
    return;
  }

  // Calculate the number of days until the start day
  const currentDayIndex = date.getDay();
  const daysUntilStart = (dayIndex - currentDayIndex + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilStart);

  // Generate polls for the specified number of days
  for (let i = 0; i < daysLimit; i++) {
    let day = DAYS[(dayIndex + i) % DAYS.length];
    let formattedDate = date.toLocaleDateString("en-GB");
    let pollOptions = POLL_OPTIONS;

    // Handle special case for "שישי" (weekend)
    if (day === "שישי") {
      pollOptions = WEEKEND_OPTIONS;
      date.setDate(date.getDate() + 1);
      let formattedNextDate = date.toLocaleDateString("en-GB");
      formattedDate = `${formattedDate} - ${formattedNextDate}`;
      day = "סופ\"ש";
    }

    const poll = new Poll(`מי פה ${day} - ${formattedDate}`, pollOptions);
    console.log(poll);

    await client.sendMessage(groupChat.id._serialized, poll);
    console.log("📩 Poll sent successfully!");

    // Move to the next day
    date.setDate(date.getDate() + 1);
  }
};

module.exports = { sendPoll };
