import fs from 'fs-extra';
import inquirer from 'inquirer';
import { AliyunOSSInputInfo } from './interface';
import { getAliyunOSSConfig } from './aliyunOSSUtil';

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

export function getAliyunOSSInputInfo(): Promise<AliyunOSSInputInfo> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'OSSName',
      message: '请输入OSS的名称:',
      validate(OSSName: string) {
        return getAliyunOSSConfig().then(({ aliyunOSSList }) => {
          if (aliyunOSSList.some(aliyunOSS => aliyunOSS.OSSName === OSSName)) {
            return `${OSSName}已存在，请输入其他名字`;
          } else {
            return true;
          }
        });
      }
    },
    {
      type: 'input',
      name: 'accessKeyId',
      message: '请输入OSS的accessKeyId:',
      validate(accessKeyId: string) {
        if (accessKeyId) {
          return true;
        } else {
          return 'accessKeyId不能为空';
        }
      }
    },
    {
      type: 'input',
      name: 'accessKeySecret',
      message: '请输入OSS的accessKeySecret:',
      validate(accessKeySecret: string) {
        if (accessKeySecret) {
          return true;
        } else {
          return 'accessKeySecret不能为空';
        }
      }
    }
  ]);
}
