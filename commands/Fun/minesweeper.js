require("./../../util/function")();

module.exports = {
    config: {
        name: "minesweeper",
        aliases: ["aknakereső", "ak"],
        usage: "(sorok) (oszlopok) (bombák)",
        category: "Fun",
        description: "Aknakereső!",
        accessableby: "Tag+"
    },
    run: async (client, message) => {
        const content = message.content.split(' ');
        const args = content.slice(1);
 
    const rows = parseInt(args[0]);
    const columns = parseInt(args[1]);
    const mines = parseInt(args[2]);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM");
    if (!rows) {
        embed.setDescription(`${message.author} :warning: Add meg hogy hány sor legyen.`)
      return message.channel.send(embed);
    }
    if (!columns) {
        embed.setDescription(`${message.author} :warning: Add meg hogy hány oszlop legyen.`)
      return message.channel.send(embed);
    }
    if (!mines) {
        embed.setDescription(`${message.author} :warning: Add meg hogy hány bomba legyen.`)
        return message.channel.send(embed);
    }
 
    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start();
 
    return matrix
      ? message.channel.send(matrix)
      : message.channel.send(':warning: Invalid adatot adtál meg.');
  
}}