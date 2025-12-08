# ChatUIKit 按需导入使用示例

本项目已支持按需导入，您可以根据需要仅导入所需的组件和Store，以减少打包体积。

## Tree Shaking 支持说明

- **按需导入方式**：完全支持 Tree Shaking，仅导入使用的模块和组件
- **完整实例方式**：不支持 Tree Shaking，会导入所有依赖

## 1. 完整实例导入（向后兼容，非Tree Shaking友好）

如果您需要使用完整功能或保持向后兼容，可以继续使用之前的导入方式：

```typescript
import { ChatUIKit } from './index';
import { APPKEY, API_URL, URL } from '@/const/index';
import websdk from 'easemob-websdk/uniApp/Easemob-chat';

const chat = new websdk.connection({
  appKey: APPKEY,
  isHttpDNS: false,
  url: URL,
  apiUrl: API_URL,
  delivery: true
});

// 初始化完整实例
ChatUIKit.init({
  chat,
  config: {
    theme: {
      avatarShape: 'square'
    },
    isDebug: true
  }
});

// 使用完整实例
uni.$UIKit = ChatUIKit;
```

## 2. 完全按需导入（Tree Shaking友好）

如果您希望获得最佳的Tree Shaking效果，可以避免导入完整实例，直接按需导入所需的模块：

```typescript
// 仅导入必要的模块
import { ConnStore, ConfigStore } from './index';
import websdk from 'easemob-websdk/uniApp/Easemob-chat';

// 初始化必要的Store
const connStore = new ConnStore();
const configStore = new ConfigStore();

// 创建IM连接
const chat = new websdk.connection({
  appKey: APPKEY,
  isHttpDNS: false,
  url: URL,
  apiUrl: API_URL,
  delivery: true
});

// 配置连接
connStore.setChatConn(chat);
configStore.setThemeConfig({ avatarShape: 'circle' });

// 根据需要动态导入其他模块
const needChat = true;
if (needChat) {
  import('./index').then(({ ChatStore }) => {
    const chatStore = new ChatStore();
    // 使用chatStore
  });
}

## 2. 按需导入Store

如果您只需要使用部分Store，可以单独导入所需的Store：

```typescript
import { ConnStore, ConfigStore, ChatStore } from './index';
import websdk from 'easemob-websdk/uniApp/Easemob-chat';

// 创建Store实例
const connStore = new ConnStore();
const configStore = new ConfigStore();
const chatStore = new ChatStore();

// 初始化连接
const chat = new websdk.connection({
  appKey: APPKEY,
  isHttpDNS: false,
  url: URL,
  apiUrl: API_URL,
  delivery: true
});

connStore.setChatConn(chat);
configStore.setThemeConfig({ avatarShape: 'square' });
```

## 3. 按需导入组件

在Vue组件中，可以按需导入所需的UI组件：

```vue
<template>
  <view>
    <Avatar :username="userName" :avatarUrl="avatarUrl" />
    <Chat :conversationId="conversationId" />
    <ContactList />
    <GroupList />
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Avatar, Chat, ContactList, GroupList } from '../ChatUIKit';

export default defineComponent({
  components: {
    Avatar,      // 按需注册组件
    Chat,        // 按需注册组件
    ContactList, // 按需注册组件
    GroupList    // 按需注册组件
  },
  data() {
    return {
      userName: '张三',
      avatarUrl: 'https://example.com/avatar.jpg',
      conversationId: 'conv_123'
    };
  }
});
</script>
```

## 4. 按需导入类型定义

```typescript
import { ChatUIKitInitParams, FeatureConfig } from './index';

const initParams: ChatUIKitInitParams = {
  chat: null, // IM连接实例
  config: {
    theme: {
      avatarShape: 'circle'
    },
    features: {
      useUserInfo: true,
      usePresence: false
    }
  }
};

const hiddenFeatures: Array<keyof FeatureConfig> = ['usePresence'];
```

## 5. 按需导入工具

```typescript
import { logger } from './index';

// 启用调试日志
logger.enableDebug();

// 输出日志
logger.log('ChatUIKit initialized');
```

## 注意事项

1. 按需导入时，需要自己管理Store之间的依赖关系
2. 完整实例导入方式保持不变，确保向后兼容
3. 组件按需导入时，需要在Vue组件中手动注册
4. 建议根据实际业务需求选择合适的导入方式
