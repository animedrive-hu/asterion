require("./../../util/function")();

module.exports = {
    config: {
        name: "botinfo",
        aliases: "",
        usage: "",
        category: "Bot Parancsok",
        description: `Információk a bot rol`,
        accessableby: "Tag+"
    },
    run: async (client, message) => {
        var ping = Date.now() - message.createdTimestamp;
        var totalmem = 0;
        var usedmem = 0;
        var cpuUsage = 0;
        var cpu_name = os.cpus()[0].model;
        var os_uptime = osu.sysUptime();
        var botuptime = Math.floor(client.uptime / 1000);
        var osinfo = "";
        await si.osInfo(function (data) {
            osinfo = data.distro + data.release + `(${data.codename})`;
        })
        await si.currentLoad(function (data) {
            cpuUsage = data.currentload;
        })
        await si.mem(function (data) {
            totalmem = data.total;
            totalmem = totalmem / 1073741824;
            usedmem = data.used;
            usedmem = data.used / 1073741824
        })
        function secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? " nap, " : " nap, ") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " óra, " : " óra, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " perc, " : " perc, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " másodperc" : " másodperc") : "0";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} info`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setTimestamp()
            .addField("Felhasználók | ", client.users.cache.size, true)
            .addField("Szerverek | ", client.guilds.cache.size, true)
            .addField("Szobák  ", client.channels.cache.size, true)
            .addField("Futási idő", `${secondsToDhms(botuptime)}`)
            .addField("Létrehozva", (client.user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
            .addField("Verzió:", `Discord.js: ${package.dependencies["discord.js"]} | ${client.user.username}: ${package.version}`)
            .addField("Fejlesztő:", `BlackFire#0069`)
            .addField("HOSZT RENDSZER:", `${osinfo}`)
            .addField("CPU model ", `${cpu_name}`)
            .addField("FUTÁSI IDŐ", `${secondsToDhms(os_uptime)}`)
            .addField("Memoria használat | ", `${usedmem.toFixed(1)} GB / ${totalmem.toFixed(1)} GB`, true)
            .addField("CPU használat | ", `${cpuUsage.toFixed(1)}%`, true)
            .addField("Ping", `${ping}ms`, true)
            .setFooter(`© ${client.user.username} | info parancs`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }));

        return message.channel.send(embed);

    }
}