# discord-utils
Ce module pour Discord.js vous donne accès à des fonction simple et utiles

<h1>Installation</h1>

```
npm i discord-utils
```

<h3>💻 Utilisation</h3>

Avec ce module pour **Discord.js** vous pourrez réaliser des actions simple mais utile sans ce compliqué la vie
<br><br>
Voici comment s'utilise le module:<br>
⚠ **Pour les fonctions nécessitant des paramètres, si vous ne voulez ne pas en mettre laissez les acolades vides**<br>
**ex: `dutils.reply(client, message, "coucou", {})` → pour répondre au message de l'utilisateur de la commande**<br>
**`dutils.reply(client, message, "coucou", {msgId: '830412730519388190'})` → pour répondre à un message en particulié**<br>

```js
const dutils = require("discord-utils")
dutils.reply(client, message, "votre_message", {msgId: "id_du_message"}) // cette fonction vous permet de répondre à un message 
dutils.block(message, "votre_message") // envoie un message en remplacent les lettres par des emojis
dutils.poll(message, {description: "votre_description", choice1: "choix n°1", choice2: "choix n°2", choice3: "choix n°3", choice4: "choix n°4"}) // permet de faire un sondage à plusieurs choix
dutils.ticketCreate(message, 'roleID') // permet de crée un ticket et seul les personne ayant le role, la personne qui a ouvert le ticket et les personnes qui ont la perm d'administrateur ont accès au ticket
dutils.ticketDelete(message) // permet de fermer un ticket

dutils.eval(client, message, args, votreCode) // vous permet d'evaluer un code (comme une commande eval)
dutils.userInfo(message, member /*dois toujours être un member ex: message.guild.members.cache.get(args[0])*/, {accountCreatedAt, serverJoinedAt, nickname, customStatut, statut, id, plateform, thumbnail, color}) // permet d'avoir des info sur un membre
dutils.emojiInfo(message, emoji /*ex: message.guild.emojis.cache.find(x => x.name === args[0])*/, {name, shortId, longId, link, image, color}) // permet d'avoir des infos sur un emoji
dutils.reload(client, message, commande, /*ex: args[0]*/ {path: "chemin vers votre dossier commande"}) // permet de reload une commande
```
