# discord-utils
Ce module pour Discord.js vous donne accès à des fonction simple et utiles

Avec ce module pour **Discord.js** vous pourrez réaliser des actions simple mais utile sans ce compliqué la vie

Voici comment s'utilise le module:<br>
***ce qui est entre `<>` est obligatoire, ce qui est entre `[]` est optionnel***

```js
const dutils = require("discord-utils")
dutils.reply(client, message, <"votre_message">, [message_id]) // cette fonction vous permet de répondre à un message 
dutils.block(message, <"votre_message">) // envoie un message en remplacent les lettres par des emojis
dutils.poll(message, {description: <"votre_description">, choice1: <"choix n°1">, choice2: <"choix n°2">, [choice3: <"choix n°3">, choice4: <"choix n°4">}) // permet de faire un sondage à plusieurs choix
```
