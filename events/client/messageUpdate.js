require("./../../util/function")();

module.exports = async (client, oldMessage, newMessage) => {
	if (oldMessage.author.username == "Thanatos" || oldMessage.author.username == "Asterion") return;
    const guildy = client.guilds.cache.get('702098578251841577');
    const channel = guildy.channels.cache.get(config.logchannel);
    console.log('anyád');
    const embed = new Discord.MessageEmbed()
        .setAuthor(`ÜZENET SZERKESZTVE`, client.user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        }))
        .setDescription(`**erről:** \n **${oldMessage.author.username}:** ***${oldMessage}*** \n **erre:** \n **${newMessage.author.username}:** ***${newMessage}***`)
        .setColor('RANDOM')
        if (oldMessage == newMessage) return;
    return channel.send(embed);
}