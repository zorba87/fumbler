package info.fumbler.royalerumble.model;

import lombok.Builder;
import lombok.Data;

@Data
public class Pagination {
    public final int PER_PAGE;
    public final int PER_BLOCK;

    //댓글 관련
    private long forumId; //게시글 번호
    private long commentRef;
    private String sort; //정렬
    private int commentCount;

    //게시판 관련
    private String type;
    private int select;
    private String keyword; //검색어

    //paging 관련
    private int totalCount; //전체 데이터 건 수
    private int page; //현재 페이지
    private int start; //현재 페이지 시작번호
    private int end; //현재 페이지 끝 번호

    private int totalPage; //전체 페이지 수
    private int startPage; //현재 페이지 블럭에서 시작 페이지 번호
    private int endPage; //현제 페이지 블럭에서 마지막 페이지 번호

    private int currentBlock; // 현재 페이지 블럭
    private int totalBlock; // 전체 페이지 블럭
    private int prevBlockPage; // 이전 페이지 블럭 시작
    private int nextBlockPage; // 다음 페이지 블럭 시작 페이지

    public Pagination(int currentPage, int totalCount){
        this(currentPage, totalCount, 10, 10);
    }
    public Pagination(int currentPage, int totalCount, int perPage){
        this(currentPage, totalCount, perPage, 10);
    }
    public Pagination(int currentPage, int totalCount, int perPage, int perBlock){

        PER_PAGE = perPage;
        PER_BLOCK = perBlock;
        page = currentPage;
        this.totalCount = totalCount;

        start = (page - 1) * PER_PAGE + 1;
        end = start + PER_PAGE - 1;
        totalPage = (int)Math.ceil((float)totalCount/PER_PAGE);

        currentBlock = (int)Math.ceil((float)currentPage/PER_BLOCK);
        totalBlock = (int)Math.ceil((float)totalPage/PER_BLOCK);

        startPage = (currentBlock-1) * PER_BLOCK + 1; //블록 시작 페이지
        endPage = startPage + PER_BLOCK - 1;

        if(endPage > totalPage) endPage = totalPage;

        prevBlockPage = page - (page - startPage) - 1;
        nextBlockPage = page + (endPage - page) + 1;
    }
}
