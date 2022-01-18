package info.fumbler.royalerumble.view;

import info.fumbler.royalerumble.util.FileUtil;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.util.Map;

@Component("download")
public class DownloadView extends AbstractView {

    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest req, HttpServletResponse res) throws Exception {
        String path = (String) model.get("path");
        String type = (String) model.get("type");
        String fileName = (String) model.get("fileName");
        fileName = URLEncoder.encode(fileName, "utf-8");

        File file = new File(path);

        res.setContentType("type");
        res.setContentLength((int)file.length());
        res.setHeader("Content-Disposition", "attachment; filename=\""+ fileName + "\";");
        res.setHeader("Content-Transfer-Encoding", "binary");

        FileUtil.copy(path, res);
    }
}
