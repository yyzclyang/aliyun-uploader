import path from 'path';
import AliyunOSSClient, { getUploadFileList } from './aliyunOSS';

const homeDir = process.env.HOME || require('os').homedir();
const aliyunConfigPath = path.resolve(
  homeDir,
  './.aliyun-uploader/aliyun-oss-config.json'
);
const aliyunConfig = require(aliyunConfigPath);

function uploader(cdnFolder: string, fileFolder = process.cwd()) {
  console.log(
    `正准备上传文件，上传的本地文件夹为 ${fileFolder}，上传至 cdn 的 ${cdnFolder} 文件夹`
  );

  const fileList = getUploadFileList(fileFolder, cdnFolder);
  const oss = new AliyunOSSClient(aliyunConfig);
  oss
    .uploadFile(fileList)
    .then((_) => console.log('upload done!'))
    .catch((_) => console.log('upload fail'));
}

export default uploader;
