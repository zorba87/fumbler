$.fn.royaleCardsInfo = function(opt) {
	$('._search_app').remove(); // search 창 지움
	$('._app').html(cardsTempl.cards);
	
	var stats;
	
	opt.api.getCardsStats(function(data){
//		$("#cardInfo").html(cardsTempl.cardInfo(data));
		stats = data;
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

};

