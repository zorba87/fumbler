var profileTempl = {
    player : function(data) {
        console.log(data);
    var arenaLevel = data.arena.arena;
    var arena = arenaLevel.replace(/(\s*)/g,""); // 모든 공백 제거
    var clan="";
    var clanImg="";
    var clanTag="";
    var cardList="";
    var bestSeason = "-";
    var averageElixir = 0;
    for(var i = 0; i < data.currentDeck.length; i++) {
        var card = data.currentDeck[i];
        var elixir = data.currentDeck[i].elixir;
        averageElixir += elixir;
        cardList += `
        <div class="_card" style="background-image: url('${opt.context}resources/image/cards-png8/${card.key}.png')">
            <div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                <span class="ml-2 _app_font">${card.elixir}</span>
            </div>
        </div>`;
    }
    averageElixir = (averageElixir/8).toFixed(1); 
    if(data.leagueStatistics !== undefined) {
        bestSeason = data.leagueStatistics.bestSeason.trophies;
    }
    if(data.clan !=null) {
        clan = data.clan.name;
        clanImg= data.clan.badge.name
        clanTag = data.clan.tag;
    }
    else {
        clan = "Not in Clan";
        clanImg="no_clan";
    }
    
    var templ = `
    <div class="header" style="margin-top:50px; height:220px;background-image: url('${opt.context}resources/image/etc/top_blue.png')">
    </div>
    <div class="row justify-content-center">
        <section class="position-relative" style="top:-110px; left:-30px">
            <div class="card _profile_app" style="width:130px; height:130px">
                <div class="_large_icon mt-2 mx-auto" style="background-image: url('${opt.context}resources/image/arenas/${arena}.png')">
                    <div class="_lv2_icon position-relative" style="left: 90px; top:-25px; background-image: url('${opt.context}resources/image/icon/lv.png');">
                    <span class="_app_font position-relative" style="font-size: 20px; top:4px; left:10px">${data.stats.level}</span>
                </div>    
                </div>
            </div>
        </section>
        <section class="position-relative" style="top:-110px; left:0px;">
            <div class="" style="width:420px">
                <div class="row">
                    <div class="col-8">
                        <h3 class="font-weight-bold text-white">${data.name}</h3>                       
                        <span class="font-weight-bold text-light _item_action" data-action="player-click" data-tag="${data.tag}" style="cursor:pointer;"
                        onclick="window.scrollTo(0,0);">#${data.tag}</span>                       
                    </div>
                    <div class="col-4">
                        <div class="position-relative" style="top:35px">
                            <span class="font-weight-bold text-white text-center">현재 트로피</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 text-left">
                        <h6 class="mt-1" style="left:-30px">                                                   
                            <div class="text-white">
                                <img src="${opt.context}resources/image/badges/${clanImg}.png" style="left: -50px; height: 30px;">
                                <span class="font-weight-bold _item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer;"
                                    onclick="window.scrollTo(0,0);">${clan}</span>
                            </div>
                        </h6>
                    </div>
                    <div class="col-6 text-center">
                        <h6 class="mt-1 ml-3">
                            <img src="${opt.context}resources/image/icon/trofe.png" style="height: 20px;">
                            <span class="_app_font ml-1">${data.trophies}</span>
                        </h6>
                    </div>
                </div>
            </div>
        </section>
        <section class="position-relative" style="top:-110px; left:30px">
            <div class="card _profile_app" style="width:500px; height:130px;">
                <div class="row mt-3 ml-2" style="font-size: 12px">
                    <div class="col-3">
                        최대 트로피
                    </div>
                    <div class="col-4">
                        지원합계
                    </div>
                    <div class="col-5">
                        도전 최대 승리 / 획득 카드
                    </div>
                </div>
                <div class="row mt-1 ml-2">
                    <div class="col-3">
                        <img src="${opt.context}resources/image/icon/trofe.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.stats.maxTrophies}</span>
                        <!--maxTrophies-->
                    </div>
                    <div class="col-4">
                        <img src="${opt.context}resources/image/icon/card.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.stats.totalDonations}</span>
                        <!--totalDonations-->
                    </div>
                    <div class="col-5">
                        <img src="${opt.context}resources/image/icon/challenge.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.stats.challengeMaxWins}/${data.stats.challengeCardsWon}</span>
                    </div>
                </div>
                <div class="row mt-2 ml-2" style="font-size: 12px">
                    <div class="col-3">
                        시즌 최고 트로피
                    </div>
                    <div class="col-4">
                        전적
                    </div>
                    <div class="col-5">
                        토너먼트 최대 승리 / 획득카드
                    </div>
                </div>
                <div class="row mt-1 ml-2">
                    <div class="col-3">
                        <img src="${opt.context}resources/image/icon/trofe.png" style="height: 20px;">
                        <span class="_app_font ml-1">${bestSeason}</span>
                        <!--bestseason-->
                    </div>
                    <div class="col-4">
                        <img src="${opt.context}resources/image/icon/attack.png" style="height: 20px;">
                        <span class="_app_font" style="font-size: 13px">${data.games.wins}W/${data.games.losses}L</span>
                    </div>
                    <div class="col-5">
                        <img src="${opt.context}resources/image/icon/tourment.png" style="height: 20px;">
                        <span class="_app_font ml-1">0/${data.stats.tournamentCardsWon}</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div class="card _chest_box_app mx-auto" style="width: 1110px; height: 150px; top:-45px">
        <h5 class="font-weight-bold mt-3 ml-3">상자 예측</h5>
        <div class="row justify-content-center mt-2" id="chests">
            <img src="${opt.context}resources/image/etc/spin2.gif" style="height: 10%; width: 10%"/>
        </div>
    </div>
    <div class="mb-5">
        <div class="row justify-content-center">
            <div class="card" style="width:370px; height: 320px;">
                <div class="card-header">
                    <h5 class="font-weight-bold">최근 사용한 덱</h5>
                    <div class="row">
                        <div class="col-6">
                            평균 엘릭서
                            <img src="${opt.context}resources/image/icon/elixir.png" style="width: 20px" />
                            <span class="font-weight-bold _app_font">2.3</span>
                        </div>
                        <div class="col-6 text-right">
                            <span class="font-weight-bold">덱 복사</span>
                            <a class="btn-link" href="${data.deckLink}">
                                <img src="${opt.context}resources/image/icon/cardcopy.png" style="width:25px" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="row card-body">
                    ${cardList}
                </div>
            </div>
            <section class="ml-3">
                <div class="card _battle_summary" style="width:725px; height: 200px;">
                    <div style="width:725px; height: 46px; border-bottom: 1px solid #DDDDDD">
                        <div class="_menu_item _active">
                            <a class="text-dark _item_action">전체</a>
                        </div>
                        <div class="_menu_divide"></div>
                        <div class="_menu_item">
                            <a class="text-dark _item_action">랭킹전</a>
                        </div>
                        <div class="_menu_divide"></div>
                        <div class="_menu_item ">
                            <a class="text-dark _item_action">도전</a>
                        </div>
                        <div class="_menu_divide"></div>
                        <div class="_menu_item">
                            <a class="text-dark _item_action">토너먼트</a>
                        </div>
                        <div class="_menu_divide"></div>
                        <div class="_menu_item">
                            <a class="text-dark _item_action">2 v 2</a>
                        </div>
                        <div class="_menu_divide"></div>
                        <div class="_menu_item">
                            <a class="text-dark _item_action">이벤트</a>
                        </div>
                        <div class="_menu_divide"></div>
                    </div>
                    <div class="_battle_summary_info mt-3" id="battleSummary">
                        <div class="row justify-content-center">
                            <img src="${opt.context}resources/image/etc/spin2.gif" style="width:23%; height: 23%;"/>
                        </div>
                    </div>
                </div>
                <ul class="list-group list-group-flush _battle_list" id="battleList">
                </ul>
            </section>
        </div>
    </div>`
    return templ;
    },
        
    playerChests : function(data) {
        function sortObject () {
            var sortData=[];
            for(var keys in data) {
                if(keys=="upcoming") {
                    for(var i=0; i<data["upcoming"].length; i++) {
                        sortData.push({key:i,value:data["upcoming"][i] }); // data 안에 upcoming 키 안의 i번째 라는 뜻
                    }
                }
                else {
                    sortData.push({key: data[keys] , value: keys});
                }
            }       
            
            sortData.sort(function(a,b) {
                return a.key < b.key ? -1 : a.key > b.key? 1:0; 
            });
            return sortData;
        }
        var chests = sortObject(data);
        var templ = '';
        for(var i=0; i<chests.length; i++) {
            var index = chests[i].key == 0? "Next" : "+"+chests[i].key;
            templ += `
            <div class="_chest" style="background-image: url('${opt.context}resources/image/chests/chest-${chests[i].value}.png'); margin-right:7px">
                <p>${index}</p>
            </div>`;
        }
        return templ;
    },

    clan : function(data) {
    var memberList = ``;
    for (var i=0; i<data.members.length; i++) {
        var member = data.members[i];
        var crown = '0';

        if(member.clanChestCrowns !== null){
            crown = member.clanChestCrowns;
        }
        memberList += `
        <tr>
            <th scope="row" class="font-italic" style="height: 30px; vertical-align: middle; font-size: 17px; text-align: center">${i+1}</th>
            <td style="height: 30px; vertical-align: middle">
                <span class="h6 font-weight-bold _item_action" data-action="player-click" data-tag="${member.tag}" style="cursor:pointer;"
                            onclick="window.scrollTo(0,0);">
                    ${member.name}
                </span>
                <br>
                <span style="font-size: 12px">#${member.tag}</span>
            </td>
            <td style="height: 20px; vertical-align: middle">
                <div class="_lv_icon" style="background-image: url('${opt.context}resources/image/icon/lv.png');">
                    <div class="mt-2">
                        <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${member.expLevel}</span>
                    </div>
                </div>
            </td>
            <td style="height: 30px; vertical-align: middle">
                <img src="${opt.context}resources/image/icon/crown.png" style="height: 25px;">
                <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${crown}</span>
            </td>
            <td style="height: 30px; vertical-align: middle">
                <img src="${opt.context}resources/image/icon/card.png" style="height: 25px;">
                <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${member.donations}</span>
            </td>
            <td style="height: 30px; vertical-align: middle">
                <img src="${opt.context}resources/image/icon/trofe.png" style="height: 25px;">
                <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${member.trophies}</span>
            </td>
        </tr>`;
    }

    var templ = `
    <div class="header" style="margin-top:50px; height:220px;background-image: url('${opt.context}resources/image/etc/top.png')">
    </div>
    <div class="row justify-content-center">
        <section class="position-relative" style="top:-110px; left:-40px">
            <div class="card _profile_app" style="width:130px; height:130px">
                <div class="position-relative" style="left:10px; top:-10px">
                    <div class="_large2_icon mt-3 ml-2" style="background-image: url('${opt.context}resources/image/badges/${data.badge.name}.png')">
                    </div>
                </div>
            </div>
        </section>
        <section class="position-relative" style="top:-110px; left:0px;">
            <div class="" style="width:400px">
                <div class="row">
                    <div class="col-10">
                        <h2 class="font-weight-bold text-white">${data.name}</h2>
                        <span class="font-weight-bold text-light _item_action" data-action="clan-click" data-tag="${data.tag}" style="cursor:pointer;"
                        onclick="window.scrollTo(0,0);">#${data.tag}
                        </span>                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 text-left">
                        <h6 class="mt-1" style="left:-30px">
                            <span class="font-weight-bold text-white">공개여부 : ${data.type}</span>
                        </h6>
                    </div>
                </div>
            </div>
        </section>
        <section class="position-relative" style="top:-110px; left:40px">
            <div class="card _profile_app" style="width:500px; height:130px;">
                <div class="row mt-3 ml-2" style="font-size: 14px">
                    <div class="col-sm-7">
                        <h6 class="font-weight-bold">클랜 정보</h6>
                    </div>
                    <div class="col-sm-5">
                        클랜원
                    </div>
                </div>
                <div class="row ml-2">
                    <div class="col-3"></div>
                    <div class="col-4"></div>
                    <div class="col-5">
                        <img src="${opt.context}resources/image/icon/member.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.memberCount} / 50</span>
                    </div>
                </div>
                <div class="row mt-1 ml-2" style="font-size: 14px">
                    <div class="col-3">
                        클랜 트로피
                    </div>
                    <div class="col-4">
                        트로피 조건
                    </div>
                    <div class="col-5">
                        총 지원량
                    </div>
                </div>
                <div class="row mt-1 ml-2">
                    <div class="col-3">
                        <img src="${opt.context}resources/image/icon/trofe.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.score}</span>
                    </div>
                    <div class="col-4">
                        <img src="${opt.context}resources/image/icon/trofe.png" style="height: 20px;">
                        <span class="_app_font" style="font-size: 13px">${data.requiredScore}</span>
                    </div>
                    <div class="col-5">
                        <img src="${opt.context}resources/image/icon/card.png" style="height: 20px;">
                        <span class="_app_font ml-1">${data.donations}</span>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="card mx-auto" style="width: 1110px; height: 100%; top:-30px">
                <div class="card-header text-center">${data.description}</div>
                <div class="card-body">
                    <table class="table table-sm" style="vertical-align: middle">
                        <thead>
                            <tr>
                                <th style="width: 30px; text-align: center">#</th>
                                <th style="width: 250px">플레이어</th>
                                <th style="width: 100px">레벨</th>
                                <th style="width: 100px">크라운</th>
                                <th style="width: 100px">지원</th>
                                <th style="width: 100px">트로피</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${memberList}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>`;
    return templ;
    },
};
