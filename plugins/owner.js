const { gmd, config, commands, getBuffer, getSudoNumbers,
  addSudo, removeSudo, fetchJson } = require('../lib'), 
      { PREFIX, 
       TIME_ZONE: tz } = config, 
       fs = require('fs'), 
       path = require('path'), 
       axios = require('axios'), 
       util = require('util'), 
       moment = require('moment-timezone'), 
      { exec } = require('child_process'), 
      { WA_DEFAULT_EPHEMERAL, 
       downloadContentFromMessage, 
       makeInMemoryStore } = require('@whiskeysockets/baileys');
//const store = makeInMemoryStore({});

gmd({
    pattern: "myprivacy",
    alias: ["allprivacy", "listprivacy", "privacy", "privacy-settings", "myprivacy"],
    desc: "Get Current Privacy Settings",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const privacySettings = await Aliconn.fetchPrivacySettings(true);
        console.log("Privacy settings: " + JSON.stringify(privacySettings));
        reply(`*💬 Current Privacy Settings:*\n\n${JSON.stringify(privacySettings, null, 2)}`);
    } catch (error) {
        reply(`❌ Error fetching privacy settings: ${error.message}`);
    }
});

gmd({
    pattern: "lastseen",
    desc: "Update Last Seen Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        await Aliconn.updateLastSeenPrivacy(value);
        reply(`✅ Last seen privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating last seen privacy: ${error.message}`);
    }
});

gmd({
    pattern: "online",
    desc: "Update Online Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'match_last_seen'];
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'match_last_seen'.");
        await Aliconn.updateOnlinePrivacy(value);
        reply(`✅ Online privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating online privacy: ${error.message}`);
    }
});

gmd({
    pattern: "myprofile-pic",
    desc: "Update Profile Picture Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];  
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");     
        await Aliconn.updateProfilePicturePrivacy(value);
        reply(`✅ Profile picture privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating profile picture privacy: ${error.message}`);
    }
});

gmd({
    pattern: "mystatus",
    desc: "Update Status Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all';
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none']; 
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'."); 
        await Aliconn.updateStatusPrivacy(value);
        reply(`✅ Status privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating status privacy: ${error.message}`);
    }
});

gmd({
    pattern: "read-receipts",
    desc: "Update Read Receipts Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂**📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'none'];    
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'none'.");   
        await Aliconn.updateReadReceiptsPrivacy(value);
        reply(`✅ Read receipts privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating read receipts privacy: ${error.message}`);
    }
});

gmd({
    pattern: "groups-privacy",
    desc: "Update Group add Privacy",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const value = args[0] || 'all'; 
        const validValues = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!validValues.includes(value)) return reply("❌ Invalid option. Valid options are: 'all', 'contacts', 'contact_blacklist', 'none'.");
        await Aliconn.updateGroupsAddPrivacy(value);
        reply(`✅ Group add privacy updated to: ${value}`);
    } catch (error) {
        reply(`❌ Error updating group add privacy: ${error.message}`);
    }
});

gmd({
    pattern: "setdisapp",
    alias: ["disappearing", "default-disapp", "disapp-msgs"],
    desc: "Update Default Disappearing Messages",
    category: "owner",
    react: "🔐",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const duration = args[0] || 86400; // Default to 86400 (1 day)
        
        await Aliconn.updateDefaultDisappearingMode(duration);
        reply(`✅ Default disappearing messages updated to: ${duration} seconds`);
    } catch (error) {
        reply(`❌ Error updating disappearing messages: ${error.message}`);
    }
});


gmd({
    pattern: "block",
    desc: "Block a User.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the bot owner!");
    if (!m.quoted) return reply("❌ Please reply to the user you want to block.");
    const user = quoted.sender;
    try {
        await Aliconn.updateBlockStatus(user, 'block');
        reply('🚫 User ' + user + ' blocked successfully.');
    } catch (error) {
        reply('❌ Error blocking user: ' + error.message);
    }
});

