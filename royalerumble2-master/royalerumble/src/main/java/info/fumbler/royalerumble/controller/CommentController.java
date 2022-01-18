package info.fumbler.royalerumble.controller;

import info.fumbler.royalerumble.model.*;
import info.fumbler.royalerumble.model.Comment;
import info.fumbler.royalerumble.model.Message;
import info.fumbler.royalerumble.model.Params;
import info.fumbler.royalerumble.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


//TODO 추천 기능 넣기
@Slf4j
@RestController
@RequestMapping("/api/comment/{forumId}")
public class CommentController {

    @Autowired
    CommentService service;


    @GetMapping
    public ResponseEntity getList(@PathVariable long forumId, Params params) throws Exception {
        params.setForumId(forumId);
        Map<String, Object> model = service.makeModel(params);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity write(@RequestBody @Valid Comment comment, BindingResult result) throws Exception {
        Message message = new Message();
        if (result.hasErrors()) {
            message.setMessage("유효성 오류");
            message.setCode("bad_request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        if (!service.createComment(comment)) {
            message.setMessage("sql 오류");
            message.setCode("bad_request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        message.setMessage("작성 성공");
        message.setCode("created");
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity edit(@RequestBody @Valid Comment comment,
                               BindingResult result) throws Exception {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) throws Exception {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
