import { OneBotEventBaseData, Status } from "./EventInterface";
/** 生命周期元事件数据 */
export type LifecycleMetaEventData = OneBotEventBaseData & {
    /** string - 上报类型 */
    post_type: "meta_event";
    /** string - 元事件类型 */
    meta_event_type: "lifecycle";
    /** string - 事件子类型，分别表示 OneBot 启用、停用、WebSocket 连接成功 */
    sub_type: "enable" | "disable" | "connect";
};
/** 生命周期元事件 */
export type LifecycleMetaEvent = (data: LifecycleMetaEventData) => void;
/** 心跳元事件数据 */
export type HeartbeatMetaEventData = OneBotEventBaseData & {
    /** string - 上报类型 */
    post_type: "meta_event";
    /** string - 元事件类型 */
    meta_event_type: "heartbeat";
    /** object - 状态信息 */
    status: Status;
    /** number (int64) - 到下次心跳的间隔，单位毫秒 */
    interval: number;
};
/** 心跳元事件 */
export type HeartbeatMetaEvent = (data: HeartbeatMetaEventData) => void;
/** 任意元事件数据 */
export type MateEventData = LifecycleMetaEventData | HeartbeatMetaEventData;
/** 任意元事件 */
export type MateEvent = HeartbeatMetaEvent & LifecycleMetaEvent;
