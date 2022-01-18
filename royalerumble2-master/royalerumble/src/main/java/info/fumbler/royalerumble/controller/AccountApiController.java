package info.fumbler.royalerumble.controller;

import info.fumbler.royalerumble.model.Authenticate;
import info.fumbler.royalerumble.model.Member;
import info.fumbler.royalerumble.model.Message;
import info.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/account")
public class AccountApiController {

    @Autowired
    MemberService service;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid Authenticate authenticate,
                                BindingResult result) throws Exception {
        Message message = new Message();
        if(result.hasErrors()) {
            message.setMessage("올바르게 입력해주세요.");
            message.setCode("bad.request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        Member member = service.memberLogin(authenticate);
        if(member == null) {
            message.setMessage("아이디 또는 비밀번호가 틀립니다.");
            message.setCode("bad.request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

}
