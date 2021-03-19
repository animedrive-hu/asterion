require("../util/function")();

module.exports = (client) => {
    const load = dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
        var f = 0;
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.config.name, pull);
            if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
            f++;
        };
        console.log(c.bgMagenta(`LOG:`) + ` ` + c.bgWhite(`${c.blue(dirs)} ${c.black(`kategoriában`)} ${c.blue(f)} ${c.black(`Parancs betöltve!`)}`));
    };
    ["Bot Parancsok", "Developer Parancsok", "Interakciók", "MEME", "Mod Parancsok", "szint és gazdaság", "Fun"].forEach(x => load(x));
    console.log(c.bgMagenta(`LOG:`) + ` ` + c.bgWhite(`${c.blue(client.commands.size)} ${c.black(`Parancs betöltve!`)}`));
};