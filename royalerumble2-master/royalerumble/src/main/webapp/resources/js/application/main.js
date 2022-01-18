$.fn.royaleServiceInit = function(opt) {
    $('head').append(`<script src="${opt.context}resources/js/application/home.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/profile.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/battle.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/cards.templ.js"><\/script>`);
    $('head').append(`<script src="${opt.context}resources/js/application/rank.templ.js"><\/script>`);

    var self = this;
    self.on('click', '._item_action', function(event){
    var action = $(this).data('action');

        switch (action) {
            case 'player-search' :
                var keyword = $('#playerSearch').val().toUpperCase();
                if(keyword.charAt(0) === '#') {
                    keyword = keyword.slice(1);
                }
                opt.keyword = keyword;
                self.playerSearch(opt);
                break;
            case 'clan-search' :
                var keyword = $('#clanSearch').val().toUpperCase();
                if(keyword.charAt(0) === '#') {
                    keyword = keyword.slice(1);
                }
                opt.keyword = keyword;
                self.clanSearch(opt);
                break;
            case 'player-click' :
                opt.keyword = $(this).data('tag');
                self.playerSearch(opt);
                break;
            case 'clan-click' :
                opt.keyword = $(this).data('tag');
                self.clanSearch(opt);
                break;
        }
    });
};

$.fn.royaleHome = function(){
    $('._search_app').remove();
    $(`${opt.prevElement}`).after('<div class="_search_app"></div>')
    $('._search_app').append(homeTempl.top(opt));
    $('._app').html(homeTempl.bottom(opt));
    $('html,body,._search_app,.view').css({
        'height' : '100%'
    });

    opt.api.getPopularDecks(function(data){
        $('#popularDecks').html(homeTempl.popularDeckFactory(data)).hide().fadeIn(700);
    });
    opt.api.getPlayerRankTop5(function(data){
        $('#top5Player').html(homeTempl.playerRank(data)).hide().fadeIn(700);
    });
    opt.api.getClanRankTop5(function(data){
        $('#top5Clan').html(homeTempl.clanRank(data)).hide().fadeIn(700);
    });
};

$.fn.playerSearch = function() {
    $('._search_app').remove();
    var current_ajax_num = opt.ajax_last_num;

    opt.api.getPlayer(opt.keyword, function(player){
        if(current_ajax_num === opt.ajax_last_num - 1) {
            opt.api.getChests(opt.keyword, function(chest){
                $('._app').html(profileTempl.player(player)).hide().fadeIn(700);
                $('#chests').html(profileTempl.playerChests(chest));
                opt.api.getBattleLog(opt.keyword, function(data){
                    $('#battleList').html(battleLogTempl.battleLog(data)).hide().fadeIn(700);
                })
            })
        }
    })
};

$.fn.clanSearch = function() {
    $('._search_app').remove();
    var current_ajax_num = opt.ajax_last_num ;

    opt.api.getClan(opt.keyword, function(data) {
        if(current_ajax_num === opt.ajax_last_num - 1) {
            $('._app').html(profileTempl.clan(data)).hide().fadeIn(700);
        }
    });
};


$.fn.royalePlayerRank = function() {
    $('._search_app').remove();
    $("._app").html(rankTempl.rank);

    $('#playerRankPage').on('click', function(e){
        $('#clanRankPage').removeClass('active');
        $(this).addClass('active');

        var current_ajax_num = opt.ajax_last_num;
        opt.api.getPlayerRank(function(data) {
            if(current_ajax_num === opt.ajax_last_num - 1) {
                $("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(700);
            }
        });
    });

    $('#clanRankPage').on('click', function(e){
        $('#playerRankPage').removeClass('active');
        $(this).addClass('active');

        var current_ajax_num = opt.ajax_last_num;
        opt.api.getClanRank(function(data){
            if(current_ajax_num === opt.ajax_last_num - 1) {
                $("#rankTable").html(rankTempl.clanRank(data)).hide().fadeIn(700);
            }
        })
    });

    var current_ajax_num = opt.ajax_last_num;
    opt.api.getPlayerRank(function(data) {
        if(current_ajax_num === opt.ajax_last_num - 1) {
            $("#rankTable").html(rankTempl.playerRank(data)).hide().fadeIn(700);
        }
    });
};

$.fn.royaleCardsInfo = function() {
    $('._search_app').remove(); // search 창 지움
    $('._app').html(cardsTempl.cards);

    var stats;

    opt.api.getCardsStats(function(data){
        stats = data;
        var obj = stats.cards_stats.troop;
        var knight = obj[0];
        findCard(obj, knight.name, knight.key, knight.elixir, knight.description, knight.type );
    });
    opt.api.getCards(function(data) {
        $("#cardList").html(cardsTempl.cardList(data));
    });

    $("#cardList").on("click", ".cardOne", function(e) {
        var type = $(this).data("type");
        var key = $(this).data("key");
        var name = $(this).data("name");
        var elixir = $(this).data("elixir");
        var desc = $(this).data("desc");

        var obj;
        switch(type) {
            case 'Troop' :
                obj = stats.cards_stats.troop;
//			findCard(obj, name, key, elixir, desc, type);
                break;
            case 'Building' :
                obj = stats.cards_stats.building;
//			findCard(obj, name, key, elixir, desc, type);
                break;
            case 'Spell' :
                obj = stats.cards_stats.spell;
//			findCard(obj, name, key, elixir, desc, type);
                break;
        }
        findCard(obj, name, key, elixir, desc, type);
    });
};

function findCard(obj, name, key, elixir, desc, type) {
    var sliceName = name.slice(0, name.length-1);
    for(var i=0; i<obj.length; i++) {
        if(obj[i].name===name) {
            $("#cardInfo").html(cardsTempl.card(obj[i], name, key, elixir, desc, type));
        }
        else if(obj[i].name_en===name) {
            $("#cardInfo").html(cardsTempl.card(obj[i], name, key, elixir, desc, type));
        }
        else if(obj[i].name===sliceName){
            $("#cardInfo").html(cardsTempl.card(obj[i], name, key, elixir, desc, type));
        }
        else if(obj[i].name_en===sliceName){
            $("#cardInfo").html(cardsTempl.card(obj[i], name, key, elixir, desc, type));
        }
    }
};







