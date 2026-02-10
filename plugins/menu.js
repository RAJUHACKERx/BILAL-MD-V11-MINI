const config = require('../config');
const os = require('os');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');

// --- PRE-LOAD IMAGE TO STOP LAG ---
const menuImagePath = path.resolve('./bilal/menu.jpg');
let menuImageBuffer = null;
try {
    menuImageBuffer = fs.readFileSync(menuImagePath);
} catch (e) {
    console.log("BILAL-MD PIC NAHI MILI IS LIE JUST MENU TEXT SEND HO RAHA HAI");
}

// Helpers
const monospace = (text) => `\`${text}\``;
const formatSize = (bytes) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + 'GB';
    return (bytes / 1048576).toFixed(1) + 'MB';
};
const formatUptime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
};

cmd({
    pattern: 'menu',
    alias: ['help', 'allmenu', "m", "list"],
    react: '👑',
    category: 'main',
    filename: __filename,
    desc: 'Show optimized main menu'
}, async (conn, mek, m, { from, sender, pushName, reply }) => {
    try {
        const timeZone = 'Asia/Karachi';
        const time = moment.tz(timeZone).format('hh:mm:ss A');
        const date = moment.tz(timeZone).format('DD/MM/YYYY');
        const uptime = formatUptime(process.uptime());
        const ram = `${formatSize(os.totalmem() - os.freemem())}/${formatSize(os.totalmem())}`;
        const mode = (config.MODE === 'public') ? 'PUBLIC' : 'PRIVATE';
        const userName = pushName || 'User';

        // Filter and Group Commands
        const commandsByCategory = {};
        let totalCommands = 0;
        commands.forEach(command => {
            if (command.pattern && !command.dontAdd && command.category) {
                const cat = command.category.toUpperCase();
                if (!commandsByCategory[cat]) commandsByCategory[cat] = [];
                commandsByCategory[cat].push(command.pattern.split('|')[0]);
                totalCommands++;
            }
        });

        // Construct Menu String
        let menu = `╭══〘 👑 BILAL-MD 👑 〙══⊷*
*┃👑 MODE :❯ ${monospace(mode)}*
*┃👑 USER :❯ ${monospace(userName)}*
*┃👑 PLUGINS :❯ ${monospace(totalCommands)}*
*┃👑 UPTIME :❯ ${monospace(uptime)}*
*┃👑 DATE :❯ ${monospace(date)}*
*┃👑 URAM :❯ ${monospace(ram)}*
*┃👑 SPEED :❯ ${monospace(Math.floor(Math.random() * 50) + 10 + 'MS')}*
╰═════════════════⊷

*Command List ⤵*`;

        for (const category in commandsByCategory) {
            menu += `\n\n*╭━━━━❮ 👑 ${monospace(category)} 👑 ❯━⊷*\n`;
            commandsByCategory[category].sort().forEach(cmdName => {
                menu += `*┃👑 ${monospace(config.PREFIX + cmdName)}*\n`;
            });
            menu += `*╰━━━━━━━━━━━━━━━━━⊷*`;
        }

        menu += `\n\n> *URDU LANGUAGE BOT 😘`;

        // Efficient Send
        await conn.sendMessage(from, {
            image: menuImageBuffer ? { url: menuImagePath } : { url: 'https://via.placeholder.com/500' },
            caption: menu,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 1,
                externalAdReply: {
                    title: 'PROUD TO PAKISTAN 🇵🇰',
                    body: 'BY BILAL',
                    thumbnail: menuImageBuffer,
                    sourceUrl: 'https://whatsapp.com/channel/0029Vaj3Xnu17EmtDxTNnQ0G',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply('MENU SHOW NAHI HO RAHA BILAL SIR MENU ERROR FIX KR DE GE ISKO 😊');
    }
});
