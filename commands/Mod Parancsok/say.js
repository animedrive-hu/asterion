require("./../../util/function")();

module.exports = {
    config: {
        name: "say",
        aliases: "",
        usage: "mondanivaló!",
        category: "Mod Parancsok",
        description: "Ha ki szeretnél mondani valamit!",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} say`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nincs megfelelő jogod a parancs használatához!`);
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)

        let argsresult;
        let mChannel = message.mentions.channels.first()

        message.delete()
        if (mChannel) {
            argsresult = args.slice(1).join(" ")
            mChannel.send(argsresult)
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult)
        }
    }
}