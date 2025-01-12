import http from 'http';

import { AnyFunc, Keyable, SLogger, UtilFunc } from '@zwa73/utils';

import {
    ClientStatusEvent, EssenceMessageEvent, FriendAddEvent, FriendPokeEvent, FriendRecallEvent,
    FriendRequestEvent, FriendRequestQO, GroupAdminEvent, GroupBanEvent, GroupCardEvent,
    GroupDecreaseEvent, GroupHonorEvent, GroupIncreaseEvent, GroupLuckyKingEvent, GroupMessageEvent,
    GroupMessageQO, GroupPokeEvent, GroupRecallEvent, GroupRequestEvent, GroupRequestQO,
    GroupTitleEvent, GroupUploadEvent, HeartbeatMetaEvent, LifecycleMetaEvent, OfflineFileEvent,
    OneBotEventData, PrivateMessageEvent, PrivateMessageQO
} from './Event';

type PRE<V extends AnyFunc> = Partial<Record<string,ListenerEvent<V>>>;

/** 事件表 */
type EventTable = Partial<{
    /** 群消息事件 */
    GroupMessage       : PRE<GroupMessageEvent>;
    /** 私聊消息事件 */
    PrivateMessage     : PRE<PrivateMessageEvent>;

    /** 好友请求事件 */
    FriendRequest      : PRE<FriendRequestEvent>;
    /** 加群请求/邀请事件 */
    GroupRequest       : PRE<GroupRequestEvent>;

    /** 群文件上传事件 */
    GroupUpload        : PRE<GroupUploadEvent>;
    /** 群管理员变动事件 */
    GroupAdmin         : PRE<GroupAdminEvent>;
    /** 群成员减少事件 */
    GroupDecrease      : PRE<GroupDecreaseEvent>;
    /** 群成员增加事件 */
    GroupIncrease      : PRE<GroupIncreaseEvent>;
    /** 群禁言事件 */
    GroupBan           : PRE<GroupBanEvent>;
    /** 好友添加事件 */
    FriendAdd          : PRE<FriendAddEvent>;
    /** 群消息撤回事件 */
    GroupRecall        : PRE<GroupRecallEvent>;
    /**好友消息撤回事件 */
    FriendRecall       : PRE<FriendRecallEvent>;
    /** 好友戳一戳事件
     * @go_cqhttp_only
     */
    FriendPoke         : PRE<FriendPokeEvent>;
    /** 群内戳一戳事件 */
    GroupPoke          : PRE<GroupPokeEvent>;
    /** 群红包运气王提示事件 */
    GroupLuckyKing     : PRE<GroupLuckyKingEvent>;
    /** 群成员荣誉变更提示事件 */
    GroupHonor         : PRE<GroupHonorEvent>;
    /** 群成员名片更新事件
     * @go_cqhttp_only
     */
    GroupCard          : PRE<GroupCardEvent>;
    /** 群成员头衔更新事件
     * @go_cqhttp_only
     */
    GroupTitle         : PRE<GroupTitleEvent>;
    /** 接收到离线文件事件
     * @go_cqhttp_only
     */
    OfflineFile        : PRE<OfflineFileEvent>;
    /** 其他客户端在线状态变更事件
     * @go_cqhttp_only
     */
    ClientStatus       : PRE<ClientStatusEvent>;
    /** 精华消息事件
     * @go_cqhttp_only
     */
    EssenceMessage     : PRE<EssenceMessageEvent>;

    /** 心跳元事件 */
    HeartbeatMeta      : PRE<HeartbeatMetaEvent>;
    /** 生命周期元事件 */
    LifecycleMeta      : PRE<LifecycleMetaEvent>;
}>;

/**事件类型 */
type EventType = keyof EventTable;
type Arg1<T extends EventType> = Required<EventTable>[T] extends PRE<infer E> ? Parameters<E>[0] : never;
type Arg2<T extends EventType> = Required<EventTable>[T] extends PRE<infer E> ? Parameters<E>[1] : never;
type Func<T extends EventType> = Required<EventTable>[T] extends PRE<infer E> ? E : never;

