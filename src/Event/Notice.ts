import { OneBotEventBaseData, File } from './EventInterface';



type OneBotEventNoticeData<T extends string> = OneBotEventBaseData&{
    /** string - 上报类型 */
    post_type: "notice";
    /** string - 通知类型 */
    notice_type: T;
}

/** 群文件上传事件数据 */
export type GroupUploadEventData = OneBotEventNoticeData<"group_upload">&{
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 发送者 QQ 号 */
    user_id: number;
    /** object - 文件信息 */
    file: File;
};
/** 群文件上传事件 */
export type GroupUploadEvent = (data: GroupUploadEventData) => void;

/** 群管理员变动事件数据 */
export type GroupAdminEventData = OneBotEventNoticeData<"group_admin">&{
    /** string - 事件子类型，分别表示设置和取消管理员 */
    sub_type: "set" | "unset";
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 管理员 QQ 号 */
    user_id: number;
};
/** 群管理员变动事件 */
export type GroupAdminEvent = (data: GroupAdminEventData) => void;

/** 群成员减少事件数据 */
export type GroupDecreaseEventData = OneBotEventNoticeData<"group_decrease">&{
    /** string - 事件子类型，分别表示主动退群、成员被踢、登录号被踢 */
    sub_type: "leave" | "kick" | "kick_me";
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 操作者 QQ 号（如果是主动退群，则和 user_id 相同） */
    operator_id: number;
    /** number (int64) - 离开者 QQ 号 */
    user_id: number;
};
/** 群成员减少事件 */
export type GroupDecreaseEvent = (data: GroupDecreaseEventData) => void;

/** 群成员增加事件数据 */
export type GroupIncreaseEventData = OneBotEventNoticeData<"group_increase">&{
    /** string - 事件子类型，分别表示管理员已同意入群、管理员邀请入群 */
    sub_type: "approve" | "invite";
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 操作者 QQ 号 */
    operator_id: number;
    /** number (int64) - 加入者 QQ 号 */
    user_id: number;
};
/** 群成员增加事件 */
export type GroupIncreaseEvent = (data: GroupIncreaseEventData) => void;

/** 群禁言事件数据 */
export type GroupBanEventData = OneBotEventNoticeData<"group_ban">&{
    /** string - 事件子类型，分别表示禁言、解除禁言 */
    sub_type: "ban" | "lift_ban";
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 操作者 QQ 号 */
    operator_id: number;
    /** number (int64) - 被禁言 QQ 号 */
    user_id: number;
    /** number (int64) - 禁言时长，单位秒 */
    duration: number;
};
/** 群禁言事件 */
export type GroupBanEvent = (data: GroupBanEventData) => void;

/** 好友添加事件数据 */
export type FriendAddEventData = OneBotEventNoticeData<"friend_add">&{
    /** number (int64) - 新添加好友 QQ 号 */
    user_id: number;
};
/** 好友添加事件 */
export type FriendAddEvent = (data: FriendAddEventData) => void;

/** 群消息撤回事件数据 */
export type GroupRecallEventData = OneBotEventNoticeData<"group_recall">&{
    /** number (int64) - 群号 */
    group_id: number;
    /** number (int64) - 消息发送者 QQ 号 */
    user_id: number;
    /** number (int64) - 操作者 QQ 号 */
    operator_id: number;
    /** number (int64) - 被撤回的消息 ID */
    message_id: number;
};
/** 群消息撤回事件 */
export type GroupRecallEvent = (data: GroupRecallEventData) => void;

/** 好友消息撤回事件数据 */
export type FriendRecallEventData = OneBotEventNoticeData<"friend_recall">&{
    /** number (int64) - 好友 QQ 号 */
    user_id: number;
    /** number (int64) - 被撤回的消息 ID */
    message_id: number;
};
/** 好友消息撤回事件 */
export type FriendRecallEvent = (data: FriendRecallEventData) => void;

/** 好友戳一戳事件数据
 * @go_cqhttp_only
 */
export type FriendPokeEventData = OneBotEventNoticeData<"notify">&{
    /** string - 提示类型 */
    sub_type: "poke";
    /** int64 - 发送者 QQ 号 */
    sender_id: number;
    /** int64 - 发送者 QQ 号 */
    user_id: number;
    /** int64 - 被戳者 QQ 号 */
    target_id: number;
};
/** 好友戳一戳事件 
 * @go_cqhttp_only
 */
export type FriendPokeEvent = (data: FriendPokeEventData) => void;

/** 群内戳一戳事件数据 */
export type GroupPokeEventData = OneBotEventNoticeData<"notify">&{
    /** int64 - 群号 */
    group_id: number;
    /** string - 提示类型 */
    sub_type: "poke";
    /** int64 - 发送者id */
    user_id: number;
    /** int64 - 被戳者id */
    target_id: number;
};
/** 群内戳一戳事件 */
export type GroupPokeEvent = (data: GroupPokeEventData) => void;

/** 群红包运气王提示事件数据 */
export type GroupLuckyKingEventData = OneBotEventNoticeData<"notify">&{
    /** int64 - 群号 */
    group_id: number;
    /** string - 提示类型 */
    sub_type: "lucky_king";
    /** int64 - 红包发送者id */
    user_id: number;
    /** int64 - 运气王id */
    target_id: number;
};
/** 群红包运气王提示事件 */
export type GroupLuckyKingEvent = (data: GroupLuckyKingEventData) => void;

