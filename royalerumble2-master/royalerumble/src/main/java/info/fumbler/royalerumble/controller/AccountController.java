package info.fumbler.royalerumble.controller;

import info.fumbler.royalerumble.model.Authenticate;
import info.fumbler.royalerumble.model.Member;
import info.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.StringTokenizer;

@Controller
@Slf4j
public class AccountController {

    @Autowired
    MemberService service;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(@ModelAttribute("url") String url,
                        @CookieValue(value = "_USER_EMAIL", required = false) Cookie cookie,
                        Authenticate authenticate, HttpServletRequest request, Model model) {
        if (url != null && !url.isEmpty()) {
            //인터셉터일 경우
            authenticate.setInterceptorMessage("로그인이 필요한 서비스입니다.");
        } else {
            //로그인 버튼을 누른경우
            url = urlTokenizer(request.getHeader("referer"));
        }
        if (cookie != null) {
            log.info("쿠키에 저장된 값은 ?" + cookie.getValue());
            authenticate.setEmail(cookie.getValue());
            authenticate.setRemember(true);
        }
        authenticate.setUrl(url);
        model.addAttribute("login", "active");
        return "account/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginSubmit(@Valid Authenticate authenticate,
                              BindingResult result,
                              HttpServletResponse response,
                              HttpSession session) throws Exception {
        String url = authenticate.getUrl();
        if (result.hasErrors()) {
            return "account/login";
        }
        Member member = service.memberLogin(authenticate);
        if (member == null) {
            result.reject("loginFail", "아이디 또는 비밀번호가 틀립니다.");
            return "account/login";
        }

        Cookie cookie = new Cookie("_USER_EMAIL", member.getEmail());
        cookie.setPath("/");
        if (authenticate.isRemember()) {
            cookie.setMaxAge(60 * 60 * 24 * 365);
            log.info("쿠키에 저장된 값은 ?" + cookie.getValue());
        } else {
            cookie.setMaxAge(0);
        }
        response.addCookie(cookie);
        session.setAttribute("USER", member);
        if (url != null && !url.isEmpty()) {
            return "redirect:" + url;
        }
        return "redirect:/";
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @RequestMapping(value = "/join", method = RequestMethod.GET)
    public String join(Member member, Model model) {
        model.addAttribute("join", "active");
        return "account/join";
    }

    @RequestMapping(value = "/join", method = RequestMethod.POST)
    public String joinSubmit(@Valid Member member,
                             BindingResult result,
                             RedirectAttributes redirectAttributes) throws Exception {
        if (result.hasErrors()) {
            return "account/join";
        }
        if (!service.memberJoin(member)) {
            return "account/join";
        }
        redirectAttributes.addFlashAttribute("member", member);
        return "account/success";
    }

    @ResponseBody
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public boolean duplication(
            @RequestParam(value = "email", defaultValue = "null") String email,
            @RequestParam(value = "name", defaultValue = "null") String userName) throws Exception {
        return service.duplication(email, userName);
    }


//    private String urlTokenizer(String url) {
//        //TODO 정규표현식도 생각해보기...
//        //TODO 수정 필요...
//        StringBuilder rootURL= new StringBuilder();
//        String requestURI = "";
//        if(url != null && !url.isEmpty()) {
//            StringTokenizer tokenizer = new StringTokenizer(url, "/");
//            // "/" 네번째 까지만 자르기
//            for (int i = 0; i < 4; i++) {
//                if (i != 3) {
//                    rootURL.append(tokenizer.nextToken());
//                } else if(tokenizer.hasMoreTokens()){
//                    requestURI = tokenizer.nextToken();
//                }
//            }
//            if(requestURI.equals("/") || requestURI.equals("login") || requestURI.equals("join")){
//                return "/";
//            }
//            return url.substring(rootURL.toString().length() + 3);
//        }
//        return "/";
//    }
//    직접연결
    private String urlTokenizer(String url) {
        //TODO 정규표현식도 생각해보기...
        //TODO 수정 필요...
        StringBuilder rootURL = new StringBuilder();
        String requestURI = "";
        if (url != null && !url.isEmpty()) {
            StringTokenizer tokenizer = new StringTokenizer(url, "/");
            // "/" 네번째 까지만 자르기
            for (int i = 0; i < 3; i++) {
                if (i != 2) {
                    rootURL.append(tokenizer.nextToken());
                } else if (tokenizer.hasMoreTokens()) {
                    requestURI = tokenizer.nextToken();
                }
            }
            if (requestURI.equals("/") || requestURI.equals("login") || requestURI.equals("join")) {
                return "/";
            }
            return url.substring(rootURL.toString().length() + 2);
        }
        return "/";
    }

}
