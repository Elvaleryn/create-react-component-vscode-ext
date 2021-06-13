// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-component-for-css-modules" is now active!');
/* 	console.log(path);
	console.log(fs); */

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('react-component-for-css-modules.createReactComponentWithCssModule', function () {
		// The code you place here will be executed every time your command is executed
/* 		const folderPath = vscode.workspace.workspaceFolders[0].uri
			.toString()
			.split(":")[1]; */
		/* 	const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
			console.log(wsPath);
			fs.writeFile(path.join(wsPath, 'index.html'))	 */	
			const wsedit = new vscode.WorkspaceEdit();
			const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
	/* 		const filePath = vscode.Uri.file(wsPath + '/hello/world.md');
			vscode.window.showInformationMessage(filePath.toString());
			wsedit.createFile(filePath, { ignoreIfExists: true });
			vscode.workspace.applyEdit(wsedit);
			vscode.window.showInformationMessage('Created a new file: hello/world.md');	 */
			let options = {
				prompt: "Label: ",
				placeHolder: "(placeholder)"
		}
		const input = vscode.window.showInputBox()
		input.then((val) => {

			let componentName = val.split('/')[1];

			if(componentName.includes('-')) {
				let wordsArray = componentName.split('-');
				wordsArray = wordsArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

				componentName = wordsArray.join('');
			}


			const reactContent = `import React from 'react';
import styles from '${val.split('/')[1]}.module.css';
import cx from 'classnames';
export default function ${componentName}() {
  return <div></div>;
}`
console.log(wsPath);
const folderPath = wsPath + '/components/' + val
fs.mkdir(folderPath, function (err) {
	if (err) {
			console.log('failed to create directory', err);
	} else {
		fs.writeFile(path.join(folderPath, "index.js"), reactContent, err => {
			if (err) {
				console.log(err);
				return vscode.window.showErrorMessage(
					"Failed to create boilerplate file!"
				);
			}
			vscode.window.showInformationMessage("Created boilerplate files");
		});
		fs.writeFile(path.join(folderPath, val.split('/')[1] + '.module.css'), '',  err => {
			if (err) {
				console.log(err);
				return vscode.window.showErrorMessage(
					"Failed to create boilerplate file!"
				);
			}
			vscode.window.showInformationMessage("Created boilerplate files");
		});
	}
});
			/* fs.writeFile(path.join(wsPath + '/components/' + val, "index.js"), reactContent, err => {
        if (err) {
					console.log(err);
          return vscode.window.showErrorMessage(
            "Failed to create boilerplate file!"
          );
        }
        vscode.window.showInformationMessage("Created boilerplate files");
      }); */
	/* 		 fs.writeFile(path.join(`${wsPath}/components/${val}`, "index.js"), reactContent, err => {
        if (err) {
          return vscode.window.showErrorMessage(
            "Failed to create boilerplate file!"
          );
        }
        vscode.window.showInformationMessage("Created boilerplate files");
      }); */
	/* 		const pathToJs = vscode.Uri.file(wsPath + `/components/${val}/index.js`);
			const pathToCss = vscode.Uri.file(wsPath + `/components/${val}/${val}.module.css`)
		
			wsedit.createFile(pathToJs, { ignoreIfExists: true });
			wsedit.createFile(pathToCss, { ignoreIfExists: true });	
			wsedit.insert(pathToJs, 'import React from react');
			vscode.workspace.applyEdit(wsedit);
			 vscode.workspace.onDidCreateFiles(()=> {
                    vscode.window.showInformationMessage("Les fichiers sont en cours de création");
                });;	  */
		});
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