/** 群成员荣誉变更提示事件数据 */
export type GroupHonorEventData = OneBotEventNoticeData<"notify">&{
    /** int64 - 群号 */
    group_id: number;
    /** string - 提示类型 */
    sub_type: "honor";
    /** int64 - 成员id */
    user_id: number;
    /** string - 荣誉类型 */
    honor_type: "talkative" | "performer" | "emotion";
};
/** 群成员荣誉变更提示事件 */
export type GroupHonorEvent = (data: GroupHonorEventData) => void;

/** 群成员名片更新事件数据
 * @go_cqhttp_only
 */
export type GroupCardEventData = OneBotEventNoticeData<"group_card">&{
    /** int64 - 群号 */
    group_id: number;
    /** int64 - 成员id */
    user_id: number;
    /** string - 新名片 */
    card_new: string;
    /** string - 旧名片 */
    card_old: string;
};
/** 群成员名片更新事件
 * @go_cqhttp_only
 */
export type GroupCardEvent = (data: GroupCardEventData) => void;

/** 群成员头衔更新事件数据
 * @go_cqhttp_only
 */
export type GroupTitleEventData = OneBotEventNoticeData<"notify">&{
    /** int64 - 群号 */
    group_id: number;
    /** int64 - 成员id */
    user_id: number;
    /** string - 新头衔 */
    title: string;
    /**提示类型 */
    sub_type: "title";
};
/** 群成员头衔更新事件
 * @go_cqhttp_only
 */
export type GroupTitleEvent = (data: GroupTitleEventData) => void;

/** 接收到离线文件事件数据
 * @go_cqhttp_only
 */
export type OfflineFileEventData = OneBotEventNoticeData<"offline_file">&{
    /** int64 - 发送者id */
    user_id: number;
    /** object - 文件数据 */
    file: File;
};
/** 接收到离线文件事件 
 * @go_cqhttp_only
 */
export type OfflineFileEvent = (data: OfflineFileEventData) => void;

/** 其他客户端在线状态变更事件数据
 * @go_cqhttp_only
 */
export type ClientStatusEventData = OneBotEventNoticeData<"client_status">&{
    /** Device - 客户端信息 */
    client: string; //Device;
    /** bool - 当前是否在线 */
    online: boolean;
};
/** 其他客户端在线状态变更事件 
 * @go_cqhttp_only
 */
export type ClientStatusEvent = (data: ClientStatusEventData) => void;

/** 精华消息事件数据
 * @go_cqhttp_only
 */
export type EssenceMessageEventData = OneBotEventNoticeData<"essence">&{
    /** string - 添加为add,移出为delete */
    sub_type: "add" | "delete";
    /** int64 - 消息发送者ID */
    sender_id: number;
    /** int64 - 操作者ID */
    operator_id: number;
    /** int32 - 消息ID */
    message_id: number;
};
/** 精华消息事件
 * @go_cqhttp_only
 */
export type EssenceMessageEvent = (data: EssenceMessageEventData) => void;

/** 群消息表情点赞事件数据
 * @llob_only
 */
export type GroupMessageEmojiLikeEventData = OneBotEventNoticeData<"group_msg_emoji_like">&{
    /** int32 - 消息ID */
    message_id: number;
    /** 表情 */
    likes: { emoji_id: string, count: number }[],
    /** int64 - 群号 */
    group_id: number;
    /** int64 - 操作者 QQ 号 */
    user_id: number;
    /** bool - 是否添加 true为添加，false为取消 */
    is_add: boolean;
};
/** 群消息表情点赞事件
 * @llob_only
 */
export type GroupMessageEmojiLikeEvent = (data: GroupMessageEmojiLikeEventData) => void;


/**任何通知事件数据 */
export type NoticeEventData =
    | GroupUploadEventData
    | GroupAdminEventData
    | GroupDecreaseEventData
    | GroupIncreaseEventData
    | GroupBanEventData
    | FriendAddEventData
    | GroupRecallEventData
    | FriendRecallEventData
    | FriendPokeEventData
    | GroupPokeEventData
    | GroupLuckyKingEventData
    | GroupHonorEventData
    | GroupCardEventData
    | GroupTitleEventData
    | OfflineFileEventData
    | ClientStatusEventData
    | EssenceMessageEventData
    | GroupMessageEmojiLikeEventData;

/**任何通知事件 */
export type NoticeEvent =
    & GroupUploadEvent
    & GroupAdminEvent
    & GroupDecreaseEvent
    & GroupIncreaseEvent
    & GroupBanEvent
    & FriendAddEvent
    & GroupRecallEvent
    & FriendRecallEvent
    & FriendPokeEvent
    & GroupPokeEvent
    & GroupLuckyKingEvent
    & GroupHonorEvent
    & GroupCardEvent
    & GroupTitleEvent
    & OfflineFileEvent
    & ClientStatusEvent
    & EssenceMessageEvent
    & GroupMessageEmojiLikeEvent;
