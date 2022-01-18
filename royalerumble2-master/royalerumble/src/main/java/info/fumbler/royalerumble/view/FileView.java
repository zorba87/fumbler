package info.fumbler.royalerumble.view;


import info.fumbler.royalerumble.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Map;

@Slf4j
@Component("fileView")//이름 생략가능
public class FileView extends AbstractView {

    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
        String path = (String) model.get("path");
        String type = (String) model.get("type");
        File file = new File(path);

        res.setContentType(type);
        res.setContentLength((int)file.length());
        res.setHeader("Content-Transfer-Encoding", "binary");

        FileUtil.copy(path, res);
    }
}
