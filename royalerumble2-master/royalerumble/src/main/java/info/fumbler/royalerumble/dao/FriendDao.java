package info.fumbler.royalerumble.dao;

import info.fumbler.royalerumble.model.Friend;

import java.util.List;

public interface FriendDao extends BaseDao<Friend, Long>{

    Friend selectOne(Friend friend)throws Exception;

    int getCount(long userId)throws Exception;

    List<Friend> selectList(long userId)throws Exception;
}
