/**
 * Finds a WhatsApp group by its name.
 * @param {Object} client - The WhatsApp client instance.
 * @param {string} groupName - The name of the group to search for.
 * @returns {Object|null} - The group chat object if found, otherwise null.
 */
const findGroupByName = async (client, groupName) => {
  const chats = await client.getChats();
  return chats.find((chat) => chat.name.includes(groupName)) || null;
};

module.exports = { findGroupByName };
