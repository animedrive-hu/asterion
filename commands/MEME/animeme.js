require("../../util/function")();

module.exports = {
    config: {
        name: "animeme",
        aliases: "",
        usage: "",
        category: "MEME",
        description: "Sensei küld egy random anime meme-t redditröl!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const subReddits = ["Animemes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`subreddit: ${random}`)
        return message.channel.send(embed);
    }
}