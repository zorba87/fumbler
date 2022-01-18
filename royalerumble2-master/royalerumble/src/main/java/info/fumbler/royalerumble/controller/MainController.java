package info.fumbler.royalerumble.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping(value = "/")
    public String home (Model model) {
        //TODO URL 기억하기
        model.addAttribute("home", "active");
        return "index";
    }

}
