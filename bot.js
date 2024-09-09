const TelegramBot = require('node-telegram-bot-api');

// Thay thế bằng token bạn nhận được từ BotFather
const token = '7291812208:AAF84xPo9hI-Cf2Xis6PNM51qKdqZt8XkGY';
const bot = new TelegramBot(token, { polling: true });

// Username của channel hoặc ID của nhóm bạn muốn kiểm tra
const groupChatId = '@AcanetCommunity'; // Thay thế bằng username hoặc ID nhóm cụ thể của bạn

// Định nghĩa inline keyboard với các nút có liên kết
const keyboardWithTick = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: '🌟 ACANET', url: 'https://t.me/acanetTestBot/acanetTestBot' } 
            ],
            [
                { text: '✅ Join Acanet Community', url: 'https://t.me/AcanetCommunity' }
            ],
            [
                { text: '🎁 Invite URL (Get 200 ACN)', url: 'https://t.me/share/url?text=%0AFarm%20ACN%20with%20me%20and%20earn%20more%20money.%0A%0AUse%20my%20link%20to%20get%20200%20ACN%20$TOMATO!&url=https://t.me/acanetTestBot/acanetTestBot' }
            ],
            [
                { text: '🔗 Follow X', url: 'https://x.com/acanet_io?s=21&t=LjVc_Cx4r-rsVGwmJRgnrw' }
            ]
        ]
    })
};

const keyboardWithoutTick = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                { text: '🌟 ACANET', url: 'https://t.me/acanetTestBot/acanetTestBot' } 
            ],
            [
                { text: '🚀 Join Acanet Community', url: 'https://t.me/AcanetCommunity' }
            ],
            [
                { text: '🎁 Invite URL (Get 200 ACN)', url: 'https://t.me/share/url?text=%0AFarm%20ACN%20with%20me%20and%20earn%20more%20money.%0A%0AUse%20my%20link%20to%20get%20200%20ACN%20$TOMATO!&url=https://t.me/acanetTestBot/acanetTestBot' }
            ],
            [
                { text: '🔗 Follow X', url: 'https://x.com/acanet_io?s=21&t=LjVc_Cx4r-rsVGwmJRgnrw' }
            ]
        ]
    })
};

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from;  
    const userName = user.username || 'User'; 
    console.log(1111, msg);
    
    try {
        // Kiểm tra trạng thái thành viên trong nhóm
        const memberStatus = await bot.getChatMember(groupChatId, user.id);
        
        let welcomeMessage;

        if (memberStatus.status === 'member' || memberStatus.status === 'administrator' || memberStatus.status === 'creator') {
            welcomeMessage = `🎉 Hey @${userName} - welcome to ACANET! \n\n🚀 The official launch of our mini-app is now live. Farm ACN for FREE and secure early user benefits + airdrops.\n\n🔔 Join our announcements channel to get the latest updates and the best ways to get ACN.`;
            bot.sendMessage(chatId, welcomeMessage, keyboardWithTick);
        } else {
            welcomeMessage = `👋 Hey @${userName} - welcome to ACANET! \n\n🚀 To get started, please join our community by clicking the button below. The official launch of our mini-app is now live. Farm ACN for FREE and secure early user benefits + airdrops.\n\n🔔 Join our announcements channel to get the latest updates and the best ways to get ACN.`;
            bot.sendMessage(chatId, welcomeMessage, keyboardWithoutTick);
        }
    } catch (error) {
        console.error('Error checking membership status:', error);
        bot.sendMessage(chatId, '⚠️ There was an error checking your membership status. Please try again later.');
    }
});
