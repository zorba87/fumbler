<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.royale-account {
        margin: 4em auto;
        width: 800px;
        height: 600px;
    }

    .card-header.royale-account {

    }

    .table {
        margin: auto;
        width: 600px;
    }

    ._current-image, ._upload-image {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }

    ._profile, ._upload {
        position: relative;
    }

    .profile-image-button {
        position: relative;
        top: -30px;
        left: 400px;
    }

    input[type="file"] {
        color: transparent;
        background-color: #F89406;
        border: 2px solid #34495e;
        width: 100%;
        height: 36px;
        border-radius: 3px;
    }

</style>
<script>
    $(function () {
        var uploadImage = document.getElementById('avatar');
        uploadImage.onchange = function (event1) {

            var file = uploadImage.files[0];
            var reader = new FileReader();
            reader.onload = function (event2) {
                var img = new Image();
                img.src = event2.target.result;
                img.setAttribute('class', 'mx-auto d-block rounded-circle _upload-image');
                $('._upload').html(img);
            };
            reader.readAsDataURL(file);
            return false;
        };

        var validation = {
            name: $('#newName').val(),
            duplication: false,
        };

        $('#disabledEvent').click(e => {
            console.log("test");
            $('#newName').prop('disabled', false);
            $('#checkName').prop('disabled', false);
            $('#saveSubmit').prop('disabled', false);
        });

        $('#checkName').click(e => {
            var userName = $('#newName').val();

            if (!userName.trim()) {
                alert("이름을 입력해주세요");
                return;
            }
            $.get('${root}check', {name: userName}, function (data) {
                if (data) {
                    alert("이름 중복입니다.");
                    validation.duplication = false;
                } else {
                    alert("사용 가능한 이름입니다.");
                    validation.duplication = true;
                    validation.name = userName;
                }
            })
        });

        $('#saveSubmit').click(e => {
            var userName = $('#userName').val();

            if (validation.duplication === false) {
                alert("이름 중복체크를 해주세요.");
                e.preventDefault();
                return;
            }

            if (validation.name === userName) {
                validation.duplication = false;
                alert("이름 중복체크를 해주세요.");
                e.preventDefault();
            }
        });
    });
</script>
<div class="card royale-account" style="margin-top:200px;">
    <div class="card-header royale-account text-center">
        <p class="h2 font-weight-bold primary-lighter-hover">FUMBLER</p>
        <p class="h4 grey-darker-hover">Account Information</p>
        <p class="h5">${result}</p>
    </div>
    <div class="card-body royale-account">
        <form:form commandName="member">
            <div>
                <div class="_profile">
                    <image class="mx-auto d-block rounded-circle _current-image"
                           src="${root}profile/avatar/${USER.userName}"
                           alt="placeholder"/>
                </div>
                <div class="profile-image-button">
                    <a class="btn-floating btn-pink btn-sm" data-toggle="modal" data-target="#profileImageModal">
                        <i class="fas fa-camera fa"></i>
                    </a>
                </div>
            </div>
            <table class="table table-bordered mt-3">
                <tbody>
                <tr style="height: 60px;">
                    <th scope="row" class="blue-grey lighten-5"
                        style="width: 100px;text-align: center; vertical-align: middle">
                        <span class="h6">Email</span>
                    </th>
                    <td>
                        <span class="font-weight-bold grey-darker-hover">${USER.email}</span>
                    </td>
                </tr>
                <tr style="vertical-align: middle">
                    <th scope="row" class="blue-grey lighten-5"
                        style="width: 100px;text-align: center; vertical-align: middle">
                        <span class="h6">Name</span>
                    </th>
                    <td>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <button type="button" class="input-group-text" id="disabledEvent">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                            <form:input path="newName" cssClass="form-control" placeholder="${USER.userName}"
                                        disabled="true"/>
                            <form:hidden path="userName" value="${USER.userName}"/>
                            <div class="input-group-append">
                                <button type="button" class="input-group-text" id="checkName" disabled>중복체크</button>
                            </div>
                            <div class="input-group-append">
                                <button type="submit" class="input-group-text" id="saveSubmit" disabled>저장
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <div class="text-center mt-3">
                    <a href="javascript:history.back()" class="btn btn-primary btn-md">돌아가기</a>
                </div>
            </div>
        </form:form>
    </div>
</div>

<div class="modal fade" id="profileImageModal" tabindex="-1" role="dialog" aria-labelledby="profileImageModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title font-weight-bold" id="profileImageModalLabel">프로필 사진 업로드</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form method="post" action="${root}/profile/avatar/upload" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="_upload">
                        <img src="${root}profile/avatar/${USER.userName}"
                             class="mx-auto d-block rounded-circle _upload-image"
                             alt="이미지가 없습니다."/>
                    </div>
                    <div class="d-flex justify-content-center">
                        <input type="file" id="avatar" name="avatar" style="display:none;">
                        <label for="avatar" class="btn btn-pink">파일선택</label>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="submit" class="btn btn-primary">저장</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">취소</button>
                </div>
            </form>
        </div>
    </div>
</div>