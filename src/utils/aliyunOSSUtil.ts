import fs from 'fs-extra';
import { getAliyunOSSConfigPath } from './pathUtil';
import {
  AccessKey,
  AliyunOSS,
  AliyunOSSConfig,
  BucketInfo,
  OSSOptions
} from './interface';

export function getAliyunOSSConfig(): Promise<AliyunOSSConfig> {
  return fs.readJson(getAliyunOSSConfigPath());
}

export function saveAliyunOSSConfig(aliyunOSSConfig: AliyunOSSConfig) {
  return fs.writeJSON(getAliyunOSSConfigPath(), aliyunOSSConfig);
}

export function getAliyunOSS(): Promise<AliyunOSS> {
  return getAliyunOSSConfig().then((aliyunOSSConfig: AliyunOSSConfig) => {
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

export function addAliyunOSS(aliyunOSS: AliyunOSS) {
  return getAliyunOSSConfig().then(aliyunOSSConfig => {
    aliyunOSSConfig.aliyunOSSList.push(aliyunOSS);
    return saveAliyunOSSConfig(aliyunOSSConfig);
  });
}

export function editAliyunOSS(
  newAliyunOSS: AliyunOSS,
  previousOSSName: string
) {
  return getAliyunOSSConfig().then(aliyunOSSConfig => {
    const newAliyunConfig = {
      current:
        aliyunOSSConfig.current === previousOSSName
          ? newAliyunOSS.OSSName
          : aliyunOSSConfig.current,
      aliyunOSSList: aliyunOSSConfig.aliyunOSSList.map(aliyunOSS =>
        aliyunOSS.OSSName === previousOSSName ? newAliyunOSS : aliyunOSS
      )
    };
    return saveAliyunOSSConfig(newAliyunConfig);
  });
}
