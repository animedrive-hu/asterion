require("./../../util/function")();

module.exports = {
    config: {
        name: "notify",
        aliases: "",
        usage: "",
        category: "Bot Parancsok",
        description: "Meg kapod az újdonságok rangot!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        let lewdrole = "717142669096255549";
        if (message.guild.member(message.author).roles.cache.has(lewdrole)) {
            await message.guild.member(message.author).roles.remove(lewdrole);
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.author}: Mostantól nem fogsz értesítést kapni az újdonságokról!`);
            return message.channel.send(embed);
        }
        await message.guild.member(message.author).roles.add(lewdrole);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author}: Mostantól értesülni fogsz az újdonságokról!`);
        return message.channel.send(embed);
    }
}