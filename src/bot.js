const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { sendPoll } = require("./poll.js");
const { findGroupByName } = require("./utils.js");
const {
  IS_CONNECTED,
  GROUP_NAME,
  START_DAY,
  DAYS_LIMIT,
} = require("./consts.js");

// Initialize the WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: IS_CONNECTED },
});

/**
 * Starts the WhatsApp bot.
 */
const startBot = () => {
  // Handle QR code generation for login
  client.on("qr", (qr) => {
    console.log("📲 Scan this QR code to log in:");
    qrcode.generate(qr, { small: true });
  });

  // Handle client readiness
  client.on("ready", async () => {
    console.log("✅ Client is ready!");

    const groupName = GROUP_NAME;
    const groupChat = await findGroupByName(client, groupName);

    if (groupChat) {
      console.log(`📢 Group "${groupName}" found!`);
      await sendPoll(client, groupChat, START_DAY, DAYS_LIMIT); // Send the poll to the group
    } else {
      console.log("❌ Group not found!");
    }

    setTimeout(async () => {
      await client.destroy();
      console.log("✅ Client closed.");
    }, 15000);
  });

  client.initialize();
};

module.exports = { startBot };