/** 事件监听 */
type ListenerEvent<E extends AnyFunc> = {
    /**权重 */
    weight:number;
    /**事件ID */
    id:string;
    /**事件函数 */
    event:E;
}
type InvokeEventOpt = Partial<{
    /**事件权重 越高越先触发 */
    weight:number;
    /**事件id */
    id:string;
}>

/**OneBot11+http协议监听器 */
export class OneBotListener {
    /**注册的事件表 */
    private _eventTable: EventTable = {};
    /**监听端口 */
    private port: number;

    constructor(port: number) {
        this.port = port;
        http.createServer((req, res) => {
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.on('error',(e) => SLogger.warn("发送反馈错误:",e));
            let rawdata = "";
            //每当接收到请求体数据，累加到post中
            req.on('data', (chunk) =>rawdata+=chunk);
            req.on('error', (e) => SLogger.warn(`监听请求错误:`,e));
            req.on('end', () => {
                try{
                    const jsonData = JSON.parse(rawdata);
                    this.routeEvent(jsonData,res);
                }catch(e){
                    SLogger.warn("OneBotListener 数据接收错误:",e,`数据组为:\n${rawdata}`);
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
                        SLogger.warn('OneBotListener.routeEvent 一个预料之外的 message_type',data);
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
                        SLogger.warn('OneBotListener.routeEvent 一个预料之外的 request_type',data);
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
                        SLogger.warn('OneBotListener.routeEvent 一个预料之外的 notice_type',data);
                        return;
                    }
                    const fixdata = data as Arg1<typeof netype>;
                    this.invokeEvent(netype,fixdata,undefined);
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
                        SLogger.warn('OneBotListener.routeEvent 一个预料之外的 notify sub_type',data);
                        return;
                    }
                    const fixdata = data as Arg1<typeof netype>;
                    this.invokeEvent(netype,fixdata,undefined);
                    return;
                }else if(data.sub_type=='poke'){
                    if('group_id' in data){
                        this.invokeEvent('GroupPoke',data,undefined);
                        return;
                    }
                    else{
                        this.invokeEvent('FriendPoke',data,undefined);
                        return;
                    }
                }
                SLogger.warn('OneBotListener.routeEvent 一个预料之外的 notice_type',data);
                return;
            case 'meta_event':
                switch(data.meta_event_type){
                    case 'heartbeat':
                        this.invokeEvent('HeartbeatMeta',data,undefined);
                        return;
                    case 'lifecycle':
                        this.invokeEvent('LifecycleMeta',data,undefined);
                        return;
                    default:
                        SLogger.warn('OneBotListener.routeEvent 一个预料之外的 meta_event_type',data);
                        return;
                }
            default:
                SLogger.warn('OneBotListener.routeEvent 一个预料之外的 post_type',data);
                return;
        }
    }
    /**调用事件  
     * @param eventType - 事件类型
     * @param arg1      - 事件函数的第一个参数 通常为事件数据
     * @param arg2      - 事件函数的第二个参数 通常为事件快速操作工具
     */
    invokeEvent<T extends EventType>(eventType:T,arg1:Arg1<T>,arg2:Arg2<T>){
        const emap = this._eventTable[eventType];
        if(emap===undefined) return;
        const elist:Exclude<Required<EventTable>[EventType][string],undefined>[]
            = Object.values(emap);
        elist.sort((a,b)=>b.weight-a.weight)
            .forEach((v)=>v.event(arg1,arg2));
    }
    /**注册事件  
     * @param eventType - 事件类型
     * @param event     - 事件函数
     * @param opt       - 可选参数
     */
    registerEvent<T extends EventType>(eventType: T, event: Func<T>, opt?:InvokeEventOpt) {
        this._eventTable[eventType] = this._eventTable[eventType]??{};
        const typeTable = this._eventTable[eventType]!;

        const id = opt?.id ?? UtilFunc.genUUID();
        const weight = opt?.weight ?? 0;

        typeTable[id] = {
            event,id,weight
        };
    }
}

