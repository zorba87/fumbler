package info.fumbler.royalerumble.controller;

import info.fumbler.royalerumble.model.Avatar;
import info.fumbler.royalerumble.model.Member;
import info.fumbler.royalerumble.service.MemberService;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    MemberService service;

    @GetMapping(value = "/account")
    public String accountInfo(Avatar avatar, Member member, HttpSession session, Model model){
        model.addAttribute("account", "active");
        return "account/info";
    }

    @PostMapping("/account")
    public String accountInfoSubmit(Member member, BindingResult result,
                                    HttpSession session, Model model,
                                    RedirectAttributes redirectAttributes) throws Exception{
        Member sessionMember = (Member)session.getAttribute("USER");
        if(result.hasErrors()){
            return "account/info";
        }

        member.setId(sessionMember.getId());
        if(!service.memberUpdate(member)){
            model.addAttribute("result", "다시 시도해 주세요.");
            return "account/info";
        }
        service.writerUpdate(member);
        Member newMember = service.getMember(sessionMember.getEmail());
        session.setAttribute("USER", newMember);
        redirectAttributes.addFlashAttribute("result", "변경 완료");
        return "redirect:/profile/account";
    }

    @ResponseBody
    @GetMapping(value = "/avatar/{userName}")
    public ResponseEntity getAvatar(@PathVariable String userName) throws Exception{
        HttpHeaders headers = new HttpHeaders();
        Avatar avatar = service.findAvatar(userName);
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(avatar.getImage(), headers, HttpStatus.OK);
    }


    @PostMapping("/avatar/upload")
    public String changeAvatar(@RequestParam("avatar") MultipartFile mFile,
                               HttpSession session, RedirectAttributes redirectAttributes) throws Exception{
        Member member = (Member) session.getAttribute("USER");
        if(mFile != null && !mFile.isEmpty()){
            service.avatarUpdate(new Avatar(member.getUserName(), mFile.getBytes()));
            redirectAttributes.addFlashAttribute("result", "변경 완료");
        }
        return "redirect:/profile/account";
    }


    @GetMapping(value = "/password")
    public String changePassword(Member member, HttpSession session, Model model){
        model.addAttribute("account", "active");
        return "account/password";
    }

    @PostMapping("/password")
    public String changePasswordSubmit(Member member, BindingResult result,
                                       HttpSession session, Model model,
                                       RedirectAttributes redirectAttributes) throws Exception{
        Member sessionMember = (Member)session.getAttribute("USER");
        if(result.hasErrors()){
            return "account/password";
        }
        member.setId(sessionMember.getId());
        if(!service.passwordUpdate(member)){
            model.addAttribute("result", "기존 비밀번호가 맞지 않습니다.");
            return "account/password";
        }
        Member newMember = service.getMember(sessionMember.getEmail());
        session.setAttribute("USER", newMember);
        redirectAttributes.addFlashAttribute("result", "변경 완료");
        return "redirect:/profile/password";
    }

}
