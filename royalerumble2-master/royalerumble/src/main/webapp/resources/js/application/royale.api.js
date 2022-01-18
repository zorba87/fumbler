class RoyaleApi {
	constructor() {
		this.url = "https://api.royaleapi.com/";
		this.apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUxLCJpZGVuIjoiNDUxMjExODc0NTc1NDUwMTE0IiwibWQiOnt9LCJ0cyI6MTUyNzY0ODE3MjM5Mn0.OSfIRCUlyqEBUe2cXAwCtYPqOMlHoKMmufwoAvjwQcY";
		this.dataType = "json";
	}
	
	// callback함수를 입력받아 사용한다. 리턴없음
	getPlayer(tag, callback) {
		var param = {
				type : "get",
				url : this.url+"player/"+tag,
				headers : {
					auth: this.apiKey
				},
				dataType : this.dataType,
				beforeSend : function() {
					opt.ajax_last_num = opt.ajax_last_num + 1;
                    $('._app').html(`
						<div class="row" style="margin-top: 150px">
							<img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/>
						</div>`);
				},
            	error : function(){
					$(function(){
						$('._app').html(
						`<div class="text-center" style="margin-top: 300px;">
							<h1><i class="fas fa-exclamation-triangle" style="color:#CC0000"></i></h1>
                            <h3 class="font-weight-bold">해당 플레이어를 찾을 수 없습니다.<h3>
                        	<h5>태그를 확인해 주세요.</h5>
                        </div>`);
					})
				},
				success : callback
		};
		$.ajax(param);
	}
	
	// 상자를 가져오는 ajax 함수
	getChests(tag, callback) {
		var param={
				type : "get",
				url : this.url+"player/"+tag+"/chests",
				headers : {
					auth : this.apiKey
				},
				beforeSend : function() {

				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}

	getClan(tag, callback) {
		var param={
			type : "get",
			url : this.url+"clan/"+tag,
			headers : {
				auth : this.apiKey
			},
            beforeSend : function() {
                opt.ajax_last_num = opt.ajax_last_num + 1;
                $('._app').html(`
					<div class="row" style="margin-top: 150px">
						<img class="mx-auto" src="${opt.context}resources/image/etc/spin1.gif" style="width : 400px; margin: auto"/>
					</div>`);
            },
			dataType : this.dataType,
            error : function(){
                $(function(){
                    $('._app').html(
                        `<div class="text-center" style="margin-top: 300px;">
							<h1><i class="fas fa-exclamation-triangle" style="color:#CC0000"></i></h1>
                            <h3 class="font-weight-bold">해당 클랜을 찾을 수 없습니다.<h3>
                        	<h5>태그를 확인해 주세요.</h5>
                        </div>`);
                })
            },
			success : callback
		};
		$.ajax(param);
	}

	// 첫 페이지에서 popular Deck을 가져오기
	getPopularDecks(callback) {
		var param = {
				type : "get",
				url : this.url+"popular/decks?max=3",
				headers : {
					auth: this.apiKey
				},
				beforeSend : function() {

				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}
	
	// 플레이어 랭크 불러오기
	getPlayerRank(callback) {
		var param = {
				type : "get",
				url: this.url+"top/players",
				headers: {
					auth : this.apiKey
				},
				beforeSend : function() {
                    opt.ajax_last_num = opt.ajax_last_num + 1;
                    $("#rankTable").html(`
						<div class="row">
							<img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin:auto"/>
						</div>`);
				},
				dataType : this.dataType,
            	error : function(){
                    $(function(){
                        $('._app').html(
						`<div class="text-center" style="margin-top: 200px;">
							<h1><i class="fas fa-exclamation-triangle" style="color:#CC0000"></i></h1>
                            <h3 class="font-weight-bold">API 서버에 연결할 수 없습니다.<h3>
                        	<h5>잠시후에 이용해 주세요.</h5>
                        </div>`);
                    });
                },
				success : callback
		};
		$.ajax(param);
	}
	
	// clan 랭크 불러오기
	getClanRank(callback) {
		var param = {
				type: "get",
				url : this.url+"top/clans",
				headers : {
					auth : this.apiKey
				},
				beforeSend : function() {
                    opt.ajax_last_num = opt.ajax_last_num + 1;
                    $("#rankTable").html(`
						<div class="row">
							<img src="${opt.context}resources/image/etc/spin2.gif" style="width : 270px; margin:auto"/>
						</div>`);
				},
				dataType : this.dataType,
            	error : function(){
                    $('._app').html(
                        `<div class="text-center" style="margin-top: 200px;">
							<h1><i class="fas fa-exclamation-triangle" style="color:#CC0000"></i></h1>
                            <h3 class="font-weight-bold">API 서버에 연결할 수 없습니다.<h3>
                        	<h5>잠시후에 이용해 주세요.</h5>
                        </div>`);
                },
				success : callback
		};
		$.ajax(param);
	}

	getPlayerRankTop5(callback) {
		var param = {
				type : "get",
				url: this.url+"top/players?max=5",
				headers: {
					auth : this.apiKey
				},
				beforeSend : function() {

				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}

	getClanRankTop5(callback) {
		var param = {
				type: "get",
				url : this.url+"top/clans?max=5",
				headers : {
					auth : this.apiKey
				},
				beforeSend : function() {

				},
				dataType : this.dataType,
				success : callback
		};
		$.ajax(param);
	}

    getBattleLog(tag, callback) {
        var param = {
            type: "get",
            url : this.url+"player/"+tag+"/battle?max=20",
            headers : {
                auth : this.apiKey
            },
            beforeSend : function() {

            },
            dataType : this.dataType,
            error : function(){
                $('#battleSummary').html(
                    `<div class="text-center">
							<h6><i class="fas fa-exclamation-triangle" style="color:#CC0000"></i></h6>
                            <h6 class="font-weight-bold">API 서버에 연결할 수 없습니다.<h3>
                        	<h6>잠시후에 이용해 주세요.</h6>
                        </div>`);
            },
            success : callback
        };
        $.ajax(param);
    }

    getCards(callback) {
        var param={
            type: "get",
            url: this.url+"constants?keys=cards",
            headers : {
                auth : this.apiKey
            },
            beforeSend : function() {

            },
            dataType : this.dataType,
            success : callback
        };
        $.ajax(param);
    }

    getCardsStats(callback) {
        var param = {
            type : 'get',
            url: this.url+"constants?keys=cards_stats",
            headers : {
                auth : this.apiKey
            },
            beforeSend : function() {

            },
            dataType : this.dataType,
            success : callback
        };
        $.ajax(param);
    }




}