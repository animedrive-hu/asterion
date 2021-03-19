require("./../../util/function")();

module.exports = {
    config: {
        name: "rules",
        aliases: "",
        usage: "",
        category: "Mod Parancsok",
        description: "Szabályok kiírása!",
        accessableby: "Moderátor+"
    },
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username}`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setDescription(`U CANT USE THIS COMMAND! :(`);
        if (!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.channel.send(embed);

        const embed1 = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`RULES`)
            .setDescription(`1.: **ÁLTALÁNOS SZABÁLYOK**\n
                            1.1 Kövesd a https://discordapp.com/terms és https://discordapp.com/guidelines -ban leírtakat! \n
                            1.2 **Tisztelettel** bánj mindenkivel!\n
                            1.3 **Ne** spamelj vagy floodolj!\n
                            1.4 Káromkodást kerüld el!\n
                            1.5 Az önreklámozás **tilos!**\n
                            1.6 **Ne** kelts semmi féle feszültséget vagy drámát!`);

        const embed2 = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`2.: **FONTOS SZABÁLYOK**\n
            2.1 **Ne** másokon vezesd le a dühödet!\n
            2.2 **Ne** kisérelj meg átverést vagy megtévesztést!\n
            2.3 Semmilyen formában nem türjük el az NSFW tartalmat! (Se profilkép, név, üzenet, kép/videó, státusz formájában!)\n
            2.4 Amikor a szöveg környezet megköveteli használd a discord beépített spoiler funkcióját: \\||spoiler||\n
      2.5 Bármi féle rasszista, homofób megnyilvánulás és/vagy bármi féle gyülöletbeszéd fokozottan **tilos**!`);
        const embed3 = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`3.: **MINDENKÉPP BETARTANDÓ SZABÁLYOK**\n
                3.1 Mások azonosságának lopása vagy imitálása és személyes információk kiadása szigorúan **tilos**!\n
                3.2 Torrent, lehetséges fertöző vagy adat halász fileok/linkek megosztása szigoróan **tilos**!\n
        3.3 Multi-account használata **azonnali ban**-t eredményez!\n
                3.4 Bármilyen depressziv vagy öngyilkosságal kapcsolatos fölösleges üzenet törölve lesz! Ha problémád van keress valós segítséget, vagy akár beszélhetsz is róla de fogadd meg mások tanácsát, és magyarázd el a dolgokat rendesen!`);
        const embed4 = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`A SZABÁLYOK A HANG ALAPÚ CSATORNÁKÁRA IS ÉRVÉNYESEK!`);

        const embed5 = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`ÍRD BE HOGY "elfogadom" A SZABÁLYZAT ELFOGADÁSÁHOZ, ÉS A SZERVERHEZ VALÓ HOZZÁFÉRÉSHEZ!`)
            .setDescription(`Ha **nem** tartod be ezeket a szabályokat, miután elfogadtad azokat, az a szerverhez való elérésének elvesztését eredményezheti.\n\n
            Ezek a szabályok nem terjednek ki minden lehetséges esetre, ha valamire itt nem térünk ki, vagy ha nem közvetlenül tartozik ezekbe a szabályokba, akkor **a döntés a staff feladata**.`);
        if (message.channel.id == "702121854307139594") {
            await message.channel.send(embed1);
            await message.channel.send(embed2);
            await message.channel.send(embed3);
            await message.channel.send(embed4);
            message.channel.send(embed5);
        } else {
            await message.channel.send(embed1);
            await message.channel.send(embed2);
            await message.channel.send(embed3);
            message.channel.send(embed4);
        }
    }
}
