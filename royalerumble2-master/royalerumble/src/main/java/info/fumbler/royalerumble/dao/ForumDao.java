package info.fumbler.royalerumble.dao;

import info.fumbler.royalerumble.model.Forum;
import info.fumbler.royalerumble.model.Member;
import info.fumbler.royalerumble.model.Params;


public interface ForumDao extends BaseDao<Forum, Long> {

    int increaseHits(long id) throws Exception;

    int getPageCount(Params params) throws Exception;

    int updateUserName(Member member) throws Exception;

    int attachmentCheck(Forum forum) throws Exception;


}
