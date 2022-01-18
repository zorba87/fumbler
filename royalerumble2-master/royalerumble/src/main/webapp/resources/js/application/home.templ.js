var homeTempl = {
    top: function() {
        var templ = `
        <div class="view full-page-intro _top_app">
            <video class="video-intro" playsinline autoplay muted loop>
                <source src="${opt.context}resources/video/intro.mp4" type="video/mp4" />
            </video>
            <div class="mask justify-content-center align-items-center">
                <div class="_top_app_body">
                    <div class="_top_app_title">
                        <h1 class="display-4 font-weight-bold text-center text-white _app_font">FUMBLER</h1>
                        <h5 class="text-center text-white">이 웹사이트는 팀 프로젝트용으로 개발된 사이트입니다.</h5>
                    </div>
                    <!--검색시작-->
                    <div class="card _search_app">
                        <div class="row">
                            <section class="col-sm-6 border-right border-light">
                                <div class="p-3">
                                    <div class="mt-2 _search_app_header">
                                        <div class="row mb-2">
                                            <div class="col-2">
                                                <img src="${opt.context}resources/image/icon/playersearch.png" style="height:60px">
                                            </div>
                                            <div class="col-10">
                                                <h4 class="font-weight-bold">플레이어 검색</h4>
                                                <h6>플레이어 정보, 상자 예측, 전적, 덱</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="_search_app_body">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="playerSearch" placeholder="태그로 검색 예)#XXXXXXX">
                                            <div class="input-group-append">                                             
                                                <div class="btn btn-primary m-0 btn-sm _item_action" data-action="player-search" style="cursor:pointer;"
                                                    onclick="window.scrollTo(0,0);">
                                                    <span class="_app_font">SEARCH</span>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="col-sm-6 border-left border-light">
                                <div class="p-3">
                                    <div class="mt-2 _search_app_header">
                                        <div class="row mb-2">
                                            <div class="col-2">
                                                <img src="${opt.context}resources/image/icon/clansearch.png" style="height:60px">
                                            </div>
                                            <div class="col-10">
                                                <h4 class="font-weight-bold">클랜 검색</h4>
                                                <h6>클랜정보, 클랜원, 지원정보, 트로피</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="_search_app_body">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="clanSearch" placeholder="태그로 검색 예)#XXXXXXX"/>
                                            <div class="input-group-append">
                                                <div class="btn btn-primary m-0 btn-sm _item_action" data-action="clan-search" style="cursor:pointer;"
                                                    onclick="window.scrollTo(0,0);">
                                                    <span class="_app_font">SEARCH</span>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    return templ;
    },

    bottom : function(){
    var templ = `
        <div class="container _bottom_app">
            <div class="row justify-content-center mt-5">
                <div class="card col-lg-8 _bottom_app" style="height:600px">
                    <div>
                        <h5 class="font-weight-bold mt-3">인기있는 덱 Top3</h5>
                    </div>
                    <ul class="list-group list-group-flush" id="popularDecks">
                        <img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin: 150px auto"/>                     
                    </ul>                  
                </div>
                <i class="p-2"></i>
                <div class="card col-lg-3 _bottom_app" style="height:600px;">
                    <div>
                        <h5 class="font-weight-bold mt-3">플레이어 Top5</h5>
                    </div>
                    <ul class="list-group list-group-flush" id="top5Player">  
                        <img src="${opt.context}resources/image/etc/spin2.gif" style="width : 250px; margin: 20px auto"/>    
                    </ul>
                    <div>
                        <h5 class="font-weight-bold mt-3">클랜 Top5</h5>
                    </div>
                    <ul class="list-group list-group-flush" id="top5Clan">
                        <img src="${opt.context}resources/image/etc/spin2.gif" style="width : 250px; margin: 20px auto"/>    
                    </ul>
                </div>
            </div>
        </div>`
    return templ;
    },

    popularDeckFactory : function(data) {
        var deck = ``;
        for(var i = 0; i < data.length; i++) {
            var cardList = ``;
            var averageElixir = 0;
            for(var j = 0; j < data[i].cards.length; j++) {
                var card = data[i].cards[j];
                var elixir = data[i].cards[j].elixir;
                averageElixir += elixir;
                cardList += `
                <div class="_card" style="background-image: url('${opt.context}resources/image/cards-png8/${card.key}.png')">
                    <div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                        <span class="ml-2 _app_font">${card.elixir}</span>
                    </div>
                </div>`;
            }
            averageElixir = (averageElixir/8).toFixed(1); 
            deck += `
            <li class="list-group-item _card_deck">
                <div class="row justify-content-betweenfont-weight-bold">
                    <div class="col-sm-2 text-left">
                        <span>선호도</span><span class="_app_font ml-1">${data[i].popularity}</span>
                    </div>
                    <div class="col-sm-7 text-left">
                        평균 엘릭서
                        <img src="${opt.context}resources/image/icon/elixir.png" style="width: 20px" />
                        <span class="font-weight-bold _app_font">${averageElixir}</span>
                    </div>
                    <div class="col-sm-3 text-right">
                        <span class="font-weight-bold ">덱 복사</span>
                        <a class="btn-link" href="${data[i].decklink}">
                            <img src="${opt.context}resources/image/icon/cardcopy.png" style="width:30px"/>
                        </a>
                    </div>
                </div>
                <div class="row justify-content-center _card_deck">
                    ${cardList}
                </div>
            </li>`;
        }
        return deck;
    },
 
    playerRank : function(data) {
        var rank = ``;
        for(var i = 0; i < data.length; i++) {
        rank += `
        <li class="list-group-item" style="display: table; line-height: 12px">
            <div class="_item font-italic position-relative" style="left:-10px;width: 20px;">${data[i].rank}</div>
            <div class="_item font-small position-relative" style="left:-10px">
                <div class="text-dark _item_action" data-action="player-click" data-tag="${data[i].tag}" style="cursor:pointer;"
                    onclick="window.scrollTo(0,0);">
                    <div>${data[i].name}</div>
                    <div>#${data[i].tag}</div>
                </div>
            </div>
            <div class="_item text-right">
                <img src="${opt.context}resources/image/icon/trofe.png" style="width:20px"/>
                <span>${data[i].trophies}</span>
            </div>
        </li>`
        }
        return rank;
    },

    clanRank : function(data) {
        var rank = ``;
        for(var i = 0; i < data.length; i++) {
        rank += `
        <li class="list-group-item" style="display: table; line-height: 12px;">
            <div class="_item font-italic position-relative" style="left:-10px;width: 20px;">${data[i].rank}</div>
            <div class="_item font-small position-relative" style="left:-10px">
                <div class="text-dark _item_action" data-action="clan-click" data-tag="${data[i].tag}" style="cursor:pointer;"
                    onclick="window.scrollTo(0,0);">
                    <div>${data[i].name}</div>
                    <div>#${data[i].tag}</div>
                </div>
            </div>
            <div class="_item text-right">
                <img src="${opt.context}resources/image/icon/trofe.png" style="width:20px"/>
                <span>${data[i].score}</span>
            </div>
        </li>`
        }
        return rank;
    }
};