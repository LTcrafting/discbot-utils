const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
   block: function(message, text) {
   if(!message) return console.log("Veuillez utiliser cette syntax: 'require(`discord-utils`).block(message, <votre_text>)'")
   if(text && typeof text !== "string") return console.log("Veuillez mettre votre text sous forme de string (entre guillemet)")
   if(!text) return console.log("Veuillez utiliser cette syntax: 'require(`discord-utils`).block(message, <votre_text>)'")
  
   message.channel.send(text.toLowerCase().replace(/a/g, "ð¦ ").replace(/b/g, "ð§ ").replace(/c/g, "ð¨ ").replace(/d/g, "ð© ").replace(/e/g, "ðª ").replace(/f/g, "ð« ").replace(/g/g, "ð¬ ").replace(/h/g, "ð­ ").replace(/i/g, "ð® ").replace(/j/g, "ð¯ ").replace(/k/g, "ð° ").replace(/l/g, "ð± ").replace(/m/g, "ð² ").replace(/n/g, "ð³ ").replace(/o/g, "ð´ ").replace(/p/g, "ðµ ").replace(/q/g, "ð¶ ").replace(/r/g, "ð· ").replace(/s/g, "ð¸ ").replace(/t/g, "ð¹ ").replace(/u/g, "ðº ").replace(/v/g, "ð» ").replace(/w/g, "ð¼ ").replace(/x/g, "ð½ ").replace(/y/g, "ð¾ ").replace(/z/g, "ð¿ ").replace(/0/g, "0ï¸â£ ").replace(/1/g, "1ï¸â£ ").replace(/2/g, "2ï¸â£ ").replace(/3/g, "3ï¸â£ ").replace(/4/g, "4ï¸â£ ").replace(/5/g, "5ï¸â£ ").replace(/6/g, "6ï¸â£ ").replace(/7/g, "7ï¸â£ ").replace(/8/g, "8ï¸â£ ").replace(/9/g, "9ï¸â£ ").replace(/!/g, "â "))
   },
//////////
reply: function(client, message, content, {msgId}) {
   
  let erreur_msg = "Veuillez mettre la fonction reply sous cette forme '<Reply>.reply(client, message, <votre_text>, [id_du_message(facultatif)]'"



  if(!message) return console.log(erreur_msg)
  if(!client) return console.log(erreur_msg)
  if(!content) return console.log(erreur_msg)
   
if(msgId && typeof msgId !== "string") console.log("Veuillez mettre l'id du message Ã  rÃ©pondre sous forme de string")

 client.api.channels[message.channel.id].messages.post({
      data: {
         "content": content,
         "tts": false,
         message_reference: {
            message_id: msgId || message.id,
            guild_id: message.guild.id,
            channel_id: message.channel.id
         }
      }
   })
  
 //}
},




poll: function(message, {description, choice1, choice2, choice3, choice4, color}) {

  if(!message) return console.log('Vous devez dÃ©clarer message dans la fonction ( <require("discord-utils").poll(message, {options})> )')
  if(!description) return console.log("Vous n'avez pas mis de description")
  if(!choice1) return console.log("Vous n'avez pas mis de choix numÃ©ro 1")
  if(!choice2) return console.log("Vous n'avez pas mis de choix numÃ©ro 2")
 
      const embed = new Discord.MessageEmbed()
      .setTitle("Sondage")
      .setColor(color? color : "RANDOM")
      .setDescription(description)
      .addField(choice1, ":one:")
      .addField(choice2, ":two:")
  
      choice3 ? embed.addField(choice3, ":three:") : ""
      choice4 ? embed.addField(choice4, ":four:") : ""
      message.channel.send(embed).then(m => {
        m.react("1ï¸â£")
        m.react("2ï¸â£")
        choice3 ? m.react("3ï¸â£") : ""
        choice4 ? m.react("4ï¸â£") : ""
      })
},



