require("./../../util/function")();

module.exports = async client => {
  console.log(c.bgMagenta(`LOG:`) + ` ` + c.bgWhite(`${c.blue(client.user.username)} ${c.black(`KÉSZEN ÁLL!`)}`));
  app.use(bodyParser.json());

  app.post('/phpcallback', function (req, res) {
    var content = req.body;
    var user = content.user;
    var msg = content.msg;
    var link = content.link;
    const guildy = client.guilds.cache.get('702098578251841577');
    const postchannel = guildy.channels.cache.get('760965060390027324');
    if (!link) {
      embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`${user} | ANIMEDRIVE.HU`)
        .setDescription(`${msg}`);
    } else {
      embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setAuthor(`${user} | ANIMEDRIVE.HU`)
        .setDescription(`${msg} || [**LINK**](${link})`);
    }
    postchannel.send("<@&717142669096255549>");
    postchannel.send(embed);

    res.end('ok');
  });

  http.listen(6969, function () {
    var addr = http.address();
    console.log(c.bgMagenta(`LOG:`) + ` ` + c.bgWhite(`${c.blue(addr.address + ':' + addr.port)} ${c.black(`SOCKET.IO KLIENS KÉSZEN ÁLL!`)}`));
  });
  const server = new socketStats(app, client);
  
    server.listen(config.statsport, () => {
        console.log("Statiszikák: http://s01.blackfire.hu:"+config.statsport);
    });

  let statuses = ["-help", "animedrive.hu"];

  setInterval(() => {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, {
      type: "WATCHING"
    });
    return;
  }, 15000);
  var con = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  });
  setInterval(() => {
    const guildy = client.guilds.cache.get('702098578251841577');
    var onlines = [];
    var members = [];
    let memberlist = guildy.roles.cache.get('742845166192295976').members.map(member => {
      if (member.user.presence.status === "online" || member.user.presence.status === "idle") {
        onlines.push(member.user.presence.status);
      }
    })
    let memberlist2 = guildy.roles.cache.get('705055280513155104').members.map(member => {
      if (member.user.presence.status === "online" || member.user.presence.status === "idle" || member.user.presence.status === "dnd" || member.user.presence.status === "offline") {
        members.push(member.user.presence.status);
      }
    })
    con.query(`SELECT * FROM serversettings where SID = '702098578251841577'`, function (err, rows) {
      if (err) return console.log(err);
      var msgcount = rows[0].msg_count;
      const guildy = client.guilds.cache.get('702098578251841577');
      guildy.channels.cache.get("743013937196433438").setName(`💬 ÜZENETEK: ${msgcount}`);
    });
    guildy.channels.cache.get("743013956142104677").setName(`🔑 ADMINOK ONLINE: ${onlines.length}`);
    guildy.channels.cache.get("743014006695919626").setName(`👥 TAGOK: ${members.length}`);
  }, 600000);
};
