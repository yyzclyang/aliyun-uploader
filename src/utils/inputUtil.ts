import fs from 'fs-extra';
import inquirer from 'inquirer';

export async function getRightLocalFileFolder(
  localFileFolder?: string
): Promise<string> {
  if (localFileFolder && fs.pathExistsSync(localFileFolder)) {
    return localFileFolder;
  } else {
    return getRightLocalFileFolder(
      await inquirer
        .prompt({
          type: 'input',
          name: 'localFileFolder',
          message: `请${
            localFileFolder ? '正确' : ''
          }输入需要上传的本地文件夹路径（默认为当前路径）`,
          default: process.cwd()
        })
        .then(({ localFileFolder }) => localFileFolder)
        .catch(_ => undefined)
    );
  }
}
