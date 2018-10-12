module.exports = member => {
  let guild = member.guild;
  member.send('Görüşmek Üzere.');
  guild.defaultChannel.send(`${member.user.username} görüşmek üzere.`);
};
