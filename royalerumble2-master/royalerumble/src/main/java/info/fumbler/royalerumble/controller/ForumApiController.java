package info.fumbler.royalerumble.controller;


import info.fumbler.royalerumble.model.Forum;
import info.fumbler.royalerumble.model.Pagination;
import info.fumbler.royalerumble.model.Params;
import info.fumbler.royalerumble.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ForumApiController {

    @Autowired
    ForumService service;

    @GetMapping("/forums")
    public ResponseEntity getForumList(Params params) throws Exception{
        Pagination pagination = service.makePagination(params);
        List<Forum> list = service.findList(pagination);
        Map<String, Object> model = new HashMap<>();
        model.put("pagination", pagination);
        model.put("list", list);
        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @GetMapping("/forums/{id}")
    public ResponseEntity getForum(@PathVariable("id") int id) throws Exception{
        Forum forum = service.findOne(id);
        return new ResponseEntity<>(forum, HttpStatus.OK);
    }


}
