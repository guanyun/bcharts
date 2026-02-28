import Reconciler from "react-reconciler";
import React from "react";
import GroupContext from "../../context/group";

const emptyObject = {};

// 渲染的组件为封装组件，不需要渲染
const HostConfig = {
  getRootHostContext() {
    return emptyObject;
  },
  getChildHostContext() {
    return emptyObject;
  },
  createInstance() {}, // 不返回实例则不进入其他周期
  finalizeInitialChildren() {
    return false;
  },
  hideTextInstance() {},
  getPublicInstance(instance: any) {
    return instance;
  },
  hideInstance() {},
  unhideInstance() {},
  unhideTextInstance() {},
  createTextInstance() {},
  prepareUpdate() {
    return emptyObject;
  },
  appendInitialChild() {},
  appendChildToContainer() {},
  removeChildFromContainer() {},
  prepareForCommit() {
    return null;
  },
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false;
  },
  supportsMutation: true, // it works by mutating nodes
  appendChild() {},
  clearContainer() {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  isPrimaryRenderer: false,
  getCurrentEventPriority() {
    return 0;
  },
  getInstanceFromNode() {
    return null;
  },
  beforeActiveInstanceBlur() {},
  afterActiveInstanceBlur() {},
  prepareScopeUpdate() {},
  getInstanceFromScope() {
    return null;
  },
  detachDeletedInstance() {},
  supportsMicrotasks: false,
  supportsHydration: false,
  supportsPersistence: false,
};

const Renderer = Reconciler(HostConfig as any);
// 0 = LegacyRoot，非并发模式
const LegacyRoot = 0;

const withContext = (element, container) => {
  return (
    <GroupContext.Provider value={container}>
      <>{element}</>
    </GroupContext.Provider>
  );
};

const ReactG = {
  render(element, container) {
    if (container.clear) {
      container.clear();
    }
    // react-reconciler@0.31+ 新签名：
    // createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode,
    //   concurrentUpdatesByDefaultOverride, identifierPrefix,
    //   onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks)
    const root = Renderer.createContainer(
      container,
      LegacyRoot,
      null, // hydrationCallbacks
      false, // isStrictMode
      null, // concurrentUpdatesByDefaultOverride
      "", // identifierPrefix
      console.error, // onUncaughtError
      console.error, // onCaughtError
      console.error, // onRecoverableError
      null, // transitionCallbacks
    );
    Renderer.updateContainer(
      withContext(element, container),
      root,
      null,
      () => undefined,
    );
    return Renderer.getPublicRootInstance(root);
  },
};

export default ReactG;
