package info.fumbler.royalerumble.service;


import info.fumbler.royalerumble.dao.FriendDao;
import info.fumbler.royalerumble.model.Friend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    @Autowired
    FriendDao dao;

    @Override
    public int getCount(long userId) throws Exception {
        return dao.getCount(userId);
    }

    @Override
    public Friend getFriend(Friend friend) throws Exception {
        return dao.selectOne(friend);
    }

    @Override
    public List<Friend> getList(long userId) throws Exception {
        return dao.selectList(userId);
    }

    @Override
    public boolean create(Friend friend) throws Exception {
        return dao.insert(friend) == 1;
    }
}
