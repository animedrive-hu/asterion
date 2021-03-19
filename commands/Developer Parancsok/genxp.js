require("./../../util/function")();

module.exports = {
    config: {
        name: "genxp",
        aliases: "",
        usage: "",
        category: "Developer Parancsok",
        description: "Össz xp generálás szint rendszer fair-á tételéhez.",
        accessableby: "Fejlesző"
    },
    run: async (client, message, args) => {

        let msg = parseInt(args);
        let maxxp = 0;
        let f = 0;
        while (f != msg) {
            let min = 5;
            let max = 20;

            maxxp += Math.floor(Math.random() * (max - min + 1)) + min;
            f += 1;
        }
        console.log(maxxp);

        let xpreq = 1000;
        let a = 0;
        let prev = xpreq;
        let xpnow = maxxp;
        const embed1 = new Discord.MessageEmbed()
        while (xpreq <= xpnow) {
            if (a < 1) {
                prev = 1000;
            } else if (a <= 5) {
                let next_lvl = prev + (prev * 0.195);
                prev = next_lvl;
            } else if (a <= 10 && a > 5) {
                let next_lvl = prev + (prev * 0.145);
                prev = next_lvl;
            } else if (a <= 15 && a > 10) {
                let next_lvl = prev + (prev * 0.095);
                prev = next_lvl;
            } else if (a <= 20 && a > 15) {
                let next_lvl = prev + (prev * 0.045);
                prev = next_lvl;
            } else {
                let next_lvl = prev + (prev * 0.015);
                prev = next_lvl;
            }
            xpnow = xpnow - prev;
            a++;
            xpreq = prev;
            if (a < 10) {
                console.log("level 0" + a + ": " + prev.toFixed(0));
            } else {
                console.log("level " + a + ": " + prev.toFixed(0));
            }
            //message.channel.send("level " + a + ": " + prev.toFixed(0));
        };
        console.log(xpreq);
        embed1.setColor('RANDOM');
        embed1.setDescription(`maximum xp: ${maxxp} \n szint: ${a}`);
        message.channel.send(embed1);
    }
}
// Turn on Developer Mode under User Settings > Appearance > Developer Mode (at the bottom)
// Then open the channel you wish to delete all of the messages (could be a DM) and click the three dots on the far right.
// Click "Copy ID" and paste that instead of LAST_MESSAGE_ID.
// Copy / paste the below script into the JavaScript console.