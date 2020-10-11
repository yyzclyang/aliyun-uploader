import OSS from 'ali-oss';
import glob from 'glob';
import fs from 'fs-extra';

export interface UploadFile {
  path: string;
  name: string;
}

export default class AliyunOSSClient {
  constructor(options: OSS.Options) {
    this.oss = new OSS(options);
  }
  private oss: OSS;

  uploadFile = async (fileList: Array<UploadFile>) => {
    return Promise.all(
      fileList.map((file) => {
        const stream = fs.createReadStream(file.path);
        return this.oss.putStream(file.name, stream);
      })
    );
  };
}

export function getUploadFileList(
  localFolder: string,
  cdnFolder: string
): Array<UploadFile> {
  return glob.sync(`${localFolder}/**/*`, { nodir: true }).map((path) => {
    return {
      name: path.replace(localFolder, cdnFolder),
      path: path
    };
  });
}
