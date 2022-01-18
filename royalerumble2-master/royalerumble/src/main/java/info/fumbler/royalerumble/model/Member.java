package info.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    private long id;

    private String email;

    private String userName;

    private String newName;

    private String password;

    private String newPassword;

    private Date regDate;

    private Date updateDate;

    private String url;

    private List<Friend> list;

    public boolean passwordMatching(String password){
        return this.password.equals(password);
    }
}
