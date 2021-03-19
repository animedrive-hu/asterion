require("./function")();
async function execute(message, serverQueue) {
    const args = message.content.split(" ");
    
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} say`, client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
    .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }));

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        embed.setDescription(`Hang alapú csatornában kell lenned hogy zenét játszhass le!`) 
        return message.channel.send(embed)};
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        embed.setDescription(`A botnak nincs joga csatlakozni/beszélni ebben a csatornában!`) 
        return message.channel.send(embed);
    }
  
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
     };
  
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
  
      queue.set(message.guild.id, queueContruct);
  
      queueContruct.songs.push(song);
  
      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      embed.setDescription(`${song.title} hozzá adva a lejátszási listához!`) 
      return message.channel.send(embed);
    }
  }


  function skip(message, serverQueue) {
    if (!message.member.voice.channel){
    embed.setDescription(`Hang alapú csatornában kell lenned hogy átugorhasd a zenét!`) 
      return message.channel.send(embed);
    }
    if (!serverQueue) {
        embed.setDescription(`Nincs zene amit át lehetne ugorni!`) 
      return message.channel.send(embed);
    }
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel){
    embed.setDescription(`Hang alapú csatornában kell lenned hogy megállíthasd a zenét!`) 
      return message.channel.send(embed);
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
  
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
  
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    embed.setDescription(`Lejátszás elinditva: **${song.title}**`) 
    serverQueue.textChannel.send(embed);
  }
  module.exports.execute = execute();
  module.exports.skip = skip();
  module.exports.stop = stop();
  module.exports.play = play();