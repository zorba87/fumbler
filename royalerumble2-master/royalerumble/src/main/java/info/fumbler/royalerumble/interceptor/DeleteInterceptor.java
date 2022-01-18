package info.fumbler.royalerumble.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class DeleteInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    ServletContext context;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //TODO 에러 페이지 고려해보기
        HttpSession session = request.getSession();
        if(session.getAttribute("USER") == null) {
            response.sendRedirect(context.getContextPath() + "/");
            return false;
        }
        return super.preHandle(request, response, handler);
    }
}
