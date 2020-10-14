import inquirer from 'inquirer';
import AliyunOSSClient from './aliyunOSS';
import {
  getAliyunOSSConfig,
  getAliyunOSS,
  getAliyunOSSOptions
} from './utils/aliyunOSSUtil';
import { getRightLocalFileFolder } from './utils/inquirerUtil';
import { logAliyunOSSInfo, logAliyunOSSList } from './utils/logUtil';

export function uploader(OSSFolder: string, localFileFolder?: string) {
  getAliyunOSSOptions().then(
    aliyunOSSOptions => {
      return getRightLocalFileFolder(localFileFolder).then(
        rightLocalFileFolder => {
          return new AliyunOSSClient(aliyunOSSOptions)
            .uploadLocalFileToAliyunOSS(OSSFolder, rightLocalFileFolder)
            .then(
              _ => console.log('upload success!'),
              _ => console.log('upload fail!')
            );
        }
      );
    },
    error => {
      throw error;
    }
  );
}

export function showCurrentOSS() {
  getAliyunOSS().then(aliyunOSS => {
    console.log('current OSS info:');
    logAliyunOSSInfo(aliyunOSS);
  });
}

export function showAllOSS() {
  getAliyunOSSConfig().then(aliyunOSSConfig => {
    console.log('all OSS list:');
    logAliyunOSSList(aliyunOSSConfig);
  });
}
