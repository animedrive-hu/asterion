require("../../util/function")();

module.exports = async (client, oldMember, newMember) => {
    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;
    var getguild = client.guilds.cache.get(643093978799013898);
    var con;

    con = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    }); // to avoid a hot loop, and to allow our node script to

        var gn = newMember.guild.name.replace(/-| /g, "_");
        var gn = gn.split(',').join("");
        var gn = gn.split('.').join("");
		var username = newMember.member.user.username;
		var displayname = username;
		let currentdate = new Date();
        var datetime = currentdate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
		var msgtype = "voice";
		var fajlist = "null";
		var msgID = "0";
		var gid = newMember.guild.id;
		var userid = newMember.member.user.id;
		var avatar = newMember.member.user.displayAvatarURL();


    if (oldUserChannel === null && newUserChannel !== null) {
        var channelname = newUserChannel.name;
        var channelid = newUserChannel.id;
        let msgtxt = `${displayname} BELÉPETT IDE: ${channelname}`;

        var log = { datetime: datetime, guildname: gn, guildid: gid, channelname: channelname, channelid: channelid, username: username, displayname: displayname, userid: userid, avatar: avatar, msgcontent: msgtxt, attachment: fajlist, msgid: msgID, msgtype: msgtype };
        try {
            con.query('INSERT INTO textlog SET ?', log, function (err) {
                if (err) console.log(err);
            });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
            } else {
                //handleHttpErrors(err.message);
            }
        }

    } else if (newUserChannel === null) {
        var channelname = oldUserChannel.name;
        var channelid = oldUserChannel.id;
        let msgtxt = `${displayname} KILÉPETT INNEN: ${channelname}`;

        var log = { datetime: datetime, guildname: gn, guildid: gid, channelname: channelname, channelid: channelid, username: username, displayname: displayname, userid: userid, avatar: avatar, msgcontent: msgtxt, attachment: fajlist, msgid: msgID, msgtype: msgtype };
        try {
            con.query('INSERT INTO textlog SET ?', log, function (err) {
                if (err) console.log(err);
            });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
            } else {
                //handleHttpErrors(err.message);
            }
        }
    } else {
        var channelname = newUserChannel.name;
        var channelid = newUserChannel.id;
        var channelname2 = oldUserChannel.name;
        let msgtxt = `${displayname} SZOBÁT VÁLTOTT, INNEN: ${channelname2} IDE: ${channelname}`;

        var log = { datetime: datetime, guildname: gn, guildid: gid, channelname: channelname, channelid: channelid, username: username, displayname: displayname, userid: userid, avatar: avatar, msgcontent: msgtxt, attachment: fajlist, msgid: msgID, msgtype: msgtype };
        try {
            con.query('INSERT INTO textlog SET ?', log, function (err) {
                if (err) console.log(err);
            });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                //handleHttpErrors(SYSTEM_ERRORS.USER_ALREADY_EXISTS);
            } else {
                //handleHttpErrors(err.message);
            }
        }
    }
}