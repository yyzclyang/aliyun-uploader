import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import { OSSOptions, UploadFile } from './aliyunOSS';

export function getLocalFileList(
  cdnFolder: string,
  localFileFolder: string
): Array<UploadFile> {
  return glob.sync(`${localFileFolder}/**/*`, { nodir: true }).map(path => {
    return {
      name: path.replace(localFileFolder, cdnFolder),
      path: path
    };
  });
}

export function getAliyunOSSConfig(): Promise<OSSOptions> {
  const homeDir = process.env.HOME || require('os').homedir();
  const aliyunConfigPath = path.resolve(
    homeDir,
    './.aliyun-uploader/config/aliyun-oss-config.json'
  );
  return fs.readJson(aliyunConfigPath);
}

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
