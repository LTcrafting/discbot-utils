# discord-utils
Ce module pour Discord.js vous donne accès à des fonction simple et utiles
<h3>💻 Utilisation</h3>

Avec ce module pour **Discord.js** vous pourrez réaliser des actions simple mais utile sans ce compliqué la vie
<br><br>
Voici comment s'utilise le module:<br>

```js
const dutils = require("discord-utils")
dutils.reply(client, message, "votre_message", {msgId: "id_du_message"}) // cette fonction vous permet de répondre à un message 
dutils.block(message, "votre_message") // envoie un message en remplacent les lettres par des emojis
dutils.poll(message, "votre_description", {choice1: "choix n°1", choice2: "choix n°2", choice3: "choix n°3", choice4: "choix n°4"}) // permet de faire un sondage à plusieurs choix
dutils.ticket_create(message, 'roleID') // permet de crée un ticket et seul les personne ayant le role, la personne qui a ouvert le ticket et les personnes qui ont la perm d'administrateur ont accès au ticket
dutils.ticket_delete(message) // permet de fermer un ticket

dutils.eval(client, message, args, VotreCode) // vous permet d'evaluer un code (comme une commande eval)
```
