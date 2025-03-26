import { Client, Chat } from "whatsapp-web.js";

export const findGroupByName = async (
  client: Client,
  groupName: string
): Promise<Chat | undefined> => {
  const chats = await client.getChats();
  return chats.find((chat) => chat.name.includes(groupName));
};
