#!/usr/bin/env node
import 'reflect-metadata';
import CLIApplication from './app/cli.js';
import GenerateCommand from './core/cli-command/generate-command.js';
import HelpCommand from './core/cli-command/helper.command.js';
import ImportCommand from './core/cli-command/import.command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new GenerateCommand(), new ImportCommand()
]);
myManager.processCommand(process.argv);
