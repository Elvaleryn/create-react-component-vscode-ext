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

        const componentClassName =
          componentName.charAt(0).toLowerCase() + componentName.slice(1);

        const reactContent = `import React from 'react';
import styles from './${val.split("/")[1]}.module.scss';
import cx from 'classnames';

const ${componentName}: React.FC<${componentName}Props> = ({ className }) => {
  return <div className={cx(styles.${componentClassName}, className)}></div>;
}

export default ${componentName};
`;
        const typeContent = `
interface ${componentName}Props {
  className?: string;
}`;
        console.log(wsPath);
        const folderPath = wsPath + "/src/components/ui/" + val;
        const typesFolderPath = wsPath + "/src/types/components/ui/" + val;
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
        fs.mkdir(typesFolderPath, function (err) {
          if (err) {
            console.log("failed");
          } else {
            fs.writeFile(
              path.join(typesFolderPath, "index.tsx"),
              typeContent,
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
