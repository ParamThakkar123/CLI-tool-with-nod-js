#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Chandrayaan Quiz by Umang\n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: `Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default () {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

function winner() {
    console.clear();
    figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');

        console.log(
            chalk.green(
                `Programming isn't about what you know; it's about making the command line look cool`
            )
        );
        process.exit(0);
    });
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Chandrayaan 3 was launched on\n',
        choices: [
            '11 July, 2023',
            '14 July, 2023',
            '15 July, 2023',
            '25 July, 2023',
        ],
    });

    return handleAnswer(answers.question_1 === '14 July, 2023');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'Name of the launcher is : \n',
        choices: ['Vikram', 'Aditya', 'Pragyan', 'Bahubali'],
    });
    return handleAnswer(answers.question_2 === 'Aditya');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: `With which rocket was Chandrayaan 3 launched\n`,
        choices: ['PSLV', 'GSLV Mk-III', 'LVM 3', 'SSLV 7'],
    });

    return handleAnswer(answers.question_3 === 'LVM 3');
}



// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
winner();