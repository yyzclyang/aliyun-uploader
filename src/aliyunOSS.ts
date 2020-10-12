import OSS from 'ali-oss';
import fs from 'fs-extra';
import { getLocalFileList } from './utils';

export { Options as OSSOptions } from 'ali-oss';

export interface UploadFile {
  path: string;
  name: string;
}

export default class AliyunOSSClient {
  constructor(options: OSS.Options) {
    this.oss = new OSS(options);
  }
  private oss: OSS;

  uploadLocalFileToCDN = (cdnFolder: string, localFileFolder: string) => {
    const localFileList = getLocalFileList(cdnFolder, localFileFolder);
    return Promise.all(
      localFileList.map(file => {
        const stream = fs.createReadStream(file.path);
        return this.oss.putStream(file.name, stream);
      })
    );
  };
}
