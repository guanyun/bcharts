import Reconciler from "react-reconciler";
import React from "react";
import GroupContext from "../../context/group";
var emptyObject = {};
// 渲染的组件为封装组件，不需要渲染
var HostConfig = {
    getRootHostContext: function () {
        return emptyObject;
    },
    getChildHostContext: function () {
        return emptyObject;
    },
    createInstance: function () { }, // 不返回实例则不进入其他周期
    finalizeInitialChildren: function () {
        return false;
    },
    hideTextInstance: function () { },
    getPublicInstance: function (instance) {
        return instance;
    },
    hideInstance: function () { },
    unhideInstance: function () { },
    unhideTextInstance: function () { },
    createTextInstance: function () { },
    prepareUpdate: function () {
        return emptyObject;
    },
    appendInitialChild: function () { },
    appendChildToContainer: function () { },
    removeChildFromContainer: function () { },
    prepareForCommit: function () {
        return null;
    },
    resetAfterCommit: function () { },
    shouldSetTextContent: function () {
        return false;
    },
    supportsMutation: true, // it works by mutating nodes
    appendChild: function () { },
    clearContainer: function () { },
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    isPrimaryRenderer: false,
    getCurrentEventPriority: function () {
        return 0;
    },
    getInstanceFromNode: function () {
        return null;
    },
    beforeActiveInstanceBlur: function () { },
    afterActiveInstanceBlur: function () { },
    prepareScopeUpdate: function () { },
    getInstanceFromScope: function () {
        return null;
    },
    detachDeletedInstance: function () { },
    supportsMicrotasks: false,
    supportsHydration: false,
    supportsPersistence: false,
};
var Renderer = Reconciler(HostConfig);
// 0 = LegacyRoot，非并发模式
var LegacyRoot = 0;
var withContext = function (element, container) {
    return (React.createElement(GroupContext.Provider, { value: container },
        React.createElement(React.Fragment, null, element)));
};
var ReactG = {
    render: function (element, container) {
        if (container.clear) {
            container.clear();
        }
        // react-reconciler@0.31+ 新签名：
        // createContainer(containerInfo, tag, hydrationCallbacks, isStrictMode,
        //   concurrentUpdatesByDefaultOverride, identifierPrefix,
        //   onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks)
        var root = Renderer.createContainer(container, LegacyRoot, null, // hydrationCallbacks
        false, // isStrictMode
        null, // concurrentUpdatesByDefaultOverride
        "", // identifierPrefix
        console.error, // onUncaughtError
        console.error, // onCaughtError
        console.error, // onRecoverableError
        null);
        Renderer.updateContainer(withContext(element, container), root, null, function () { return undefined; });
        return Renderer.getPublicRootInstance(root);
    },
};
export default ReactG;
