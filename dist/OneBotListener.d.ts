import http from 'http';
import { EventSystem } from '@zwa73/utils';
import { ClientStatusEvent, EssenceMessageEvent, FriendAddEvent, FriendPokeEvent, FriendRecallEvent, FriendRequestEvent, GroupAdminEvent, GroupBanEvent, GroupCardEvent, GroupDecreaseEvent, GroupHonorEvent, GroupIncreaseEvent, GroupLuckyKingEvent, GroupMessageEvent, GroupPokeEvent, GroupRecallEvent, GroupRequestEvent, GroupTitleEvent, GroupUploadEvent, HeartbeatMetaEvent, LifecycleMetaEvent, OfflineFileEvent, OneBotEventData, PrivateMessageEvent } from './Event';
/** 事件表 */
type EventTable = {
    /** 群消息事件 */
    GroupMessage: GroupMessageEvent;
    /** 私聊消息事件 */
    PrivateMessage: PrivateMessageEvent;
    /** 好友请求事件 */
    FriendRequest: FriendRequestEvent;
    /** 加群请求/邀请事件 */
    GroupRequest: GroupRequestEvent;
    /** 群文件上传事件 */
    GroupUpload: GroupUploadEvent;
    /** 群管理员变动事件 */
    GroupAdmin: GroupAdminEvent;
    /** 群成员减少事件 */
    GroupDecrease: GroupDecreaseEvent;
    /** 群成员增加事件 */
    GroupIncrease: GroupIncreaseEvent;
    /** 群禁言事件 */
    GroupBan: GroupBanEvent;
    /** 好友添加事件 */
    FriendAdd: FriendAddEvent;
    /** 群消息撤回事件 */
    GroupRecall: GroupRecallEvent;
    /**好友消息撤回事件 */
    FriendRecall: FriendRecallEvent;
    /** 好友戳一戳事件
     * @go_cqhttp_only
     */
    FriendPoke: FriendPokeEvent;
    /** 群内戳一戳事件 */
    GroupPoke: GroupPokeEvent;
    /** 群红包运气王提示事件 */
    GroupLuckyKing: GroupLuckyKingEvent;
    /** 群成员荣誉变更提示事件 */
    GroupHonor: GroupHonorEvent;
    /** 群成员名片更新事件
     * @go_cqhttp_only
     */
    GroupCard: GroupCardEvent;
    /** 群成员头衔更新事件
     * @go_cqhttp_only
     */
    GroupTitle: GroupTitleEvent;
    /** 接收到离线文件事件
     * @go_cqhttp_only
     */
    OfflineFile: OfflineFileEvent;
    /** 其他客户端在线状态变更事件
     * @go_cqhttp_only
     */
    ClientStatus: ClientStatusEvent;
    /** 精华消息事件
     * @go_cqhttp_only
     */
    EssenceMessage: EssenceMessageEvent;
    /** 心跳元事件 */
    HeartbeatMeta: HeartbeatMetaEvent;
    /** 生命周期元事件 */
    LifecycleMeta: LifecycleMetaEvent;
};
/**OneBot11+http协议监听器 */
export declare class OneBotListener extends EventSystem<EventTable> {
    /**监听端口 */
    private port;
    constructor(port: number);
    /**路由事件
     * @param data - 事件数据
     */
    routeEvent(data: OneBotEventData, res: http.ServerResponse): void;
}
export {};
