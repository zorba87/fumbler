package info.fumbler.royalerumble.service;

import info.fumbler.royalerumble.model.Comment;
import info.fumbler.royalerumble.model.Pagination;
import info.fumbler.royalerumble.model.Params;

import java.util.List;
import java.util.Map;

public interface CommentService {

    int totalComment(long id) throws Exception;

    Pagination makePagination(Params params, int perPage, int perBlock) throws Exception;

    Comment findOneComment(long id) throws Exception;

    List<Comment> findListComment(Pagination pagination) throws Exception;

    Map<String, Object> makeModel(Params params) throws Exception;

    List<Comment> findListReply(Pagination pagination) throws Exception;

    boolean createComment(Comment comment) throws Exception;

    boolean editComment(Comment comment) throws Exception;

    boolean deleteComment(long id) throws Exception;

}
