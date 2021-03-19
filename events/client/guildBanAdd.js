require("./../../util/function")();

module.exports = async (client, user) => {
    const guildy = client.guilds.cache.get('702098578251841577');
    const channel = guildy.channels.cache.get(config.logchannel);

    console.log(user);

    const embed = new Discord.MessageEmbed()
        .setAuthor(`BAN, USER: ${user}`, client.user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        }))
        .setDescription(`${user} bannolva`)
        .setColor('RANDOM')
    return channel.send(embed);
}