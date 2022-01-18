package info.fumbler.royalerumble.service;

import info.fumbler.royalerumble.model.Friend;

import java.util.List;

public interface FriendService {

    int getCount(long userId) throws Exception;

    Friend getFriend(Friend friend) throws Exception;

    List<Friend> getList(long id) throws Exception;

    boolean create (Friend friend) throws Exception;

}
