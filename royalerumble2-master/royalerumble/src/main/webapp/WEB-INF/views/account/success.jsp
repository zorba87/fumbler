<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-success{
        margin: 8em auto;
        width: 450px;
        height: 600px;
    }

    .card-header.royale-success{

    }


</style>
<div class="card royale-success" style="margin-top:200px;">
    <div class="card-header royale-success text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Congratulation !!</p>
    </div>
    <div class="card-body royale-success">
        <p class="h4 font-weight-bold">${member.email}</p>
        <span class="h5">${member.userName}님 가입을 환영합니다.</span>
        <p class="mt-5 font-small">
            Fumbler는 Clash Royale 전적검색 서비스입니다.
        </p>
        <p class="font-small">
            보다 나은 서비스를 제공할 수 있도록 열심히 노력하겠습니다.
        </p>
        <p class="h5 font-weight-bold mt-5 text-center">
            감사합니다.
        </p>
    </div>
    <div class="card-footer royale-success">
        <div class="text-center font-small">
            <a href="${root}login">로그인하기</a>
        </div>
    </div>
</div>