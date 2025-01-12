import { GroupMessageAnonymous, GroupMessageSender, Message, PrivateMessageSender } from "./Event";

/** 发送私聊消息的 请求数据 */
export type SendPrivateMsgPostData = {
    /** number - 对方 QQ 号 */
    user_id: number;
    /** message - 要发送的内容 */
    message: Message;
    /** boolean - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false */
    auto_escape?: boolean;
}
/** 发送私聊消息的 响应数据 */
export type SendPrivateMsgRespData = {
    /**number - (int32) 消息 ID*/
    message_id: number;
}
/** 发送群消息的 请求数据 */
export type SendGroupMsgPostData = {
    /** number - 群号 */
    group_id: number;
    /** message - 要发送的内容 */
    message: Message;
    /** boolean - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false */
    auto_escape?: boolean;
}
/** 发送群消息的 响应数据 */
export type SendGroupMsgRespData = {
    /** number - (int32) 消息 ID */
    message_id: number;
}

/** 发送消息的 请求数据 */
export type SendMsgPostData = {
    /** string - 消息类型，支持 private、group，分别对应私聊、群组，如不传入，则根据传入的 *_id 参数判断 */
    message_type: string;
    /** number - 对方 QQ 号 (消息类型为 private 时需要)  */
    user_id: number;
    /** number - 群号 (消息类型为 group 时需要)  */
    group_id: number;
    /** message - 要发送的内容 */
    message: Message;
    /** boolean - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false */
    auto_escape?: boolean;
}
/** 发送消息的 响应数据 */
export type SendMsgRespData = {
    /** number - (int32) 消息 ID */
    message_id: number;
}

/** 撤回消息的 请求数据 */
export type DeleteMsgPostData = {
    /** number - (int32) 消息 ID */
    message_id: number;
}

/** 获取消息的 请求数据 */
export type GetMsgPostData = {
    /** number - (int32) 消息 ID */
    message_id: number;
}
/** 获取消息的 响应数据 */
export type GetMsgRespData = {
    /** number - (int32) 发送时间 */
    time: number;
    /** string - 消息类型，同 消息事件 */
    message_type: string;
    /** number - (int32) 消息 ID */
    message_id: number;
    /** number - (int32) 消息真实 ID */
    real_id: number;
    /** object - 发送人信息，同 消息事件 */
    sender: GroupMessageSender|PrivateMessageSender;
    /** message - 消息内容 */
    message: Message;
}

/** 获取合并转发消息的 请求数据 */
export type GetForwardMsgPostData = {
    /** string - 合并转发 ID */
    id: string;
}
/** 获取合并转发消息的 响应数据 */
export type GetForwardMsgRespData = {
    /** message - 消息内容，使用 消息的数组格式 表示，数组中的消息段全部为 node 消息段 */
    message: Message;
}

/** 发送好友赞的 请求数据 */
export type SendLikePostData = {
    /** number - 对方 QQ 号 */
    user_id: number;
    /** number - 赞的次数，每个好友每天最多 10 次 默认 1 */
    times?: number;
}

/** 群组踢人的 请求数据 */
export type SetGroupKickPostData = {
    /** number - 群号 */
    group_id: number;
    /** number - 要踢的 QQ 号 */
    user_id: number;
    /** boolean - 拒绝此人的加群请求 默认 false */
    reject_add_request?: boolean;
}

/** 群组单人禁言的 请求数据 */
export type SetGroupBanPostData = {
    /** number - 群号 */
    group_id: number;
    /** number - 要禁言的 QQ 号 */
    user_id: number;
    /** number - 禁言时长，单位秒，0 表示取消禁言 默认 30 * 60 */
    duration?: number;
}

