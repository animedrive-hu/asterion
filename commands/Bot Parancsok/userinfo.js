require("./../../util/function")();

module.exports = {
    config: {
        name: "userinfo",
        aliases: "",
        usage: "(@személy)",
        category: "Bot Parancsok",
        description: `Információk a felhasználórol`,
        accessableby: "Tag+"
    },
    run: async (client, message) => {
        var con;

        con = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });
        // to avoid a hot loop, and to allow our node script to

        let target = message.mentions.users.first() || message.author;
        con.query('SELECT * FROM levelsys where id = ?', target.id, function (err, rows) {
            if (err) throw err;
            if (rows.length < 1) {
                con.query(`INSERT INTO levelsys (id, name, level, xp, balance, background, msgcount, lvlupnotifiy) VALUES ('${target.id}', '${target.username}', 0, 0, 1000, 'DEFAULT', 1, 'yes')`);
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.username} info`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setColor('RANDOM')
                    .setFooter(`© ${client.user.username} | info parancs`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(target.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setTimestamp()
                    .addField(
                        "Teljes felhasználónév",
                        `${target.username}#${target.discriminator}`
                    )
                    .addField("ID", target.id)
                    .addField("Regisztrált", (target.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
                    .addField("Csatlakozott", (message.guild.member(target).joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
                    .addField("Egyenleg", "nincs", true)
                    .addField("Szint", "nincs", true)
                    .addField("XP", `0/500`, true);
                return message.channel.send(embed);
            } else {
                let xp = rows[0].xp;
                let lvl = rows[0].level;
                let balance = rows[0].balance;

                let f = 0;
                let xpreq = 0;
                let prev = 500;
                if (lvl > 0) {
                    while (f != lvl) {
                        if (f <= 5) {
                            let next_lvl = prev + (prev * 0.15);
                            prev = next_lvl;
                        } else if (f <= 10 && f > 5) {
                            let next_lvl = prev + (prev * 0.10);
                            prev = next_lvl;
                        } else if (f <= 15 && f > 10) {
                            let next_lvl = prev + (prev * 0.09);
                            prev = next_lvl;
                        } else if (f <= 20 && f > 15) {
                            let next_lvl = prev + (prev * 0.08);
                            prev = next_lvl;
                        } else if (f <= 25 && f > 20) {
                            let next_lvl = prev + (prev * 0.07);
                            prev = next_lvl;
                        } else if (f <= 30 && f > 25) {
                            let next_lvl = prev + (prev * 0.06);
                            prev = next_lvl;
                        } else {
                            let next_lvl = prev + (prev * 0.05);
                            prev = next_lvl;
                        }
                        f++;
                        xpreq = parseFloat(prev).toFixed(0);
                    };
                } else {
                    xpreq = prev;
                }
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.username} info`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setColor('RANDOM')
                    .setFooter(`© ${client.user.username} | info parancs`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setThumbnail(target.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                    .setTimestamp()
                    .addField(
                        "Teljes felhasználónév",
                        `${target.username}#${target.discriminator}`
                    )
                    .addField("ID", target.id)
                    .addField("Regisztrált", (target.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
                    .addField("Csatlakozott", (message.guild.member(target).joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''))
                    .addField("Egyenleg", balance, true)
                    .addField("Szint", lvl, true)
                    .addField("XP", `${xp}/${xpreq}`, true);
                return message.channel.send(embed);
            }
        });
    }
}