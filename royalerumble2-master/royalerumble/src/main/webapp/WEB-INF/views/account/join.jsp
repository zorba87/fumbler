<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-join {
        margin: 8em auto;
        width: 450px;
        height: 600px;
    }

    .card-header.royale-join {

    }
</style>
<script>
    $(function () {
        var regExEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        var validation = {
            email : '',
            emailDupl : false,
            name : '',
            nameDupl : false,
        };

        // $('#email').on('keydown', function(){
        //     var val = $(this).val();
        //     if (regExEmail.test(val));
        // });
        $('#checkEmail').click(e => {
            var email = $('#email').val();
            validation.email = email;
            if (!email.trim()) {
                alert("이메일을 입력해주세요");
                return;
            }
            $.get('check', {email: email}, function (data) {
                if (data) {
                    alert("이메일 중복입니다.");
                    validation.emailDupl = false;
                } else {
                    alert("사용 가능한 이메일 입니다.");
                    validation.emailDupl = true;
                }
            });
        });

        $('#checkName').click(e => {
            var userName = $('#userName').val();
            validation.name = userName;
            if (!userName.trim()) {
                alert("이름을 입력해주세요");
                return;
            }
            $.get('check', {name: userName}, function (data) {
                if (data) {
                    alert("이름 중복입니다.");
                    validation.nameDupl = false;
                } else {
                    alert("사용 가능한 이름입니다.");
                    validation.nameDupl = true;
                }
            })
        });

        $(':submit').click(e => {
            var email = $('#email').val();
            var userName = $('#userName').val();
            if (validation.emailDupl == false) {
                alert("이메일 중복체크를 해주세요.");
                e.preventDefault();
                return;
            }
            if (validation.nameDupl == false) {
                alert("이름 중복체크를 해주세요.");
                e.preventDefault();
                return;
            }
            if (validation.email !== email || validation.name !== userName) {
                validation.emailDupl = false;
                validation.nameDupl = false;
                alert("다시 검사해주세요.");
                e.preventDefault();
                return;
            }
            alert("프로젝트용 사이트입니다. 가입하실수 없습니다.");
            e.preventDefault();
            return;
        })
    });
</script>
<div class="card royale-join" style="margin-top:200px;">
    <div class="card-header royale-join text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Sign up</p>
    </div>
    <div class="card-body royale-join">
        <form:form commandName="member">
            <div class="md-form">
                <div class="input-group">
                    <form:input type="email" path="email" cssClass="form-control" required="required"/>
                    <label for="email">Email</label>
                    <button type="button" class="btn btn-primary btn-sm" style="font-size: 13px" id="checkEmail">중복확인</button>
                </div>
                <div class="error" id="emailMessage">
                    <span class="text-warning" style="font-size: 13px">필수 항목입니다.</span>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:input path="userName" cssClass="form-control" required="required"/>
                    <label for="userName">Name</label>
                    <button type="button" class="btn btn-primary btn-sm" style="font-size: 13px" id="checkName">중복확인</button>
                </div>
                <div class="error">
                    <span class="text-warning" style="font-size: 13px">필수 항목입니다.</span>
                </div>
            </div>
            <div class="md-form">
                <div class="input-group">
                    <form:password path="password" cssClass="form-control" required="required"/>
                    <label for="password">Password</label>
                </div>
                <div class="error">
                    <span class="text-warning" style="font-size: 13px">필수 항목입니다.</span>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-sm-6">
                    <button type="submit" class="btn btn-primary btn-block" style="font-size: 13px">가입</button>
                </div>
                <div class="col-sm-6">
                    <a class="btn btn-primary btn-block" style="font-size: 13px">취소</a>
                </div>
            </div>
        </form:form>
    </div>
    <div class="card-footer royale-join">
        <div class="text-center font-small">
            <span>FUMBLER 회원이신가요?</span><a class="ml-2"href="${root}login">로그인하기</a>
        </div>
    </div>
</div>