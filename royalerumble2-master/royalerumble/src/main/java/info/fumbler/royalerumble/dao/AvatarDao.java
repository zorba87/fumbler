package info.fumbler.royalerumble.dao;

import info.fumbler.royalerumble.model.Avatar;
import info.fumbler.royalerumble.model.Member;

public interface AvatarDao extends BaseDao<Avatar, String> {

    int updateUserName(Member member) throws Exception;
}