/** 群组匿名用户禁言的 请求数据 */
export type SetGroupAnonymousBanPostData = {
    /** number - 群号 */
    group_id: number;
    /** object - 可选，要禁言的匿名用户对象 (群消息上报的 anonymous 字段)  */
    anonymous?: GroupMessageAnonymous;
    /** string - 可选，要禁言的匿名用户的 flag (需从群消息上报的数据中获得)  */
    anonymous_flag?: string;
    /** number - 禁言时长，单位秒，无法取消匿名用户禁言 默认 30 * 60 */
    duration?: number;
}

/** 群组全员禁言的 请求数据 */
export type SetGroupWholeBanPostData = {
    /** number - 群号 */
    group_id: number;
    /** boolean - 是否禁言 默认 true */
    enable?: boolean;
}

/** 群组设置管理员的 请求数据 */
export type SetGroupAdminPostData = {
    /** number - 群号 */
    group_id: number;
    /** number - 要设置管理员的 QQ 号 */
    user_id: number;
    /** boolean - true 为设置，false 为取消 默认 true */
    enable?: boolean;
}

/** 群组匿名的 请求数据 */
export type SetGroupAnonymousPostData = {
    /** number - 群号 */
    group_id: number;
    /** boolean - 是否允许匿名聊天 默认 true */
    enable?: boolean;
}

/** 设置群名片 (群备注) 的 请求数据 */
export type SetGroupCardPostData = {
    /** number - 群号 */
    group_id: number;
    /** number - 要设置的 QQ 号 */
    user_id: number;
    /** string - 群名片内容，不填或空字符串表示删除群名片 默认 空 */
    card?: string;
}

/** 设置群名的 请求数据 */
export type SetGroupNamePostData = {
    /** number - (int64) 群号 */
    group_id: number;
    /** string - 新群名 */
    group_name: string;
}

/** 退出群组的 请求数据 */
export type SetGroupLeavePostData = {
    /** number - 群号 */
    group_id: number;
    /** boolean - 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散 默认 false */
    is_dismiss?: boolean;
}

/** 设置群组专属头衔的 请求数据 */
export type SetGroupSpecialTitlePostData = {
    /** number - 群号 */
    group_id: number;
    /** number - 要设置的 QQ 号 */
    user_id: number;
    /** string - 专属头衔，不填或空字符串表示删除专属头衔 默认 空 */
    special_title?: string;
    /** number - 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试 默认 -1 */
    duration?: number;
}

/** 处理加好友请求的 请求数据 */
export type SetFriendAddRequestPostData = {
    /** string - 加好友请求的 flag (需从上报的数据中获得)  */
    flag: string;
    /** boolean - 是否同意请求 默认 true */
    approve?: boolean;
    /** string - 添加后的好友备注 (仅在同意时有效)  默认 空 */
    remark?: string;
}

/** 处理加群请求／邀请的 请求数据 */
export type SetGroupAddRequestPostData = {
    /** string - 加群请求的 flag (需从上报的数据中获得)  */
    flag: string;
    /** string - add 或 invite，请求类型 (需要和上报消息中的 sub_type 字段相符)  */
    sub_type: string;
    /** boolean - 是否同意请求／邀请 默认 true */
    approve?: boolean;
    /** string - 拒绝理由 (仅在拒绝时有效)  默认 空 */
    reason?: string;
}

/** 获取登录号信息的 响应数据 */
export type GetLoginInfoRespData = {
    /** number - (int64) QQ 号 */
    user_id: number;
    /** string - QQ 昵称 */
    nickname: string;
}

/** 获取陌生人信息的 请求数据 */
export type GetStrangerInfoPostData = {
    /** number - QQ 号 */
    user_id: number;
    /** boolean - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false */
    no_cache?: boolean;
}

/** 获取陌生人信息的 响应数据 */
export type GetStrangerInfoRespData = {
    /** number - (int64) QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 性别，male 或 female 或 unknown */
    sex: string;
    /** number - (int32) 年龄 */
    age: number;
}

/** 获取好友列表的 响应数据 */
export type GetFriendListRespData = {
    /** number - (int64) QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 备注名 */
    remark: string;
}

