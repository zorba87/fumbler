package info.fumbler.royalerumble.dao;


import info.fumbler.royalerumble.model.Comment;
import info.fumbler.royalerumble.model.Member;
import info.fumbler.royalerumble.model.Pagination;
import info.fumbler.royalerumble.model.Params;

import java.util.List;

public interface CommentDao extends BaseDao<Comment, Long> {

    int getCount(long id) throws Exception;

    int getPageCount(Params params) throws Exception;

    List<Comment> selectListReply(Pagination pagination) throws Exception;

    int updateUserName(Member member) throws Exception;

    int deleteAll(long forumId) throws Exception;

}
