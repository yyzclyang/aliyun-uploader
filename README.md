# aliyun-uploader

> 阿里云 OSS 上传工具

## 用法

在使用之前需要添加一下 `OSS` 和 `bucket` 信息。

### 添加 OSS 信息

```bash
aup add-oss
```

根据提示添加 `OSS` 信息即可，可添加多个 `OSS` 信息。

### 选择 OSS

```bash
aup set-oss
```

从已经设置的 `OSS` 中选择一个作为当前 `OSS`。

### 展示 OSS 信息

```bash
aup show-oss
```

展示当前的 `OSS` 和 `Bucket` (如果已经设置)。

还可添加 `-a` 或 `--all` 参数展示所有的 `OSS` 信息。

### 编辑 OSS 信息

```bash
aup edit-oss
```

编辑已经存储的 `OSS` 信息。

### 删除 OSS 信息。

```bash
aup delete-oss
```

选择删除一个已经存储的 `OSS` 信息。

### 添加 bucket 信息

```bash
aup add-bk
```

根据提示添加 `bucket` 信息即可，可添加多个 `bucket` 信息。

### 选择 bucket

```bash
aup set-bk
```

从已经设置的 `bucket` 中选择一个作为当前 `OSS` 的 `bucket`。

### 展示 bucket 信息

```bash
aup show-bk
```

展示当前的`bucket`。

还可添加 `-a` 或 `--all` 参数展示所有的 `bucket` 信息。

### 编辑 bucket 信息

```bash
aup edit-bk
```

编辑已经存储的 `bucket` 信息。

### 删除 bucket 信息。

```bash
aup delete-bk
```

选择删除一个已经存储的 `bucket` 信息。

### 上传文件

```bash
aup upload <OSSFolder> [localFileFolder]
```

这里需要输入两个参数。

OSSFolder - 表示想要上传到 `OSS` 哪个目录

localFileFolder - 代表需要上传的的本地文件夹，默认为当前目录
