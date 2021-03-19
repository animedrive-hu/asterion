require("./../../util/function")();

module.exports = {
    config: {
        name: "avatar",
        aliases: "",
        usage: "@(USER)",
        category: "Bot Parancsok",
        description: `A FELHASZNÁLÓ AVATÁRJÁNAK MEGTEKINTÉSE!`,
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        var user = message.mentions.users.first() || message.author
        let cel = args[0]
        let uicon = user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        });
        let userembed = new Discord.MessageEmbed()
            .setDescription(`${user.username} avatárja`)
            .setColor("RANDOM")
            .setImage(uicon)
            .setFooter(`© ${client.user.username} | avatár parancs`, client.user.displayAvatarURL);

        return message.channel.send(userembed);

    }
}