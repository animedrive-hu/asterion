require("./../../util/function")();

module.exports = {
    config: {
        name: "8ball",
        aliases: "",
        usage: "(kérdés)",
        category: "Fun",
        description: "Q&A Random válaszokkal!",
        accessableby: "Tag+"
    },
    run: async (client, message, args) => {
        if(!args[1]){
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
           .setDescription(`${message.author} Tegyél fel egy teljes kérdést!`)
        return message.channel.send(embed);
    }   const question = args.join(" ");
        var reply;
        const randomNum = Math.floor(Math.random() * 8) + 1;
        const ballembed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor("RANDOM")
        .addField("Kérdés: ", question);;

    if (randomNum === 1){
        reply = 'Igen.';
    } else if (randomNum === 2){
        reply = 'Nem.'
    } else if (randomNum === 3){
        reply = 'Egyértelműen.'
    } else if (randomNum === 4){
        reply = 'Valószínűleg.'
    } else if (randomNum === 5){
        reply = 'Valószínűleg nem.'
    } else if (randomNum === 6) {
        reply = 'Hülye vagy?'
    } else if (randomNum === 7) {
        reply = 'Természetesen.'
    } else if (randomNum === 8) {
        reply = 'Persze.'
    }
    ballembed.addField("Válasz: ", reply);
    message.channel.send(ballembed);
}}