import path from 'path';
import glob from 'glob';
import { UploadFile } from './interface';

export function getHomePath() {
  return process.env.HOME || require('os').homedir();
}

export function getUploaderHomePath() {
  return path.resolve(getHomePath(), './.aliyun-uploader');
}

export function getAliyunOSSConfigPath() {
  return path.resolve(getUploaderHomePath(), 'config/aliyun-oss-config.json');
}

export function getLocalFilePathList(
  OSSFolder: string,
  localFileFolder: string
): Array<UploadFile> {
  return glob
    .sync(path.resolve(localFileFolder, '**/*'), { nodir: true })
    .map(localFilePath => {
      return {
        OSSPath: localFilePath.replace(localFileFolder, OSSFolder),
        localPath: localFilePath
      };
    });
}