/** 获取群信息的 请求数据 */
export type GetGroupInfoPostData = {
    /** number - 群号 */
    group_id: number;
    /** boolean - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false */
    no_cache?: boolean;
}
/** 获取群信息的 响应数据 */
export type GetGroupInfoRespData = {
    /** number - (int64) 群号 */
    group_id: number;
    /** string - 群名称 */
    group_name: string;
    /** number - (int32) 成员数 */
    member_count: number;
    /** number - (int32) 最大成员数 (群容量)  */
    max_member_count: number;
}

/** 获取群成员信息的 请求数据 */
export type GetGroupMemberInfoPostData = {
    /** number - 群号 */
    group_id: number;
    /** number - QQ 号 */
    user_id: number;
    /** boolean - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false */
    no_cache?: boolean;
}
/** 获取群成员信息的 响应数据 */
export type GetGroupMemberInfoRespData = {
    /** number - (int64) 群号 */
    group_id: number;
    /** number - (int64) QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 群名片／备注 */
    card: string;
    /** string - 性别，male 或 female 或 unknown */
    sex: string;
    /** number - (int32) 年龄 */
    age: number;
    /** string - 地区 */
    area: string;
    /** number - (int32) 加群时间戳 */
    join_time: number;
    /** number - (int32) 最后发言时间戳 */
    last_sent_time: number;
    /** string - 成员等级 */
    level: string;
    /** string - 角色，owner 或 admin 或 member */
    role: string;
    /** boolean - 是否不良记录成员 */
    unfriendly: boolean;
    /** string - 专属头衔 */
    title: string;
    /** number - (int32) 专属头衔过期时间戳 */
    title_expire_time: number;
    /** boolean - 是否允许修改群名片 */
    card_changeable: boolean;
}

/** 获取群荣誉信息的 请求数据 */
export type GetGroupHonorInfoPostData = {
    /** number - (int64) 群号 */
    group_id: number;
    /** string - 要获取的群荣誉类型，可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据，或传入 all 获取所有数据 */
    type: "talkative"|"performer"|"legend"|"strong_newbie"|"emotion"|"all";
}
/** 获取群荣誉信息的 响应数据 */
export type GetGroupHonorInfoRespData = {
    /** number - (int64) 群号 */
    group_id: number;
    /** object - 当前龙王，仅 type 为 talkative 或 all 时有数据 */
    current_talkative: CurrentTalkative;
    /** array - 历史龙王，仅 type 为 talkative 或 all 时有数据 */
    talkative_list: Array<HonorTalker>;
    /** array - 群聊之火，仅 type 为 performer 或 all 时有数据 */
    performer_list: Array<HonorTalker>;
    /** array - 群聊炽焰，仅 type 为 legend 或 all 时有数据 */
    legend_list: Array<HonorTalker>;
    /** array - 冒尖小春笋，仅 type 为 strong_newbie 或 all 时有数据 */
    strong_newbie_list: Array<HonorTalker>;
    /** array - 快乐之源，仅 type 为 emotion 或 all 时有数据 */
    emotion_list: Array<HonorTalker>;
}

/** CurrentTalkative */
type CurrentTalkative = {
    /** number (int64) - QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 头像 URL */
    avatar: string;
    /** number (int32) - 持续天数 */
    day_count: number;
}

/** HonorTalker*/
type HonorTalker = {
    /** number (int64) - QQ 号 */
    user_id: number;
    /** string - 昵称 */
    nickname: string;
    /** string - 头像 URL */
    avatar: string;
    /** string - 荣誉描述 */
    description: string;
}


/** 获取 Cookies 的 请求数据 */
export type GetCookiesPostData = {
    /** string - 需要获取 cookies 的域名 默认 空 */
    domain?: string;
}
/** 获取 Cookies 的 响应数据 */
export type GetCookiesRespData = {
    /** string - Cookies */
    cookies: string;
}

/** 获取 CSRF Token 的 响应数据 */
export type GetCsrfTokenRespData = {
    /** number - (int32) CSRF Token */
    token: number;
}

