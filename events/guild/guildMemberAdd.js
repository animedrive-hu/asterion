require("../../util/function")();

module.exports = async (client, member) => {
    member = member.user;

    const banem = [132861462946250752, 389453494911893508, 320221581370720258, 198373673910927360, 657254076848930846, 723474443728453714, 572175711360778250, 372083989588082688, 267595853768687619, 310552558030815233, 488968906665623563];

    if(member.id(id => banem.includes(id))) {
        await message.guild.member(member).ban({ days: 0, reason: 'YEET!' });
    };

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext("2d");

        let fontSize = 80;
        let canvaswidth = canvas.width - 100;
        do {
            ctx.font = `${(fontSize -= 10)}px sans-serif`;
        } while (ctx.measureText(text).width > canvaswidth);
        return ctx.font;
    };

    const guildy = client.guilds.cache.get('702098578251841577');
    const channel = guildy.channels.cache.get(config.wchannel);
	const channel2 = guildy.channels.cache.get(config.logchannel);
    try {
        let role1 = "717142191033679985";
        let role2 = "717142429605822515";
        let role3 = "717152366876557313";
        let role4 = "717149947127922740";
        let role5 = "702099188225146931";
        await guildy.member(member).roles.add(role1);
        await guildy.member(member).roles.add(role2);
        await guildy.member(member).roles.add(role3);
        await guildy.member(member).roles.add(role4);
        guildy.member(member).roles.add(role5);
    } catch (error) {
        console.error(error);
    };
    if (!channel) return console.log('anyád');
    if (!channel2) return console.log('anyád2');

    const canvas = Canvas.createCanvas(700, 350);
    const ctx = canvas.getContext("2d");

    var files = fs.readdirSync("./imgs/");
    /* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
    let chosenFile = files[Math.floor(Math.random() * files.length)];
	console.log(chosenFile);
    const background = await Canvas.loadImage(`./imgs/${chosenFile}`);
    ctx.drawImage(background, 0, 100, canvas.width, 250);

    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#ffffff";
    let textwidth = ctx.measureText('ÜDV AZ ANIMEDRIVE-BAN!');
    var textsize = (canvas.width / 2) - (textwidth.width / 2);
    ctx.fillText(`ÜDV AZ ANIMEDRIVE-BAN!`, textsize, 235);
    ctx.font = applyText(canvas, member.displayName);
    textwidth = ctx.measureText(member.username);
    textsize = (canvas.width / 2) - (textwidth.width / 2);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(member.username, textsize, 305);

    ctx.beginPath();
    ctx.arc(350, 100, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
	
    const avatar = await Canvas.loadImage(member.avatarURL({ format: 'png', dynamic: true, size: 2048 }));
    ctx.drawImage(avatar, 250, 0, 200, 200);
	
    const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "welcome-image.png"
    );
    await channel.send(attachment);
    channel.send(`${member} Olvasd el a **szabályokat** hogy hozzáférést nyerj a szerverhez!`);
	
	const embed = new Discord.MessageEmbed()
		.setAuthor(`${member.username} csatlakozott!`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
		.setColor('RANDOM')
		.addField("Teljes felhasználónév", `${member.username}#${member.discriminator}`)
		.addField("ID", member.id)
		.addField("Regisztráció ideje:", (member.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''));
	channel2.send(embed);
	
    // üdvözlő üzenet vége! \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
}