import fs from 'fs-extra';
import { getAliyunOSSConfigPath } from './pathUtil';
import {
  AccessKey,
  AliyunOSS,
  AliyunOSSConfig,
  BucketInfo,
  OSSOptions
} from './interface';

export function getAliyunOSS(): Promise<AliyunOSS> {
  return fs
    .readJson(getAliyunOSSConfigPath())
    .then((aliyunOSSConfig: AliyunOSSConfig) => {
      const { current, aliyunOSSList } = aliyunOSSConfig;
      const currentOSS = current
        ? aliyunOSSList.find(aliyunOSS => aliyunOSS.OSSName === current)
        : aliyunOSSList[0];
      return currentOSS ?? Promise.reject();
    });
}

export function getAliyunOSSAccessKey(): Promise<AccessKey> {
  return getAliyunOSS().then(aliyunOSS => aliyunOSS.accessKey);
}

export function getAliyunOSSBucket(): Promise<BucketInfo> {
  return getAliyunOSS().then(aliyunOSS => {
    const { currentBucket: currentBucketName, bucketList } = aliyunOSS;
    const currentBucket = currentBucketName
      ? bucketList.find(bucketInfo => bucketInfo.bucket === currentBucketName)
      : bucketList[0];
    return currentBucket ?? Promise.reject();
  });
}

export function getAliyunOSSOptions(): Promise<OSSOptions> {
  return Promise.all([getAliyunOSSAccessKey(), getAliyunOSSBucket()]).then(
    ([accessKey, bucketInfo]) => {
      return { ...accessKey, ...bucketInfo };
    }
  );
}