ticketCreate: function(message, role){
  if(!message) return console.log("Veuillez dÃ©clarer 'message' dans la fonction")
  if(typeof role !== "string") return console.log("L'ID spÃ©cifiÃ© n'est pas un string")
  if(!role) return message.channel.send("Vous devez spÃ©cifier un rÃ´le qui pourra voir le ticket")
if(!message.guild.roles.cache.get(role)) return console.log("Je ne trouve pas le rÃ´le '" + role + "' sur le serveur, vÃ©rifier que c'est bien un ID d'un role du serveur")
if(message.guild.roles.cache.get(role).managed) return console.log("Vous ne pouvez pas mettre de rÃ´le de robot ")


  message.guild.channels.create(`ticket-${message.author.username}`, {
    permissionOverwrites: [
      {
        id: message.author.id,
        allow: ["VIEW_CHANNEL"]
      },
      {
        id: message.guild.id,
        deny: ["VIEW_CHANNEL"]
      },
      {
        id: role,
        allow: ["VIEW_CHANNEL"]
      }
    ]
  }).then(m => m.send(`${message.author} vous avez ouvert un ticket, veuillez attendre qu'un membre du staff (<@&${role}>) vienne s'occuper de vous`))
  },

  ticketDelete: function(message){
    if(!message) return console.log("Veuillez dÃ©clarer 'message' dans la fonction")
    if(!message.channel.name.includes("ticket-")) return message.channel.send("Ce salon n'est pas un ticket")
message.channel.send("Ãtes vous sur de vouloir supprimer le ticket?").then(m => {
  m.react("â")
  m.react("â")

const filter_yes = (reaction, user) => {
return reaction.emoji.name === "â" && user.id === message.author.id;
}

const filter_no = (reaction, user) => {
  return reaction.emoji.name === "â" && user.id === message.author.id
}


const collector_yes = m.createReactionCollector(filter_yes, {time: 10000})
const collector_no = m.createReactionCollector(filter_no, {time: 10000})

collector_yes.on('collect', (reaction, user) => {
  message.channel.send("Suppression dans 5 secondes")
  setTimeout(() => {
    message.channel.delete()
  },5000)
  

})

collector_no.on('collect', (reaction, user) => {
  m.reactions.removeAll()
  message.channel.send("J'ai annulÃ© la suppresion du ticket")
})

collector_yes.on('end', collected => {
  if(collected.size === 0) {
    m.reactions.removeAll()
    message.channel.send("Vous avez mis trop de temps Ã  rÃ©pondre");
  }
})

})
  },
  


eval: async function(client, message, args, code) {
  if(!message) return console.log("Veuillez utiliser cette syntax: 'require(`discord-utils`).eval(client, message, args, <votre_code>)'")
  if(!args) return console.log("Veuillez utiliser cette syntax: 'require(`discord-utils`).eval(client, message, args, <votre_code>)'")
  if(!client) return console.log("Veuillez utiliser cette syntax: 'require(`discord-utils`).eval(client, message, args, <votre_code>)'")
  if(!code) return console.log("Veuillez mettre un code Ã  Ã©valuer dans la fonction: dutils.evaled(client, message, args, <le_code(args.join('') par exemple))>")

  


  function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }
try {
let evaled = eval(code);
let evaluer = evaled
 evaled = require("util").inspect(evaled);
let result;
if(evaled.length >= 1990){
  if(!eval(code + ".cache")){
    if(!eval(code + ".size")){
      result = evaled.length
    }else{
      result = eval(code + ".size")
    }
  }else{
      result = eval(code + ".cache.size")
    }
  evaled = evaled.substr(0,1800) + "//... pour un total de "+ result + " rÃ©sultats"
}
if(code.length > 1000){
  code = code.substr(0,1000) + "..."
}

await message.channel.send(`â â¬ Evaluation (\`${typeof(evaluer)}\`)\n\`\`\`js\n${evaled}\`\`\``)


} catch (e) {
await message.channel.send(`â â¬ Erreur\n\`\`\`js\n${e}\`\`\``)
}
},

reload: function(client, message, commande, {path}) {
  if(!message) return console.log("Vous devez dÃ©finir `message`")
  if(!client) return console.log("Vous devez dÃ©finir `client`")
  if(!commande) return console.log("Vous devez dÃ©finir la commande Ã  reload, ca peut Ãªtre l'args[0]")
  if(!path) return console.log("Vous devez mettre le chemin vers votre dossier `commands` (exemple: `../commands`)")
  if(typeof path !== "string") return console.log("Le chemin dois Ãªtre un string")
 // try {require(chemin)} catch (e) {return console.log("Je ne trouve pas le dossier " + chemin + "\n" +e)}

  try{
    let command = client.commands.get(commande.toLowerCase()) || client.commands.find(cmd => cmd.help.aliases.includes(commande.toLowerCase()))
    var commandName = command.help.name
        delete require.cache[require.resolve(`${path}${commandName}.js`.toLowerCase())]
        client.commands.delete(commandName)
        const pull = require(`${path}${commandName}.js`.toLowerCase())
        client.commands.set(commandName, pull)
   } catch(e) {
       return message.channel.send(`La commande n'existe pas ou il y a une erreur dans le code, ou alors le chemin indiquÃ© n'est pas bon`)
   }
   message.channel.send(`La commande \`${commandName}\` a bien Ã©tÃ© reload`)
},