gmd({
    pattern: "unblock",
    desc: "Unblock a User.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (!m.quoted) return reply("❌ Please reply to the user you want to unblock.");
    const user = quoted.sender;
    try {
        await Aliconn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

gmd({
pattern: "del",
react: "🧹",
alias: ["delete"],
desc: "Delete Message",
category: "owner",
use: '.del',
filename: __filename
},
async(Aliconn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner) return;
try{
if (!m.quoted) return reply('No Message Quoted for Deletion');
const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
        await Aliconn.sendMessage(m.chat, { delete: key })
await m.react("✅"); 
} catch(e) {
console.log(e);
reply('success..')
} 
})

gmd({
    pattern: "clearchats",
    alias: ["clear", "delchats"],
    desc: "Clear all Chats.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const chats = Aliconn.chats.all();
        for (const chat of chats) {
            await Aliconn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All Chats Successfully cleared!");
    } catch (error) {
        reply(`❌ Error: ${error.message}`);
    }
});

gmd({
    pattern: "jid",
    desc: "Get the Bot's JID.",
    category: "owner",
    react: "🤖",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    reply(`🤖 *Bot JID:* ${Aliconn.user.id}`);
});


gmd({
    pattern: "gjid",
    alias: ["groupjids"],
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "group",
    react: "📝",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    const groups = await Aliconn.groupFetchAllParticipating();
    const groupJids = Object.keys(groups).join('\n');
    reply(`📝 *Group JIDs:*\n\n${groupJids}`);
});        

gmd({
    pattern: "archive",
    desc: "Archive a Specific Chat",
    category: "owner",
    react: "📦",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        store.bind(Aliconn.ev);
        Aliconn.store = store;
        const chatId = from; 
        const chatMessages = await Aliconn.store.messages[chatId]?.last; 
        if (!chatMessages) {
            return reply("❌ No messages found in this chat!");
        }
        await Aliconn.chatModify({ archive: true, lastMessages: [chatMessages] }, chatId);
        reply("📦 Chat archived successfully!");
    } catch (error) {
        reply(`❌ Error archiving chat: ${error.message}`);
    }
});


gmd({
    pattern: "pin",
    desc: "Pin a Specific Chat",
    category: "owner",
    react: "📌",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        await Aliconn.chatModify({ pin: true }, from);
        reply("📌 Chat pinned successfully!");
    } catch (error) {
        reply(`❌ Error pinning chat: ${error.message}`);
    }
});

gmd({
    pattern: "unpin",
    desc: "Unpin a Specific Chat",
    category: "owner",
    react: "📌",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        await Aliconn.chatModify({ pin: false }, from);
        reply("📌 Chat unpinned successfully!");
    } catch (error) {
        reply(`❌ Error unpinning chat: ${error.message}`);
    }
});


gmd({
    pattern: "star",
    desc: "Star a Specific Message in a Chat",
    category: "owner",
    react: "⭐",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const messageId = args[0];
        await Aliconn.chatModify({
            star: { messages: [{ id: messageId, fromMe: true, star: true }] }
        }, from);
        reply("⭐ Message starred!");
    } catch (error) {
        reply(`❌ Error starring message: ${error.message}`);
    }
});

gmd({
    pattern: "unstar",
    desc: "Unstar a Specific Message in a Chat",
    category: "owner",
    react: "⭐",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const messageId = args[0];
        await Aliconn.chatModify({
            star: { messages: [{ id: messageId, fromMe: true, star: false }] }
        }, from);
        reply("⭐ Message unstarred!");
    } catch (error) {
        reply(`❌ Error unstarring message: ${error.message}`);
    }
});


gmd({
    pattern: "disapp-on",
    desc: "Turn on Disappearing Messages",
    category: "owner",
    react: "⏳",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const jid = from; 
        await Aliconn.sendMessage(jid, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL });
        reply("⏳ Disappearing messages turned on!");
    } catch (error) {
        reply(`❌ Error enabling disappearing messages: ${error.message}`);
    }
});


gmd({
    pattern: "disapp-off",
    desc: "Turn off Disappearing Messages",
    category: "owner",
    react: "⏳",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const jid = from;
        await Aliconn.sendMessage(jid, { disappearingMessagesInChat: false });
        reply("⏳ Disappearing messages turned off!");
    } catch (error) {
        reply(`❌ Error disabling disappearing messages: ${error.message}`);
    }
});


