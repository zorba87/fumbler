<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-login{
        margin: 8em auto;
        width: 450px;
        height: 500px;
    }

    .card-header.royale-login{

    }

    .form-check {
        margin-left: 15px;
    }
    .error {
        color: red;
        font-weight: bold;
    }
</style>
<script>

</script>
<div class="card royale-login" style="margin-top:200px;">
    <div class="card-header royale-login text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Sign in</p>
    </div>
    <div class="card-body royale-login">
        <form:form commandName="authenticate">
            <div class="md-form">
                <%--<i class="fa fa-envelope prefix grey-text"></i>--%>
                <form:input path="email" cssClass="form-control" required="required"/>
                <label for="email">Email</label>
            </div>
            <div class="md-form">
                <%--<i class="fa fa-lock prefix grey-text"></i>--%>
                <form:password path="password" cssClass="form-control" required="required"/>
                <label for="password">Password</label>
            </div>
            <div class="row">
                <div class="form-check col-sm-5">
                    <form:checkbox path="remember" cssClass="form-check-input"/>
                    <label class="form-check-label font-small" for="remember">
                        이메일 저장
                    </label>
                </div>
                <div class="col-sm-6 text-right">
                    <a class="font-small" href="#">비밀번호 찾기</a>
                </div>
            </div>
            <div class="mt-5">
                <form:hidden path="url"/>
                <button type="submit" class="btn btn-primary btn-block" style="font-size: 13px">로그인</button>
            </div>
            <div class="error">
                <form:errors element="p"/>
                <c:if test="${not empty authenticate.interceptorMessage}">
                    <p>${authenticate.interceptorMessage}</p>
                </c:if>
            </div>
        </form:form>
    </div>
    <div class="card-footer royale-login">
        <div class="text-center font-small">
            <span>아직 FUMBLER 회원이 아니신가요?</span><a class="ml-2"href="${root}join">가입하기</a>
        </div>
    </div>
</div>