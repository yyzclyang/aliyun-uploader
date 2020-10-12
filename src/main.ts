import AliyunOSSClient from './aliyunOSS';
import { getAliyunOSSConfig, getRightLocalFileFolder } from './utils';

export function uploader(OSSFolder: string, localFileFolder?: string) {
  getAliyunOSSConfig().then(
    aliyunConfig => {
      return getRightLocalFileFolder(localFileFolder).then(
        rightLocalFileFolder => {
          return new AliyunOSSClient(aliyunConfig)
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
