import { v4 as uuidV4 } from 'uuid';
import AliyunOSSClient from './aliyunOSS';
import {
  getOSSDB,
  getCurrentOSS,
  getAliyunOSSClientConfig,
  getCurrentOSSAndBucketList,
  addOSSDBItem,
  deleteOSSDBItem,
  editOSSDBItem,
  addBucketDBItem,
  deleteBucketDBItem,
  setCurrentOSSDBItem,
  setCurrentBucketDBItem
} from './utils/aliyunOSSUtil';
import {
  getOSSInputInfo,
  getBucketInputInfo,
  showOSSList,
  showBucketList,
  getRightLocalFileFolder
} from './utils/inquirerUtil';
import { logOSS, logOSSList, logBucket, logBucketList } from './utils/logUtil';

export function uploader(OSSFolder: string, localFileFolder?: string) {
  getAliyunOSSClientConfig().then(
    ossConfig => {
      return getRightLocalFileFolder(localFileFolder).then(
        rightLocalFileFolder => {
          return new AliyunOSSClient(ossConfig)
            .uploadLocalFileToAliyunOSS(OSSFolder, rightLocalFileFolder)
            .then(
              _ => console.log('upload success!'),
              _ => console.log('upload fail!')
            );
        }
      );
    },
    error => {
      throw error;
    }
  );
}

export function setCurrentOSS() {
  getOSSDB().then(
    OSSList => {
      showOSSList(OSSList, '设置').then(({ OSSId: selectedOSSId }) => {
        return setCurrentOSSDBItem(selectedOSSId).then(
          _ => console.log('set success!'),
          _ => console.log('set fail!')
        );
      });
    },
    error => {
      console.log('读取OSS数据失败');
      throw error;
    }
  );
}

export function showCurrentOSS() {
  getCurrentOSSAndBucketList().then(
    OSS => {
      console.log('current OSS info:');
      logOSS(OSS);
    },
    error => {
      console.log('请先指定OSS信息');
      throw error;
    }
  );
}

export function showAllOSS() {
  getOSSDB().then(
    OSSList => {
      console.log('all OSS list:');
      logOSSList(OSSList);
    },
    error => {
      console.log('读取OSS数据失败');
      throw error;
    }
  );
}

export function addOSS() {
  getOSSInputInfo().then(({ OSSName, accessKeyId, accessKeySecret }) => {
    const OSS = {
      id: uuidV4(),
      isCurrent: false,
      OSSName,
      accessKeyId,
      accessKeySecret,
      bucket: ''
    };
    addOSSDBItem(OSS).then(
      _ => console.log('add success!'),
      _ => console.log('add fail!')
    );
  });
}

export function editOSS() {
  getOSSDB().then(
    OSSList => {
      showOSSList(OSSList, '编辑').then(({ OSSId: selectedOSSId }) => {
        if (selectedOSSId) {
          const selectedOSS = OSSList.find(OSS => OSS.id === selectedOSSId)!;
          getOSSInputInfo(
            selectedOSS.OSSName,
            selectedOSS.accessKeyId,
            selectedOSS.accessKeySecret,
            false
          ).then(({ OSSName, accessKeyId, accessKeySecret }) => {
            const editedOSS = {
              ...selectedOSS,
              OSSName,
              accessKeyId,
              accessKeySecret
            };
            editOSSDBItem(editedOSS).then(
              _ => console.log('edit success!'),
              _ => console.log('edit fail!')
            );
          });
        }
      });
    },
    error => {
      console.log('读取OSS数据失败');
      throw error;
    }
  );
}

export function deleteOSS() {
  getOSSDB().then(
    OSSList => {
      showOSSList(OSSList, '编辑').then(({ OSSId: selectedOSSId }) => {
        if (selectedOSSId) {
          deleteOSSDBItem(selectedOSSId).then(
            _ => console.log('delete success!'),
            _ => console.log('delete fail!')
          );
        }
      });
    },
    error => {
      console.log('读取OSS数据失败');
      throw error;
    }
  );
}

export function setCurrentBucket() {
  getCurrentOSSAndBucketList().then(
    ({ id, bucketList }) => {
      showBucketList(bucketList, '设置').then(({ bucketId }) => {
        setCurrentBucketDBItem(id, bucketId).then(
          _ => console.log('set success!'),
          _ => console.log('set fail!')
        );
      });
    },
    _ => {
      console.log('请先指定OSS信息');
    }
  );
}

export function showAllBucket() {
  getCurrentOSSAndBucketList().then(
    OSS => {
      console.log('all bucket list:');
      const { bucketList, bucket } = OSS;
      logBucketList(bucketList, bucket);
    },
    error => {
      console.log('读取数据失败');
      throw error;
    }
  );
}

export function showCurrentBucket() {
  getCurrentOSSAndBucketList().then(
    OSS => {
      console.log('current bucket info:');
      const { bucketList, bucket } = OSS;
      const currentBucket = bucketList.find(({ id }) => id === bucket)!;
      logBucket(currentBucket);
    },
    error => {
      console.log('读取数据失败');
      throw error;
    }
  );
}

export function addBucket() {
  getCurrentOSS().then(
    ({ id }) => {
      getBucketInputInfo().then(({ bucket, region }) => {
        const bucketItem = {
          id: uuidV4(),
          oss: id,
          bucket,
          region
        };
        addBucketDBItem(bucketItem).then(
          _ => console.log('add success!'),
          _ => console.log('add fail!')
        );
      });
    },
    _ => {
      console.log('请先指定OSS信息');
    }
  );
}
export function deleteBucket() {
  getCurrentOSSAndBucketList().then(
    ({ bucketList }) => {
      showBucketList(bucketList, '删除').then(({ bucketId }) => {
        deleteBucketDBItem(bucketId).then(
          _ => console.log('delete success!'),
          _ => console.log('delete fail!')
        );
      });
    },
    _ => {
      console.log('请先指定OSS信息');
    }
  );
}