gmd({
    pattern: "onwa",
    desc: "Check if a Number is on WhatsApp",
    category: "owner",
    react: "📱",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const id = args[0];
        const [result] = await Aliconn.onWhatsApp(id);
        if (result.exists) {
            reply(`${id} exists on WhatsApp, as jid: ${result.jid}`);
        } else {
            reply(`${id} does not exist on WhatsApp.`);
        }
    } catch (error) {
        reply(`❌ Error checking WhatsApp number: ${error.message}`);
    }
});


gmd({
    pattern: "wa",
    desc: "Generates a wa.me link for the Mentioned/Quoted User.",
    category: "owner",
    filename: __filename,
}, async (Aliconn, mek, m, { quoted, text, args, isOwner }) => {
      if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        let user;
        if (m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            user = m.message.extendedTextMessage.contextInfo.mentionedJid[0].split('@')[0];
        } else if (quoted) {
            user = quoted.sender.split('@')[0];
        } else if (text) {
            user = text.replace('@', '');
        } else {
            return Aliconn.sendMessage(m.key.remoteJid, { text: "Please mention a user, quote a message, or provide a number." }, { quoted: mek });
        }
        return Aliconn.sendMessage(m.key.remoteJid, { text: `https://wa.me/${user}` }, { quoted: mek });
    } catch (error) {
        console.error(error);
        return Aliconn.sendMessage(m.key.remoteJid, { text: "An error occurred while processing your request." }, { quoted: mek });
    }
});


gmd({
    pattern: "setstatus",
    desc: "Change Profile Status",
    category: "owner",
    react: "📲",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const status = args.join(" ");
        await Aliconn.updateProfileStatus(status);
        reply(`📲 Profile status updated to: ${status}`);
    } catch (error) {
        reply(`❌ Error changing profile status: ${error.message}`);
    }
});

gmd({
    pattern: "setmyname",
    desc: "Change Profile Name",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    try {
        const name = args.join(" ");
        await Aliconn.updateProfileName(name);
        reply(`📝 Profile name updated to: ${name}`);
    } catch (error) {
        reply(`❌ Error changing profile name: ${error.message}`);
    }
});


gmd({
    pattern: "broadcast",
    desc: "Broadcast a Message to All Groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (Aliconn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (args.length === 0) return reply("📢 Provide a message to breadcast after the command.");
    const message = args.join(' ');
    const groups = Object.keys(await Aliconn.groupFetchAllParticipating());
    for (const groupId of groups) {
    await Aliconn.sendMessage(groupId, {
    image: { url: config.BOT_PIC },
    caption: message 
}, { quoted: mek });

    }
    reply("📢 Message Delivered to all your groups.");
});



    gmd({
    pattern: "setpp",
    desc: "Set Bot Profile Picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (Aliconn, mek, m, { isOwner, quoted, reply }) => {
    try {
        if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");

        if (!quoted || quoted.mtype !== "image") {
            return reply("❌ Please reply to an image.");
        }

        const buffer = await quoted.download(); // gets image as buffer

        if (!buffer) return reply("⚠️ Could not download the image.");

        await Aliconn.updateProfilePicture(Aliconn.user.id, buffer);
        reply("✅ Bot profile picture updated successfully!");
    } catch (error) {
        console.error("❌ Error updating profile picture:", error);
        reply(`❌ Failed to update profile picture: ${error.message}`);
    }
});

gmd({
    pattern: "exec",
    alias: ["$", "run", "terminal", "code", "execute", ">", "shell"],
    desc: "Execute Terminal Commands.",
    category: "owner",
    react: "💻",
    filename: __filename
}, async (Aliconn, mek, m, { reply, isOwner, isMe, botNumber2, botNumber, q }) => {
    if (!isOwner && !isMe && !botNumber2 && !botNumber) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (!q) return reply("Provide a terminal command to execute.");
    exec(q, (err, stdout, stderr) => {
        if (err) return reply(`❌ Error: ${err.message}`);
        if (stderr) return reply(`⚠️ Stderr: ${stderr}`);
        if (stdout) reply(stdout.trim());
    });
});




