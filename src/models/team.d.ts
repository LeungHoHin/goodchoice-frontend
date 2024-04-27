/**
 * 用户类别
 */
import {UserType} from "./user";

export type TeamType = {
    teamId: number;
    teamName: string;
    teamDescription: string;
    teamExpireTime?: Date;
    teamNum: number;
    teamMaxNum: number;
    teamStatus: number;
    password?: string;
    createTime: Date;
    updateTime: Date;
    leaderId: number;
    leader?:UserType;
};