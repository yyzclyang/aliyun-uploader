import AliyunOSSClient from './aliyunOSS';
import {
  getAliyunOSSConfig,
  getAliyunOSS,
  getAliyunOSSOptions,
  addAliyunOSS,
  editAliyunOSS,
  deleteAliyunOSS,
  getAliyunOSSBucket,
  addAliyunOSSBucket,
  deleteAliyunOSSBucket
} from './utils/aliyunOSSUtil';
import {
  getAliyunOSSBucketInputInfo,
  getAliyunOSSInputInfo,
  getRightLocalFileFolder,
  showAliyunOSSBucketList,
  showAliyunOSSList
} from './utils/inquirerUtil';
import {
  logAliyunOSSInfo,
  logAliyunOSSList,
  logBucketInfo,
  logBucketList
} from './utils/logUtil';
import { AliyunOSS } from './utils/interface';

export function uploader(OSSFolder: string, localFileFolder?: string) {
  getAliyunOSSOptions().then(
    aliyunOSSOptions => {
      return getRightLocalFileFolder(localFileFolder).then(
        rightLocalFileFolder => {
          return new AliyunOSSClient(aliyunOSSOptions)
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

export function showCurrentOSS() {
  getAliyunOSS().then(aliyunOSS => {
    console.log('current OSS info:');
    logAliyunOSSInfo(aliyunOSS);
  });
}

export function showAllOSS() {
  getAliyunOSSConfig().then(aliyunOSSConfig => {
    console.log('all OSS list:');
    logAliyunOSSList(aliyunOSSConfig);
  });
}

export function addOSS() {
  getAliyunOSSInputInfo().then(({ OSSName, accessKeyId, accessKeySecret }) => {
    const aliyunOSS = {
      OSSName,
      accessKey: {
        accessKeyId,
        accessKeySecret
      },
      currentBucket: '',
      bucketList: []
    };
    addAliyunOSS(aliyunOSS).then(
      _ => console.log('add success!'),
      _ => console.log('add fail!')
    );
  });
}

export function editOSS() {
  getAliyunOSSConfig().then(({ aliyunOSSList }) => {
    showAliyunOSSList(aliyunOSSList).then(({ OSSName: selectedOSSName }) => {
      if (selectedOSSName) {
        const selectedAliyunOSS = aliyunOSSList.find(
          aliyunOSS => aliyunOSS.OSSName === selectedOSSName
        )!;
        getAliyunOSSInputInfo(
          selectedAliyunOSS.OSSName,
          selectedAliyunOSS.accessKey.accessKeyId,
          selectedAliyunOSS.accessKey.accessKeySecret,
          false
        ).then(({ OSSName, accessKeyId, accessKeySecret }) => {
          const newAliyunOSS: AliyunOSS = {
            OSSName,
            accessKey: { accessKeyId, accessKeySecret },
            currentBucket: selectedAliyunOSS.currentBucket,
            bucketList: selectedAliyunOSS.bucketList
          };
          editAliyunOSS(newAliyunOSS, selectedOSSName).then(
            _ => console.log('edit success!'),
            _ => console.log('edit fail!')
          );
        });
      }
    });
  });
}

export function deleteOSS() {
  getAliyunOSSConfig().then(({ aliyunOSSList }) => {
    showAliyunOSSList(aliyunOSSList).then(({ OSSName: selectedOSSName }) => {
      if (selectedOSSName) {
        deleteAliyunOSS(selectedOSSName).then(
          _ => console.log('delete success!'),
          _ => console.log('delete fail!')
        );
      }
    });
  });
}

export function showAllBucket() {
  getAliyunOSS().then(aliyunOSS => {
    console.log('all bucket list:');
    const { bucketList, currentBucket } = aliyunOSS;
    logBucketList(bucketList, currentBucket);
  });
}

export function showCurrentBucket() {
  getAliyunOSSBucket().then(bucket => {
    console.log('current bucket info:');
    logBucketInfo(bucket);
  });
}

export function addBucket() {
  getAliyunOSS().then(
    _ => {
      getAliyunOSSBucketInputInfo().then(bucketInfo => {
        addAliyunOSSBucket(bucketInfo).then(
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
  getAliyunOSS().then(
    ({ bucketList }) => {
      showAliyunOSSBucketList(bucketList).then(({ bucketName }) => {
        deleteAliyunOSSBucket(bucketName).then(
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
