import fs from 'fs-extra';
import inquirer from 'inquirer';

export async function getRightLocalFileFolder(
  localFileFolder?: string
): Promise<string> {
  if (localFileFolder && fs.pathExistsSync(localFileFolder)) {
    return localFileFolder;
  } else {
    localFileFolder &&
      console.log(`本地文件夹输入错误，${localFileFolder} 不是一个有效文件夹`);
    return inquirer
      .prompt({
        type: 'input',
        name: 'localFileFolder',
        message: `请输入需要上传的本地文件夹路径（默认为当前路径）`,
        default: process.cwd(),
        validate(localFileFolder: string) {
          if (
            !localFileFolder ||
            (localFileFolder && fs.pathExistsSync(localFileFolder))
          ) {
            return true;
          }
          return '请输入正确的本地文件夹路径（默认为当前路径）';
        }
      })
      .then(({ localFileFolder }) => localFileFolder || process.cwd())
      .catch(_ => undefined);
  }
}
