package info.fumbler.royalerumble.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authenticate {

    @NotBlank
    @Length(min = 4, max = 20 , message = "아이디 양식에 맞지 않습니다.")
    private String email;

    @NotBlank
    @Length(min = 4, max = 20 , message = "비밀번호 양식에 맞지 않습니다.")
    private String password;

    private String url;

    private boolean remember;

    private String interceptorMessage;
}
