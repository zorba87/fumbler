package info.fumbler.royalerumble.service;

import info.fumbler.royalerumble.dao.CommentDao;
import info.fumbler.royalerumble.model.Comment;
import info.fumbler.royalerumble.model.Pagination;
import info.fumbler.royalerumble.model.Params;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public int totalComment(long forumId) throws Exception {
        return dao.getCount(forumId);
    }

    @Override
    public Pagination makePagination(Params params, int perPage, int perBlock) throws Exception {
        int total = dao.getPageCount(params);
        Pagination pagination = new Pagination(params.getPage(), total, perPage, perBlock);
        pagination.setForumId(params.getForumId());
        pagination.setSort(params.getSort());
        pagination.setCommentRef(params.getRef());
        return pagination;
    }

    @Override
    public Comment findOneComment(long id) throws Exception {
        return dao.selectOne(id);
    }


    @Override
    public List<Comment> findListComment(Pagination pagination) throws Exception {
        return dao.selectList(pagination);
    }

    @Override
    public Map<String, Object> makeModel(Params params) throws Exception {
        Map<String, Object> model = new HashMap<>();
        int total = totalComment(params.getForumId());
        Pagination pagination;
        List<Comment> list;
        if(params.getRef() == 0) {
            pagination = makePagination(params, 20,1);
            list = findListComment(pagination);
        } else {
            pagination = makePagination(params, 30,5);
            list = findListReply(pagination);
        }
        model.put("pagination", pagination);
        model.put("list", list);
        model.put("total", total);
        return model;
    }


    @Override
    public List<Comment> findListReply(Pagination pagination) throws Exception {
        return dao.selectListReply(pagination);
    }

    @Override
    @Transactional
    public boolean createComment(Comment comment) throws Exception {
        return dao.insert(comment) == 1;
    }

    @Override
    @Transactional
    public boolean editComment(Comment comment) throws Exception {
        return false;
    }

    @Override
    @Transactional
    public boolean deleteComment(long id) throws Exception {
        return false;
    }
}
