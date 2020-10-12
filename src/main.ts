import AliyunOSSClient from './aliyunOSS';
import { getAliyunOSSConfig, getRightLocalFileFolder } from './utils';

export function uploader(cdnFolder: string, localFileFolder?: string) {
  const aliyunConfig = getAliyunOSSConfig();
  getRightLocalFileFolder(localFileFolder).then(rightLocalFileFolder => {
    new AliyunOSSClient(aliyunConfig)
      .uploadLocalFileToCDN(cdnFolder, rightLocalFileFolder)
      .then(_ => console.log('upload success!'))
      .catch(_ => console.log('upload fail!'));
  });
}
