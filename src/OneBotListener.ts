import http from 'http';

import { EventSystem, SLogger } from '@zwa73/utils';

import {
    ClientStatusEvent, EssenceMessageEvent, FriendAddEvent, FriendPokeEvent, FriendRecallEvent,
    FriendRequestEvent, FriendRequestQO, GroupAdminEvent, GroupBanEvent, GroupCardEvent,
    GroupDecreaseEvent, GroupHonorEvent, GroupIncreaseEvent, GroupLuckyKingEvent, GroupMessageEvent,
    GroupMessageQO, GroupPokeEvent, GroupRecallEvent, GroupRequestEvent, GroupRequestQO,
    GroupTitleEvent, GroupUploadEvent, HeartbeatMetaEvent, LifecycleMetaEvent, OfflineFileEvent,
    OneBotEventData, PrivateMessageEvent, PrivateMessageQO
} from './Event';


/** 事件表 */
type EventTable = {
    /** 群消息事件 */
    GroupMessage       : GroupMessageEvent;
    /** 私聊消息事件 */
    PrivateMessage     : PrivateMessageEvent;

    /** 好友请求事件 */
    FriendRequest      : FriendRequestEvent;
    /** 加群请求/邀请事件 */
    GroupRequest       : GroupRequestEvent;

    /** 群文件上传事件 */
    GroupUpload        : GroupUploadEvent;
    /** 群管理员变动事件 */
    GroupAdmin         : GroupAdminEvent;
    /** 群成员减少事件 */
    GroupDecrease      : GroupDecreaseEvent;
    /** 群成员增加事件 */
    GroupIncrease      : GroupIncreaseEvent;
    /** 群禁言事件 */
    GroupBan           : GroupBanEvent;
    /** 好友添加事件 */
    FriendAdd          : FriendAddEvent;
    /** 群消息撤回事件 */
    GroupRecall        : GroupRecallEvent;
    /**好友消息撤回事件 */
    FriendRecall       : FriendRecallEvent;
    /** 好友戳一戳事件
     * @go_cqhttp_only
     */
    FriendPoke         : FriendPokeEvent;
    /** 群内戳一戳事件 */
    GroupPoke          : GroupPokeEvent;
    /** 群红包运气王提示事件 */
    GroupLuckyKing     : GroupLuckyKingEvent;
    /** 群成员荣誉变更提示事件 */
    GroupHonor         : GroupHonorEvent;
    /** 群成员名片更新事件
     * @go_cqhttp_only
     */
    GroupCard          : GroupCardEvent;
    /** 群成员头衔更新事件
     * @go_cqhttp_only
     */
    GroupTitle         : GroupTitleEvent;
    /** 接收到离线文件事件
     * @go_cqhttp_only
     */
    OfflineFile        : OfflineFileEvent;
    /** 其他客户端在线状态变更事件
     * @go_cqhttp_only
     */
    ClientStatus       : ClientStatusEvent;
    /** 精华消息事件
     * @go_cqhttp_only
     */
    EssenceMessage     : EssenceMessageEvent;

    /** 心跳元事件 */
    HeartbeatMeta      : HeartbeatMetaEvent;
    /** 生命周期元事件 */
    LifecycleMeta      : LifecycleMetaEvent;
};


/**OneBot11+http协议监听器 */
export class OneBotListener extends EventSystem<EventTable>{
    /**监听端口 */
    private port: number;

    constructor(port: number) {
        super();
        this.port = port;
        http.createServer((req, res) => {
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.on('error',(e) => SLogger.warn("OneBot11-ProtoClient 发送反馈错误:",e));
            let rawdata = "";
            //每当接收到请求体数据，累加到post中
            req.on('data', (chunk) =>rawdata+=chunk);
            req.on('error', (e) => SLogger.warn(`OneBot11-ProtoClient 监听请求错误:`,e));
            req.on('end', () => {
                try{
                    const jsonData = JSON.parse(rawdata);
                    this.routeEvent(jsonData,res);
                }catch(e){
                    SLogger.warn("OneBot11-ProtoClient OneBotListener 数据接收错误:",e,`数据组为:\n${rawdata}`);
                    res.end();
                    return;
                }
            });
            res.end();
        }).listen(this.port);
    }

    /**路由事件  
     * @param data - 事件数据
     */
    routeEvent(data:OneBotEventData,res:http.ServerResponse){
        switch(data.post_type){
            case 'message':
                switch(data.message_type){
                    case 'group':
                        this.invokeEvent('GroupMessage',data,new GroupMessageQO(res));
                        return;
                    case 'private':
                        this.invokeEvent('PrivateMessage',data,new PrivateMessageQO(res));
                        return;
                    default:
                        SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 message_type',data);
                        return;
                }
            case 'request':
                switch(data.request_type){
                    case 'friend':
                        this.invokeEvent('FriendRequest',data,new FriendRequestQO(res));
                        return;
                    case 'group':
                        this.invokeEvent('GroupRequest',data,new GroupRequestQO(res));
                        return;
                    default:
                        SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 request_type',data);
                        return;
                }
            case 'notice':
                if(data.notice_type!='notify'){
                    const emap = {
                        "group_upload"      : 'GroupUpload'     ,
                        "group_admin"       : 'GroupAdmin'      ,
                        "group_decrease"    : 'GroupDecrease'   ,
                        "group_increase"    : 'GroupIncrease'   ,
                        "group_ban"         : 'GroupBan'        ,
                        "friend_add"        : 'FriendAdd'       ,
                        "group_recall"      : 'GroupRecall'     ,
                        "friend_recall"     : 'FriendRecall'    ,
                        "group_card"        : 'GroupCard'       ,
                        "offline_file"      : 'OfflineFile'     ,
                        "client_status"     : 'ClientStatus'    ,
                        "essence"           : 'EssenceMessage'  ,
                    } as const;
                    const netype = emap[data.notice_type as keyof typeof emap];
                    if(netype==null){
                        SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 notice_type',data);
                        return;
                    }
                    const fixdata = data;
                    this.invokeEvent(netype,fixdata as any);
                    return;
                }
                else if(data.sub_type!='poke'){
                    const emap = {
                        "lucky_king": 'GroupLuckyKing'  ,
                        "honor"     : 'GroupHonor'      ,
                        "title"     : 'GroupTitle'      ,
                    } as const;
                    const netype = emap[data.sub_type as keyof typeof emap];
                    if(netype==null){
                        SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 notify sub_type',data);
                        return;
                    }
                    const fixdata = data;
                    this.invokeEvent(netype,fixdata as any);
                    return;
                }else if(data.sub_type=='poke'){
                    if('group_id' in data){
                        this.invokeEvent('GroupPoke',data);
                        return;
                    }
                    else{
                        this.invokeEvent('FriendPoke',data);
                        return;
                    }
                }
                SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 notice_type',data);
                return;
            case 'meta_event':
                switch(data.meta_event_type){
                    case 'heartbeat':
                        this.invokeEvent('HeartbeatMeta',data);
                        return;
                    case 'lifecycle':
                        this.invokeEvent('LifecycleMeta',data);
                        return;
                    default:
                        SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 meta_event_type',data);
                        return;
                }
            default:
                SLogger.warn('OneBot11-ProtoClient OneBotListener.routeEvent 一个预料之外的 post_type',data);
                return;
        }
    }
}

