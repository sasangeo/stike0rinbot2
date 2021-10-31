const { MessageType } = require("@adiwajshing/baileys");

//const { sticker } = require("../lib/sticker");

const { createSticker, StickerTypes } = require("wa-sticker-formatter");

const uploadFile = require("../lib/uploadFile");

const uploadImage = require("../lib/uploadImage");

let { webp2png } = require("../lib/webp2mp4");

let handler = async (m, { conn, args, usedPrefix, command }) => {

  let stiker = false;

  let wsf = false;

  let q = m.quoted ? m.quoted : m;

  let mime = (q.msg || q).mimetype || "";

  if (/webp/.test(mime)) {

    let img = await q.download();

    let out = await webp2png(img)

    if (!img) throw `balas media dengan perintah ${usedPrefix + command}`;

    const sticker = await createSticker(out, {

      type: StickerTypes.CROPPED,

      pack: global.packname,

      author: global.author,

    });

    await conn.sendMessage(m.chat, sticker, MessageType.sticker, {

      quoted: m,

      mimetype: "image/webp",

    });

  } else if (/image/.test(mime)) {

    let img = await q.download();

    let link = await uploadImage(img);

    if (!img) throw `balas media dengan caption ${usedPrefix + command}`;

    const sticker = await createSticker(link, {

      type: StickerTypes.CROPPED,

      pack: global.packname,

      author: global.author,

    });

    await conn.sendMessage(m.chat, sticker, MessageType.sticker, {

      quoted: m,

      mimetype: "image/webp",

    });

  } else if (/video/.test(mime)) {

    if ((q.msg || q).seconds > 11) throw "Maksimal 10 detik!";

    let img = await q.download();

    let link = await uploadFile(img);

    if (!img) throw `balas media dengan caption ${usedPrefix + command}`;

    const sticker = await createSticker(link, {

      type: StickerTypes.CROPPED,

      pack: global.packname,

      author: global.author,

    });

    await conn.sendMessage(m.chat, sticker, MessageType.sticker, {

      quoted: m,

      mimetype: "image/webp",

    });

  } else if (args[0]) {

    if (isUrl(args[0])) {

      const sticker = await createSticker(args[0], {

        type: StickerTypes.CROPPED,

        pack: global.packname,

        author: global.author,

      });

      await conn.sendMessage(m.chat, sticker, MessageType.sticker, {

        quoted: m,

        mimetype: "image/webp",

      });

    } else throw "URL tidak valid!";

  } else throw `Gagal${m.isGroup ? ", balas gambarnya!" : ""}`;

};

handler.help = ["stiker ", "stiker <url>"];

handler.tags = ["sticker"];

handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

module.exports = handler;

const isUrl = (text) => {

  return text.match(

    new RegExp(

      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/,

      "gi"

    )

  );

};
