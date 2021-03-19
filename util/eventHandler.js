require("./function")();

module.exports = async (client) => {
    const load = dirs => {
        const events = fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            var evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            console.log(eName);
            client.on(eName, evt.bind(null, client));
        };
    };
    ["client", "guild"].forEach(x => {
        load(x);
    });
}