/** 获取 QQ 相关接口凭证的 请求数据 */
export type GetCredentialsPostData = {
    /** string - 需要获取 cookies 的域名 默认 空 */
    domain?: string;
}
/** 获取 QQ 相关接口凭证的 响应数据 */
export type GetCredentialsRespData = {
    /** string - Cookies */
    cookies: string;
    /** number - (int32) CSRF Token */
    csrf_token: number;
}

/** 获取语音的 请求数据 */
export type GetRecordPostData = {
    /** string - 收到的语音文件名 (消息段的 file 参数) ，如 0B38145AA44505000B38145AA4450500.silk */
    file: string;
    /** string - 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac */
    out_format: string;
}
/** 获取语音的 响应数据 */
export type GetRecordRespData = {
    /** string - 转换后的语音文件路径，如 /home/somebody/cqhttp/data/record/0B38145AA44505000B38145AA4450500.mp3 */
    file: string;
}

/** 获取图片的 请求数据 */
export type GetImagePostData = {
    /** string - 收到的图片文件名 (消息段的 file 参数) ，如 6B4DE3DFD1BD271E3297859D41C530F5.jpg */
    file: string;
}
/** 获取图片的 响应数据 */
export type GetImageRespData = {
    /** string - 下载后的图片文件路径，如 /home/somebody/cqhttp/data/image/6B4DE3DFD1BD271E3297859D41C530F5.jpg */
    file: string;
}

/** 检查是否可以发送图片的 响应数据 */
export type CanSendImageRespData = {
    /** boolean - 是或否 */
    yes: boolean;
}

/** 检查是否可以发送语音的 响应数据 */
export type CanSendRecordRespData = {
    /** boolean - 是或否 */
    yes: boolean;
}

/** 获取运行状态的 响应数据 */
export type GetStatusRespData = {
    /** boolean - 当前 QQ 在线，null 表示无法查询到在线状态 */
    online: boolean;
    /** boolean - 状态符合预期，意味着各模块正常运行、功能正常，且 QQ 在线 */
    good: boolean;
}

/** 获取版本信息的 响应数据 */
export type GetVersionInfoRespData = {
    /** string - 应用标识，如 mirai-native */
    app_name: string;
    /** string - 应用版本，如 1.2.3 */
    app_version: string;
    /** string - OneBot 标准版本，如 v11 */
    protocol_version: string;
}

/** 重启 OneBot 实现的 请求数据 */
export type SetRestartPostData = {
    /** number - 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右 默认 0 */
    delay?: number;
}

/** 清理缓存的 请求数据 */
export type CleanCachePostData = {}


/**任何动作的 响应数据 */
export type AnyActionRespData =
    | SendPrivateMsgRespData
    | SendGroupMsgRespData
    | SendMsgRespData
    | GetMsgRespData
    | GetForwardMsgRespData
    | GetLoginInfoRespData
    | GetStrangerInfoRespData
    | GetFriendListRespData
    | GetGroupInfoRespData
    | GetGroupMemberInfoRespData
    | GetGroupHonorInfoRespData
    | GetCookiesRespData
    | GetCsrfTokenRespData
    | GetCredentialsRespData
    | GetRecordRespData
    | GetImageRespData
    | CanSendImageRespData
    | CanSendRecordRespData
    | GetStatusRespData
    | GetVersionInfoRespData;

/**基础响应 */
export type ActionResp = {
    /**响应数据 */
    data:AnyActionRespData;
    /**响应码
     * 0    - 正常完成
     * 1    - 异步执行 完成状态未知
     * 1400 - http 400
     * 1401 - http 401
     * 1403 - http 403
     * 1404 - http 404
     */
    retcode:0|1|1400|1401|1403|1404;
    /**响应状态
     * ok     - 正常完成
     * async  - 异步执行 完成状态未知
     * failed - 执行失败
     */
    status:'ok'|'async'|'failed';
}