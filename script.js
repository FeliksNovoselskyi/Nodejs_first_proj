import chalk from 'chalk'
import * as data from './data.js'
import {dirname} from 'path'
import {fileURLToPath} from 'url'

// Получаем __filename
const __filename = fileURLToPath(import.meta.url);

// Получаем __dirname
const __dirname = dirname(__filename);

console.log(chalk.blue('Node JS first log!'))
console.log(chalk.blue(data.text))
console.log(__filename)
console.log(__dirname)


// console.log(chalk.blue(`Hello world!`)) // Синий текст
// console.log(chalk.red('Error! Something wrong!')) // Красный текст для ошибки
// console.log(chalk.green.bold('Success!')) // Жирный зелёный текст для успеха
// console.log(chalk.yellow.underline('Warning!')) // Подчёркнутый жёлтый текст для предупреждения