gmd({
    pattern: "eval3",
    alias: ["<", "e", "evaluate"],
    desc: "Evaluate JavaScript Code.",
    category: "owner",
    react: "🧠",
    filename: __filename
}, async (Aliconn, mek, m, { reply, isOwner, q }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (!q) return reply("Provide some code to evaluate.");

    try {
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

        const fn = new AsyncFunction("Aliconn", "mek", "m", "reply", "console", `
            (async () => {
                try {
                    ${q}
                } catch (innerErr) {
                    await reply("❌ Eval Error: " + (innerErr?.stack || innerErr?.message || innerErr));
                }
            })();
        `);

        await fn(Aliconn, mek, m, reply, console);
    } catch (err) {
        await reply("❌ Fatal Eval Error: " + (err?.stack || err?.message || err));
    }
});

gmd({
    pattern: "eval",
    alias: ["<", "e", "evaluate"],
    desc: "Evaluate JavaScript Code.",
    category: "owner",
    react: "🧠",
    filename: __filename
}, async (Aliconn, mek, m, { reply, isOwner, q }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (!q) return reply("Provide some code to evaluate.");
    try {
        let result = /await/i.test(q)
            ? await eval(`(async () => { ${q} })()`)
            : eval(q);
        reply(util.format(result));
    } catch (err) {
        reply(`❌ Error: ${util.format(err)}`);
    }
});



gmd({
    pattern: "fetch",
    alias: ["get", "download", "load", "axios"],
    desc: "Get Data/Files from URLs",
    category: "owner",
    react: "🔎",
    filename: __filename
}, async (Aliconn, mek, m, { from, reply, isOwner, q }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (!q) return reply("Provide a URL to get data from");
    if (!/^https?:\/\//.test(q)) return reply('Start the *URL* with http:// or https://');
    try {
        const url = new URL(q).href;
        const response = await fetch(url);
        const contentLength = response.headers.get('content-length');
        if (contentLength && contentLength > 50 * 1024 * 1024) {
            return reply(`❌ Content-Length exceeds limit: ${contentLength}`);
        }
        const contentType = response.headers.get('content-type') || '';
        if (/image\//.test(contentType)) {
            const buffer = Buffer.from(await response.arrayBuffer());
            await Aliconn.sendMessage(from, { image: buffer, caption: `> ${global.footer}` });
            return;
        } else if (/audio\//.test(contentType)) {
            const buffer = Buffer.from(await response.arrayBuffer());
            await Aliconn.sendMessage(from, { audio: buffer, mimetype: contentType, ptt: false }); 
            return;
        } else if (/video\//.test(contentType)) {
            const buffer = Buffer.from(await response.arrayBuffer());
            await Aliconn.sendMessage(from, { video: buffer, caption: `> ${global.footer}` });
            return;
        }
        let content = '';
        if (/application\/json/.test(contentType)) {
            content = JSON.stringify(await response.json(), null, 2);
        } else if (/text/.test(contentType)) {
            content = await response.text();
        } else {
            return reply("❌ Unsupported content type.");
        }
        reply(content.slice(0, 65536)); 
    await m.react("✅"); 
    } catch (error) {
        console.error('Fetch Error:', error);
        reply(`❌ Error: ${error.message}`);
    }
});


gmd({
    pattern: "pair",
    alias: ["getsess", "paircode", "linkphone", "getpaircodd"],
    desc: "Generate Paircode",
    category: "owner",
    react: "📱",
    filename: __filename
},
async (Aliconn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (!q) return reply("Provide a Phone Number to Genrrate PairingCode!");
    try {
        const response = await fetchJson(`${global.session}/code?number=${encodeURIComponent(q)}`);
        const getsess = response.code;
        const answer = `Dear *_${m.pushName}_*,\nYour ALI MD PairingCode is: *${getsess}*\nUse it to Link Your WhatsApp Within 1 Minute Before it Expires\nThereafter, Obtain Your Session ID.\nHappy Bot Deployment!!!\n\n${global.caption}`;
        const giftedMess = {
        image: { url: config.BOT_PIC },
        caption: answer,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 5,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363318387454868@newsletter',
                        newsletterName: "𝐀𝐋𝐈-𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓-💸",
            serverMessageId: 143
          }
        }
      };
      await Aliconn.sendMessage(from, giftedMess, { disappearingMessagesInChat: true, ephemeralExpiration: 100 }, { quoted: mek });
      await Aliconn.sendMessage(from, { text: getsess }, { quoted: mek });
      await m.react('✅');
  } catch (error) {
        reply(`❌ Error fetching paircode code: ${error.message}`);
    }
});

