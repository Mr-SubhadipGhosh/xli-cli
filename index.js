var chalk = require('chalk');
var clear = require('clear');
var CLI = require('clui');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Preferences = require('preferences');
var Spinner = CLI.Spinner;
var _ = require('lodash');
var touch = require('touch');
var fs = require('fs');
var files = require('./files');
var exec = require('child_process').exec;
var spawn = require('cross-spawn');
var templates = require('./template');

var PRJ_NAME = ""; 
clear();
console.log(
  chalk.blue(
    figlet.textSync('XLI-CLI', { horizontalLayout: 'full' })
  )
);
console.log(chalk.blue('<<-Initiate Angular2 project->>'));

var status = new Spinner('Installing type script, please wait...');
status.start();
var bat = spawn('npm', [
  'i', '-g',
  'typescript'
], { cwd: global });

bat.stdout.on('data', (data) => {
//comment
});
bat.on('close', (code) => {
  status.stop();
  setup(function () {
    PRJ_NAME = arguments['0'].projectname;
    exec(`mkdir ${PRJ_NAME} `, () => {
      exec(` cd ${PRJ_NAME} && tsc --init --target es5 --sourceMap --experimentalDecorators --emitDecoratorMetadata --outDir build`, () => {
        console.log(chalk.green('1. TypeScript setup done.'));
        files.createFile(`${PRJ_NAME}/package.json`,
          `{
          "name": "${PRJ_NAME}",
          "version": "0.0.1",
          "description": "",
          "main": "index.js",
          "scripts": {
            "start": "concurrently \\"npm run watch\\" \\"npm run serve\\"",
            "watch": "tsc -w",
            "serve": "lite-server"
          },
          "author": "",
          "license": "ISC"}`);
        var status1 = new Spinner('Installing dependency, please wait...');
        status1.start();
        exec('cd' + ' ' + PRJ_NAME + ' && npm' +
          ' i' + ' --save' +
          ' @angular/common@2.4.0 @angular/compiler@2.4.0' +
          ' @angular/core@2.4.0 @angular/platform-browser@2.4.0 @angular/platform-browser-dynamic@2.4.0 ' +
          ' @angular/router@3.4.0 systemjs@0.19.40 core-js@2.4.1 reflect-metadata@0.1.8 rxjs@5.0.1 zone.js@0.7.4',
          (err, stdout, stderr) => {
            status1.stop();
            console.log(chalk.green('2. Dependency installed.'));
            var status2 = new Spinner('Installing dev dependency, please wait...');
            status2.start();
            exec('cd' + ' ' + PRJ_NAME + ' && npm' +
              ' i' + ' --save-dev' +
              ' --save-dev lite-server concurrently',
              (err, stdout, stderr) => {
                if (err) {
                  console.log(err);
                }
                status2.stop();
                console.log(chalk.green('3. Dev-Dependency installed.'));
                var status3 = new Spinner('Scaffolding inprogress, please wait...');
                status3.start();
                exec('cd' + ' ' + PRJ_NAME + '&& mkdir app', (err, stdout, stderr) => {
                  Object.keys(templates).forEach(function (key) {
                    files.createFile('./'+ PRJ_NAME+'/' + key, templates[key]);
                  }, this);
                  status3.stop();
                  console.log(chalk.green('4. Scaffolding done.'));
                  console.log(chalk.blue(`<<- Project (./${PRJ_NAME}) Initiated -->>`));
                  console.log(chalk.green(`Run cmd: cd ${PRJ_NAME} && npm start`));
                });

              });
          });

      });
    });
  });

});

function setup(callback) {
  var questions = [
    {
      name: 'projectname',
      type: 'input',
      message: 'Enter your project name:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your project name';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}
