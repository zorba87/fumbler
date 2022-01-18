var cardsTempl = {
		cards : `
			<div class="container" style="padding: 50px">
				<div class="row mt-5" style="justify-content:center">
					<div class="card col-7 mr-3">
						<h5 class="card-title mt-3 font-weight-bold">
							카드 목록
						</h5>
						<div class="card-body" id="cardList">
							<img src="${opt.context}resources/image/etc/spin2.gif" style="width:270px; margin-left:170px"/>
						</div>
					</div>
					<div class="card col-4" style="max-height:800px">
						<h5 class="card-title mt-3 font-weight-bold">
							카드정보
						</h5>
						<div class="card-body" id="cardInfo">
							<img src="${opt.context}resources/image/etc/spin2.gif" style="width:270px; margin-left:15px"/>
						</div>
					</div>
				</div>
			</div>
		`,
		
		cardList : function(data) {
			var cards=`
				<div class="row">
			`;
			for(var i=0; i<data.cards.length; i++) {
				var card = data.cards[i];
				
				cards += `
					<div class="cardOne col-2 my-2" data-key="${card.key}" data-type="${card.type}" data-name="${card.name}" data-elixir="${card.elixir}" data-desc="${card.description}">
						<a href="#">
									<div class="_card" style="background-image: url('${opt.context}resources/image/cards-png8/${card.key}.png')">
					                    <div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
					                        <span class="ml-2 _app_font">${card.elixir}</span>
					                    </div>
					                </div>
		                </a>
					</div>
				`;
			}
			cards += `</div>`;
			return cards;
		},
		
		card : function(obj, name, key, elixir, desc, type) {
			var info;
			switch(type) {
				case 'Troop':
					info = this.troopCard(obj, name, key, elixir, desc);
					break;
				case 'Building' :
					info = this.buildingCard(obj, name, key, elixir, desc);
					break;
				case 'Spell' :
					info = this.spellCard(obj, name, key, elixir, desc);
					break;
			};
			return info;
		},
			
		troopCard : function(obj, name, key, elixir, desc) {
			console.log("troopCard 들어옴");
			var card = obj;
			var name = name;
			var key = key;
			var elixir = elixir;
			var desc = desc;
			var cardInfo = `
					<div class="card-title row">
					
						<div class="_card col"  style="background-image:url('${opt.context}resources/image/cards-png8/${key}.png');height:200px" >
				        	<div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
		                        <span class="ml-2 _app_font">${elixir}</span>
		                    </div>
		                </div>
	                	<h5 class="col _app_font mt-5">${name}</h5>
		            </div>
	                <h5>${desc}</h5>
	                <hr/>
	                <div class="card-body">
	                	
	                </div>
			`;
			return cardInfo;
		},
		
		buildingCard : function(obj, name, key, elixir, desc) {
			var card = obj;
			var name = name;
			var key = key;
			var elixir = elixir;
			var desc = desc;
			var cardInfo = `
					<div class="card-title row">
					
						<div class="_card col"  style="background-image:url('${opt.context}resources/image/cards-png8/${key}.png');height:200px" >
				        	<div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
		                        <span class="ml-2 _app_font">${elixir}</span>
		                    </div>
		                </div>
		                
		                <h5 class="col _app_font mt-5">${name}</h5>
		            </div>
	                <h5>${desc}</h5>
	                <hr/>
	                <div class="card-body">
	                	
	                </div>
			`;
			return cardInfo;
		},
		
		spellCard : function(obj, name, key, elixir, desc) {
			var card = obj;
			var name = name;
			var key = key;
			var elixir = elixir;
			var desc = desc;
			var cardInfo = `
					<div class="card-title row">
					
						<div class="_card col"  style="background-image:url('${opt.context}resources/image/cards-png8/${key}.png');height:200px" >
				        	<div class="_elixir" style="background-image: url('${opt.context}resources/image/icon/elixir.png')">
		                        <span class="ml-2 _app_font">${elixir}</span>
		                    </div>
		                </div>
		                
		                <h5 class="col _app_font mt-5">${name}</h5>
		            </div>
	                <h5>${desc}</h5>
	                <hr/>
	                <div class="card-body">
	                	
	                </div>
			`;
			return cardInfo;
		}
}