gmd({
    pattern: "mode",
    react: "🫟",
    desc: "Set bot mode to private or public.",
    category: "owner",
    filename: __filename,
}, async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    // Si aucun argument n'est fourni, afficher le mode actuel et l'usage
    if (!args[0]) {
        return reply(`*🏷️ єχαмρℓє: мσ∂є ρυвℓι¢/ρʀιναтє*`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("*🛰️ вσт мσ∂є ιѕ ɴσω ѕєт тσ ρʀιναтє*");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("*✅ вσт мσ∂є ιѕ ɴσω ѕєт тσ ρυвℓι¢*")
        const {exec} = require("child_process")
reply("*_RESTARTING NOW...🚀_*")
await sleep(1500)
exec("pm2 restart all")
reply("*_ALI-MD STARTED NOW...🚀_*");
    } else {
        return reply("*🏷️ єχαмρℓє: мσ∂є ρυвℓι¢/ρʀιναтє*");
    }
});


gmd({
    pattern: "anticall",
    alias: ["anti-call"],
    desc: "Enable or disable admin event notifications",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTICALL = "true";
        return reply("*✅ αитι¢αℓℓ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.ANTICALL = "false";
        return reply("*❌ αитι¢αℓℓ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αитι¢αℓℓ  σɴ/σff*`);
    }
});


gmd({
    pattern: "callblock",
    alias: ["call-block"],
    desc: "Enable or disable admin event notifications",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTICALL = "block";
        return reply("*✅ αитι¢αℓℓ нαѕ вєєɴ ѕєт тσ вℓσ¢к*");
    } else if (status === "off") {
        config.ANTICALL = "false";
        return reply("*❌ αитι¢αℓℓ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .¢αℓℓ вℓσ¢к  σɴ/σff*`);
    }
});

gmd({
    pattern: "welcome",
    alias: ["goodbye"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.WELCOME = "true";
        return reply("*✅ gσσ∂вує нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.WELCOME = "false";
        return reply("*❌ gσσ∂вує нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: ωєℓ¢σмє σɴ/σff*`);
    }
});

gmd({
    pattern: "antilink",
    react: "🫟",
    alias: ["anti-link"],
    desc: "Enable or disable antilink",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, isAdmins, isBotAdmins, isGroup, reply }) => {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ ᴜѕє тнιѕ ᴄσммαɴ∂.*');
    if (!isAdmins && isOwner) return reply('*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*');

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTILINK = "true";
        return reply("*✅ αɴтι-ℓιɴк кι¢к нαѕ вєєи єɴαвℓє∂*");
    } else if (status === "off") {
        config.ANTILINK = "false";
        return reply("*❌ αɴтι-ℓιɴк нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: αɴтι-ℓιɴк σɴ/σff*`);
    }
});

gmd({
    pattern: "antilinkdel",
    react: "🫟",
    desc: "Enable or disable antilink",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, isAdmins, isBotAdmins, isGroup, reply }) => {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ ᴜѕє тнιѕ ᴄσммαɴ∂.*');
    if (!isAdmins && isOwner) return reply('*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*');

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTILINK = "delete";
        return reply("*✅ αɴтιℓιɴк ∂єℓєтє нαѕ вєєи єɴαвℓє∂*");
    } else if (status === "off") {
        config.ANTILINK = "false";
        return reply("*❌ αɴтι-ℓιɴк ∂єℓєтє нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: αɴтιℓιɴк∂єℓєтє σɴ/σff*`);
    }
});

gmd({
    pattern: "antilinkwarn",
    react: "🫟",
    desc: "Enable or disable antilink",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, isAdmins, isBotAdmins, isGroup, reply }) => {
    if (!isGroup) return reply('This command can only be used in a group.');
    if (!isBotAdmins) return reply('*📛 ι ɴєє∂ тσ вє αɴ α∂мιɴ тσ ᴜѕє тнιѕ ᴄσммαɴ∂.*');
    if (!isAdmins && isOwner) return reply('*📛 σɴℓʏ gʀσᴜᴘ α∂мιɴs σʀ тнє σωɴєʀ ᴄαɴ ᴜsє тнιѕ ᴄσммαɴ∂.*');

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTILINK = "warn";
        return reply("*✅ αɴтι-ℓιɴк ωαʀɴ нαѕ вєєи єɴαвℓє∂*");
    } else if (status === "off") {
        config.ANTILINK = "false";
        return reply("*❌ αɴтι-ℓιɴк ωαʀɴ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: αɴтιℓιɴкωαʀɴ σɴ/σff*`);
    }
});

