import { Client, Poll, Chat } from "whatsapp-web.js";
import { DAYS, POLL_OPTIONS, WEEKEND_OPTIONS } from "./consts";

export const sendPoll = async (
  client: Client,
  groupChat: Chat
): Promise<void> => {
  console.log(`📢 Found group: ${groupChat.name}`);
  let date = new Date();

  for (const day of DAYS) {
    date.setDate(date.getDate() + 1);
    let formattedDate: string = date.toLocaleDateString("en-GB"); 
    let pollOptions = POLL_OPTIONS;
    if (day === "סופ״ש") {
      pollOptions = WEEKEND_OPTIONS;
      date.setDate(date.getDate() + 1); 
      let formattedNextDate: string = date.toLocaleDateString("en-GB"); 
      formattedDate = `${formattedDate} - ${formattedNextDate}`;
    }

    const poll = new Poll(`מי פה ${day} - ${formattedDate}`, pollOptions);
    await client.sendMessage(groupChat.id._serialized, poll);
    console.log("📩 Poll sent successfully!");
  }
};
