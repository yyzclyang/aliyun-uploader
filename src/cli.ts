#!/usr/bin/env node
import fs from 'fs-extra';
import uploader from './main';

const [, , cdnFolder, fileFolder] = process.argv;

if (cdnFolder) {
  if (fileFolder && !fs.pathExistsSync(fileFolder)) {
    console.log('请输入正确的本地文件夹路径，不输入则选取当前文件夹。');
  } else {
    uploader(cdnFolder, fileFolder);
  }
} else {
  console.log('请输入正确的 cdn 文件夹名称！');
}
