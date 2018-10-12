module.exports = member => {
    let username = member.user.username;
    member.send('Hoşgeldin , Rolün Otomatik Olarak Topluluk Üyesine Aktarıldı. **' + username + '**!');
    member.guild.defaultChannel.send('hg '+username+'');
};
