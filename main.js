const Discord = require("discord.js");
const { MessageAttachment } = require('discord.js')
const client = new Discord.Client({intents: 3276799});
const config = require('./config');
mangaMoinsURL = 'https://mangamoins.shaeishu.co/?scan=OP'
scanNumber = 1076;

client.on("ready", async () => {
    console.log('Big news Morgans running...');
    const guild = client.guilds.cache.get("1077587306162167920");
    handleRoles(guild);
    client.on("messageCreate", (msg) => {
        if (msg.channelId === '1077587567387607120' && msg.author.id === "148785953022935040") {
            msg.delete(1);
            newScan(guild);
        }
    });
})

async function newScan(guild) {
    const newsChannel = client.channels.cache.get('1077587567387607120');
    const chapterChannel = client.channels.cache.get('1077587466103562250');
    const shishibukai = guild.roles.cache.find(role => (role.name === "Shishibukai" && role.mentionable === true));
    const readRole = guild.roles.cache.find(role => (role.name === "Chapitre lu"));
    scanNumber++;
    chapterChannel.setName(`⌊🏴⌉-one-piece-${scanNumber}`);

    const newReadRole = await guild.roles.create({
        name: readRole.name,
        color: readRole.color,
        hoist: readRole.hoist,
        position: readRole.position,
        permissions: [Discord.PermissionsBitField.Flags.ViewChannel],
        mentionable: readRole.mentionable
    });
    chapterChannel.permissionOverwrites.edit(newReadRole.id, { ViewChannel: true })
    readRole.delete('Nouveau Chapitre !')
    newsChannel.send(`------------------------------------------------------------------------------------------\n\n🚨   C'EST L'HEURE !!!!!   🚨\n\nLE CHAPITRE ${scanNumber} EST SORTIE !!!!\n\n✅ Une foi le chapitre lu, réagit a ce message pour en parler avec les autres ${shishibukai}\nMerci a Myze pour la traduction vraiment il est beau ❤️\n\nLien du chapitre sur MangaMoins\n${mangaMoinsURL + scanNumber}`);
    newsChannel.send(file = client.File = ('https://tenor.com/view/one-piece-zoro-luffy-wano-nami-gif-26317134')).then((message) => {
        message.react('✅');
        let filter = (reaction, user) => reaction.emoji.name === '✅';
        let collector = message.createReactionCollector({filter, dispose: true });
        collector.on('collect', (reaction, user) => {
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            memberWhoReacted.roles.add(newReadRole.id);
        });
        collector.on('remove', (reaction, user) => {
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            memberWhoReacted.roles.remove(newReadRole.id);
        });
    });
}

async function handleRoles(guild) {
    const roleChannel = client.channels.cache.get('1078393228031688734');
    // roleChannel.send(`SALUT LES JEUNES ! @everyone\n Bienvenue sur mon discord pour parler de la plus grand aventure du XXIème siècle !\nRéagit a ce message avec les différent emoji pour choisir ton role :\n\n🏴‍☠️ Tu lis les chapitres chaque semaine, réagis avec un drapeau pirate !\n💭 Tu regarde l'anime chaque semaine ? Réagis avec une bulle de pensée (et arrête aussi)\n🔎 Tu lis les spoils des chapitres chaque semaine, réagis avec une loupe ! (et fait attention a ne pas spoil)\n🃏 Tu aimes les cartes OPTCG ? Alors réagis avec un joker !\n✨Tu a une chouette collection autour de One Piece et tu veux la partager ? Réagis avec des étincelles !\n\n------`).then((message) => {
    //     message.react('🏴‍☠️');
    //     message.react('💭');
    //     message.react('🔎');
    //     message.react('🃏');
    //     message.react('✨');
    roleChannel.messages.fetch({ limit: 1 }).then(messages => {
        let lastMessage = messages.first();

        let roleList = [
            {name: 'Shishibukai', icon: '🏴‍☠️'},
            {name: 'Pirates', icon: '💭'},
            {name: 'Spoiler', icon: '🔎'},
            {name: 'TCG Gang', icon: '🃏'},
            {name: 'Collectioneur', icon: '✨'},
        ]
        let filter = (reaction, user) => roleList.find(role => role.icon === reaction.emoji.name);
        let collector = lastMessage.createReactionCollector({filter, dispose: true });
        collector.on('collect', (reaction, user) => {
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            reactedRoleName = roleList.find(role => role.icon === reaction.emoji.name).name
            role = guild.roles.cache.find(role => (role.name === reactedRoleName));
            memberWhoReacted.roles.add(role.id);
        });
        collector.on('remove', (reaction, user) => {
            const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
            reactedRoleName = roleList.find(role => role.icon === reaction.emoji.name).name
            role = guild.roles.cache.find(role => (role.name === reactedRoleName));
            memberWhoReacted.roles.remove(role.id);
        });
    });
}


client.login(config.token);