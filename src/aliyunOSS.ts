import OSS from 'ali-oss';
import fs from 'fs-extra';
import { getLocalFileList } from './utils';

export { Options as OSSOptions } from 'ali-oss';

export interface UploadFile {
  OSSPath: string;
  localPath: string;
}

export default class AliyunOSSClient {
  constructor(options: OSS.Options) {
    this.oss = new OSS(options);
  }
  private oss: OSS;

  uploadLocalFileToAliyunOSS = (OSSFolder: string, localFileFolder: string) => {
    const localFileList = getLocalFileList(OSSFolder, localFileFolder);

    return Promise.all(
      localFileList.map(file => {
        const stream = fs.createReadStream(file.localPath);
        return this.oss.putStream(file.OSSPath, stream);
      })
    );
  };
}
