module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Birth of a new system. ${client.user.tag} is online`);
  },
};
