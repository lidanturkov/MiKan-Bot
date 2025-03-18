import { Client, Poll, Chat } from "whatsapp-web.js";
import { DAY, POLL_OPTION } from "./consts";

export const sendPoll = async (
  client: Client,
  groupChat: Chat
): Promise<void> => {
  console.log(`📢 Found group: ${groupChat.name}`);

  const pollOptions: string[] = POLL_OPTION;
  for (const day of DAY) {
    const poll = new Poll(`מי פה ${day}`, pollOptions);
    await client.sendMessage(groupChat.id._serialized, poll);
    console.log("📩 Poll sent successfully!");  
  }

};
