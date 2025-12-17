import { GroupMessageAnonymous, Message } from './Event';
import { CanSendImageRespData, CanSendRecordRespData, GetCookiesRespData, GetCredentialsRespData, GetCsrfTokenRespData, GetForwardMsgRespData, GetFriendListRespData, GetGroupHonorInfoRespData, GetGroupInfoRespData, GetGroupMemberInfoRespData, GetImageRespData, GetLoginInfoRespData, GetMsgRespData, GetRecordRespData, GetStatusRespData, GetStrangerInfoRespData, GetVersionInfoRespData, SendGroupMsgRespData, SendMsgRespData, SendPrivateMsgRespData } from './RESTApi';
/**OneBot11+http 协议发信器 */
export declare class OneBotSender {
    /**目标地址 */
    private _host;
    /**目标端口 */
    private _port;
    /**
     * @param host - 目标地址
     * @param port - 目标端口
     */
    constructor(host: string, port: number);
    /**发送请求 */
    private post;
    /**发送私聊消息
     * @param user_id     - 对方 QQ 号
     * @param message     - 要发送的内容
     * @param auto_escape - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    sendPrivateMsg(user_id: number, message: Message, auto_escape?: boolean): Promise<SendPrivateMsgRespData>;
    /** 发送群消息
     * @param group_id     - 群号
     * @param message      - 要发送的内容
     * @param auto_escape  - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    sendGroupMsg(group_id: number, message: Message, auto_escape?: boolean): Promise<SendGroupMsgRespData>;
    /** 发送消息
     * @param message_type - 消息类型，支持 private、group，分别对应私聊、群组，如不传入，则根据传入的 *_id 参数判断
     * @param user_id      - 对方 QQ 号 (消息类型为 private 时需要)
     * @param group_id     - 群号 (消息类型为 group 时需要)
     * @param message      - 要发送的内容
     * @param auto_escape  - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    sendMsg(message_type: string, user_id: number, group_id: number, message: Message, auto_escape?: boolean): Promise<SendMsgRespData>;
    /** 撤回消息
     * @param message_id - (int32) 消息 ID
     */
    deleteMsg(message_id: number): Promise<null>;
    /** 获取消息
     * @param message_id - (int32) 消息 ID
     */
    getMsg(message_id: number): Promise<GetMsgRespData>;
    /** 获取合并转发消息
     * @param id - 合并转发 ID
     */
    getForwardMsg(id: string): Promise<GetForwardMsgRespData>;
    /** 发送好友赞
     * @param user_id - 对方 QQ 号
     * @param times   - 赞的次数，每个好友每天最多 10 次 默认 1
     */
    sendLike(user_id: number, times?: number): Promise<null>;
    /** 群组踢人
     * @param group_id           - 群号
     * @param user_id            - 要踢的 QQ 号
     * @param reject_add_request - 拒绝此人的加群请求 默认 false
     */
    setGroupKick(group_id: number, user_id: number, reject_add_request?: boolean): Promise<null>;
    /** 群组单人禁言
     * @param group_id - 群号
     * @param user_id  - 要禁言的 QQ 号
     * @param duration - 禁言时长，单位秒，0 表示取消禁言 默认 30 * 60
     */
    setGroupBan(group_id: number, user_id: number, duration?: number): Promise<null>;
    /** 群组匿名用户禁言
     * @param group_id       - 群号
     * @param anonymous      - 可选，要禁言的匿名用户对象 (群消息上报的 anonymous 字段)
     * @param anonymous_flag - 可选，要禁言的匿名用户的 flag (需从群消息上报的数据中获得)
     * @param duration       - 禁言时长，单位秒，无法取消匿名用户禁言 默认 30 * 60
     */
    setGroupAnonymousBan(group_id: number, anonymous?: GroupMessageAnonymous, anonymous_flag?: string, duration?: number): Promise<null>;
    /** 群组全员禁言
     * @param group_id - 群号
     * @param enable   - 是否禁言 默认 true
     */
    setGroupWholeBan(group_id: number, enable?: boolean): Promise<null>;
    /** 群组设置管理员
     * @param group_id - 群号
     * @param user_id  - 要设置管理员的 QQ 号
     * @param enable   - true 为设置，false 为取消 默认 true
     */
    setGroupAdmin(group_id: number, user_id: number, enable?: boolean): Promise<null>;
    /** 群组匿名
     * @param group_id - 群号
     * @param enable   - 是否允许匿名聊天 默认 true
     */
    setGroupAnonymous(group_id: number, enable?: boolean): Promise<null>;
    /** 设置群名片 (群备注)
     * @param group_id - 群号
     * @param user_id  - 要设置的 QQ 号
     * @param card     - 群名片内容，不填或空字符串表示删除群名片 默认 空
     */
    setGroupCard(group_id: number, user_id: number, card?: string): Promise<null>;
    /** 设置群名
     * @param group_id   - (int64) 群号
     * @param group_name - 新群名
     */
    setGroupName(group_id: number, group_name: string): Promise<null>;
    /** 退出群组
     * @param group_id   - 群号
     * @param is_dismiss - 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散 默认 false
     */
    setGroupLeave(group_id: number, is_dismiss?: boolean): Promise<null>;
    /** 设置群组专属头衔
     * @param group_id      - 群号
     * @param user_id       - 要设置的 QQ 号
     * @param special_title - 专属头衔，不填或空字符串表示删除专属头衔 默认 空
     * @param duration      - 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试 默认 -1
     */
    setGroupSpecialTitle(group_id: number, user_id: number, special_title?: string, duration?: number): Promise<null>;
    /** 处理加好友请求
     * @param flag    - 加好友请求的 flag (需从上报的数据中获得)
     * @param approve - 是否同意请求 默认 true
     * @param remark  - 添加后的好友备注 (仅在同意时有效)  默认 空
     */
    setFriendAddRequest(flag: string, approve?: boolean, remark?: string): Promise<null>;
    /** 处理加群请求／邀请
     * @param flag    - 加群请求的 flag (需从上报的数据中获得)
     * @param sub_type - add 或 invite，请求类型 (需要和上报消息中的 sub_type 字段相符)
     * @param approve - 是否同意请求／邀请 默认 true
     * @param reason  - 拒绝理由 (仅在拒绝时有效)  默认 空
     */
    setGroupAddRequest(flag: string, sub_type: string, approve?: boolean, reason?: string): Promise<null>;
    /** 获取登录号信息 */
    getLoginInfo(): Promise<GetLoginInfoRespData>;
    /** 获取陌生人信息
     * @param user_id  - QQ 号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    getStrangerInfo(user_id: number, no_cache?: boolean): Promise<GetStrangerInfoRespData>;
    /** 获取好友列表 */
    getFriendList(): Promise<GetFriendListRespData>;
    /** 获取群信息
     * @param group_id - 群号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    getGroupInfo(group_id: number, no_cache?: boolean): Promise<GetGroupInfoRespData>;
    /** 获取群成员信息
     * @param group_id - 群号
     * @param user_id  - QQ 号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    getGroupMemberInfo(group_id: number, user_id: number, no_cache?: boolean): Promise<GetGroupMemberInfoRespData>;
    /** 获取群荣誉信息
     * @param group_id - (int64) 群号
     * @param type     - 要获取的群荣誉类型，可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据，或传入 all 获取所有数据
     */
    getGroupHonorInfo(group_id: number, type: "talkative" | "performer" | "legend" | "strong_newbie" | "emotion" | "all"): Promise<GetGroupHonorInfoRespData>;
    /** 获取 Cookies
     * @param domain - 需要获取 cookies 的域名 默认 空
     */
    getCookies(domain?: string): Promise<GetCookiesRespData>;
    /** 获取 CSRF Token */
    getCsrfToken(): Promise<GetCsrfTokenRespData>;
    /** 获取 QQ 相关接口凭证
     * @param domain - 需要获取 cookies 的域名 默认 空
     */
    getCredentials(domain?: string): Promise<GetCredentialsRespData>;
    /** 获取语音
     * @param file       - 收到的语音文件名 (消息段的 file 参数) ，如 0B38145AA44505000B38145AA4450500.silk
     * @param out_format - 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
     */
    getRecord(file: string, out_format: string): Promise<GetRecordRespData>;
    /** 获取图片
     * @param file - 收到的图片文件名 (消息段的 file 参数) ，如 6B4DE3DFD1BD271E3297859D41C530F5.jpg
     */
    getImage(file: string): Promise<GetImageRespData>;
    /** 检查是否可以发送图片 */
    canSendImage(): Promise<CanSendImageRespData>;
    /** 检查是否可以发送语音 */
    canSendRecord(): Promise<CanSendRecordRespData>;
    /** 获取运行状态 */
    getStatus(): Promise<GetStatusRespData>;
    /** 获取版本信息 */
    getVersionInfo(): Promise<GetVersionInfoRespData>;
    /** 重启 OneBot 实现
     * @param delay - 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右 默认 0
     */
    setRestart(delay?: number): Promise<null>;
    /** 清理缓存 */
    cleanCache(): Promise<null>;
}
