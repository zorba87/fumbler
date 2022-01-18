package info.fumbler.royalerumble.controller;

import info.fumbler.royalerumble.model.*;
import info.fumbler.royalerumble.service.ForumService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;
@Slf4j
@Controller
@RequestMapping("/forums")
public class ForumController {

    @Autowired
    ForumService service;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String getForumList(@ModelAttribute Params params, Model model) throws Exception {
        Pagination pagination = service.makePagination(params);
        List<Forum> list = service.findList(pagination);
        model.addAttribute("pagination", pagination);
        model.addAttribute("list", list);
        model.addAttribute("forum", "active");
        return "forums/list";
    }

    @RequestMapping(value = "/forum/{id}", method = RequestMethod.GET)
    public String getView(@PathVariable("id") long id, Model model) throws Exception {
        //TODO 추천 기능 넣기
        Forum forum = service.findOne(id);
        model.addAttribute("forum", forum);
        return "forums/forum";
    }

    @RequestMapping(value = "/write", method = RequestMethod.GET)
    public String write(@RequestParam(value = "type", defaultValue = "free") String type,
                          Forum forum, Model model){
        model.addAttribute("type", type);
        return "forums/write";
    }

    //TODO 업로드를 이용한 서버 공격 생각해보기
    @RequestMapping(value = "/write", method = RequestMethod.POST)
    public String writeSubmit(@Valid Forum forum, BindingResult result,
                              MultipartHttpServletRequest mRequest) throws Exception {
        if(result.hasErrors()){
            return "forums/write";
        }
        List<MultipartFile> fileList = mRequest.getFiles("files");
        if(!service.createForum(forum, fileList)){
            return "forums/write";
        }
        return "redirect:/forums/list?type=" + forum.getType();
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
    public String edit(@PathVariable long id,
                            Forum forum, HttpSession session, Model model) throws Exception {
        Member member = (Member) session.getAttribute("USER");
        Forum editForum = service.findOne(id);
        if(!editForum.userNameMatching(member.getUserName())){
            return "redirect:/";
        }
        model.addAttribute("forum", editForum);
        return "forums/update";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public String editSubmit(@PathVariable long id, @Valid Forum forum,
                             BindingResult result, MultipartHttpServletRequest mRequest) throws Exception{
        if(result.hasErrors()) {
            return "forums/update";
        }
        List<MultipartFile> fileList = mRequest.getFiles("files");
        if(!service.editForum(forum, fileList)){
            return "forums/update";
        }
        return "redirect:/forums/forum/" + id;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
    public String deleteSubmit(@PathVariable long id, HttpSession session) throws Exception{
        Member member = (Member) session.getAttribute("USER");
        Forum forum = service.findOne(id);
        if(!forum.userNameMatching(member.getUserName())) {
            return "redirect:/";
        }
        if(!service.deleteForum(id)) {
            return "forums/forum";
        }
        return "redirect:/forums/list?type=" + forum.getType();
    }

    @ResponseBody
    @RequestMapping(value = "/image/{attachmentId}", method = RequestMethod.GET)
    public ResponseEntity imageView(@PathVariable long attachmentId, Model model) throws Exception{
        Attachment attachment = service.getAttachment(attachmentId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(attachment.getFileBinary(), headers, HttpStatus.OK);
    }
}
