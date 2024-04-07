#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
//  Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;

// Print welcome message
console.log(chalk.green("\n \tWelcome to code with Shazia - ATM Machine"));

let pinAnswer = await inquirer.prompt([
{
    name: "pin",
    type: "number",
    message: chalk.blue("Enter your pin code:"),
}
])
if(pinAnswer.pin === myPin){
    console.log(chalk.yellow("\nPin is Correct, Login Successfully\n"));
    // console.log("Current Account Balance is ${myBalance}")
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])
    if(operationAns.operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Sleect a withdrawal method:",
                choices:  ["Fast cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if(fastCashAns.fastCash > myBalance){
                console.log(chalk.red("Insufficient Balance"));

            }
            else{
                myBalance -= fastCashAns.fastCash
                console.log(`${fastCashAns.fastCash} withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }

        }

        else if(withdrawAns.withdrawMethod === "Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red("Insufficient Balance"));
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw Successfully`);
                console.log(`Your Remaining is: ${myBalance}`);   
            }

        }
        
    }
    else if (operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else{
    console.log(chalk.red("Pin is Incorrect, Try Again"));
}
