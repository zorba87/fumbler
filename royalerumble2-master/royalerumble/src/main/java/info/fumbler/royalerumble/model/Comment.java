package info.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.AssertTrue;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    private long id;

//    private long memberId;

    private long forumId;

    private String userName;

    private String content;

    private int commentRef;

    private int commentLevel;

    private int commentCnt;

    private int likeCnt;

    private int hateCnt;

    private Date regDate;

    private int modified;
}
