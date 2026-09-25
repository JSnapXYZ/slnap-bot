import "dotenv/config";
import pkg from "@slack/bolt";
const { App } = pkg;

export function catpic() {
  /**
   * @type {import('@slack/types').ImageBlock}
   */
  const block = {
    type: "image",
    title: {
      type: "plain_text",
      text: "Please enjoy this photo of a kitten",
    },
    block_id: "image4",
    image_url: "https://cataas.com/cat",
    alt_text: "A random kitten photo", 
  };
  return block;
}

export function catgif() {
  /**
   * @type {import('@slack/types').ImageBlock}
   */
  const block = {
    type: "image",
    title: {
      type: "plain_text",
      text: "Please enjoy this gif of a kitten",
    },
    block_id: "image4",
    image_url: "https://cataas.com/cat/gif",
    alt_text: "A random kitten gif!!!!", 
  };
  return block;
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/slnapbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/slnapbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/slnapbot-ping - Check bot latency
/slnapbot-catpic - Get a random cat pic`,
  });
});

app.command("/slnapbot-catpic", async ({ command, ack, respond }) => {
  await ack();

  await respond({
    blocks: [catpic()],
  });
});

app.command("/slnapbot-gifcat", async ({ command, ack, respond }) => {
  await ack();

  await respond({
    blocks: [catgif()],
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();