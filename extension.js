const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "react-component-for-css-modules" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "react-component-for-css-modules.createReactComponentWithCssModule",
    function () {
      const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

      const input = vscode.window.showInputBox();
      input.then((val) => {
        let componentName = val.split("/")[1];
        componentName =
          componentName.charAt(0).toUpperCase() + componentName.slice(1);
        if (componentName.includes("-")) {
          let wordsArray = componentName.split("-");
          wordsArray = wordsArray.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1)
          );

          componentName = wordsArray.join("");
        }

        const reactContent = `import React from 'react';
import styles from './${val.split("/")[1]}.module.scss';

const ${componentName}: React.FC = () => {
  return <div></div>;
}

export default ${componentName}
`;
        console.log(wsPath);
        const folderPath = wsPath + "/components/" + val;
        fs.mkdir(folderPath, function (err) {
          if (err) {
            console.log("failed to create directory", err);
          } else {
            fs.writeFile(
              path.join(folderPath, "index.tsx"),
              reactContent,
              (err) => {
                if (err) {
                  console.log(err);
                  return vscode.window.showErrorMessage(
                    "Failed to create boilerplate file!"
                  );
                }
                vscode.window.showInformationMessage(
                  "Created boilerplate files"
                );
              }
            );
            fs.writeFile(
              path.join(folderPath, val.split("/")[1] + ".module.scss"),
              "",
              (err) => {
                if (err) {
                  console.log(err);
                  return vscode.window.showErrorMessage(
                    "Failed to create boilerplate file!"
                  );
                }
                vscode.window.showInformationMessage(
                  "Created boilerplate files"
                );
              }
            );

            vscode.workspace
              .openTextDocument(path.join(folderPath, "index.js"))
              .then((doc) => {
                vscode.window.showTextDocument(doc);
              });
          }
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
