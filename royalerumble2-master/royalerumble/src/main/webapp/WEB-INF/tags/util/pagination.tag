<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ attribute name="pagination" required="true"
              type="info.fumbler.royalerumble.model.Pagination" %>
<%@ attribute name="link" required="true" type="String" %>
<%@ attribute name="params" required="false" type="String" %>

<div class="card-footer">
    <nav aria-label="pagination butter">
        <ul class="pagination pg-blue justify-content-center">
            <c:choose>
                <c:when test="${pagination.currentBlock > 1}">
                    <li class="page-item">
                        <a class="page-link"
                           href="${link}?page=1${params}"
                           aria-label="first">
                            <span aria-hidden="true">처음</span>
                            <span class="sr-only">first</span>
                        </a>
                        <a class="page-link"
                           href="${link}?page=${pagination.prevBlockPage}${params}"
                           aria-label="Previous">
                            <span aria-hidden="true">이전</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                </c:when>
                <%--<c:otherwise>
                    <li class="page-item disabled">
                        <a class="page-link" aria-label="first">
                            <span aria-hidden="true">처음</span>
                            <span class="sr-only">first</span>
                        </a>
                        <a class="page-link" aria-label="Previous">
                            <span aria-hidden="true">이전</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                </c:otherwise>--%>
            </c:choose>
            <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" var="i">
                <c:if test="${i == pagination.page}">
                    <li class="page-item active">
                        <a class="page-link">${i}<span class="sr-only">(current)</span></a>
                    </li>
                </c:if>
                <c:if test="${i != pagination.page}">
                    <li class="page-item"><a class="page-link" href="${link}?page=${i}${params}">${i}</a></li>
                </c:if>
            </c:forEach>
            <c:choose>
                <c:when test="${pagination.currentBlock < pagination.totalBlock}">
                    <li class="page-item">
                        <a class="page-link"
                           href="${link}?page=${pagination.nextBlockPage}${params}"
                           aria-label="next">
                            <span aria-hidden="true">다음</span>
                            <span class="sr-only">next</span>
                        </a>
                        <a class="page-link"
                           href="${link}?page=${pagination.totalPage}${params}"
                           aria-label="last">
                            <span aria-hidden="true">마지막</span>
                            <span class="sr-only">last</span>
                        </a>
                    </li>
                </c:when>
                <%--<c:otherwise>
                    <li class="page-item disabled">
                        <a class="page-link" aria-label="first">
                            <span aria-hidden="true">다음</span>
                            <span class="sr-only">first</span>
                        </a>
                        <a class="page-link" aria-label="Previous">
                            <span aria-hidden="true">마지막</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                </c:otherwise>--%>
            </c:choose>
        </ul>
    </nav>
</div>
