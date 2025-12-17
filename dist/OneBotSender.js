"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneBotSender = void 0;
const http_1 = __importDefault(require("http"));
const utils_1 = require("@zwa73/utils");
const Constant_1 = require("./Constant");
/**OneBot11+http 协议发信器 */
class OneBotSender {
    /**目标地址 */
    _host;
    /**目标端口 */
    _port;
    /**
     * @param host - 目标地址
     * @param port - 目标端口
     */
    constructor(host, port) {
        this._host = host;
        this._port = port;
    }
    /**发送请求 */
    async post(path, data) {
        const json = JSON.stringify(data);
        const options = {
            host: this._host,
            port: this._port,
            path: `/${path}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve, rejecte) => {
            const req = http_1.default.request(options, (res) => {
                let rawdata = "";
                res.setEncoding('utf8');
                res.on('data', (data) => rawdata += data);
                res.on('error', err => {
                    utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotSender 接收反馈错误:`, err);
                    resolve(null);
                });
                res.on('end', () => {
                    try {
                        if (rawdata != "" && rawdata != null)
                            resolve(JSON.parse(rawdata).data);
                        resolve(null);
                    }
                    catch (e) {
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotSender.post 错误:`, e, "rawdata:", rawdata);
                        resolve(null);
                    }
                });
            });
            req.on('error', err => {
                utils_1.SLogger.warn(`${Constant_1.LogPrefix}发送请求错误:`, err);
                resolve(null);
            });
            req.write(json);
            req.end();
        });
    }
    /**发送私聊消息
     * @param user_id     - 对方 QQ 号
     * @param message     - 要发送的内容
     * @param auto_escape - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    async sendPrivateMsg(user_id, message, auto_escape) {
        return this.post('send_private_msg', { user_id, message, auto_escape });
    }
    /** 发送群消息
     * @param group_id     - 群号
     * @param message      - 要发送的内容
     * @param auto_escape  - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    async sendGroupMsg(group_id, message, auto_escape) {
        return this.post('send_group_msg', { group_id, message, auto_escape });
    }
    /** 发送消息
     * @param message_type - 消息类型，支持 private、group，分别对应私聊、群组，如不传入，则根据传入的 *_id 参数判断
     * @param user_id      - 对方 QQ 号 (消息类型为 private 时需要)
     * @param group_id     - 群号 (消息类型为 group 时需要)
     * @param message      - 要发送的内容
     * @param auto_escape  - 消息内容是否作为纯文本发送 (即不解析 CQ 码) , 只在 message 字段是字符串时有效 默认 false
     */
    async sendMsg(message_type, user_id, group_id, message, auto_escape) {
        return this.post('send_msg', { message_type, user_id, group_id, message, auto_escape });
    }
    /** 撤回消息
     * @param message_id - (int32) 消息 ID
     */
    async deleteMsg(message_id) {
        return this.post('delete_msg', { message_id });
    }
    /** 获取消息
     * @param message_id - (int32) 消息 ID
     */
    async getMsg(message_id) {
        return this.post('get_msg', { message_id });
    }
    /** 获取合并转发消息
     * @param id - 合并转发 ID
     */
    async getForwardMsg(id) {
        return this.post('get_forward_msg', { id });
    }
    /** 发送好友赞
     * @param user_id - 对方 QQ 号
     * @param times   - 赞的次数，每个好友每天最多 10 次 默认 1
     */
    async sendLike(user_id, times) {
        return this.post('send_like', { user_id, times });
    }
    /** 群组踢人
     * @param group_id           - 群号
     * @param user_id            - 要踢的 QQ 号
     * @param reject_add_request - 拒绝此人的加群请求 默认 false
     */
    async setGroupKick(group_id, user_id, reject_add_request) {
        return this.post('set_group_kick', { group_id, user_id, reject_add_request });
    }
    /** 群组单人禁言
     * @param group_id - 群号
     * @param user_id  - 要禁言的 QQ 号
     * @param duration - 禁言时长，单位秒，0 表示取消禁言 默认 30 * 60
     */
    async setGroupBan(group_id, user_id, duration) {
        return this.post('set_group_ban', { group_id, user_id, duration });
    }
    /** 群组匿名用户禁言
     * @param group_id       - 群号
     * @param anonymous      - 可选，要禁言的匿名用户对象 (群消息上报的 anonymous 字段)
     * @param anonymous_flag - 可选，要禁言的匿名用户的 flag (需从群消息上报的数据中获得)
     * @param duration       - 禁言时长，单位秒，无法取消匿名用户禁言 默认 30 * 60
     */
    async setGroupAnonymousBan(group_id, anonymous, anonymous_flag, duration) {
        return this.post('set_group_anonymous_ban', { group_id, anonymous, anonymous_flag, duration });
    }
    /** 群组全员禁言
     * @param group_id - 群号
     * @param enable   - 是否禁言 默认 true
     */
    async setGroupWholeBan(group_id, enable) {
        return this.post('set_group_whole_ban', { group_id, enable });
    }
    /** 群组设置管理员
     * @param group_id - 群号
     * @param user_id  - 要设置管理员的 QQ 号
     * @param enable   - true 为设置，false 为取消 默认 true
     */
    async setGroupAdmin(group_id, user_id, enable) {
        return this.post('set_group_admin', { group_id, user_id, enable });
    }
    /** 群组匿名
     * @param group_id - 群号
     * @param enable   - 是否允许匿名聊天 默认 true
     */
    async setGroupAnonymous(group_id, enable) {
        return this.post('set_group_anonymous', { group_id, enable });
    }
    /** 设置群名片 (群备注)
     * @param group_id - 群号
     * @param user_id  - 要设置的 QQ 号
     * @param card     - 群名片内容，不填或空字符串表示删除群名片 默认 空
     */
    async setGroupCard(group_id, user_id, card) {
        return this.post('set_group_card', { group_id, user_id, card });
    }
    /** 设置群名
     * @param group_id   - (int64) 群号
     * @param group_name - 新群名
     */
    async setGroupName(group_id, group_name) {
        return this.post('set_group_name', { group_id, group_name });
    }
    /** 退出群组
     * @param group_id   - 群号
     * @param is_dismiss - 是否解散，如果登录号是群主，则仅在此项为 true 时能够解散 默认 false
     */
    async setGroupLeave(group_id, is_dismiss) {
        return this.post('set_group_leave', { group_id, is_dismiss });
    }
    /** 设置群组专属头衔
     * @param group_id      - 群号
     * @param user_id       - 要设置的 QQ 号
     * @param special_title - 专属头衔，不填或空字符串表示删除专属头衔 默认 空
     * @param duration      - 专属头衔有效期，单位秒，-1 表示永久，不过此项似乎没有效果，可能是只有某些特殊的时间长度有效，有待测试 默认 -1
     */
    async setGroupSpecialTitle(group_id, user_id, special_title, duration) {
        return this.post('set_group_special_title', { group_id, user_id, special_title, duration });
    }
    /** 处理加好友请求
     * @param flag    - 加好友请求的 flag (需从上报的数据中获得)
     * @param approve - 是否同意请求 默认 true
     * @param remark  - 添加后的好友备注 (仅在同意时有效)  默认 空
     */
    async setFriendAddRequest(flag, approve, remark) {
        return this.post('set_friend_add_request', { flag, approve, remark });
    }
    /** 处理加群请求／邀请
     * @param flag    - 加群请求的 flag (需从上报的数据中获得)
     * @param sub_type - add 或 invite，请求类型 (需要和上报消息中的 sub_type 字段相符)
     * @param approve - 是否同意请求／邀请 默认 true
     * @param reason  - 拒绝理由 (仅在拒绝时有效)  默认 空
     */
    async setGroupAddRequest(flag, sub_type, approve, reason) {
        return this.post('set_group_add_request', { flag, sub_type, approve, reason });
    }
    /** 获取登录号信息 */
    async getLoginInfo() {
        return this.post('get_login_info', {});
    }
    /** 获取陌生人信息
     * @param user_id  - QQ 号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    async getStrangerInfo(user_id, no_cache) {
        return this.post('get_stranger_info', { user_id, no_cache });
    }
    /** 获取好友列表 */
    async getFriendList() {
        return this.post('get_friend_list', {});
    }
    /** 获取群信息
     * @param group_id - 群号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    async getGroupInfo(group_id, no_cache) {
        return this.post('get_group_info', { group_id, no_cache });
    }
    /** 获取群成员信息
     * @param group_id - 群号
     * @param user_id  - QQ 号
     * @param no_cache - 是否不使用缓存 (使用缓存可能更新不及时，但响应更快)  默认 false
     */
    async getGroupMemberInfo(group_id, user_id, no_cache) {
        return this.post('get_group_member_info', { group_id, user_id, no_cache });
    }
    /** 获取群荣誉信息
     * @param group_id - (int64) 群号
     * @param type     - 要获取的群荣誉类型，可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据，或传入 all 获取所有数据
     */
    async getGroupHonorInfo(group_id, type) {
        return this.post('get_group_honor_info', { group_id, type });
    }
    /** 获取 Cookies
     * @param domain - 需要获取 cookies 的域名 默认 空
     */
    async getCookies(domain) {
        return this.post('get_cookies', { domain });
    }
    /** 获取 CSRF Token */
    async getCsrfToken() {
        return this.post('get_csrf_token', {});
    }
    /** 获取 QQ 相关接口凭证
     * @param domain - 需要获取 cookies 的域名 默认 空
     */
    async getCredentials(domain) {
        return this.post('get_credentials', { domain });
    }
    /** 获取语音
     * @param file       - 收到的语音文件名 (消息段的 file 参数) ，如 0B38145AA44505000B38145AA4450500.silk
     * @param out_format - 要转换到的格式，目前支持 mp3、amr、wma、m4a、spx、ogg、wav、flac
     */
    async getRecord(file, out_format) {
        return this.post('get_record', { file, out_format });
    }
    /** 获取图片
     * @param file - 收到的图片文件名 (消息段的 file 参数) ，如 6B4DE3DFD1BD271E3297859D41C530F5.jpg
     */
    async getImage(file) {
        return this.post('get_image', { file });
    }
    /** 检查是否可以发送图片 */
    async canSendImage() {
        return this.post('can_send_image', {});
    }
    /** 检查是否可以发送语音 */
    async canSendRecord() {
        return this.post('can_send_record', {});
    }
    /** 获取运行状态 */
    async getStatus() {
        return this.post('get_status', {});
    }
    /** 获取版本信息 */
    async getVersionInfo() {
        return this.post('get_version_info', {});
    }
    /** 重启 OneBot 实现
     * @param delay - 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右 默认 0
     */
    async setRestart(delay) {
        return this.post('set_restart', { delay });
    }
    /** 清理缓存 */
    async cleanCache() {
        return this.post('clean_cache', {});
    }
}
exports.OneBotSender = OneBotSender;
