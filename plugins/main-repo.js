const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')
const {sleep} = require('../lib/functions')
const fs = require('fs')
const path = require('path')

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Fetch information about a GitHub repository.",
    react: "👑",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/BilalTech05/BILAL-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API with axios
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        
        const repoData = response.data;

        // Format the repository information in new stylish format
        const formattedInfo = `
*┏────〘 👑 INFO 👑 〙───⊷*
*┃👑 NAME :❯ ${repoData.name}*
*┃👑 STARS :❯ ❮ ${repoData.stargazers_count} ❯*
*┃👑 FORKS :❯ ❮ ${repoData.forks_count} ❯*
*┗──────────────⊷*

*👑 REPO DESCRIPTION 👑*
${repoData.description || '*PROUD TO PAKISTAN 🇵🇰*'}

*👑 REPO LINK 👑* 
*${repoData.html_url}*

*👑 ClICK HERE FOR HELP 👑* 

*👑 DEVELEPER 👑* 
*https://akaserein.github.io/Bilal/*

*👑 SUPPORT CHANNEL 👑*
*https://whatsapp.com/channel/0029VbBXuGe4yltMLngL582d*

*👑 SUPPORT GROUP 👑* 
*https://chat.whatsapp.com/BwWffeDwiqe6cjDDklYJ5m?mode=ems_copy_t*

*👑 URDU LANGUAGE WHATSAPP BOT👑*
*👑 BILAL-MD BEST BOT 👑*
`.trim();

        // Send an image with the formatted info as a caption
        await conn.sendMessage(from, {
            image: { url: `https://i.postimg.cc/7LWBgYMq/bilal.jpg` }, // Replace with your image URL
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363289379419860@newsletter',
                    newsletterName: 'PROUD TO PAKISTAN 🇵🇰',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio voice message after sending repo info
        const audioPath = path.join(__dirname, './bilal/menux.m4a');
        
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: { url: audioPath },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: mek });
        } else {
            console.error("Audio file not found at path:", audioPath);
        }

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
