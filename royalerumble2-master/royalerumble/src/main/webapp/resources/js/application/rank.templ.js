var rankTempl = {
    rank: `
        <div class="row justify-content-center p-3" style="margin-top:80px; min-height: 1000px">
            <section>
                <div class="card mx-auto" style="width: 1110px; height: 100%;">
                    <div class="row text-center" style="height:100px;">
                        <div class="col-3"></div>
                        <div class="col-3 _rank_button active" id="playerRankPage">                           
                            <div class="text-dark" style="cursor:pointer;"
                                onclick="window.scrollTo(0,0);">
                                <h5 class="font-weight-bold" style="line-height: 100px">
                                    <img src="${opt.context}resources/image/icon/playersearch.png" style="height:40px"> 
                                    플레이어 랭킹
                                </h5>
                            </div>  
                        </div>
                        <div class="col-3 _rank_button" id="clanRankPage">
                            <div class="text-dark" style="cursor:pointer;"
                                onclick="window.scrollTo(0,0);">
                                <h5 class="font-weight-bold" style="line-height: 100px">
                                    <img src="${opt.context}resources/image/icon/clansearch.png" style="height:40px"> 
                                    클랜 랭킹
                                </h5>
                            </div>  
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <div class="card-body mt-2" id="rankTable">
                    </div>
                </div>
            </section>
        </div>`,

    playerRank: function (data) {

        var playerList = ``
        for (var i = 0; i < data.length; i++) {
            var arena = (data[i].arena.arena).replace(/(\s*)/g, ""); // 글자 내에 모든 공백 제거
            var clanName = "";
            var clanTag = "";
            var clanBadge = "";
            if (data[i].clan != null) {
                clanName = data[i].clan.name;
                clanTag = data[i].clan.tag;
                clanBadge = data[i].clan.badge.name;
            }
            else {
                clanName = "Not in Clan";
                clanBadge = "no_clan";
            }
            var delta = 0;
            var deltaValue = data[i].rank - data[i].previousRank;
            if (deltaValue < 0) {	// 랭크가 오름
                delta = `<span style="font-size: 10px; color:dodgerblue">▲${Math.abs(deltaValue)}</span>`;
            }
            else if (deltaValue > 0) { // 랭크가 내림
                delta = `<span style="font-size: 10px; color:red">▼${Math.abs(deltaValue)}</span>`;
            } else if (deltaValue == 0) {
                delta = `<span style="font-size: 10px; color:gray">-</span>`;
            }

            playerList += `
            <tr>
                <th scope="row" style="height: 30px; vertical-align: bottom; font-size: 17px; text-align: center">
                    <h6 class="position-relative font-italic" style="top:10px">${data[i].rank}</h6>
                    ${delta}
                </th>
                <td style="height: 30px; vertical-align: middle">
                    <span class="h6 ml-2 font-weight-bold position-relative _item_action" data-action="player-click" data-tag="${data[i].tag}" 
                            onclick="window.scrollTo(0,0);" style="cursor:pointer; top:6px; left: 2px;">${data[i].name}</span>
                            <br>
                    <span class="ml-2 position-relative" style="color: gray; top:6px; left: 2px; font-size: 12px;">#${data[i].tag}</span>
                </td>
                <td style="height: 30px; vertical-align: middle">
                    <img src="${opt.context}resources/image/badges/${clanBadge}.png" style="height: 25px;">
                    <span class="ml-2 position-relative _item_action" data-action="clan-click" data-tag="${clanTag}" 
                            onclick="window.scrollTo(0,0);" style="cursor:pointer; top:6px; left: 2px;">${clanName}</span>                   
                </td>
                <td style="height: 30px; vertical-align: middle">
                    <img src="${opt.context}resources/image/icon/trofe.png" style="height: 25px;">
                    <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${data[i].trophies}</span>
                </td>
            </tr>`;
        }

        var templ = `
        <table class="table table-sm" style="vertical-align: middle">
            <thead>
                <tr>
                    <th style="width: 50px; text-align: center">#</th>
                    <th style="width: 400px">플레이어</th>
                    <th style="width: 400px">클랜</th>
                    <th style="width: 100px">트로피</th>
                </tr>
            </thead>
            <tbody>
                ${playerList}
            </tbody>
        </table>
        `;
        return templ;
    },

    clanRank: function (data) {

        var clanList = ``
        for (var i = 0; i < data.length; i++) {
            var delta = 0;
            var deltaValue = data[i].rank - data[i].previousRank;
            if (deltaValue < 0) {	// 랭크가 오름
                delta = `<span style="font-size: 10px; color:dodgerblue">▲${Math.abs(deltaValue)}</span>`;
            }
            else if (deltaValue > 0) { // 랭크가 내림
                delta = `<span style="font-size: 10px; color:red">▼${Math.abs(deltaValue)}</span>`;
            } else if (deltaValue == 0) {
                delta = `<span style="font-size: 10px; color:gray">-</span>`;
            }
            clanList += `
                <tr>
                    <th scope="row" style="height: 30px; vertical-align: middle; font-size: 17px; text-align: center">
                        <h6 class="position-relative font-italic" style="top:10px">${data[i].rank}</h6>
                        ${delta}
                    </th>
                    <td style="height: 30px; vertical-align: middle">                     
                        <span class="h6 ml-2 font-weight-bold position-relative _item_action" data-action="clan-click" data-tag="${data[i].tag}"
                        onclick="window.scrollTo(0,0);" style="cursor:pointer; top:6px; left: 2px;">
                            <img src="${opt.context}resources/image/badges/${data[i].badge.name}.png" style="height: 25px;">
                            ${data[i].name}
                        </span>
                        <br>
                        <span class="ml-2 position-relative" style="color: gray; top:6px; left: 2px; font-size:12px;">#${data[i].tag}</span>
                    </td>
                    <td style="height: 30px; vertical-align: middle">
                        <span class="position-relative" style="top:6px;">${data[i].location.name}</span>
                    </td>
                    <td style="height: 30px; vertical-align: middle">
                        <img src="${opt.context}resources/image/icon/member.png" style="height: 25px;">
                        <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${data[i].memberCount}/50</span>
                    </td>
                    <td style="height: 30px; vertical-align: middle">
                        <img src="${opt.context}resources/image/icon/trofe.png" style="height: 25px;">
                        <span class="ml-2 _app_font position-relative" style="top:6px; left: 2px;">${data[i].score}</span>
                    </td>
                </tr>`;
        }

        var templ = `
            <table class="table table-sm" style="vertical-align: middle">
                <thead>
                    <tr>
                        <th style="width: 50px; text-align: center">#</th>
                        <th style="width: 400px">클랜</th>
                        <th style="width: 200px">지역</th>
                        <th style="width: 150px">클랜원</th>
                        <th style="width: 150px">클랜 트로피</th>
                    </tr>
                </thead>
                <tbody>
                    ${clanList}
                </tbody>
            </table>
            `;

        return templ;
    }
}