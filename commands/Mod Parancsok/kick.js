require("./../../util/function")();

module.exports = {
    config: {
        name: "kick",
        aliases: "",
        usage: "<@felhasználó> indoklás",
        category: "Mod Parancsok",
        description: "Adott felhasználó kirúgása a szerverröl!",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} kick`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nincs megfelelő jogod a parancs használatához!`);
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)

        const user = message.mentions.users.first();
        const Reason = args.slice(1).join(' ');

        if (!user) {
            try {
                if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Nem találok felhasználót ezzel az ID-val!');

                user = message.guild.members.get(args.slice(0, 1).join(' '));
                user = user.user;
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} kick`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Nem találm a felhasználót!`);
                if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)
            }
        }

        if (user === message.author) return message.channel.send('Nem kickelheted magad!');
        if (!Reason) return message.reply('Nem adtál meg okot a kickre!');
        if (!message.guild.member(user).kickable) return message.reply('A botnak nincs meg a megfelelő joga!');
    }
}
