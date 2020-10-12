import AliyunOSSClient from './aliyunOSS';
import { getAliyunOSSConfig, getRightLocalFileFolder } from './utils';

export function uploader(cdnFolder: string, localFileFolder?: string) {
  getAliyunOSSConfig().then(
    aliyunConfig => {
      return getRightLocalFileFolder(localFileFolder).then(
        rightLocalFileFolder => {
          return new AliyunOSSClient(aliyunConfig)
            .uploadLocalFileToCDN(cdnFolder, rightLocalFileFolder)
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
