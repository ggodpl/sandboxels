import { DiscordSDK } from '@discord/embedded-app-sdk';
import { generateCard } from "./modules/browser";
import { updateWithSaveData } from './modules/saves';

const setup = async () => {
    const threads = await fetch("/.proxy/api/threads").then(res => res.json());

    for (const thread of threads) {
        if (!thread) continue;
        generateCard(thread);
    }

    await Promise.all(threads.filter(a => a).map(thread => updateWithSaveData(thread.link.split("/")[thread.link.split("/").length - 1])));
}

setup();

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

const setupDiscordSdk = async () => {
    await discordSdk.ready();
    console.log("Discord SDK ready");
}

setupDiscordSdk();