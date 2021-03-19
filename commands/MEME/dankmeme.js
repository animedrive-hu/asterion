require("../../util/function")();

module.exports = {
    config: {
        name: "dankmeme",
        aliases: "",
        usage: "",
        category: "MEME",
        description: "Sensei küld egy random dankmeme-t redditröl!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        const subReddits = ["dankmeme"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`subreddit: ${random}`)
        return message.channel.send(embed);
    }
}