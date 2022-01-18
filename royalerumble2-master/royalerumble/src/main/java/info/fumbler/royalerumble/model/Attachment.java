package info.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {

    private long id;

    private long forumId;

    private String fileName;

    private long fileSize;

    private String mimeType;

    private Date regDate;

    private byte[] fileBinary;

    private String encode;

}
