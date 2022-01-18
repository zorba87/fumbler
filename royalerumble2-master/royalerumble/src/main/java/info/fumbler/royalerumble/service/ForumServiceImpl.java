package info.fumbler.royalerumble.service;

import info.fumbler.royalerumble.dao.AttachmentDao;
import info.fumbler.royalerumble.dao.CommentDao;
import info.fumbler.royalerumble.dao.ForumDao;
import info.fumbler.royalerumble.model.Attachment;
import info.fumbler.royalerumble.model.Forum;
import info.fumbler.royalerumble.model.Params;
import info.fumbler.royalerumble.model.Pagination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;

@Service
@Slf4j
public class ForumServiceImpl implements ForumService {

    @Autowired
    ForumDao dao;

    @Autowired
    CommentDao commentDao;

    @Autowired
    AttachmentDao attachmentDao;

    @Override
    public Pagination makePagination(Params params) throws Exception {
        int total = dao.getPageCount(params);
        Pagination pagination = new Pagination(params.getPage(), total, 10, 10);
        pagination.setType(params.getType());
        pagination.setSelect(params.getSelect());
        pagination.setKeyword(params.getKeyword());
        return pagination;
    }

    @Override
    public Forum findOne(long id) throws Exception {
        dao.increaseHits(id);
        Forum forum = dao.selectOne(id);
        List<Attachment> list = attachmentDao.selectList(id);
        for (Attachment attachment : list) {
            attachment.setEncode(Base64.getEncoder().encodeToString(attachment.getFileBinary()));
        }
        forum.setAttachmentList(list);
        return forum;
    }

    @Override
    public List<Forum> findList(Pagination pagination) throws Exception {
        return dao.selectList(pagination);
    }

    @Override
    @Transactional
    public boolean createForum(Forum forum, List<MultipartFile> fileList) throws Exception {
        int result = dao.insert(forum);
        attachmentUpload(forum, fileList);
        return result == 1;
    }

    @Override
    @Transactional
    public boolean editForum(Forum forum, List<MultipartFile> fileList) throws Exception {
        int result = dao.update(forum);
        attachmentDao.deleteAll(forum.getId());
        attachmentUpload(forum, fileList);
        return result == 1;
    }

    @Override
    @Transactional
    public boolean deleteForum(long id) throws Exception {
        attachmentDao.deleteAll(id);
        commentDao.deleteAll(id);
        return dao.delete(id) == 1;
    }

    @Override
    public Attachment getAttachment(long attachmentId) throws Exception {
        return attachmentDao.selectOne(attachmentId);
    }

    @Transactional
    public void attachmentUpload(Forum forum, List<MultipartFile> fileList) throws Exception{
        for (MultipartFile file : fileList) {
            if (!file.isEmpty()) {
                forum.setAttachmentCheck(1);
                Attachment attachment = attachmentFactory(forum.getId(), file);
                attachmentDao.insert(attachment);
            } else {
                forum.setAttachmentCheck(0);
            }
        }
        dao.attachmentCheck(forum);
    }


    private Attachment attachmentFactory(long id, MultipartFile file) throws Exception {
        Attachment attachment = new Attachment();
        attachment.setForumId(id);
        attachment.setFileName(file.getOriginalFilename());
        attachment.setFileSize(file.getSize());
        attachment.setMimeType(file.getContentType());
        attachment.setFileBinary(file.getBytes());
        return attachment;
    }

    public boolean deleteAttachment(long attachmentId) throws Exception {
        return attachmentDao.delete(attachmentId) == 1;
    }

}
