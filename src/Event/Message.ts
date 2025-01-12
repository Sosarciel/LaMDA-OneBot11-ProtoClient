import { Message, OneBotEventBaseData, QuickOperationTool } from './EventInterface';

//#region GroupMessage

/** 群消息事件数据 */
export type GroupMessageEventData = OneBotEventBaseData&{
    /** string - 上报类型 */
    post_type: "message";
    /** string - 消息类型 */
    message_type: "group";
    /** string - 消息子类型，正常消息是 normal，匿名消息是 anonymous，系统提示（如「管理员已禁止群内匿名聊天」）是 notice */
    sub_type: "normal"|"anonymous"|"notice";
    /** number (int32) - 消息 ID */
    message_id: number;
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 发送者 QQ 号 */
    user_id: number;
    /** object - 匿名信息，如果不是匿名消息则为 null */
    anonymous: GroupMessageAnonymous | null;
    /** message - 消息内容 */
    message: Message;
    /** string - 原始消息内容 */
    raw_message: string;
    /** number (int32) - 字体 */
    font: number;
    /** object - 发送人信息 */
    sender: GroupMessageSender;
};
/** 快速操作 */
type GroupMessageQuickOperation = {
    /** message - 要回复的内容 */
    reply?: Message;
    /** boolean - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效 */
    auto_escape?: boolean;
    /** boolean - 是否要在回复开头 at 发送者（自动添加），发送者是匿名用户时无效 */
    at_sender?: boolean;
    /** boolean - 撤回该条消息 */
    delete?: boolean;
    /** boolean - 把发送者踢出群组（需要登录号权限足够），不拒绝此人后续加群请求，发送者是匿名用户时无效 */
    kick?: boolean;
    /** boolean - 把发送者禁言 ban_duration 指定时长，对匿名用户也有效 */
    ban?: boolean;
    /** number - 禁言时长 */
    ban_duration?: number;
};
/** 匿名信息 */
export type GroupMessageAnonymous = {
    /** number (int64) - 匿名用户 ID */
    id: number;
    /** string - 匿名用户名称 */
    name: string;
    /** string - 匿名用户 flag，在调用禁言 API 时需要传入 */
    flag: string;
};
/** 发送人信息 */
export type GroupMessageSender = {
    /** number (int64) - 发送者 QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 群名片／备注 */
    card: string;
    /** string - 性别，male 或 female 或 unknown */
    sex: string;
    /** number (int32) - 年龄 */
    age: number;
    /** string - 地区 */
    area: string;
    /** string - 成员等级 */
    level: string;
    /** string - 角色，owner 或 admin 或 member */
    role: string;
    /** string - 专属头衔 */
    title: string;
};
/**群快速操作 */
export class GroupMessageQO extends QuickOperationTool<GroupMessageQuickOperation> {
    /**快速回复
     * @param reply       - 消息内容
     * @param auto_escape - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效
     * @param at_sender   - 是否要在回复开头 at 发送者（自动添加），发送者是匿名用户时无效
     */
    reply(reply: Message, auto_escape: boolean, at_sender: boolean) {
        return this.qo({
            reply,
            auto_escape,
            at_sender,
        });
    }

    /**撤回该条消息 */
    delete() {
        return this.qo({ 'delete': true });
    }

    /**把发送者踢出群组 */
    kick() {
        return this.qo({ 'kick': true });
    }

    /**把发送者禁言
     * @param ban_duration - 禁言时长
     */
    ban(ban_duration: number) {
        return this.qo({
            'ban': true,
            'ban_duration': ban_duration
        });
    }
}
/**群消息事件 
 * @param data - 事件数据
 * @param qo   - 快速操作
 */
export type GroupMessageEvent = (data:GroupMessageEventData,qo:GroupMessageQO)=>void;
//#endregion

//#region PrivateMessage
/** 私聊事件数据 */
export type PrivateMessageEventData = OneBotEventBaseData&{
    /** string - 上报类型 */
    post_type: "message";
    /** string - 消息类型 */
    message_type: "private";
    /** string - 消息子类型，如果是好友则是 friend，如果是群临时会话则是 group */
    sub_type: "friend"|"group"|"other";
    /** number (int32) - 消息 ID */
    message_id: number;
    /** number (int64) - 发送者 QQ 号 */
    user_id: number;
    /** message - 消息内容 */
    message: Message;
    /** string - 原始消息内容 */
    raw_message: string;
    /** number (int32) - 字体 */
    font: number;
    /** object - 发送人信息 */
    sender: PrivateMessageSender;
};
/** 发送人信息 */
export type PrivateMessageSender = {
    /** number (int64) - 发送者 QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 性别，male 或 female 或 unknown */
    sex: string;
    /** number (int32) - 年龄 */
    age: number;
};
/** 快速操作 */
type PrivateMessageQuickOperation = {
    /** message - 要回复的内容 */
    reply?: Message;
    /** boolean - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效 */
    auto_escape?: boolean;
};
/**私聊快速操作 */
export class PrivateMessageQO extends QuickOperationTool<PrivateMessageQuickOperation> {
    /**快速回复
     * @param reply       - 消息内容
     * @param auto_escape - 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 reply 字段是字符串时有效
     */
    reply(reply: string, auto_escape: boolean) {
        return this.qo({
            reply,
            auto_escape,
        });
    }
}
/**私聊消息事件  
 * @param data - 事件数据
 * @param qo   - 快速操作
 */
export type PrivateMessageEvent = (data:PrivateMessageEventData,qo:PrivateMessageQO)=>void;
//#endregion


/**任意消息事件数据 */
export type MessageEventData = PrivateMessageEventData|GroupMessageEventData;
/**任意消息事件 */
export type MessageEvent = PrivateMessageEvent&GroupMessageEvent;
