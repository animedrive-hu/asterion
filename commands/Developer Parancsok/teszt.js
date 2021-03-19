require("./../../util/function")();

module.exports = {
    config: {
        name: "teszt",
        aliases: "",
        usage: "",
        category: "Developer Parancsok",
        description: "teszt parancs.",
        accessableby: "Fejlesz�"
    },
    run: async (client, message, args) => {
        if (message.author.id == config.ownerid) {
            let member = message.guild.member(message.author);
            const canvas = Canvas.createCanvas(700, 700);
            const ctx = canvas.getContext("2d");

            const applyText = (canvas, text) => {
                const ctx = canvas.getContext("2d");

                let fontSize = 50;
                let canvaswidth = canvas.width - 100;
                do {
                    ctx.font = `${(fontSize -= 10)}px sans-serif`;
                } while (ctx.measureText(text).width > canvaswidth);
                return ctx.font;
            };

            var files = fs.readdirSync("./profil_images/");
            let chosenFile = files[Math.floor(Math.random() * files.length)];

            const background = await Canvas.loadImage(`./profil_images/${chosenFile}`);
            ctx.drawImage(background, 0, 100, canvas.width, 600);

            // Draw line under text
            ctx.font = applyText(canvas, member.displayName);
            var textwidth = ctx.measureText(member.displayName)
            var textsize = (canvas.width / 2) - (textwidth.width / 2);
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${member.displayName}`, textsize, 260);

            ctx.beginPath();
            ctx.arc(350, 100, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const avatar = await Canvas.loadImage(message.author.avatarURL({
                format: 'png',
                dynamic: true,
                size: 2048
            }));
            ctx.drawImage(avatar, 250, 0, 200, 200);

            const attachment = new Discord.MessageAttachment(
                canvas.toBuffer(),
                "profil_image.png"
            );
            await message.channel.send(attachment);
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${client.user.username}`, client.user.iconURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setThumbnail(client.user.avatarURL({
                    format: 'png',
                    dynamic: true,
                    size: 2048
                }))
                .setDescription(`You are not a developer of ${client.user.username}!`);
            return message.channel.send(embed)
        }
    }
}