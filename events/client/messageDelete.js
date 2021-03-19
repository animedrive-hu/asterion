require("./../../util/function")();

module.exports = async (client, message) => {
    const guildy = client.guilds.cache.get('702098578251841577');
    const channel = guildy.channels.cache.get(config.logchannel);

    const embed = new Discord.MessageEmbed()
        .setAuthor(`ÜZENET TÖRÖLVE`, client.user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        }))
        .setTitle('ÜZENET:')
        .setDescription(`**${message.author.username}:** ***${message}***`)
        .setColor('RANDOM');
    return channel.send(embed);
}