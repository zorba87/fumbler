package info.fumbler.royalerumble.interceptor;

import info.fumbler.royalerumble.dao.FriendDao;
import info.fumbler.royalerumble.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class SparkyInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    FriendDao dao;

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

//        Member member = (Member) request.getSession().getAttribute("USER");
//        if(member != null) {
//            member.setList(dao.selectList(member.getId()));
//            request.setAttribute("USER", member);
//        }
        return super.preHandle(request, response, handler);
    }
}
