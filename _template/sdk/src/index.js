// @ts-check

import { ChatbotView } from './views/chatBotView.js';
import { PromptService } from './services/promptService.js'
import { ChatbotController } from './controllers/chatBotController.js';

(async () => {
    const root = window.location.href
    const [css, html, systemPrompt, config] = await Promise.all([
        fetch(`${root}/sdk/ew-chatbot.css`).then(r => r.text()),
        fetch(`${root}/sdk/ew-chatbot.html`).then(r => r.text()),
        fetch(`${root}/botData/systemPrompt.txt`).then(r => r.text()),
        fetch(`${root}/botData/chatbot-config.json`).then(r => r.json()),
    ]);
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    const promptService = new PromptService();

    const chatbotView = new ChatbotView(config);
    const controller = new ChatbotController({ chatbotView, promptService });
    const text = systemPrompt.concat('\n', '')
    controller.init({
        firstBotMessage: config.firstBotMessage,
        text,
    });

})();
