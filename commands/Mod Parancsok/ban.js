require("./../../util/function")();

module.exports = {
    config: {
        name: "ban",
        aliases: "",
        usage: "<@felhasználó> indoklás",
        category: "Mod Parancsok",
        description: "Adott felhasználó kitiltása a szerverröl!",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} ban`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
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
                    .setAuthor(`${client.user.username} ban`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`HIBA! \n ${error}`);
                return message.channel.send(embed)
            }
        }
        const selfbanembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} ban`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nem bannolhatod magad!`);
        if (user === message.author) return message.channel.send(selfbanembed);
        const noreasonembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} ban`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nem adtál meg okot a banra!`);
        if (!Reason) return message.channel.send(noreasonembed);
        const nopermembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} ban`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`A botnak nincs meg a megfelelő joga!`);
        if (!message.guild.member(user).bannable) return message.channel.send(nopermembed);

        await message.guild.member(user).ban({ days: 0, reason: `${Reason}` });

        const banembed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`✅ ${user.tag} Sikeresen kitiltva`);
        message.channel.send({ embed: banembed });

        const privchannel = message.member.guild.channels.find(ch => ch.id === config.notifcationchannel);

        const banembed2 = new Discord.MessageEmbed()
            .setAuthor(`Bannolta: **${message.author.username}#${message.author.discriminator}**`, message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setColor('RED')
            .setTimestamp()
            .setDescription(`**CSELEKMÉNY**: Ban
        **FELHASZNÁLÓ**: ${user.username}#${user.discriminator} (${user.id})
        **INDOKLÁS**: ${Reason}`);
        privchannel.send({ embed: banembed2 });

    }
}
