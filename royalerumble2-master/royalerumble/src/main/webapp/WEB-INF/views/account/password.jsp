<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-password {
        margin: 4em auto;
        width: 800px;
        height: 500px;
    }

    .card-header.royale-password {

    }
    .table{
        margin:auto;
        width: 600px;
    }

</style>
<script>
    $(function(){

        //대충함...
        $(':submit').click(e=>{
            var password = $(':password').eq(0).val();
            var newPassword = $(':password').eq(1).val();
            var passwordConfirm = $(':password').eq(2).val();

            if(password === '' || newPassword === '' || passwordConfirm === ''){
                return;
            }

            if(password === newPassword) {
                alert("기존 비밀번호와 새로운 비밀번호를 다르게 입력해주세요.");
                e.preventDefault();
            }
            if(newPassword !== passwordConfirm) {
                alert("비밀번호 확인이 맞지 않습니다.");
                e.preventDefault();
            }
        });
    });
</script>
<div class="card royale-password" style="margin-top:200px;">
    <div class="card-header royale-password text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Change Password</p>
        <p class="h5">${result}</p>
    </div>
    <div class="card-body royale-password">
        <form:form commandName="member">
        <table class="table table-bordered mt-3">
            <tbody>
            <tr style="height: 60px;">
                <th scope="row" class="blue-grey lighten-5" style="width: 150px;text-align: center; vertical-align: middle">
                    <span style="font-weight: bold">기존 비밀번호</span>
                </th>
                <td>
                    <div class="input-group">
                        <input:password path="password" cssClass="form-control" aria-describedby="passwordHelpBlock" required="ture"/>
                    </div>
                </td>
            </tr>
            <tr style="vertical-align: middle">
                <th scope="row" class="blue-grey lighten-5" style="width: 100px;text-align: center; vertical-align: middle">
                    <span style="font-weight: bold">새 비밀번호</span>
                </th>
                <td>
                    <div class="input-group">
                        <input:password path="newPassword" cssClass="form-control" required="ture"/>
                    </div>
                </td>
            </tr>
            <tr style="vertical-align: middle">
                <th scope="row" class="blue-grey lighten-5" style="width: 100px;text-align: center; vertical-align: middle">
                    <span style="font-weight: bold">새 비밀번호 확인</span>
                </th>
                <td>
                    <div class="input-group">
                        <input type="password" class="form-control" id="newPasswordConfirm" required="ture">
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div>
            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary btn-md">변경</button>
                <a href="javascript:history.back()" class="btn btn-primary btn-md">취소</a>
            </div>
        </div>
        </form:form>
    </div>
</div>