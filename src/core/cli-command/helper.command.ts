import chalk from 'chalk';

import type { CliCommandInterface } from './cli-command.interface.js';
import { Command } from '../../types/command.type.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = Command.Help;

  public async execute(): Promise<void> {
    console.log(chalk.yellow(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            ${chalk.green(Command.Help)}:                      # Печатает этот текст
            ${chalk.green(`${Command.Generate} <n> <path> <url>`)}:  # Создаёт файл в формате tsv с тестовыми данными. Параметр <n> задаёт количество генерируемых предложений. Параметр <path> указывает путь для сохранения файла с предложениями. Параметр <url> задаёт адрес сервера, с которого необходимо взять данные
    `));
  }
}
