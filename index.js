const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const generatePage = require("./src/page-template");
// const { writeFile, copyFile } = require("./src/generate-site");

//Array of question
const questions = [
	{
		type: "input",
		message: "What is the employee's name?",
		name: "name",
	},
	{
		type: "input",
		message: "What is the employee's ID number?",
		name: "id",
	},
	{
		type: "input",
		message: "What is the employee's email?",
		name: "email",
	},
	{
		type: "list",
		message: "Pick an employee position:",
		choices: ["Engineer", "Intern"],
		name: "title",
	},
];

const managerQuestions = [
	{
		type: "input",
		message: "What is the manager's name?",
		name: "name",
	},
	{
		type: "input",
		message: "What is the manager's ID number?",
		name: "id",
	},
	{
		type: "input",
		message: "What is the manager's email?",
		name: "email",
	},
	{
		type: "input",
		message: "What is their office number?",
		name: "officeNum",
	},
];

questionPrompt = () => {
	inquirer.prompt(managerQuestions).then(function (managerAnswer) {
		let newManager = createManager(managerAnswer);
		let writeData = [
			`Name: ${newManager.getName()}`,
			`ID: ${newManager.getId()}`,
			`Email: ${newManager.getEmail()}`,
			`Role: ${newManager.getRole()}`,
			`Office Number: ${newManager.officeNum}`,
		];
		// fs.appendFile("./dist/index.html", writeData, err => {
		// 	if (err) throw err;
		// });
		exitPrompt();
	});
};
questionPrompt();

//Function to exit questions or to add more team members
exitPrompt = () => {
	inquirer
		.prompt({
			type: "confirm",
			message: "Do you have any other employees?",
			name: "confirmation",
		})
		.then(answers => {
			if (answers.confirmation === false) {
				return console.log("Your team has been generated and has been added to the html file.");
			} else {
				console.log("Employee added.");
				employeeQuestions();
			}
		});
};

employeeQuestions = () => {
	inquirer.prompt(questions).then(function (answers) {
		switch (answers.title) {
			case "Engineer":
				inquirer
					.prompt([
						{
							type: "input",
							message: "What is their Github user name?",
							name: "github",
						},
					])
					.then(function (engineerAnswer) {
						let newEngineer = createEngineer(answers, engineerAnswer);
						let writeData = [
							`Name: ${newEngineer.getName()}`,
							`ID: ${newEngineer.getId()}`,
							`Email: ${newEngineer.getEmail()}`,
							`Role: ${newEngineer.getRole()}`,
							`Github Username: ${newEngineer.getGithub()}`,
						];
						// fs.appendFile("./dist/index.html", writeData, err => {
						// 	if (err) throw err;
						// });
						exitPrompt();
					});
				break;
			case "Intern":
				inquirer
					.prompt([
						{
							type: "input",
							message: "What school did they go to?",
							name: "school",
						},
					])
					.then(function (internAnswer) {
						let newIntern = createIntern(answers, internAnswer);
						let writeData = [
							`Name: ${newIntern.getName()}`,
							`ID: ${newIntern.getId()}`,
							`Email: ${newIntern.getEmail()}`,
							`Role: ${newIntern.getRole()}`,
							`School: ${newIntern.getSchool()}`,
						];
						// fs.appendFile("./dist/index.html", writeData, err => {
						// 	if (err) throw err;
						// });
						exitPrompt();
					});
				break;

			default:
				console.log("You must choose!");
		}
	});
};

//Functions to get user input and then return it to CLI
let createManager = managerAnswer => {
	let newManager = new Manager(managerAnswer.name, managerAnswer.id, managerAnswer.email, managerAnswer.officeNum);
	return newManager;
};

let createEngineer = (answers, engineerAnswer) => {
	let newEngineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswer.github);
	return newEngineer;
};

let createIntern = (answers, internAnswer) => {
	let newIntern = new Intern(answers.name, answers.id, answers.email, internAnswer.school);
	return newIntern;
};
