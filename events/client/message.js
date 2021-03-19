require("./../../util/function")();

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === "dm") return;
    if (message.attachments.size > 0) {
        var Attachment = (message.attachments).array();
        fajlist = Attachment.map(fajlok => `${fajlok.url}`).join(' ')

        async function fn() {
        const pic = await axios.get(`${fajlist}`, {
            responseType: 'arraybuffer',
        })
        const model = await nsfw.load() 
        const image = await tf.node.decodeImage(pic.data,3)
        const predictions = await model.classify(image)
        image.dispose() 
        const embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`KÉP ELLEMZÉS`, client.user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        }));
		const devembed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`KÉP ELLEMZÉS`, client.user.avatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
        }));
        var safe;
        var probably;
        var szazalek;
        var notify;
        const guildy = client.guilds.cache.get('702098578251841577');
        const privchannel = guildy.channels.cache.get('742828842611245249');
        predictions.forEach(element => {
            if (element.className == "Drawing") {
                var precentage = parseFloat(element.probability).toFixed(2);
                if(precentage > 0.50) {
                    safe = true;
                    notify = false;
                    probably = "RAJZ";
                    szazalek = precentage;
                }
            } else if (element.className == "Hentai") {
                var precentage = parseFloat(element.probability).toFixed(2);
                if(precentage > 0.50) {
                    safe = false;
                    notify = true;
                    probably = "HENTAI";
                    szazalek = precentage;
                }
            } else if (element.className == "Neutral") {
                var precentage = parseFloat(element.probability).toFixed(2);
                if(precentage > 0.50) {
                    safe = true;
                    notify = false;
                    probably = "TERMÉSZETES";
                    szazalek = precentage;
                }
            } else if (element.className == "Porn") {
                var precentage = parseFloat(element.probability).toFixed(2);
                if(precentage > 0.50) {
                    safe = false;
                    notify = true;
                    probably = "PORNÓ";
                    szazalek = precentage;
                }
            } else if (element.className == "Sexy") {
                var precentage = parseFloat(element.probability).toFixed(2);
                if(precentage > 0.50) {
                    safe = true;
                    notify = true;
                    probably = "SZEXI";
                    szazalek = precentage;
                }
            } else {
                safe = true;
                probably = "HIBA A KÉP ELLEMZÉS KÖZBEN";
                szazalek = 0;
            }
			devembed.addField(`${element.className}`, `${precentage}%`, true);
          }
		  );
          function splitString(stringToSplit) {
            const arrayOfStrings = stringToSplit.split(".")

            szazalek = arrayOfStrings[1];
          }
          splitString(szazalek);
          if(safe == false) {
            message.delete();
            } else {
                console.log(`kép észlelve: ${probably} (${szazalek}%)`)
            }
          if (notify == true) {
            embed.setDescription(`**NSFW TARTALOM ÉSZLELVE** \n üzenet id: **${message.id}** \n üzenet küldő: **${message.author.username}#${message.author.discriminator}** \n szoba: **${message.channel.name}** \n tartalom: **${probably}** \n biztosság: **${szazalek}%**`);
            return privchannel.send(embed);
          }
		  if (config.developermode == "true") {
			devembed.setDescription(`**KÉP ELLEMZÉS** \n üzenet id: **${message.id}** \n üzenet küldő: **${message.author.username}#${message.author.discriminator}** \n szoba: **${message.channel.name}** \n tartalom: **${probably}** \n biztosság: **${szazalek}%**`);
            //message.channel.send(devembed);
		  }
        }
        fn()
    }
    if (config.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))) {
        if (message.author.id === config.ownerid || message.author.id === config.lovedid) return;
        if (message.channel.id === "742823385418956900") return;
        if (message.channel.id === "742828842611245249") return;
        if (message.channel.id === "708597499409072170") return;
        if (message.channel.id === "708597632347668521") return;
        if (message.channel.id === "708597704044838952") return;
		
        message.delete();
        let currentdate = new Date();
        let datetime = currentdate.getFullYear() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getDate() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        const guildy = client.guilds.cache.get('702098578251841577');
        const privchannel = guildy.channels.cache.get('742828842611245249');
        const embed1 = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setAuthor(`${message.author.username} | CSÚNYÁN BESZÉLT!`)
            .setDescription(`**${message.author.username}** | **${message.channel.name}** | **${datetime}**: _„${message.content}“_`);
        privchannel.send(embed1);
        message.author.send("Ne beszélj csúnyán!");
        const randommondat = [
            "A szivárványok szépek!",
            "A zene az jó!",
            "Szeretem a pillangókat!",
            "BlackFire nem lány!",
            "Dont worry, be happy"
        ];

        let selected_case = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        if (selected_case === 1) {
            const random = randommondat[Math.floor(Math.random() * randommondat.length)];
			const embed = new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(`${message.author.username} | EZT AKARTA MONDANI:`)
                    .setDescription(`**${random}**`);
            return message.channel.send(embed);
        } else {
            superagent.get('http://rektapi.blackfire.hu/random.php').end((err, response) => {
                let nev = response.body.displayname;
                let time = response.body.datetime;
                let msg = response.body.msgcontent;
                let channelname = response.body.channelname;
                const embed = new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(`${message.author.username} | NE BESZÉLJ CSÚNYÁN!`)
                    .setDescription(`**${nev}** | **${time}** | **${channelname}**: _„${msg}“_`);
                return message.channel.send(embed);
            });
        }
    }

    if (message.channel.id == "702121854307139594") {
        if (message.author.bot) return;
        if (message.content.toLowerCase().includes('elfogadom') && !message.guild.member(message.author).roles.cache.has("705055280513155104")) {
            if (message.guild.member(message.author).roles.cache.has("685743905777778738")) return message.author.send("LE VAGY NÉMÍTVA ÍGY NEM FOGADHATOD EL A SZABÁLYOKAT!");
            if (message.guild.member(message.author).roles.cache.has("702099188225146931")) {
                message.guild.member(message.author).roles.remove("702099188225146931");
                message.guild.member(message.author).roles.add("705055280513155104");
                const guildy = client.guilds.cache.get('702098578251841577');
                const privchannel = guildy.channels.cache.get('742822453969158237');
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`ÜDV A TAGOK KÖZT ${message.author}!!`);
                privchannel.send(embed);
                message.delete();
            } else {
                message.guild.member(message.author).roles.add("705055280513155104");
                const guildy = client.guilds.cache.get('702098578251841577');
                const privchannel = guildy.channels.cache.get('742822453969158237');
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`ÜDV A TAGOK KÖZT ${message.author}!!`);
                privchannel.send(embed);
                message.delete();
            };
        } else if (message.content.toLowerCase().includes('elfogadom') && message.guild.member(message.author).roles.cache.has("705055280513155104")) {
            message.delete();
            message.author.send("MÁR ELFOGADTAD A SZABÁLYOKAT!");
        } else {
            message.delete();
        }
    }

    con.query('SELECT * FROM serversettings where SID = ?', message.guild.id, function (err, rows) {
        if (err) return console.log(err);
        var msgcount = rows[0].msg_count;
        con.query(`UPDATE serversettings SET msg_count = '${msgcount + 1}' WHERE SID = ?`, message.guild.id);

        let user = message.author;
        let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        if (!message.content.startsWith(config.prefix)) return;
        let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (commandfile) {
            commandfile.run(client, message, args)

        }
    });
}