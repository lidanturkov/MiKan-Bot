import { Client, LocalAuth } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import { sendPoll } from "./poll";
import { findGroupByName } from "./utils";
import { IS_CONNECTED, GROUP_NAME } from "./consts";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: IS_CONNECTED },
});

export const startBot = (): void => {
  client.on("qr", (qr) => {
    console.log("Scan this QR code to log in:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", async () => {
    console.log("✅ Client is ready!");

    const groupName = GROUP_NAME; // Change this to your group name
    const groupChat = await findGroupByName(client, groupName);

    if (groupChat) {
      await sendPoll(client, groupChat);
    } else {
      console.log("❌ Group not found!");
    }
  });

  client.initialize();
}
