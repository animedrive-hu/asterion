require("./../../util/function")();

module.exports = {
    config: {
        name: "mute",
        aliases: "",
        usage: "<@felhasználó> indoklás",
        category: "Mod Parancsok",
        description: "Adott felhasználó némítása",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} mute`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nincs megfelelő jogod a parancs használatához!`);
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)

        const user = message.mentions.users.first();
        const Reason = args.slice(1).join(' ');
        const tagrole = "681554417421516815";
        const muterole = "685743905777778738";
        const privchannel = message.member.guild.channels.cache.find(ch => ch.id === config.notifcationchannel);

        if (!user) {
            try {
                if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Nem találok felhasználót ezzel az ID-val!');

                user = message.guild.members.get(args.slice(0, 1).join(' '));
                user = user.user;
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} mute`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setDescription(`Nem találom a felhasználót!`);
                if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed)
            }
        }
        const selfmute = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} mute`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nem muteolhatod magad!`);
        if (user === message.author) return message.channel.send(selfmute);
        const noreason = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} mute`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`Nem adtál meg okot a mutera!`);
        if (!Reason) return message.channel.send(noreason);

        if (message.guild.member(user).roles.cache.has(tagrole)) {
            await message.guild.member(user).roles.remove(tagrole);
            await message.guild.member(user).roles.add(muterole);
            const mutenembed = new Discord.MessageEmbed()
                .setAuthor(`NÉMÍTOTTA:  ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setThumbnail(user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setColor('RED')
                .setTimestamp()
                .setDescription(`**CSELEKMÉNY**: NÉMÍTÁS
            **FELHASZNÁLÓ**: ${user.username}#${user.discriminator} (${user.id})
            **INDOKLÁS**: ${Reason}`);
            privchannel.send({ embed: mutenembed });
        } else if (message.guild.member(user).roles.cache.has(muterole)) {
            const alreadymuted = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${client.user.username} mute`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setDescription(`A felhasználó már némítva van!`);
            return message.channel.send(alreadymuted);
        }
    }
}
