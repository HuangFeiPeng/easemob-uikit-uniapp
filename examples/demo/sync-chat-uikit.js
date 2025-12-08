// 同步ChatUIKit脚本
// 将主目录下的ChatUIKit完全覆盖到demo目录下的ChatUIKit

const fs = require('fs');
const path = require('path');

// 定义路径
const sourceDir = path.resolve(__dirname, '../../ChatUIKit');
const targetDir = path.resolve(__dirname, './ChatUIKit');

// 日志函数
function log(message) {
  console.log(`[Sync ChatUIKit] ${message}`);
}

// 清空目标目录
function emptyDir(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        emptyDir(curPath);
        fs.rmdirSync(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
  }
}

// 复制目录
function copyDir(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  fs.readdirSync(source).forEach((file) => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // 递归复制子目录
      copyDir(sourcePath, targetPath);
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, targetPath);
      log(`Copied: ${sourcePath} -> ${targetPath}`);
    }
  });
}

// 执行同步
function syncChatUIKit() {
  log('开始同步ChatUIKit...');
  
  try {
    // 1. 清空目标目录
    log('清空目标目录...');
    emptyDir(targetDir);
    
    // 2. 复制源目录到目标目录
    log('复制源目录到目标目录...');
    copyDir(sourceDir, targetDir);
    
    log('同步完成！');
  } catch (error) {
    log(`同步失败: ${error.message}`);
    process.exit(1);
  }
}

// 执行脚本
syncChatUIKit();