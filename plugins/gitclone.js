const { cmd } = require("../command");
const fetch = require("node-fetch");

const { cmd } = require("../command");

cmd({
  pattern: 'gitclone',
  alias: ["git"],
  desc: "Download GitHub repository as zip",
  react: '📦',
  category: "downloader",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {

  try {

    if (!args[0]) {
      return reply(
        "❌ Give GitHub repo link\n\nExample:\n.gitclone https://github.com/user/repo"
      );
    }

    const match = args[0].match(/github\.com\/([^\/]+)\/([^\/]+)/i);

    if (!match) {
      return reply("⚠️ Invalid GitHub link.");
    }

    const user = match[1];
    const repo = match[2].replace(".git", "");

    const zipUrl = `https://github.com/${user}/${repo}/archive/refs/heads/main.zip`;

    await reply(
      `📥 *Downloading repository*\n\n` +
      `👤 User: ${user}\n` +
      `📦 Repo: ${repo}`
    );

    await conn.sendMessage(from, {
      document: { url: zipUrl },
      fileName: `${repo}.zip`,
      mimetype: "application/zip"
    }, { quoted: m });

  } catch (err) {

    console.error("Gitclone error:", err);
    reply("❌ Failed to download repository.");
  }
});
