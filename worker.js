// Cloudflare Worker: Sora 3 Invite Codes bot
// Вставь этот код в Workers → Create Worker → замени содержимое
// Не забудь: 1) добавить секрет BOT_TOKEN в настройках Worker'а
//            2) вписать ссылку на файл в FILE_URL ниже

const FILE_URL = "ССЫЛКА_НА_ТВОЙ_APK_ИЛИ_HTML"; // например ссылка с Appilix или tiiny.host

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Sora 3 bot is running");
    }

    const update = await request.json();
    const msg = update.message;
    if (!msg || !msg.text) return new Response("OK");

    const chatId = msg.chat.id;
    const text = msg.text.toLowerCase();
    const token = env.BOT_TOKEN;
    const api = `https://api.telegram.org/bot${token}`;

    if (text.includes("код") || text.includes("code") || text.includes("инвайт")) {
      const len = 3 + Math.floor(Math.random() * 7); // 3..9 цифр
      let code = "";
      for (let i = 0; i < len; i++) code += Math.floor(Math.random() * 10);

      await fetch(`${api}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Твой инвайт-код Sora 3: ${code}`,
        }),
      });
    } else if (
      text.includes("скачать") ||
      text.includes("download") ||
      text.includes("apk") ||
      text.includes("установить")
    ) {
      await fetch(`${api}/sendDocument`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          document: FILE_URL,
          caption: "Вот Sora 3 — держи файл",
        }),
      });
    } else {
      await fetch(`${api}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: 'Напиши "код", чтобы получить инвайт-код, или "скачать", чтобы получить файл Sora 3.',
        }),
      });
    }

    return new Response("OK");
  },
};
