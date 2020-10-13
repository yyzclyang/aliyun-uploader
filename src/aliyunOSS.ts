import OSS from 'ali-oss';
import fs from 'fs-extra';
import { getLocalFilePathList } from './utils/pathUtil';

export default class AliyunOSSClient {
  constructor(options: OSS.Options) {
    this.oss = new OSS(options);
  }
  private oss: OSS;

  uploadLocalFileToAliyunOSS = (OSSFolder: string, localFileFolder: string) => {
    const localFilePathList = getLocalFilePathList(OSSFolder, localFileFolder);

    return Promise.all(
      localFilePathList.map(filePath => {
        const stream = fs.createReadStream(filePath.localPath);
        return this.oss.putStream(filePath.OSSPath, stream);
      })
    );
  };
}
