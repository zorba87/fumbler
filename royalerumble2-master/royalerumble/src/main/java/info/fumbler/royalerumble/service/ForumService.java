package info.fumbler.royalerumble.service;

import info.fumbler.royalerumble.model.Attachment;
import info.fumbler.royalerumble.model.Forum;
import info.fumbler.royalerumble.model.Params;
import info.fumbler.royalerumble.model.Pagination;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface ForumService {

    Pagination makePagination(Params params) throws Exception;

    Forum findOne(long id) throws Exception;

    List<Forum> findList(Pagination pagination) throws Exception;

    boolean createForum(Forum forum, List<MultipartFile> fileList) throws Exception;

    boolean editForum(Forum forum, List<MultipartFile> fileList) throws Exception;

    boolean deleteForum(long id) throws Exception;

    Attachment getAttachment(long attachmentId) throws Exception;

    boolean deleteAttachment(long attachmentId) throws Exception;
}
