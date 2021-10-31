"wa-sticker-formatter": "^4.0.14",

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
