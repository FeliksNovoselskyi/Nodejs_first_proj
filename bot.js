import telegramApi from 'node-telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.token
const bot = new telegramApi(token, {polling: true})

bot.on('message', async (message) => {
    const text = message.text
    const chatId = message.chat.id
    // console.log(message)
    // console.log(text, chatId)

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://sl.combot.org/js2222222222/webp/7xf09f8db8.webp')
        await bot.sendMessage(chatId, 'Привет! Рад тебя видеть! Пропиши команду /info чтобы узнать обо мне больше')
    }
    if (text === '/info') {
        await bot.sendSticker(chatId, 'https://sl.combot.org/js2222222222/webp/0xf09f988f.webp')
        await bot.sendMessage(chatId, 'И так. Я бот на NodeJS, и я знакомящий проект с JavaScript фреймворком NodeJS')
    }
})