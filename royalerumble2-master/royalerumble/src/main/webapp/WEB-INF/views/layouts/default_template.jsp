<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set value="${pageContext.request.contextPath}/" var="root" scope="request"/>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fumbler</title>
    <style>
        @font-face {
            font-family: 'Supercell-magic';
            src: url(${root}resources/font/Supercell-magic-webfont.otf) format('opentype');
        }
        body, table, div, p {font-family: 'Nanum Gothic', sans-serif;}


        body {
            overflow-x: hidden;
        }
    </style>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="${root}resources/node_modules/mdbootstrap/css/mdb.min.css"/>
    <link rel="stylesheet" href="${root}resources/css/main.css"/>
    <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic|Roboto" rel="stylesheet">

    <script src="${root}resources/node_modules/mdbootstrap/js/jquery-3.3.1.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery.devbridge-autocomplete/1.2.26/jquery.autocomplete.min.js'></script>
    <script src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>
    <script src="${root}resources/js/common.js"></script>
    <script src="${root}resources/js/application/royale.api.js"></script>
    <script src="${root}resources/js/application/main.js"></script>
    <script>
        var opt = {
            api: new RoyaleApi(),
            context : '${root}',
            prevElement: '.navbar',
            ajax_last_num : 0
        };
        $(function () {
            $(document).royaleServiceInit(opt);
        })
    </script>
</head>
<body>
<tiles:insertAttribute name="menu"/>
<div class="_app">
<tiles:insertAttribute name="body"/>
</div>
<tiles:insertAttribute name="footer"/>
<%--<tiles:insertAttribute name="footer" />--%>
<script src="${root}resources/node_modules/mdbootstrap/js/popper.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/bootstrap.min.js"></script>
<script src="${root}resources/node_modules/mdbootstrap/js/mdb.min.js"></script>
<script>
</script>
</body>
</html>