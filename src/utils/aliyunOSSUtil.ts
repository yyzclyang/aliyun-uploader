import fs from 'fs-extra';
import path from 'path';
import { getBucketDBPath, getOSSDBPath } from './pathUtil';
import {
  OSS,
  OSSDBItem,
  BucketDBItem,
  AliyunOSSClientConfig
} from './interface';

export function getOSSDB(): Promise<Array<OSSDBItem>> {
  return fs.readJson(getOSSDBPath());
}
export function getBucketDB(): Promise<Array<BucketDBItem>> {
  return fs.readJson(getBucketDBPath());
}

export function getCurrentOSS(): Promise<OSSDBItem> {
  return getOSSDB().then(OSSList => {
    const currentOSS = OSSList.find(OSS => OSS.isCurrent);
    return currentOSS ?? Promise.reject();
  });
}

export function getCurrentOSSAndBucketList(): Promise<OSS> {
  return Promise.all([getOSSDB(), getBucketDB()]).then(
    ([OSSList, bucketList]) => {
      const currentOSS = OSSList.find(OSS => OSS.isCurrent);
      const currentBucketList = bucketList.filter(
        bucket => bucket.oss === currentOSS?.id
      );
      return currentOSS
        ? {
            ...currentOSS,
            bucketList: currentBucketList
          }
        : Promise.reject();
    }
  );
}

export function getAliyunOSSClientConfig(): Promise<AliyunOSSClientConfig> {
  return getCurrentOSSAndBucketList().then(OSS => {
    const currentBucket = OSS.bucketList.find(
      bucket => OSS.bucket === bucket.id
    );
    return currentBucket
      ? {
          accessKeyId: OSS.accessKeyId,
          accessKeySecret: OSS.accessKeySecret,
          bucket: currentBucket.bucket,
          region: currentBucket.region
        }
      : Promise.reject();
  });
}

export function saveOSSDB(OSSList: Array<OSSDBItem>) {
  return fs.ensureDir(path.dirname(getOSSDBPath())).then(() => {
    return fs.writeJSON(getOSSDBPath(), OSSList);
  });
}

export function saveBucketDB(BucketList: Array<BucketDBItem>) {
  return fs.ensureDir(path.dirname(getBucketDBPath())).then(() => {
    return fs.writeJSON(getBucketDBPath(), BucketList);
  });
}

export function setCurrentOSSDBItem(OSSId: string) {
  return getOSSDB().then(OSSList => {
    return saveOSSDB(
      OSSList.map(OSS => ({ ...OSS, isCurrent: OSS.id === OSSId }))
    );
  });
}

export function addOSSDBItem(OSS: OSSDBItem) {
  return getOSSDB().then(OSSList => {
    OSSList.push({ ...OSS, isCurrent: !OSSList.length });
    return saveOSSDB(OSSList);
  });
}

export function editOSSDBItem(editedOSS: OSSDBItem) {
  return getOSSDB().then(OSSList => {
    return saveOSSDB(
      OSSList.map(OSS => {
        return OSS.id === editedOSS.id ? editedOSS : OSS;
      })
    );
  });
}

export function deleteOSSDBItem(OSSId: string) {
  return getOSSDB().then(OSSList => {
    const newOSSList = OSSList.filter(OSS => OSS.id !== OSSId);
    return saveOSSDB(newOSSList);
  });
}

export function setCurrentBucketDBItem(OSSId: string, bucketId: string) {
  return getOSSDB().then(OSSList => {
    return saveOSSDB(
      OSSList.map(OSS =>
        OSS.id === OSSId ? { ...OSS, bucket: bucketId } : { ...OSS }
      )
    );
  });
}

export function addBucketDBItem(bucket: BucketDBItem) {
  return getBucketDB().then(bucketList => {
    return getOSSDB().then(OSSList => {
      if (!OSSList.find(OSS => OSS.isCurrent)?.bucket) {
        saveOSSDB(
          OSSList.map(OSS =>
            OSS.isCurrent ? { ...OSS, bucket: bucket.id } : OSS
          )
        );
      }
      bucketList.push(bucket);
      return saveBucketDB(bucketList);
    });
  });
}

export function deleteBucketDBItem(bucketId: string) {
  return getBucketDB().then(bucketList => {
    return getOSSDB().then(OSSList => {
      if (OSSList.some(OSS => OSS.bucket === bucketId)) {
        const newOSSList = OSSList.map(OSS => {
          if (OSS.bucket === bucketId) {
            return { ...OSS, bucket: '' };
          } else {
            return OSS;
          }
        });
        return Promise.all([
          saveOSSDB(newOSSList),
          saveBucketDB(bucketList.filter(bucket => bucket.id !== bucketId))
        ]);
      } else {
        return Promise.all([
          saveBucketDB(bucketList.filter(bucket => bucket.id !== bucketId))
        ]);
      }
    });
  });
}