gmd({
    pattern: "antiword",
    alias: ["menonreply", "antibadword"],
    description: "Set bot status to always online or offline.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTIWORD = "true";
        return reply("*✅ αɴтιωσʀ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.ANTIWORD = "false";
        return reply("*❌ αɴтιωσʀ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αɴтιωσʀ σɴ/σff*`);
    }
});


gmd({
    pattern: "autobio",
    alias: ["menetionreply", "bio"],
    description: "Set bot status to always online or offline.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_BIO = "true";
        return reply("*✅ αυтσвισ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_BIO = "false";
        return reply("*❌ αυтσвισ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσвισ σɴ/σff*`);
    }
});
//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
gmd({
    pattern: "always-online",
    alias: ["alwaysonline"],
    desc: "Enable or disable the always online mode",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ALWAYS_ONLINE = "online";
        await reply("*✅ αℓωαуѕ-σɴℓιиє нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.ALWAYS_ONLINE = "unavailable";
        await reply("*❌ αℓωαуѕ-σɴℓιиє нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .αℓωαуѕ-σɴℓιиє σɴ/σff*`);
    }
});

gmd({
    pattern: "autorecording",
    desc: "Enable or disable the always online mode",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.PRESENCE = "recording";
        await reply("*✅ αυтσ-ʀє¢σʀ∂ιɴg нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.PRESENCE = "unavailable";
        await reply("*❌ αυтσ-ʀє¢σʀ∂ιɴg нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .αυтσ-ʀє¢σʀ∂ιɴg σɴ/σff*`);
    }
});

gmd({
    pattern: "autotyping",
    desc: "Enable or disable the always online mode",
    category: "owner",
    filename: __filename
},
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.PRESENCE = "typing";
        await reply("*✅ αυтσ-туριɴg нαѕ вєєɴ єɴαвℓє∂*");
    } else if (status === "off") {
        config.PRESENCE = "unavailable";
        await reply("*❌ αυтσ-туριɴg нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .туριɴg σɴ/σff*`);
    }
});

gmd({
    pattern: "statusview",
    alias: ["autostatusview","status-view"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_READ_STATUS = "true";
        return reply("*✅ ѕтαтυѕ-νιєω нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_READ_STATUS = "false";
        return reply("*❌ ѕтαтυѕ-νιєω нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .ѕтαтυѕ-νιєω σɴ/σff*`);
    }
}); 

gmd({
    pattern: "statusreact",
    alias: ["statusreaction"],
    desc: "Enable or disable auto-liking of statuses",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_LIKE_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_LIKE_STATUS = "true";
        return reply("*✅ ѕтαтυѕ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_LIKE_STATUS = "false";
        return reply("*❌ ѕтαтυѕ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .ѕтαтυѕ-ʀєα¢т σɴ/σff*`);
    }
});
//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
gmd({
    pattern: "autoread",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_READ_MESSAGES = "true";
        return reply("*✅ ʀєα∂-мєѕѕαgє нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_READ_MESSAGES = "false";
        return reply("*❌ ʀєα∂-мєѕѕαgє нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: ʀєα∂-мєѕѕαgє σɴ/σff*`);
    }
});

// AUTO_VOICE

gmd({
    pattern: "autovoice",
    alias: ["autovoice"],
    desc: "enable or disable readmessage.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_AUDIO = "true";
        return reply("*✅ αυтσ-νσι¢є нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_AUDIO = "false";
        return reply("*❌ αυтσ-νσι¢є нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-νσι¢є σɴ/σff*`);
    }
});
//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
gmd({
    pattern: "auto-sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply("*✅ αυтσ-ѕтι¢кєʀ нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply("*❌ αυтσ-ѕтι¢кєʀ нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-ѕтι¢кєʀ σɴ/σff*`);
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
gmd({
    pattern: "auto-reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply("*✅ αυтσ-ʀєρℓу нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply("*❌ αυтσ-ʀєρℓу нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        return reply(`*🏷️ єχαмρℓє: .αυтσ-ʀєρℓу σɴ/σff*`);
    }
});
//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
gmd({
    pattern: "autoreact",
    alias: ["autoreact"],
    desc: "Enable or disable the autoreact feature",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*✅ αυтσ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("*❌ αυтσ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .αυтσ-ʀєα¢т σɴ/σff*`);
    }
});

gmd({
  pattern: "🍼",
  alias: ["l"],
  desc: "Leaves the current group",
}, async (Aliconn, mek, m, { from, reply }) => {
  try {
    // `from` is the group chat ID
    await Aliconn.groupLeave(from);
    reply("Successfully left the group🙂.");
  } catch (error) {
    console.error(error);
    reply("Failed to leave the group.🤦🏽‍♂️");
  }
});

gmd({
    pattern: "owner-react",
    alias: ["ownerreact","selfreact"],
    desc: "Enable or disable the autoreact feature",
    category: "owner",
    filename: __filename
},    
async (Aliconn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*🫟σɴℓу тнє σωɴєʀ ¢αɴ ᴜѕє тнιѕ ¢σммαɴ∂!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.OWNER_REACT = "true";
        await reply("*✅ σωɴєʀ-ʀєα¢т нαѕ вєєɴ єɴαвℓє∂*");
    } else if (args[0] === "off") {
        config.OWNER_REACT = "false";
        await reply("*❌ σωɴєʀ-ʀєα¢т нαѕ вєєɴ ∂ιѕαвℓє∂*");
    } else {
        await reply(`*🏷️ єχαмρℓє: .σωɴєʀ-ʀєα¢т σɴ/σff*`);
    }
});

gmd({
    pattern: "prefix",
    alias: ["setprefix", "newprefix", "changeprefix"],
    desc: "Change Bot Prefix",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (Aliconn, mek, m, { from, q, reply, isOwner }) => {
    try {
      if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
        const newPrefix = q.trim().toLowerCase();
        if (!newPrefix) {
            return reply("Please provide a new prefix.");
        }
        config.PREFIX = newPrefix;
        saveConfig(); 
        return reply(`Bot prefix has been changed to: ${newPrefix}`);
    } catch (error) {
        console.error(error);
        reply("An error occurred while changing the prefix.");
    }
});

gmd({
    pattern: "statusreply",
    alias: ["statusreplymsg", "statusreplymessage", "setstatusreplymessage"],
    desc: "Change Status Reply Message",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (Aliconn, mek, m, { from, q, reply, isOwner }) => {
    try {
      if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
        const newMsg = q.trim();
        if (!newMsg) {
            return reply("Please provide a new status reply message.");
        }
        config.STATUS_REPLY_MSG = newMsg;
        saveConfig(); 
        return reply(`Status Reply Message has been changed to: ${newMsg}`);
    } catch (error) {
        console.error(error);
        reply("An error occurred while changing the status reply message.");
    }
});

gmd({
    pattern: "statusreact",
    alias: ["statuslikeemoji", "autolikeeoji", "setlikeemoji", "setstatuslikeemoji"],
    desc: "Change Status Like Emoji",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (Aliconn, mek, m, { from, q, reply, isOwner }) => {
    try {
      if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
        const newEmoji = q.trim();
        
        if (!newEmoji) {
            return reply("Please provide a new status like emoji.");
        }
        config.AUTO_LIKE_EMOJI = newEmoji;
        saveConfig(); 
        return reply(`Bot status like emoji has been changed to: ${newEmoji}`);
    } catch (error) {
        console.error(error);
        reply("An error occurred while changing the status like emoji.");
    }
});


gmd({
  pattern: "addsudo",
  alias: ["setsudo"],
  react: "✅",
  desc: "Add a user to sudo list",
  category: "owner",
  filename: __filename
},
async (Aliconn, mek, m, { quoted, sender, isOwner, from, reply }) => {
  if (!isOwner)
    return Aliconn.sendMessage(from, { text: "*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*" }, { quoted: mek });

  if (!quoted)
    return reply("Reply to a user to add to sudo.");

  try {
    const userJid = quoted.sender;
    const userNumber = userJid.split("@")[0];

    const added = addSudo(userNumber);
    const msg = added
      ? `✅ Added @${userNumber} to sudo list.`
      : `⚠️ @${userNumber} is already in sudo list.`;

    console.log(`[SUDO] addSudo called for: ${userNumber} | Added: ${added}`);

    await Aliconn.sendMessage(from, {
      text: msg,
      mentions: [userJid]
    }, { quoted: mek });

  } catch (err) {
    console.error("[addsudo ERROR]:", err);
    Aliconn.sendMessage(from, { text: "❌ Failed to add sudo."}, { quoted: mek });
  }
});

gmd({
  pattern: "delsudo",
  react: "❌",
  desc: "Remove a user from sudo list",
  category: "owner",
  filename: __filename
},
async (Aliconn, mek, m, { quoted, sender, isOwner, from,  reply}) => {
  if (!isOwner)
    return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*" );

  if (!quoted)
    return reply( "Reply to a user to remove from sudo.");

  try {
    const userJid = quoted.sender;
    const userNumber = userJid.split("@")[0];

    const removed = removeSudo(userNumber);
    const msg = removed
      ? `❌ Removed @${userNumber} from sudo list.`
      : `⚠️ @${userNumber} is not in the sudo list.`;

    console.log(`[SUDO] removeSudo called for: ${userNumber} | Removed: ${removed}`);

    await Aliconn.sendMessage(from, {
      text: msg,
      mentions: [userJid]
    }, { quoted: mek });

  } catch (err) {
    console.error("[delsudo ERROR]:", err);
    Aliconn.sendMessage(from, { text: "❌ Failed to remove sudo." }, { quoted: mek });
  }
});


gmd({
  pattern: "listsudo",
  react: "📃",
  desc: "List all sudo users",
  category: "owner",
  filename: __filename
},
async (Aliconn, mek, m, { from }) => {
  try {
    const sudoList = getSudoNumbers();
    if (!sudoList.length)
      return Aliconn.sendMessage(from, { text: "⚠️ No sudo users added yet." }, { quoted: mek });

    let msg = "*👑 SUDO USERS:*\n\n";
    sudoList.forEach((num, i) => {
      msg += `${i + 1}. wa.me/${num}\n`;
    });

    await Aliconn.sendMessage(from, { text: msg }, { quoted: mek });

  } catch (err) {
    console.error("[listsudo ERROR]:", err);
    Aliconn.sendMessage(from, { text: "❌ Failed to list sudo users." }, { quoted: mek });
  }
});

 gmd({
    pattern: "setautobio",
    desc: "Set Autobio based on config.AUTO_BIO.",
    category: "owner",
    react: "🍀",
    filename: __filename
}, async (Aliconn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 тнιѕ ιѕ αɴ σωɴєʀ ᴄσммαɴ∂*");
    if (autoBioEnabled) {
        reply("*Auto Bio enabled!* 🔄");
        startAutoBio(Aliconn);
    } else {
        reply("*Auto Bio disabled!* 😶");
        stopAutoBio();
    }
});


function startAutoBio(Aliconn) {
    if (autoBioInterval) clearInterval(autoBioInterval); 
    autoBioInterval = setInterval(async () => {
        const bioText = ` ${config.BOT_NAME} 𝐈𝐒 𝐀𝐂𝐓𝐈𝐕𝐄 𝟐𝟒/𝟕 | 𝐓𝐈𝐌𝐄: [${time}, ${date}]  |  𝐐𝐔𝐎𝐓𝐄: ${config.AUTO_BIO_QUOTE}`;
        await Aliconn.updateProfileStatus(bioText);
        secondCount++;
        if (secondCount > 59) {
            secondCount = 1;
        }
    }, 1000); 
}

function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  
        autoBioInterval = null;
        secondCount = 1;
        console.log("👨‍💻 AutoBIO feature stopped.");
    }
} 
