<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<style>
    .dropdown-menu a {
        color: #111111 !important;
    }

    .dropdown-menu a:hover {
        background: #448aff !important;
        color: #f8f9fa !important;
        -webkit-transition: all 0.2s ease-in-out;
        -moz-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }

    .autocomplete-suggestions {
        border: 1px solid #999;
        background: #FFF;
        overflow: auto;
    }

    .autocomplete-suggestion {
        padding: 2px 5px;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;
    }

    .autocomplete-selected {
        background: blue;
        color: white;
    }

    .autocomplete-suggestions strong {
        font-weight: bold;
        color: orange;
    }

    .autocomplete-group {
        padding: 2px 5px;
    }

    .autocomplete-group strong {
        display: block;
        border-bottom: 1px solid #000;
    }
</style>
<script>
    $(function () {
        $('.nav-link').click(function () {
            $('.nav-item').removeClass('active');
            $(this).closest('.nav-item').addClass('active');

        });
        $('#home').on('click', function (e) {
            $(document).royaleHome(opt);
        });

        $('#card').on('click', function (e) {
            $(document).royaleCardsInfo(opt);
        });

        $('#rank').on('click', function (e) {
            $(document).royalePlayerRank(opt);
        });
    });
</script>
<nav class="navbar navbar-expand-lg navbar-dark blue accent-2 fixed-top">
    <div class="container">
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarTogglerMenu" aria-controls="navbarTogglerMenu"
                aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerMenu">
            <%--<a class="navbar-brand h5 font-weight-bold" href="${root}">--%>
            <a class="navbar-brand h5 font-weight-bold home" href="${root}">
                <img src="${root}resources/image/main.png" height="30" alt=""> FUMBLER
            </a>
            <ul class="navbar-nav mr-auto mt-lg-0">
                <li class="nav-item <c:if test="${home == 'active'}">active</c:if>">
                    <%--<a class="nav-link font-weight-bold" href="${root}">홈</a>--%>
                    <div class="nav-link font-weight-bold" id="home" style="cursor:pointer;"
                         onclick="window.scrollTo(0,0);">
                        홈
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link font-weight-bold" id="card" style="cursor:pointer;"
                         onclick="window.scrollTo(0,0);">
                        카드
                    </div>
                </li>
                <li class="nav-item">
                    <div class="nav-link font-weight-bold" id="rank" style="cursor:pointer;"
                         onclick="window.scrollTo(0,0);">
                        랭킹
                    </div>
                    <%--<a class="nav-link font-weight-bold" id="rank">랭크</a>--%>
                </li>
                <li class="nav-item dropdown <c:if test="${forum == 'active'}">active</c:if>">
                    <a class="nav-link dropdown-toggle font-weight-bold" id="dropdownForum" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">포럼</a>
                    <div class="dropdown-menu dropdown-primary" aria-labelledby="dropdownForum">
                        <a class="dropdown-item font-weight-bold" href="${root}forums/list">고블린광장</a>
                        <a class="dropdown-item font-weight-bold" href="${root}forums/list?type=info">정보/소식</a>
                        <a class="dropdown-item font-weight-bold" href="${root}forums/list?type=strategy">전략오두막</a>
                    </div>
                </li>
                <c:if test="${not empty USER}">
                    <li class="nav-item">
                        <div class="nav-link font-weight-bold" data-toggle="modal"
                             data-target="#fullHeightModalRight" style="cursor:pointer;">
                            <img src="${root}resources/image/cards-png8/sparky.png" height="30" alt=""> 스파키
                        </div>
                    </li>
                </c:if>
            </ul>
            <ul class="navbar-nav mt-lg-0">
                <c:choose>
                    <c:when test="${empty USER}">
                        <li class="nav-item <c:if test="${login == 'active'}">active</c:if>">
                            <a class="nav-link font-weight-bold" href="${root}login">
                                <i class="fas fa-sign-in-alt"></i> 로그인
                            </a>
                        </li>
                        <li class="nav-item <c:if test="${join == 'active'}">active</c:if>">
                            <a class="nav-link font-weight-bold" href="${root}join">
                                <i class="fas fa-user-plus"></i> 회원가입
                            </a>
                        </li>
                    </c:when>
                    <c:otherwise>
                        <li class="nav-item dropdown <c:if test="${account == 'active'}">active</c:if>">
                            <a class="nav-link dropdown-toggle font-weight-bold" id="dropdownAccount"
                               data-toggle="dropdown"
                               aria-haspopup="true" aria-expanded="false"><img
                                    src="${root}profile/avatar/${USER.userName}" class="rounded-circle"
                                    height="30"/><span class="ml-2">${USER.userName}</span></a>
                            <div class="dropdown-menu dropdown-primary" aria-labelledby="dropdownAccount">
                                <a class="dropdown-item font-weight-bold" href="${root}profile/account">회원정보</a>
                                <a class="dropdown-item font-weight-bold" href="${root}profile/password">비밀번호 변경</a>
                                <a class="dropdown-item font-weight-bold" href="${root}logout">로그아웃</a>
                            </div>
                        </li>
                        <li class="nav-item">
                        </li>
                    </c:otherwise>
                </c:choose>
            </ul>
        </div>
    </div>
</nav>
<!-- Modal -->
<div class="modal fade right" id="fullHeightModalRight" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-full-height modal-right" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="exampleModalLabel">스파키</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="font-weight-bold">스파키는?</p>
                <p>FUMBLER에서 제공하는 실시간 토크 서비스입니다.</p>
                <p>준비중입니다.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
        </div>
    </div>
</div>