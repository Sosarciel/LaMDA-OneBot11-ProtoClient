import { JObject } from "@zwa73/utils";
import http from 'http';
import { RequestEvent, RequestEventData } from "./Request";
import { NoticeEvent, NoticeEventData } from "./Notice";
import { MateEvent, MateEventData } from "./MateEvent";
import { MessageEventData } from "./Message";
import { MessageClip } from "../CQCode";

/** 文件信息 */
export type File = {
    /** string - 文件 ID */
    id: string;
    /** string - 文件名 */
    name: string;
    /** number (int64) - 文件大小（字节数） */
    size: number;
    /** number (int64) - busid（目前不清楚有什么作用） */
    busid: number;
};

/** 机器人状态 */
export type Status = {
    /** bool - 当前 QQ 在线, null 表示无法查询到在线状态 */
    online: boolean;
    /** bool - 状态符合预期, 意味着各模块正常运行、功能正常，且 QQ 在线
     * go_cqhttp可能缺少此项
     */
    good: boolean;
}&{
    /** Status_Statistics - 统计信息 
     * @go_cqhttp_only
     */
    stat: StatusStatistics;
    /** bool - 程序是否初始化完毕
     * @go_cqhttp_only
     */
    app_initialized: boolean;
    /** bool - 程序是否可用
     * @go_cqhttp_only
     */
    app_enabled: boolean;
    /** bool - 插件正常(可能为 null)
     * @go_cqhttp_only
     */
    plugins_good: boolean | null;
    /** bool - 程序正常 
     * @go_cqhttp_only
     */
    app_good: boolean;
}

/** 机器人状态 数据统计
 * @go_cqhttp_only
 */
export type StatusStatistics = {
    /** uint64 - 收包数 */
    packet_received: number;
    /** uint64 - 发包数 */
    packet_sent: number;
    /** uint64 - 丢包数 */
    packet_lost: number;
    /** uint64 - 消息接收数 */
    message_received: number;
    /** uint64 - 消息发送数 */
    message_sent: number;
    /** uint32 - 连接断开次数 */
    disconnect_times: number;
    /** uint32 - 连接丢失次数 */
    lost_times: number;
    /** int64 - 最后一次消息时间 */
    last_message_time: number;
}


/**基础事件数据 */
export type OneBotEventBaseData = {
    /** number (int64) - 事件发生的时间戳 */
    time: number;
    /** number (int64) - 收到事件的机器人 QQ 号 */
    self_id: number;
};

/**快速操作 */
export class QuickOperationTool<T extends JObject = JObject> {
    protected _res:http.ServerResponse;
    constructor(res:http.ServerResponse){
        this._res=res;
    }
    protected qo(jo:T){
        return this._res.write(JSON.stringify(jo));
    }
}

/**支持cq码解析的文本 */
export type Message = string|MessageClip[];


/**任何事件 */
export type OneBotEvent = MessageEvent&RequestEvent&NoticeEvent&MateEvent;
/**任何事件数据 */
export type OneBotEventData = MessageEventData|RequestEventData|NoticeEventData|MateEventData;