userInfo: function(message, member, {accountCreatedAt, serverJoinedAt, nickname, customStatut, statut, id, plateform, thumbnail, color}){
if(!message) return console.log("Vous devez dÃ©finir 'message'")
if(!member) return console.log("Vous devez dÃ©finir 'member' (ex: message.members.mentions.first())")

const status = {  
  online: "`En ligne`",
  idle: "`Inactif`",
  dnd: "`Ne pas dÃ©ranger`",
  offline: "`Hors-Ligne`",
  stream:  "`Stream`"
}

moment.locale("fr")
const type = member.user.presence.clientStatus

const embed = new Discord.MessageEmbed()
.setTitle(`Informations de l'utilisateur: ${member.user.tag}`)

accountCreatedAt === true ? embed.addField("Compte crÃ©e le", moment.utc(member.user.createdAt).format("LL")) : ""
serverJoinedAt === true ? embed.addField("Serveur rejoins le", moment.utc(member.joinedAt).format("LL")) : ""
nickname === true ? embed.addField("Surnom", `${member.nickname ? `${member.nickname}` : "Aucun surnom"}`) : ""
customStatut === true ? embed.addField("Statut personnalisÃ©", `${member.user.presence.activities[0]? `\`${member.user.presence.activities[0].state}\`` : "Aucun statut personnalisÃ©"}`) : ""
id === true ? embed.addField("ID", member.user.id) : ""
plateform === true ? embed.addField("Plateforme", `\`${type.mobile? "Mobile" : type.web ? "Internet" : type.desktop ? "Bureau" : "DÃ©connecter"}\``) : ""
color ? embed.setColor(color) : embed.setColor('RANDOM')
thumbnail === true ? embed.setThumbnail(member.user.displayAvatarURL({dynamic: true})) : ""
statut === true ? embed.addField("Statut", status[member.presence.status]) : ""

message.channel.send(embed)

},

emojiInfos: function(message, emoji, {name, shortId, longId, link, image, color}) {
  if(!message) return console.log("Vous devez dÃ©finir 'message'")
  if(!emoji) return console.log("Vous devez dÃ©finir 'emoji' (ex: message.guild.emoji.cache.find(x => x.name === args[0]))")

  const embed = new Discord.MessageEmbed()
  .setTitle(`Informations sur l'emoji: ${emoji.name}`)

  name === true ? embed.addField("Nom", "`" + emoji.name + "`", true) : ""
  shortId === true ? embed.addField("Id courte", "`" + emoji.id + "`", true) : ""
  longId === true ? embed.addField("ID longue", `\`<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}>\``, true) : ""
  image === true ? embed.setImage(emoji.url, true) : ""
  link === true ? embed.addField("Lien", `[Clique](${emoji.url})`, true) : ""
  color ? embed.setColor(color): embed.setColor('RANDOM', true),


  message.channel.send(embed)

}

}


/*module.exports = {
   block: function(){
Discord.Message.prototype.block = function(content){

   if(!content) throw new Error("Veuillez mettre un text")
 
   this.channel.send(content.toLowerCase().replace(/a/g, "ð¦ ").replace(/b/g, "ð§ ").replace(/c/g, "ð¨ ").replace(/d/g, "ð© ").replace(/e/g, "ðª ").replace(/f/g, "ð« ").replace(/g/g, "ð¬ ").replace(/h/g, "ð­ ").replace(/i/g, "ð® ").replace(/j/g, "ð¯ ").replace(/k/g, "ð° ").replace(/l/g, "ð± ").replace(/m/g, "ð² ").replace(/n/g, "ð³ ").replace(/o/g, "ð´ ").replace(/p/g, "ðµ ").replace(/q/g, "ð¶ ").replace(/r/g, "ð· ").replace(/s/g, "ð¸ ").replace(/t/g, "ð¹ ").replace(/u/g, "ðº ").replace(/v/g, "ð» ").replace(/w/g, "ð¼ ").replace(/x/g, "ð½ ").replace(/y/g, "ð¾ ").replace(/z/g, "ð¿ ").replace(/0/g, "0ï¸â£ ").replace(/1/g, "1ï¸â£ ").replace(/2/g, "2ï¸â£ ").replace(/3/g, "3ï¸â£ ").replace(/4/g, "4ï¸â£ ").replace(/5/g, "5ï¸â£ ").replace(/6/g, "6ï¸â£ ").replace(/7/g, "7ï¸â£ ").replace(/8/g, "8ï¸â£ ").replace(/9/g, "9ï¸â£ ").replace(/!/g, "â "))
     
    }
   }
}*/


