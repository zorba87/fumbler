package info.fumbler.royalerumble.dao;

import info.fumbler.royalerumble.model.Attachment;

import java.util.List;

public interface AttachmentDao {

    int getCount(long forumId) throws Exception;

    Attachment selectOne(long id) throws Exception;

    List<Attachment> selectList(long forumId) throws Exception;

    int insert(Attachment attachment) throws Exception;

    int update(Attachment attachment) throws Exception;

    int delete(long id) throws Exception;

    int deleteAll(long forumId) throws Exception;
}
