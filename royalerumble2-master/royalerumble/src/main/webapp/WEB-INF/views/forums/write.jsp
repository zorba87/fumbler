<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<style>
    .card.forum-write {
        width: 1000px;
        height: 100%;
        min-height: 600px;
        margin: 4em auto;
    }

    .card-header.forum-write {
        background: #448aff;
        color: #fff;
    }
</style>
<script src="${root}resources/node_modules/tinymce/tinymce.min.js"></script>
<script>
    $(function () {
        tinymce.init({
            selector: 'textarea',
            language: 'ko_KR',
            height: "300",
        });
        //검사 ...대충하자...
        $(':submit').click(e =>{
            var subject = $('#subject').val();
            var content = tinyMCE.activeEditor.getContent({
                format : 'text'
            });
            if(subject.trim().length < 3){
                alert("제목은 3글자 이상입니다.");
                e.preventDefault();
                return;
            }
            if(content.trim().length < 5){
                alert("본문은 5글자 이상입니다.");
                e.preventDefault();
                return;
            }
        });
    });
</script>
<div class="card forum-write" style="margin-top:100px;">
    <div class="card-header forum-write">
        <c:if test="${type == 'free'}"><h3 class="my-2">고블린 광장</h3></c:if>
        <c:if test="${type == 'info'}"><h3 class="my-2">정보/소식</h3></c:if>
        <c:if test="${type == 'strategy'}"><h3 class="my-2">전략오두막</h3></c:if>
        <p>${USER.userName}</p>
    </div>
    <div class="card-body forum-write">
        <form:form commandName="forum" enctype="multipart/form-data">
            <div class="mb-3">
                <form:hidden path="userName" value="${USER.userName}"/>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <form:input path="subject" cssClass="form-control" placeholder="제목을 입력해 주세요." required="required"/>
                </div>
            </div>
            <br>
            <div>
                <input type="file" id="upload" name="files" multiple="multiple"/>
            </div>
            <br>
            <form:textarea path="content"/>
            <form:hidden path="insertType" value="${type}"/>
            <div class="text-center mt-3">
                <button type="submit" class="btn btn-primary btn-md">쓰기</button>
                <a href="javascript:history.back()" class="btn btn-primary btn-md">취소</a>
            </div>
        </form:form>
    </div>
</div>

