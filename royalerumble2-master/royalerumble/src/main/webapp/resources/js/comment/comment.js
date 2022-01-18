$.fn.makeComments = function(opt) {
    var self = $(this);
    var params = `page=1&sort=${opt.sort}`;
    api.list(params, response => {
        opt.currentPage = response.pagination.page;

        var $commentPanel = {
            header : $(commentTempl.header(response.total)),
            body : $(commentTempl.body),
            footer : $(commentTempl.footer),
        };

        self.append($commentPanel.header);
        self.append($commentPanel.body);
        self.append($commentPanel.footer);

        $commentPanel.header
            .find('.comment-write')
            .append(commentTempl.write(opt.userName, 'comment'));
        $commentPanel.body
            .find('.comments-area')
            .append(commentTempl.comment(opt.userName, response.list));
        $commentPanel.footer.append(commentTempl.commentPaging(response.pagination));

        self.on('click', '.action', function() {
            var actionType = $(this).data('action');
            switch (actionType) {
                case 'comments#next' :
                    opt.currentPage += 1;
                    commentFactory($commentPanel, 'paging');
                    break;
                case 'comments#end' :
                    scrollTop();
                    break;
                case 'comments#refresh' :
                    opt.currentPage = 1;
                    commentFactory($commentPanel, 'refresh');
                    break;
                case 'comment#add' :
                    opt.currentPage = 1;
                    commentAdd($commentPanel, 'add');
                    break;
                case 'reply#list#off' :
                    opt.currentReplyPage= 1;
                    $(this).makeReplies('replyMake');
                    break;
                case 'reply#list#on' :
                    $(this).makeReplies('replyClean');
                    break;
                case 'reply#add' :
                    opt.currentReplyPage = 1;
                    $(this).makeReplies('replyAdd');
                    break;
            }
        });
    });

    function commentAdd ($commentPanel, mode) {
        var $content = $commentPanel.header.find('.content');
        if ($content.val() === '') {
            alert('내용을 입력해주세요');
            return;
        }

        var data = {
            forumId: opt.forumId,
            userName: opt.userName,
            content: $content.val(),
            ref: 0,
            commentLevel: 0
        };
        opt.api.create(data, result => {
            $content.val('');
            commentFactory($commentPanel, mode);
        });
    };

    function commentFactory($commentPanel, mode) {
        var params = `page=${opt.currentPage}&sort=${opt.sort}`;
        opt.api.list(params, response => {
            $('#total').text(response.total);
            var $area = $commentPanel.body.find('.comments-area');
            var template = commentTempl.comment(opt.userName, response.list);
            switch (mode){
                case 'paging' :
                    $area.append(template);
                    break;
                case 'refresh' :
                    $area.html(template);
                    break;
                case 'add' :
                    $area.html(template);
                    $('.comments-area li').eq(0).hide().fadeIn(1000);
                    break;
            }
            $commentPanel.footer.html(commentTempl.commentPaging(response.pagination));
        });
    }

    function scrollTop() {
        var offset = $('.comments').offset();
        offset.top -= 70;
        $('html').animate({scrollTop: offset.top}, 700);
    }

    $.fn.makeReplies = function (mode) {
        var $comment = $(this).closest('.comment');

        var $repliesPanel = {
            replies : $comment.find('.replies'),
            button : $comment.find('.action[name="reply-button"]'),
            content : $comment.find('.content')
        };

        var ref = $repliesPanel.button.data('id');

        switch (mode){
            case 'replyMake' :
                $(this).data('action', 'reply#list#on');
                replyFactory($repliesPanel, ref, 'replyPaging');
                break;
            case 'replyClean' :
                $(this).data('action', 'reply#list#off');
                $repliesPanel.replies.children('.replies-area').empty();
                $repliesPanel.replies.children('.reply-write').empty();
                break;
            case 'replyAdd' :
                replyAdd($repliesPanel, ref);
                break;
        }
    };

    function replyFactory($repliesPanel, ref, mode) {
        var params = `page=${opt.currentReplyPage}&ref=${ref}`;
        opt.api.list(params, response => {
            $('#total').text(response.total);
            var $repliesPanelArea = $repliesPanel.replies.children('.replies-area');
            var template = commentTempl.reply(opt.userName, response.list);
            switch (mode){
                case 'replyPaging' :
                    $repliesPanelArea.append(template);
                    break;

                case 'replyAdd' :
                    $repliesPanelArea.html(template);
                    $repliesPanelArea.children('li').last().hide().fadeIn(1000);
                    break;
            }
            $repliesPanel.button.html(response.pagination.totalCount + ' 답글');
            $repliesPanel.replies.children('.reply-write')
                .empty().append(commentTempl.write(opt.userName, 'reply'));
        });
    }

    function replyAdd($repliesPanel, ref) {
        if ($repliesPanel.content.val() === '') {
            alert('내용을 입력해주세요');
            return;
        }

        var data = {
            forumId: opt.forumId,
            userName: opt.userName,
            content: $repliesPanel.content.val(),
            commentRef: ref,
            commentLevel: 1
        };

        opt.api.create(data, function(result){
            $repliesPanel.content.val();
            replyFactory($repliesPanel, ref, 'replyAdd');
        });
    };
};