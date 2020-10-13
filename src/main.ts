import AliyunOSSClient from './aliyunOSS';
import { getAliyunOSSOptions } from './utils/aliyunOSSUtil';
import { getRightLocalFileFolder } from './utils/inputUtil';

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
