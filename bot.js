import telegramApi from 'node-telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()

const token = process.env.token
const bot = new telegramApi(token, {polling: true})

// Массив вопросов с вариантами ответов и правильным ответом
const questions = [
    {
        question: 'Яка мова програмування використовується для розробки проектів на Node.js?',
        options: ['Python', 'C++', 'JavaScript', 'Java'],
        correct: 2 // Индекс правильного ответа
    },
    {
        question: 'Яку назву має пакетний менеджер для Node.js?',
        options: ['npm', 'pip', 'composer', 'gem'],
        correct: 0
    },
    {
        question: 'Що таке npm?',
        options: ['Бібліотека для Python', 'Пакетний менеджер для Node.js', 'Фреймворк для JS', 'Мова програмування'],
        correct: 1
    }
]

// Индексы текущих вопросов для каждого пользователя
const userQuestions = {}

// Функция для отправки вопроса с инлайн-кнопками
const sendQuestion = async (chatId) => {
    const userIndex = userQuestions[chatId] || 0

    if (userIndex < questions.length) {
        const currentQuestion = questions[userIndex]

        const options = currentQuestion.options.map((option, index) => {
            return [{text: option, callback_data: String(index)}]
        })

        await bot.sendMessage(chatId, currentQuestion.question, {
            reply_markup: {
                inline_keyboard: options
            }
        })
    } else {
        await bot.sendMessage(chatId, 'Тест завершено! Дякуюємо за ваші відповіді!')
        delete userQuestions[chatId] // Сброс состояния для пользователя
    }
}

// Обработка команды /start и /info
bot.on('message', async (message) => {
    const text = message.text
    const chatId = message.chat.id

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://sl.combot.org/js2222222222/webp/7xf09f8db8.webp')
        await bot.sendMessage(chatId, 'Привіт! Радий тебе бачити! Пропиши команду /quiz щоб розпочати тест')
    }

    if (text === '/quiz') {
        userQuestions[chatId] = 0 // Сброс индекса вопроса для пользователя
        await sendQuestion(chatId)
    }
})

// Обработка нажатий на инлайн-кнопки
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id
    const userIndex = userQuestions[chatId] || 0
    const currentQuestion = questions[userIndex]

    if (currentQuestion) {
        const answerIndex = parseInt(query.data)
        const isCorrect = answerIndex === currentQuestion.correct

        if (isCorrect) {
            await bot.sendMessage(chatId, 'Вірна відповідь!')
        } else {
            await bot.sendMessage(chatId, `Неправильна відповідь! Правильна відповідь: ${currentQuestion.options[currentQuestion.correct]}`)
        }

        // Переход к следующему вопросу
        console.log(userQuestions)
        userQuestions[chatId] = userIndex + 1
        await sendQuestion(chatId)
    }
})