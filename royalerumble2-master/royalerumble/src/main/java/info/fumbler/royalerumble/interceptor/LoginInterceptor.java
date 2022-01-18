package info.fumbler.royalerumble.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.FlashMapManager;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    ServletContext context;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession session = request.getSession();
        if(session.getAttribute("USER") == null) {
            saveUrl(request, response);
            response.sendRedirect(context.getContextPath() + "/login");
            //작업을 멈춰야한다.
            return false;
        }
        return super.preHandle(request, response, handler);
    }

    public void saveUrl(HttpServletRequest request, HttpServletResponse response) {

        String url = request.getRequestURI().substring(context.getContextPath().length());
        String query = request.getQueryString();
        log.info("URI - " + request.getRequestURI());
        log.info("URL - " + request.getRequestURL().toString());

        if(query != null) {
            url = url + "?" + query;
        }
        //임시저장소
        FlashMap flashMap = new FlashMap();
        flashMap.put("url", url);

        FlashMapManager flashMapManager = RequestContextUtils.getFlashMapManager(request);
        flashMapManager.saveOutputFlashMap(flashMap, request, response);
    }
}
