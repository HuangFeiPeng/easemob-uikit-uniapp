// 核心Store导出（按需导入）
export { default as AppUserStore } from "./store/appUser";
export { default as ChatStore } from "./store/chat";
export { default as ConnStore } from "./store/conn";
export { default as ContactStore } from "./store/contact";
export { default as ConversationStore } from "./store/conversation";
export { default as GroupStore } from "./store/group";
export { default as MessageStore } from "./store/message";
export { default as ConfigStore } from "./store/config";

// 类型导出
export { ChatUIKitInitParams, FeatureConfig } from "./configType";

// 日志工具
export { logger } from "./log";

// 完整实例（向后兼容，从单独文件导入）
export { ChatUIKit } from "./fullInstance";
export type { ChatKIT } from "./fullInstance";

// 组件导出（按需导入）
export { default as Chat } from "./modules/Chat/index.vue";
export { default as Conversation } from "./modules/Conversation/index.vue";
export { default as ContactList } from "./modules/ContactList/index.vue";
export { default as GroupList } from "./modules/GroupList/index.vue";
export { default as Avatar } from "./components/Avatar/index.vue";
export { default as Button } from "./components/Button/index.vue";
export { default as Empty } from "./components/Empty/index.vue";
export { default as Modal } from "./components/Modal/index.vue";
export { default as NavBar } from "./components/NavBar/index.vue";
export { default as Popup } from "./components/Popup/index.vue";
export { default as SearchInput } from "./components/SearchInput/index.vue";
