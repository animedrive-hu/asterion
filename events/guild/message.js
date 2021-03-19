require("../../util/function")();

module.exports = async (client, message) => {
    if (
        /(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content) &&
        !message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])
    ) {
        message.delete();
        embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setDescription(`<@!${message.author.id}> Nem küldhetsz Discord invite linkeket!`);
        return message.channel.send(embed);
    }
    if (message.channel.type == "dm") {
        let embed = "";
        if (message.author.id == config.ownerid || message.author.id == config.lovedid) {
            embed = new Discord.MessageEmbed()
                .setColor(`RANDOM`)
                .setDescription(`**SZERETLEK!**`);
        } else {
            embed = new Discord.MessageEmbed()
                .setColor(`RANDOM`)
                .setDescription(`**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!** \n**NE ZAKLASS!**`);
        };
        if (message.author.bot) {
            return;
        } else {
            return message.channel.send(embed);
        }
    };
    // declare stuff thet needs to be logged (expect content... that will be declared later)
    let channelname = message.channel.name;
    let channelid = message.channel.id;
    let msgID = message.id;
    let gid = message.guild.id;
    let gn = message.guild.name;
    let userid = message.author.id;
    let username = message.author.username;
    let avatar = message.author.avatarURL({
        format: 'png',
        dynamic: true,
        size: 2048
    });
    let displayname = message.guild.member(message.author).displayName;
    let currentdate = new Date();
    let datetime = currentdate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let msgtype = "text";
    let msgtxt = message.content;
    let fajlist = "null";
    // Text message logs
    if (message.channel.type === "text") {
        if (message.author.bot) {
            msgtype = "bot"
        };
        if (message.attachments.size > 0) {
            var Attachment = (message.attachments).array();
            fajlist = Attachment.map(fajlok => `${fajlok.url}`).join(' ')
            if (!msgtxt) {
                msgtxt = "null";
            }
        }
        var log = {
            datetime: datetime,
            guildname: gn,
            guildid: gid,
            channelname: channelname,
            channelid: channelid,
            username: username,
            displayname: displayname,
            userid: userid,
            avatar: avatar,
            msgcontent: msgtxt,
            attachment: fajlist,
            msgid: msgID,
            msgtype: msgtype
        };
        try {
            con.query('INSERT INTO textlog SET ?', log, function (err) {
                if (err) console.log(err);
            });
        } catch (err) {
            console.log(err);
        }

        if (message.author.bot) return;
        if (message.content.startsWith(`${config.prefix}`)) return;
        if (message.channel.type === "dm") return;
        if (message.channel.nsfw === true) return;
        if (message.channel.id === '681856089242992650') return;
        if (message.channel.id === '681551031544578136') return;
        if (message.channel.id === '717739554269954120') return;
        if (message.channel.id === '643093978799013901') return;
        if (message.channel.id === '643172205903085578') return;
        if (message.channel.id === '645514122959650826') return;
        if (message.channel.id === '643854113733607435') return;
        if (message.channel.id === '643563061692727296') return;
        if (message.channel.id === '692741475632545804') return;
        if (message.channel.id === '681610982468223022') return;
        if (message.channel.id === '681597174932701216') return;
        if (message.channel.id === '702912549472960543') return;
        if (message.channel.id === '717793908725383218') return;


        let user = message.author;
        let xp;
        let msgcount;
        let level;
        let balance;
        let lvlupnotifiy;

        function genXP(c, l) {
            let min = 5;
            let max = 20;

            let s = 1;

            return Math.floor((c*100) * (s*l) / 25);
        }

        function gencoin() {
            let min = 1;
            let max = 2;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        try {
            con.query('SELECT * FROM levelsys where id = ?', user.id, function (err, rows) {
                if (err) throw err;
                const guildy = client.guilds.cache.get('702098578251841577');
                const privchannel = guildy.channels.cache.get(config.notifcationchannel);
                let currentdate = new Date();
                let datetime = currentdate.getFullYear() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getDate() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                if (rows.length < 1) {
                    con.query(`INSERT INTO levelsys (id, name, level, xp, balance, background, msgcount, lvlupnotifiy, warn, lastmsg) VALUES ('${user.id}', '${user.username}', 0, ${genXP()}, 1000, 'DEFAULT', 1, 'yes', 0, '${datetime}')`);
                } else {
                    xp = rows[0].xp;
                    level = rows[0].level;
                    lvlupnotifiy = rows[0].lvlupnotifiy
                    msgcount = rows[0].msgcount;
                    balance = rows[0].balance;
                    
                    let msg = message.content;
                    let msg_length = msg.length;

                    let points = await genXP(msg_length, level);
                    let total_points = xp + points;

                    con.query(`UPDATE levelsys SET xp = ${total_points} WHERE id = '${user.id}'`);
                    con.query(`UPDATE levelsys SET balance = ${balance + gencoin()} WHERE id = '${user.id}'`);
                    con.query(`UPDATE levelsys SET msgcount = '${msgcount + 1}' WHERE id = '${user.id}'`);
                    con.query(`UPDATE levelsys SET lastmsg = '${datetime}' WHERE id = '${user.id}'`);
                    let xpreq = 500;

                    let lvl_to_write = math.floor(5000 / 3 * (4p^3 - 3p^2 - p) + 1.25 * 1.8^(p - 60));
                    //5000 / 3 * (4p^3 - 3p^2 - p) + 1.25 * 1.8^(p - 60)

                    /*while (a !== level) {
                        let prev = xpreq;
                        if (a <= 5) {
                            let next_lvl = prev + (prev * 0.15);
                            prev = next_lvl;
                        } else if (a <= 10 && a > 5) {
                            let next_lvl = prev + (prev * 0.10);
                            prev = next_lvl;
                        } else if (a <= 15 && a > 10) {
                            let next_lvl = prev + (prev * 0.09);
                            prev = next_lvl;
                        } else if (a <= 20 && a > 15) {
                            let next_lvl = prev + (prev * 0.08);
                            prev = next_lvl;
                        } else if (a <= 25 && a > 20) {
                            let next_lvl = prev + (prev * 0.07);
                            prev = next_lvl;
                        } else if (a <= 30 && a > 25) {
                            let next_lvl = prev + (prev * 0.06);
                            prev = next_lvl;
                        } else {
                            let next_lvl = prev + (prev * 0.05);
                            prev = next_lvl;
                        }
                        a++;
                        xpreq = prev;
                    };*/
                    if (xp < 100) return;
                    if (xp + 20 > xpreq) {
                        con.query(`UPDATE levelsys SET xp = '0' WHERE id = '${user.id}'`);
                        con.query(`UPDATE levelsys SET level = '${level + 1}' WHERE id = '${user.id}'`);
                        let ranky = "";
                        if (level + 1 == "5") {
                            if (!message.guild.member(user).roles.cache.has("717144828105719820")) {
                                message.guild.member(user).roles.add("717144828105719820");
                            }
                        } else if (level + 1 == "10") {
                            if (!message.guild.member(user).roles.cache.has("717144876717703198")) {
                                message.guild.member(user).roles.add("717144876717703198");
                            }
                        } else if (level + 1 == "15") {
                            if (!message.guild.member(user).roles.cache.has("717144934032998470")) {
                                message.guild.member(user).roles.add("717144934032998470");
                            }
                        } else if (level + 1 == "20") {
                            if (!message.guild.member(user).roles.cache.has("717144987032223755")) {
                                message.guild.member(user).roles.add("717144987032223755");
                            }
                        } else if (level + 1 == "25") {
                            if (!message.guild.member(user).roles.cache.has("717145045291237406")) {
                                message.guild.member(user).roles.add("717145045291237406");
                            }
                        } else if (level + 1 == "30") {
                            if (!message.guild.member(user).roles.cache.has("717145080720523304")) {
                                message.guild.member(user).roles.add("717145080720523304");
                            }
                        } else if (level + 1 == "35") {
                            if (!message.guild.member(user).roles.cache.has("717145138157191200")) {
                                message.guild.member(user).roles.add("717145138157191200");
                            }
                        } else if (level + 1 == "40") {
                            if (!message.guild.member(user).roles.cache.has("717145186517516329")) {
                                message.guild.member(user).roles.add("717145186517516329");
                            }
                        } else if (level + 1 == "45") {
                            if (!message.guild.member(user).roles.cache.has("717145264808394853")) {
                                message.guild.member(user).roles.add("717145264808394853");
                            }
                        } else if (level + 1 == "50") {
                            if (!message.guild.member(user).roles.cache.has("717145229442023455")) {
                                message.guild.member(user).roles.add("717145229442023455");
                            }
                        } else if (level + 1 == "55") {
                            if (!message.guild.member(user).roles.cache.has("717145321813311591")) {
                                message.guild.member(user).roles.add("717145321813311591");
                            }
                        } else if (level + 1 == "60") {
                            if (!message.guild.member(user).roles.cache.has("717145365157117953")) {
                                message.guild.member(user).roles.add("717145365157117953");
                            }
                        } else if (level + 1 == "65") {
                            if (!message.guild.member(user).roles.cache.has("717145387479335013")) {
                                message.guild.member(user).roles.add("717145387479335013");
                            }
                        } else if (level + 1 == "70") {
                            if (!message.guild.member(user).roles.cache.has("717145428973322280")) {
                                message.guild.member(user).roles.add("717145428973322280");
                            }
                        } else if (level + 1 == "75") {
                            if (!message.guild.member(user).roles.cache.has("717145457146593291")) {
                                message.guild.member(user).roles.add("717145457146593291");
                            }
                        } else if (level + 1 == "80") {
                            if (!message.guild.member(user).roles.cache.has("717145482237050931")) {
                                message.guild.member(user).roles.add("717145482237050931");
                            }
                        } else if (level + 1 == "85") {
                            if (!message.guild.member(user).roles.cache.has("717145571802087455")) {
                                message.guild.member(user).roles.add("717145571802087455");
                            }
                        } else if (level + 1 == "90") {
                            if (!message.guild.member(user).roles.cache.has("717145603292790835")) {
                                message.guild.member(user).roles.add("717145603292790835");
                            }
                        } else if (level + 1 == "95") {
                            if (!message.guild.member(user).roles.cache.has("717145627905228811")) {
                                message.guild.member(user).roles.add("717145627905228811");
                            }
                        } else if (level + 1 == "100") {
                            if (!message.guild.member(user).roles.cache.has("717145656455856168")) {
                                message.guild.member(user).roles.add("717145656455856168");
                            }
                        }
                        const embed = new Discord.MessageEmbed()
                            .setColor(`RANDOM`)
                            .setDescription(`**${user}** GRATULÁLOK! Szintet léptél! :smile: A szinted: **${level + 1}**`);
                        if (lvlupnotifiy === 'no') return;
                        privchannel.send(embed);

                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    // LEVEL SYS
}