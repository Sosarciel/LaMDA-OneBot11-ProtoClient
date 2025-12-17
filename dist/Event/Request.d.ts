import { OneBotEventBaseData, QuickOperationTool } from './EventInterface';
/** 加好友请求事件数据 */
export type FriendRequestEventData = OneBotEventBaseData & {
    /** string - 上报类型 */
    post_type: "request";
    /** string - 请求类型 */
    request_type: "friend";
    /** number (int64) - 发送请求的 QQ 号 */
    user_id: number;
    /** string - 验证信息 */
    comment: string;
    /** string - 请求 flag，在调用处理请求的 API 时需要传入 */
    flag: string;
};
/** 加好友请求快速操作 */
type FriendRequestQuickOperation = {
    /** boolean - 是否同意请求 */
    approve?: boolean;
    /** string - 添加后的好友备注（仅在同意时有效） */
    remark?: string;
};
/**加好友请求快速操作 */
export declare class FriendRequestQO extends QuickOperationTool<FriendRequestQuickOperation> {
    /**快速回复
     * @param approve - 是否同意请求
     * @param remark - 添加后的好友备注（仅在同意时有效）
     */
    approve(approve: boolean, remark?: string): boolean;
}
/** 加好友请求事件 */
export type FriendRequestEvent = (data: FriendRequestEventData, qo: FriendRequestQO) => void;
/** 加群请求／邀请事件数据 */
export type GroupRequestEventData = OneBotEventBaseData & {
    /** string - 上报类型 */
    post_type: "request";
    /** string - 请求类型 */
    request_type: "group";
    /** string - 请求子类型，分别表示加群请求、邀请登录号入群 */
    sub_type: "add" | "invite";
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 发送请求的 QQ 号 */
    user_id: number;
    /** string - 验证信息 */
    comment: string;
    /** string - 请求 flag，在调用处理请求的 API 时需要传入 */
    flag: string;
};
/** 加群请求／邀请快速操作 */
type GroupRequestQuickOperation = {
    /** boolean - 是否同意请求／邀请 */
    approve?: boolean;
    /** string - 拒绝理由（仅在拒绝时有效） */
    reason?: string;
};
/**加群请求／邀请快速操作 */
export declare class GroupRequestQO extends QuickOperationTool<GroupRequestQuickOperation> {
    /**快速回复
     * @param approve - 是否同意请求／邀请
     * @param reason - 拒绝理由（仅在拒绝时有效）
     */
    approve(approve: boolean, reason?: string): boolean;
}
/** 加群请求／邀请事件 */
export type GroupRequestEvent = (data: GroupRequestEventData, qo: GroupRequestQO) => void;
/**任意请求事件数据 */
export type RequestEventData = FriendRequestEventData | GroupRequestEventData;
/**任意请求事件 */
export type RequestEvent = FriendRequestEvent & GroupRequestEvent;
export {};
