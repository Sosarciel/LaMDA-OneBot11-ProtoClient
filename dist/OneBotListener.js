"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneBotListener = void 0;
const http_1 = __importDefault(require("http"));
const utils_1 = require("@zwa73/utils");
const Event_1 = require("./Event");
const Constant_1 = require("./Constant");
/**OneBot11+http协议监听器 */
class OneBotListener extends utils_1.EventSystem {
    /**监听端口 */
    port;
    constructor(port) {
        super();
        this.port = port;
        http_1.default.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.on('error', (e) => utils_1.SLogger.warn(`${Constant_1.LogPrefix}发送反馈错误:`, e));
            let rawdata = "";
            //每当接收到请求体数据，累加到post中
            req.on('data', (chunk) => rawdata += chunk);
            req.on('error', (e) => utils_1.SLogger.warn(`${Constant_1.LogPrefix}监听请求错误:`, e));
            req.on('end', () => {
                try {
                    const jsonData = JSON.parse(rawdata);
                    this.routeEvent(jsonData, res);
                }
                catch (e) {
                    utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener 数据接收错误:`, e, `数据组为:\n${rawdata}`);
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
    routeEvent(data, res) {
        switch (data.post_type) {
            case 'message':
                switch (data.message_type) {
                    case 'group':
                        this.invokeEvent('GroupMessage', data, new Event_1.GroupMessageQO(res));
                        return;
                    case 'private':
                        this.invokeEvent('PrivateMessage', data, new Event_1.PrivateMessageQO(res));
                        return;
                    default:
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 message_type`, data);
                        return;
                }
            case 'request':
                switch (data.request_type) {
                    case 'friend':
                        this.invokeEvent('FriendRequest', data, new Event_1.FriendRequestQO(res));
                        return;
                    case 'group':
                        this.invokeEvent('GroupRequest', data, new Event_1.GroupRequestQO(res));
                        return;
                    default:
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 request_type`, data);
                        return;
                }
            case 'notice':
                if (data.notice_type != 'notify') {
                    const emap = {
                        "group_upload": 'GroupUpload',
                        "group_admin": 'GroupAdmin',
                        "group_decrease": 'GroupDecrease',
                        "group_increase": 'GroupIncrease',
                        "group_ban": 'GroupBan',
                        "friend_add": 'FriendAdd',
                        "group_recall": 'GroupRecall',
                        "friend_recall": 'FriendRecall',
                        "group_card": 'GroupCard',
                        "offline_file": 'OfflineFile',
                        "client_status": 'ClientStatus',
                        "essence": 'EssenceMessage',
                    };
                    const netype = emap[data.notice_type];
                    if (netype == null) {
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 notice_type`, data);
                        return;
                    }
                    const fixdata = data;
                    this.invokeEvent(netype, fixdata);
                    return;
                }
                else if (data.sub_type != 'poke') {
                    const emap = {
                        "lucky_king": 'GroupLuckyKing',
                        "honor": 'GroupHonor',
                        "title": 'GroupTitle',
                    };
                    const netype = emap[data.sub_type];
                    if (netype == null) {
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 notify sub_type`, data);
                        return;
                    }
                    const fixdata = data;
                    this.invokeEvent(netype, fixdata);
                    return;
                }
                else if (data.sub_type == 'poke') {
                    if ('group_id' in data) {
                        this.invokeEvent('GroupPoke', data);
                        return;
                    }
                    else {
                        this.invokeEvent('FriendPoke', data);
                        return;
                    }
                }
                utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 notice_type`, data);
                return;
            case 'meta_event':
                switch (data.meta_event_type) {
                    case 'heartbeat':
                        this.invokeEvent('HeartbeatMeta', data);
                        return;
                    case 'lifecycle':
                        this.invokeEvent('LifecycleMeta', data);
                        return;
                    default:
                        utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 meta_event_type`, data);
                        return;
                }
            default:
                utils_1.SLogger.warn(`${Constant_1.LogPrefix}OneBotListener.routeEvent 一个预料之外的 post_type`, data);
                return;
        }
    }
}
exports.OneBotListener = OneBotListener;
