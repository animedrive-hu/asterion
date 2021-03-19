require("./../../util/function")();
module.exports = {
    config: {
        name: "randomnumber",
        aliases: ["rm", "randmnum"],
        usage: "(ettől) (eddig)",
        category: "Fun",
        description: `Random szám generálás.`,
        accessableby: "Tag+"
    },
    run: async(client, message, args) => {
      function NumberPicker(min, max) {
                  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  
          }
      function sleep(ms) {
                  return new Promise(resolve => setTimeout(resolve, ms));
          }
          var from;
          var to;
          if(!args[0]) {
            from = 0000;
            to = 9999;
          } else {
            from = args.slice(0, 1).join(" ");
            to = args.slice(1, 2).join(" ");
          }
        
              const randomnumembed = new Discord.MessageEmbed()
              .setColor("#fb7373")
              .setDescription("Szám generálása.")
              .setFooter(`© ${client.user.username} | randomnumber parancs`, client.user.displayAvatarURL)
              .setTimestamp()
          
              let msg = await message.channel.send(randomnumembed);
  
              for(var i = 5; i > 0; i--) {
                  await sleep(1000);
                  await msg.edit(i)
                  if (i == 1){
                      await sleep(1000);
                      await msg.edit("RANDOM SZÁM");
                  }
              }
  
              let number = await NumberPicker(from, to).toString();
              let NumberArray = [];
              switch (number.toString().length) {
                  case 0:
                      NumberArray = [0, 0, 0, 0];
                 break;
               case 1:
                     NumberArray = [0, 0 , 0, number];
                 break;
               case 2:
                     NumberArray = [0, 0 , number.slice(0,1), number.slice(1,2)];
                 break;
               case 3:
                     NumberArray = [0, number.slice(0,1), number.slice(1,2), number.slice(2,3)];
                 break;
               case 4:
                     NumberArray = [number.slice(0,1), number.slice(1,2), number.slice(2,3), number.slice(3,4)];
               break;
              }
  
              for(var i = 0; i < 4; i++) {
                  const randomnumembed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setFooter(`© ${client.user.username} | randomnumber parancs`, client.user.displayAvatarURL)
                  .setTimestamp();
                  switch (i) {
                    case 0:
                      randomnumembed.addField("Szám generálása.", [NumberArray[3]]);
            break;
                    case 1:
                      randomnumembed.addField("Szám generálása..", [NumberArray[2]] + [NumberArray[3]]);
                      break;
                    case 2:
                      randomnumembed.addField("Szám generálása...", [NumberArray[1]] + [NumberArray[2]] + [NumberArray[3]]);
                      break;
                    case 3:
                      randomnumembed.addField("A szám:", [NumberArray[0]] + [NumberArray[1]] + [NumberArray[2]] + [NumberArray[3]]);
                      randomnumembed.setColor("RANDOM");
                      break;
                  }
                  await sleep(500);
                  await msg.edit(randomnumembed);


                  console.log("Numbers: " + from + " | "+ to);
                  console.log("Numbers Length:" + number.toString().length);
                  console.log("Picked: " + number);
                  console.log("NumberArray: " + NumberArray);
                }
              }
          }
