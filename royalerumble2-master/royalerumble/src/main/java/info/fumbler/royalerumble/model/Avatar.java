package info.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Avatar {

    private String userName;

    private byte[] image;
}
