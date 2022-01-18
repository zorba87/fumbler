package info.fumbler.royalerumble.controller;


import info.fumbler.royalerumble.service.FriendService;
import info.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/sparky")
public class SparkyController {

    @Autowired
    FriendService service;

    @Autowired
    MemberService memberService;

    @GetMapping("/find")
    public ResponseEntity searchList(@RequestParam("name") String userName) throws Exception{
        List<String> list = memberService.findFriend(userName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/friend")
    public ResponseEntity friendAdd(@RequestBody String name) {
        return new ResponseEntity<>(true, HttpStatus.CREATED);
    }

}
