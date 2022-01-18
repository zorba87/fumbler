var battleLogTempl = {
    battleLog: function (data) {
        var templ = '';
        var prevResult = '';
        var winCount = 0, loseCount = 0, drawCount = 0;
        var svCount = 0, sdCount = 0;
        var svMax = [], sdMax = [];
        var summaryTopTempl = '';
        var summaryBottomTempl = '';
        for (var i = 0; i < data.length; i++) {
            var teamPlayer = '', teamMember = '', opponent1 = '', opponent2 = '';
            var winner = '', pannelColor = '';

            if(data[i].type === '2v2') data[i].type = '2 v 2';
            else if(data[i].type === 'PvP') data[i].type ='랭킹전';
            else if(data[i].type === 'clanWarCollectionDay') data[i].type ='클랜전';
            else if(data[i].type === 'clanWarWarDay') data[i].type = '클랜전';
            else if(data[i].type === 'clanMate') data[i].type = '클랜전';
            else if(data[i].type === 'challenge') data[i].type = '도전';
            else if(data[i].type === 'friendly') data[i].type = '이벤트';

            if (data[i].winner > 0) {
                winner = '<span style="color:dodgerblue">승</span>';
                pannelColor = 'blue'
                winCount++;
                svCount++;
                sdCount = 0;
                if (prevResult === 'win') {
                    svMax.push(svCount);
                }
                prevResult = 'win';
            } else if (data[i].winner == 0) {
                winner = '<span style="color:gray">무</span>';
                prevResult = 'draw';
                drawCount++;
                svCount = 0;
                sdCount = 0;
            } else {
                winner = '<span style="color:red">패</span>';
                pannelColor = 'red'
                loseCount++;
                sdCount++;
                svCount = 0;
                if (prevResult === 'lose') {
                    sdMax.push(sdCount);
                }
                prevResult = 'lose';
            }
            //편법...화면정렬 너무어려워서 ....나눠서붙임
            if(i < 10) {
                summaryTopTempl += `
                <td class="_battle_${pannelColor}" style="border: #DDDDDD solid 1px; width: 35px; height: 35px;">
                    ${winner}
                </td>`
            } else {
                summaryBottomTempl += `
                <td class="_battle_${pannelColor}" style="border: #DDDDDD solid 1px; width: 35px; height: 35px;">
                    ${winner}
                </td>`
            }

            for (var j = 0; j < data[i].team.length; j++) {
                var card = '';
                var clanName = '<br>';
                var clanBadge = '';
                var clanTag = '';

                if (!(data[i].team[j].clan === null)) {
                    clanName = data[i].team[j].clan.name;
                    clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].team[j].clan.badge.name}.png" style="height: 13px;">`
                    clanTag = data[i].team[j].clan.tag;
                }

                if (opt.keyword === data[i].team[j].tag) {
                    for (var k = 0; k < data[i].team[j].deck.length; k++) {
                        card += `
                                <div class="_battle_card" style="float:left; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                                    </div>
                                </div>`
                    }
                    teamPlayer = `
                        <div class="_battle_inner" style="width:300px; height:100px;">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].team[j].tag}" style="cursor:pointer; font-size: 14px"
                                    onclick="window.scrollTo(0,0);">
                                    ${data[i].team[j].name}
                                </span>
                                <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                    onclick="window.scrollTo(0,0);">
                                    ${clanBadge}
                                    ${clanName}
                                </p>
                            </div>
                        </div>`
                } else {
                    for (var k = 0; k < data[i].team[j].deck.length; k++) {
                        card += `
                                <div class="_battle_card" style="float:left; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                                    </div>
                                </div>`
                    }

                    teamMember = `
                        <div class="_battle_inner" style="width:300px; height:100px; margin-top: 10px">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                 <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].team[j].tag}" style="cursor:pointer; font-size: 14px"
                                    onclick="window.scrollTo(0,0);">
                                    ${data[i].team[j].name}
                                </span>
                                <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                    onclick="window.scrollTo(0,0);">
                                    ${clanBadge}
                                    ${clanName}
                                </p>
                            </div>
                        </div>`
                }
            }
            if (data[i].teamSize == 2) {

                for (var j = 0; j < data[i].opponent.length; j++) {
                    var card = '';
                    var clanName = '<br>';
                    var clanBadge = '';
                    var clanTag = '';

                    if (!(data[i].opponent[j].clan === null)) {
                        clanName = data[i].opponent[j].clan.name;
                        clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].opponent[j].clan.badge.name}.png" style="height: 13px;">`
                        clanTag = data[i].opponent[j].clan.tag;
                    }

                    if (j == 0) {
                        for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                            card += `
                                <div class="_battle_card" style="float: right;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                                    <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                        <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                                    </div>
                                </div> 
                            `
                        }
                        opponent1 = `
                            <div class="_battle_inner" style="width:300px; height:100px; float: right;">
                                <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                                    <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].opponent[j].tag}" style="cursor:pointer; font-size: 14px"
                                        onclick="window.scrollTo(0,0);">
                                        ${data[i].opponent[j].name}
                                    </span>
                                    <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                        onclick="window.scrollTo(0,0);">
                                        ${clanBadge}
                                        ${clanName}
                                    </p>
                                </div>
                                <div style="width: 170px; height:100px;float:left">
                                    ${card}
                                </div>
                            </div>`
                    } else {
                        for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                            card += `
                            <div class="_battle_card" style="float: right;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                                <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                    <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                    <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                                </div>
                            </div>
                            `
                        }

                        opponent2 = `
                        <div class="_battle_inner" style="width:300px; height:100px; margin-top: 10px; float: right;">
                            <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                                <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].opponent[j].tag}" style="cursor:pointer; font-size: 14px"
                                    onclick="window.scrollTo(0,0);">
                                    ${data[i].opponent[j].name}
                                </span>
                                <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                    onclick="window.scrollTo(0,0);">
                                    ${clanBadge}
                                    ${clanName}
                                </p>
                            </div>
                            <div style="width: 170px; height:100px;float:left; ">
                                ${card}
                            </div>
                        </div>`
                    }
                }

                templ += `
                <li class="list-group-item mt-2 z-depth-1 _battle_log_team _battle_${pannelColor}">
                    <div class="_battle_wrapper" style="width:300px; height:230px; float:left">
                        ${teamPlayer}
                        <div style="width:250px; height:1px; background-color: #DDDDDD; margin-top:14px">
                        </div>
                        ${teamMember}
                    </div>
                    <div class="_battle_info" style="width:80px; height:100px; float:left; margin-top:75px">
                        <div class="pt-3 text-center" style="height: 35px">
                            <span class="_app_font mr-2" style="font-size: 18px; width:15px; display:inline-block;">${data[i].teamCrowns}</span>                 
                            <img class="position-relative" src="${opt.context}resources/image/icon/attack.png" style="top:-4px; height: 20px;">
                            <span class="_app_font ml-2" style="font-size: 18px; width:15px; display:inline-block;">${data[i].opponentCrowns}</span>  
                        </div>
                        <div class="mt-1 font-weight-bold text-center" style="font-size: 12px;">
                            ${data[i].type}
                        </div>
                        <div class="font-weight-bold text-center" style="font-size: 15px">
                            ${winner}
                        </div>
                    </div>
                    <div class="_battle_wrapper" style="width:300px; height:230px; float:left">
                        ${opponent1}
                        <div style="width:250px; height:1px; background-color: #DDDDDD; margin-top: 14px; float: right;">
                        </div>
                        ${opponent2}
                    </div>
                </li>`
                //팀전이 아닐경우
            } else {
                var team = '', opponent = '';
                for (var j = 0; j < data[i].team.length; j++) {
                    var card = '';
                    var clanName = '<br>';
                    var clanBadge = '';
                    var trophyChange = ''
                    for (var k = 0; k < data[i].team[j].deck.length; k++) {
                        card += `
                        <div class="_battle_card" style="float:left;  margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].team[j].deck[k].key}.png')">
                            <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].team[j].deck[k].elixir}</div>
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:15px;">Lv.${data[i].team[j].deck[k].level}</div>
                            </div>
                        </div>`

                    }
                    if (!(data[i].team[j].clan === null)) {
                        clanName = data[i].team[j].clan.name;
                        clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].team[j].clan.badge.name}.png" style="height: 13px;">`
                        clanTag = data[i].team[j].clan.tag;
                    }
                    if (!(data[i].team[j].trophyChange === undefined)) {
                        if (data[i].team[j].trophyChange > 0) {
                            trophyChange = `<span style="color:dodgerblue">+${data[i].team[j].trophyChange}</span>`
                        } else {
                            trophyChange = `<span style="color:red">${data[i].team[j].trophyChange}</span>`
                        }

                    }
                    team = `
                        <div class="_battle_inner"style="width:300px; height:110px; float:left">
                            <div style="width: 160px; height:100px;float:left">
                                ${card}
                            </div>
                            <div style="width:130px; height:100px; margin-top:4px; float: left; padding-left: 10px">
                                <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].team[j].tag}" style="cursor:pointer; font-size: 14px"
                                    onclick="window.scrollTo(0,0);">
                                    ${data[i].team[j].name}
                                </span>
                                <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                    onclick="window.scrollTo(0,0);">
                                    ${clanBadge}
                                    ${clanName}
                                </p>
                                <div class="mt-4">
                                    <img src="${opt.context}resources/image/icon/trofe.png" style="height: 12px;">
                                    <span class="_app_font" style="font-size: 12px">
                                        ${data[i].team[j].startTrophies}
                                    </span>
                                    <span class="_battle_font" style="font-size: 12px;">
                                        ${trophyChange}
                                    </span>
                                </div>
                            </div>
                        </div>`
                }

                for (var j = 0; j < data[i].opponent.length; j++) {
                    var card = '';
                    var clanName = '<br>';
                    var clanBadge = '';
                    for (var k = 0; k < data[i].opponent[j].deck.length; k++) {
                        card += `
                        <div class="_battle_card" style="float: right; margin-top:4px; background-image: url('${opt.context}resources/image/cards-png8/${data[i].opponent[j].deck[k].key}.png')">
                            <div class="_battle_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; left:-2px; top:2px;">${data[i].opponent[j].deck[k].elixir}</div>
                                <div class="ml-2 _app_font position-relative" style="font-size: 10px; top:15px;">Lv.${data[i].opponent[j].deck[k].level}</div>
                            </div>
                        </div>`

                    }
                    if (!(data[i].opponent[j].clan === null)) {
                        clanName = data[i].opponent[j].clan.name;
                        clanBadge = `<img src="${opt.context}resources/image/badges/${data[i].opponent[j].clan.badge.name}.png" style="height: 13px;">`
                        clanTag = data[i].opponent[j].clan.tag;
                    }
                    opponent = `
                    <div class="_battle_inner" style="width:300px; height:110px; float: left">
                        <div style="width:130px; height:100px; margin-top:4px; float: left; text-align: right">
                            <span class="font-weight-bold _item_action" data-action="player-click" data-tag="${data[i].opponent[j].tag}" style="cursor:pointer; font-size: 14px"
                                onclick="window.scrollTo(0,0);">
                                ${data[i].opponent[j].name}
                            </span>
                            <p class="_item_action" data-action="clan-click" data-tag="${clanTag}" style="cursor:pointer; font-size: 11px"
                                onclick="window.scrollTo(0,0);">
                                ${clanBadge}
                                ${clanName}
                            </p>
                            <div class="mt-4">
                                <img src="${opt.context}resources/image/icon/trofe.png" style="height: 12px;">
                                <span class="_app_font" style="font-size: 12px">
                                    ${data[i].opponent[j].startTrophies}
                                </span>
                            </div>
                        </div>
                        <div style="width: 170px; height:100px;float:left">
                            ${card}
                        </div>
                    </div>
                    `
                }


                templ += `
                <li class="list-group-item mt-2 z-depth-1 _battle_log _battle_${pannelColor}">
                    ${team}
                    <div class="_battle_info" style="width:80px; height:100px; float:left; padding-top: 10px"> 
                        <div class="pt-3 text-center" style="height: 35px">
                            <span class="_app_font mr-2" style="font-size: 18px; width:15px; display:inline-block;">${data[i].teamCrowns}</span>                 
                            <img class="position-relative" src="${opt.context}resources/image/icon/attack.png" style="top:-4px; height: 20px;">
                            <span class="_app_font ml-2" style="font-size: 18px; width:15px; display:inline-block;">${data[i].opponentCrowns}</span>  
                        </div>
                        <div class="mt-1 font-weight-bold text-center" style="font-size: 12px;">
                            ${data[i].type}
                        </div>
                        <div class="font-weight-bold text-center" style="font-size: 15px">
                            ${winner}
                        </div>
                    </div>
                    ${opponent}     
                </li>`
            }
        }
        //summary 만들기
        var battleSummaryId = document.getElementById('battleSummary');
        function resultMax(array) {
            var max = 0;
            for (var i = 0; i < array.length; i++) {
                if (array[i] > max) {
                    max = array[i];
                }
            }
            return max;
        }

        var summaryTempl = `
            <div class="row">
                <canvas id="doughnutChart" style="max-width: 230px;"></canvas>
                <div class="position-relative" style="left:-127px; top:45px; height: 28px; width:28px">
                    <span class="font-weight-bold" style="font-size: 12px">${((winCount/20)*100).toFixed(0)}%</span>
                </div>
                <div class="position-relative text-center" style="left:-75px; top:25px">
                    <span class="font-weight-bold">최근 20경기 전적</span>
                    <br>
                    <span style="color:dodgerblue">${winCount}승</span>
                    <span> / </span>
                    <span style="color:gray">${drawCount}무</span>
                    <span> / </span>
                    <span style="color:red">${loseCount}패</span>
                    <br>
                    <span style="font-size:11px; color:dodgerblue">최다연승 : ${resultMax(svMax)}</span>
                    <span style="font-size:11px; color:red">최다연패 : ${resultMax(sdMax)}</span>
                </div>
                <table class="position-relative" style="left:-60px; top:19px">
                    <tbody>
                        <tr class="text-center" id="summaryTop">
                        </tr>
                        <tr style="height: 10px;">
                        </tr>
                        <tr class="text-center" id="summaryBottom">
                        </tr>                            
                    </tbody>
                </table>
                </div>
            </div>`

        battleSummaryId.innerHTML = summaryTempl;

        var summaryTopId = document.getElementById('summaryTop');
        var summaryBottomId = document.getElementById('summaryBottom');

        summaryTopId.innerHTML = summaryTopTempl;
        summaryBottomId.innerHTML = summaryBottomTempl;

        var ctxD = document.getElementById("doughnutChart").getContext('2d');

        Chart.defaults.global.legend.display = false;

        var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
                labels:["승","무","패"],
                datasets: [
                    {
                        data: [winCount, drawCount, loseCount],
                        backgroundColor: ["dodgerblue", "gray", "red"],
                    }
                ]
            },
            options: {
                responsive: true,
            }
        });

        return templ;
    }
};