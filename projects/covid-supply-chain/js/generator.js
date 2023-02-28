let selectCount = 0;
let generated = false;
let parentsite = "";

function init() {

	parentsite = xtalk.parentDomain;

	if (parentsite == undefined || parentsite == null || parentsite == "" || parentsite == "http" || parentsite == 'https://ots.nbcwpshield.com/') {
		parentsite = "https://www.nbcnewyork.com/";
	}

	$('.form-select').on('change', function(){
		checkSelects();
	});

	$('#generate').click(function(){
		generated = true;
		generateText();
	});

	$("#startOver").click(function() {
		location.reload();
	});

	//DATAWRAPPER
	!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();

	xtalk.signalIframe();

}

function checkSelects() {
	selectCount = 0;

	for (let i=0; i<12; i++) {
		if ($("#g" + i).val() != null) {
			selectCount ++;
		}
	}

	if (selectCount == 12) {
		$("#generate").removeClass("disabled");
		$("#generate").removeClass("btn-secondary");
		$("#generate").addClass("btn-primary");
		$("#generate").removeAttr("disabled");
		if (generated) {
			generateText();
		}

		$("#startOver").show();
	}


}

function generateText () {

		$('.allresponses').html('<p class="responses"><span class="emph">Within the next few months, you...</span>are <span id="r0" class="results"></span> to face delays and shortages in your day-to-day life. Since you are <span id="r1" class="results"></span> </p><p class="responses"><span id="r2" class="results"></span><span id="r2b" class="results"></span></p><p class="responses"<span id="r4" class="results"></span></p><p class="responses" id="c-jobs"></p> <p class="responses">During the times you eat in, <span id="r5" class="results"> </span><span id="r6" class="results"> </span></p><p class="responses"><span id="r7" class="results"></span></p><p class="responses" id="c-home"></p><p class="responses"><span id="r8" class="results"></span> </p><p class="responses">Your holiday plans <span id="r9" class="results"></span> while plane tickets remain, largely, on par with last year\'s prices with little to no price hike, <mark> hotels and motels</mark> have increased charges by 25.5% within the past year as of October.</p><p class="responses">Expect severe delays on gifts for the holidays this year, thanks to a shortage in labor in the transportation, warehousing and utilities industry. <mark>Seven percent, or close to 2 million</mark>, jobs in the sector were unfilled as of August, which could spell trouble for shipping services as we head into the holiday season. </p><p class="responses"><span id="r10" class="results"></span> <span id="r11" class="results"></span></p><div class="prompt"><em>Change your mind? Select a different answer from the dropdown menus to generate a new outcome.</em></div>');

			$('.responses').animate({	opacity: 100 }, 10000)

			$('.prompt').animate({opacity: 100}, 30000)

			//TEXT RESPONSES
			switch($('#g0').val()) {
				case "g0-a":
					if (($('#g1').val() == 'g1-a') || ($('#g1').val() == 'g1-c') || ($('#g1').val() == 'g1-d')) {
						$('#r0').html('<mark>highly likely</mark>')
					} else if ($('#g1').val() == 'g1-e') {
						$('#r0').html('<mark>less likely</mark>')
					} else {
						$('#r0').html('<mark>likely</mark>')
					}
					break;
				case "g0-b":
					if (($('#g1').val() == 'g1-a') || ($('#g1').val() == 'g1-c') || ($('#g1').val() == 'g1-d')) {
						$('#r0').html('<mark>highly likely</mark>')
					} else if ($('#g1').val() == 'g1-e') {
						$('#r0').html('<mark>less likely</mark>')
					} else {
						$('#r0').html('<mark>likely</mark>')
					}
					break;
				case "g0-c":
					if (($('#g1').val() == 'g1-a') || ($('#g1').val() == 'g1-c') || ($('#g1').val() == 'g1-d')) {
						$('#r0').html('<mark>highly likely</mark>')
					} else if ($('#g1').val() == 'g1-e') {
						$('#r0').html('<mark>less likely</mark>')
					} else {
						$('#r0').html('<mark>likely</mark>')
					}
					break;
				case "g0-d":
					if (($('#g1').val() == 'g1-a') || ($('#g1').val() == 'g1-c')) {
						$('#r0').html('<mark>highly likely</mark>')
					} else if (($('#g1').val() == 'g1-') || ($('#g1').val() == 'g1-d')) {
						$('#r0').html('<mark>likely</mark>')
					} else {
						$('#r0').html('<mark>not as likely</mark>')
					}
					break;
			}

			switch($('#g1').val()) {
				case "g1-":
					$('#r1').html('living with a partner, expect to see a spike in price or even temporary shortages on household items and groceries like <mark>toilet paper</mark>, <mark>coffee</mark>, <mark>cheese</mark> and <mark>beef</mark>.')
					break;
				case "g1-a":
					$('#r1').html('supporting a family, expect to see a spike in price on daily necessities like <mark>school supplies</mark>, <mark>toilet paper</mark>, <mark>holiday decorations</mark> and even <mark>toys</mark>.')
					break;
				case "g1-b":
					if ($('#g0').val() == "g0-a") {
						$('#r1').html('living with your parents, expect to see a spike in price or even temporary shortages on household items and groceries like <mark>toilet paper</mark>, <mark>coffee</mark>, <mark>cheese</mark> and <mark>beef</mark>. You yourself may shell out more to replace <mark>school supplies</mark> halfway into the school year.')
					} else {
						$('#r1').html('living with older or elderly parents, expect to see a spike in price or even temporary shortages on household items and groceries like <mark>toilet paper</mark>, <mark>coffee</mark>, <mark>cheese</mark> and <mark>beef</mark>.') }
					break;
				case "g1-c":
					$('#r1').html('raising a child or children, expect to see price hikes or outright shortages on items and services you need for your little ones: <mark>disposable diapers</mark> are <a href="https://www.today.com/parents/covid-19-pandemic-leads-severe-diaper-need-babies-t180777" target="_blank">in short supply</a> for many young families. <mark>Toys</mark>, <mark>school supplies</mark> and <mark>electronics</mark> are among the items most impacted by supply chain issues and increased demand due to the pandemic.')
					break;
				case "g1-d":
					$('#r1').html('supporting a multi-generational household, expect to see price hikes or increased demand from other consumers to affect much of your <mark>household needs</mark>, <mark>transportation</mark> and <mark>grocery bill</mark>.')
					break;
				case "g1-e":
					$('#r1').html('responsible for only your own needs, you may face <mark>less shortages or delays</mark> than other households, pending other aspects of your lifestyle.')
					break;
			}

			switch($('#g2').val()) {
				case "g2-a":
					if (($('#g3').val() == 'g3-a')) {
						$('#r2').html('You are highly likely to pay more to get to work: as of October, <mark>gas prices were up 49.64%</mark> nationwide over the same time the year before.')
					} else if ($('#g3').val() == 'g3-f') {
						$('#r2').html('')
					} else {
						$('#r2').html('You are likely to save on your method of commute – there are <mark>no increased costs or delays</mark> associated with how you get yourself to the office.')
					}
					break;

				case "g2-b":
					if (($('#g3').val() == 'g3-a')) {
						$('#r2').html('You are highly likely to pay more to get to school: as of October, <mark>gas prices were up 49.64%</mark> nationwide over the same time the year before.')
					} else if ($('#g3').val() == 'g3-f') {
						$('#r2').html('')
					} else {
						$('#r2').html('You are likely to save on your method of commute – there are <mark>no increased costs or delays</mark> associated with how you get yourself to school.')
					}
					break;

				case "g2-c":
					if (($('#g3').val() == 'g3-a')) {
						$('#r2').html('You are highly likely to pay more to get to your job or vocation: as of October, <mark>gas prices were up 49.64%</mark> nationwide over the same time the year before.')
					} else if ($('#g3').val() == 'g3-f') {
						$('#r2').html('')
					} else {
						$('#r2').html('You are likely to save on your method of commute – there are <mark>no increased costs or delays</mark> associated with how you get yourself to your job or vocation.')
					}
					break;

				case "g2-d":
					$('#r2').html('')
					break;
			}

			switch($('#g4').val()) {
				case "g4-a":
					$('#r4').html('Eating out is likely to be a different experience for you and your household this year: as of August, there were close to <mark>1.5 million unfilled jobs</mark> in the food services and accomodations sector, up from an average of 600,000 open jobs prepandemic. This means longer wait times and less personalized service as overstretched waitstaff and cooks attempt to serve Americans eager to eat out. Food prices outside of home have also <mark>risen by 5.27%</mark> from last year as of October, according to the Bureau of Labor Statistics.')
					break;
				case "g4-b":
					$('#r4').html('Cooking at home is likely to be easier on your family and your wallet this year, even with price increases on certain foods: you skip the long waits caused by <mark>1.5 million unfilled jobs</mark> in the food services and accommodation sector, the <mark>5.27% price hike for food outside of home</mark>, and the COVID surcharge some restaurants still rely on to keep their businesses running.')
					break;
			}

			switch($('#g5').val()) {
				case "g5-a":
					$('#r5').html('your household\'s preference for meat might hit you hardest this year due to sharp spikes in prices: within the last year alone, prices for <mark>beef steaks</mark> and <mark>roasts</mark> rose by 25%, with <mark>bacon and pork products</mark> 20% more than the previous year as of October due to inflation. The White House has <a href="https://www.whitehouse.gov/briefing-room/blog/2021/09/08/addressing-concentration-in-the-meat-processing-industry-to-lower-food-prices-for-american-families/" target="_blank">blamed major slaughterhouses</a> for the price hikes.')
					break;
				case "g5-b":
					$('#r5').html('your household\'s preference for poultry is likely to hit your wallet: within the last year, <mark>prices for poultry have increased by 7.5%</mark> due to inflation as of October.')
					break;
				case "g5-c":
					$('#r5').html('you largely consume vegetables. Good news if your household mostly consumes vegetables: <mark>fresh</mark>, <mark>processed</mark> and <mark>frozen vegetables</mark> have seen little to no price hikes as of October 2021. Fresh vegetables have <mark>risen in price by 1.7%</mark> within the span of a year. However, canned vegetables will be a little pricier – the commodity is <mark>more expensive by 6.61%</mark>. The latter is impacted by <a href="/news/national-international/fall-may-bring-more-grocery-shortages-heres-what-to-expect/" target="_blank">an aluminum shortage</a> that is affecting packaging.')
					break;
				case "g5-d":
					$('#r5').html('your household\'s preference for fruit is likely to hit your wallet: as of October, prices for fresh fruit have increased by 4% compared to a year before, due to inflation.')
					break;
				case "g5-e":
					$('#r5').html('your household\'s preference for eggs is likely to hit your wallet: as of October, prices for eggs have increased by 12% compared to a year before, due to inflation.')
					break;
				case "g5-f":
					$('#r5').html('your household\'s preference for dairy and dairy-related products is unlikely to hit as hard at your wallet as other food: <mark>prices for dairy have increased by 1.76%</mark> due to inflation as of October.')
					break;
				case "g5-g":
					$('#r5').html('your household\'s preference for soft drinks is likely to hit your wallet: <mark>prices for soda increased by 5.2%</mark> due to inflation as of October. Part of that hike could also be due to <mark>aluminum shortages</mark>.')
					break;
				case "g5-h":
					$('#r5').html('your household\'s coffee consumption may already have slowed to a trickle this year: a drought in <a href="https://www.cnbc.com/2020/04/20/coronavirus-coffee-prices-rise-as-countries-hoard-food-supplies-lifting-farmers.html" target="_blank">Brazil, the world\'s largest producer of coffee, coupled with supply chain issues caused by a shortage of labor meant a slight increase in price at the supermarket and a <a href="https://apnews.com/article/why-coffee-could-cost-more-fe05cb4ce02fd31393042a5985eb696d" target="_blank"><mark>12% decrease in Arabica beans</mark></a>, according to the Associated Press.')
					break;
				case "g5-i":
					$('#r5').html('your household\'s preference for tea may add a slightly higher burden to the family grocery bill: according to the Consumer Price Index, the <mark>price of tea</mark> has increased by 4% within the year.')
					break;
			}

			switch($('#g6').val()) {
				case "g6-a":
					if ($('#g5').val() == 'g5-a') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for meat might hit you hardest this year due to sharp spikes in prices: within the last year alone, prices for <mark>beef steaks</mark> and <mark>roasts</mark> rose by 25%, with <mark>bacon and pork products</mark> 20% more than the previous year as of October due to inflation. The White House has <a href="https://www.whitehouse.gov/briefing-room/blog/2021/09/08/addressing-concentration-in-the-meat-processing-industry-to-lower-food-prices-for-american-families/" target="_blank">blamed major slaughterhouses</a> for the price hikes')
					}
				break;

				case "g6-b":
					if ($('#g5').val() == 'g5-b') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for poultry is likely to hit your wallet: within the last year, <mark>prices for poultry have increased by 7.5%</mark> due to inflation as of October.')
					}
				break;

				case "g6-c":
					if ($('#g5').val() == 'g5-c') {$('#r6').html('')
					} else {
						$('#r6').html('<mark>Fresh</mark>, <mark>processed</mark> and <mark>frozen vegetables</mark> have seen little to no price hikes as of October 2021. Fresh vegetables have <mark>risen in price by 1.7%</mark> within the span of a year. However, canned vegetables will be a little pricier – the commodity is <mark>more expensive by 6.61%</mark>. The latter is impacted by <a href="/news/national-international/fall-may-bring-more-grocery-shortages-heres-what-to-expect/" target="_blank">an aluminum shortage</a> that is affecting packaging.')
					}
				break;

				case "g6-d":
					if ($('#g5').val() == 'g5-d') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for fruit is likely to hit your wallet: as of October, prices for fresh fruit have increased by 4% compared to a year before, due to inflation.')
					}
				break;


				case "g6-e":
					if ($('#g5').val() == 'g5-e') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for eggs is likely to hit your wallet: as of October, prices for eggs have increased by 12% compared to a year before, due to inflation.')
					}
				break;


				case "g6-f":
					if ($('#g5').val() == 'g5-f') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for dairy and dairy-related products is unlikely to hit as hard at your wallet as other food: <mark>prices for dairy have increased by 1.76%</mark> due to inflation as of October.')
					}
				break;

				case "g6-g":
					if ($('#g5').val() == 'g5-g') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for soft drinks is likely to hit your wallet: <mark>prices for soda increased by 5.2%</mark> due to inflation as of October. Part of that hike could also be due to <mark>aluminum shortages</mark>.')
					}
				break;

				case "g6-h":
					if ($('#g5').val() == 'g5-h') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s coffee consumption may already have slowed to a trickle this year: a drought in <a href="https://www.cnbc.com/2020/04/20/coronavirus-coffee-prices-rise-as-countries-hoard-food-supplies-lifting-farmers.html" target="_blank">Brazil, the world\'s largest producer of coffee, coupled with supply chain issues caused by a shortage of labor meant a slight increase in price at the supermarket and a <a href="https://apnews.com/article/why-coffee-could-cost-more-fe05cb4ce02fd31393042a5985eb696d" target="_blank"><mark>12% decrease in Arabica beans</mark></a>, according to the Associated Press.')
					}
				break;

				case "g6-i":
					if ($('#g5').val() == 'g5-i') {$('#r6').html('')
					} else {
						$('#r6').html('Your household\'s preference for tea may add a slightly higher burden to the family grocery bill: according to the Consumer Price Index, the <mark>price of tea</mark> has increased by 4% within the year.')
					}
				break;
			}

			switch($('#g7').val()) {
				case "g7-a":
					$('#r7').html('You may have seen prices for houses in your area reach astronomical highs throughout the pandemic, a phenomenon spurred by frenzied buyers wanting to trade in their urban apartments for a yard and bigger rooms better suited for remote work. According to Freddie Mac, prices for homes have <mark>increased by at least one percent per month</mark> since July 2020, hitting a peak of 1.9% increase in May of this year. Overall, prices for homes have increased by 18% nationwide year to year as of September 2021.<br><br> Already own a home but still need repairs? Unfortunately, that might also set you back in time and money. Some raw materials, from plywood to steel, <mark>nearly doubled in price</mark> as of May, according to the <a href="https://eyeonhousing.org/2021/05/record-numbers-of-builders-report-material-shortages/" target="_blank">National Association of Home Builders</a>. Builders are also reporting serious shortages for <mark>appliances, lumber, plywood, windows and doors</mark> to name a few. These shortages are likely to impact contractor availability for any homeowners who need urgent or large-scale repairs')
					break;
				case "g7-b":
					$('#r7').html('Not looking to buy a home or make any large-scale repairs and renovation to your living space? You may have dodged a bullet to your finances: home prices, though slowing since the price increase frenzy of March, April, May and June, are not likely to dip below the <mark>18% increase over the last 12 months</mark>. Home builders and contractors are also facing serious shortages and price hikes for raw materials, according to the <a href="https://eyeonhousing.org/2021/05/record-numbers-of-builders-report-material-shortages/" target="_blank">National Association of Home Builders</a>')
					break;
			}

			switch($('#g8').val()) {
				case "g8-a":
					$('#r8').html('The <mark>semiconductor shortage</mark>, coupled with a shortage in raw materials like <mark>aluminum</mark>, continues to severely impact new and used car prices and availability, with some manufacturers <a href="https://www.cnbc.com/2021/09/06/vw-ford-daimler-fear-chip-shortage-could-persist-for-some-time.html" target="_blank">predicting shortages to last until 2024</a>. <mark>Used cars and trucks</mark> were 26.5% more expensive than last year, likely due to personal travel rebounding as people become vaccinated against COVID-19. <mark>New cars and trucks</mark>, if available in your area, could be expected to cost at least nine to 10% more than last year nationwide.')
					break;
				case "g8-b":
					$('#r8').html('If you already have a car that can last for a few more years, make sure to hold onto it rather than to sell it for fast money: although <mark>used cars are going for 26.5% more</mark> than they did last year nationwide, it may be tough to find another used car that won\'t break the bank months into 2022 if the semiconductor shortage continues. Even better if you don\'t need a car to get around: you will be saving on <mark>gas, which has risen by at least 49.6%</mark> from last year.')
					break;
			}

			switch($('#g9').val()) {
				case "g9-a":
					$('#r9').html('may be another hefty expense:')
					break;
				case "g9-b":
					$('#r9').html('may not cost you much if you are planning to spend the holidays at home:')
					break;
				case "g9-b":
					$('#r9').html('can be a significant expense depending on your decision to travel or stay at home:')
					break;
			}

			switch($('#g10').val()) {
				case "g10-a":
					$('#r10').html('Expect to receive new gaming consoles or any other electronic gifts the year after: shortages in semiconductor chips have affected not just cars that rely on computer chips to function, but also kept many other popular electronic items <a href="https://www.forbes.com/sites/paultassi/2021/09/04/ps5-and-xbox-series-x-shortages-will-continue-through-2023-most-likely/" target="_blank">like Xboxes and Playstations</a> on limited supply since the start of the pandemic.')
					break;
				case "g10-b":
					$('#r10').html('Clothing can be a significant increase from last year as of October depending on who you\'re shopping for: the biggest increase in price as of October has been in <mark>men\'s (6.33%) and boy\'s (6%) apparel</mark>, with modest hikes in the women\'s (2.46%) and girl\'s (0.25%) category. <mark>Buying for infants and toddlers will cost as well, at 7.65% price increase</mark> as of last year.')
					break;
				case "g10-c":
					$('#r10').html('Experiences might be the best thing to gift or recieve for the holidays: gifting a cooking class can help circumvent the shortages and price hikes affecting material things that require plastic or other raw materials to make.')
					break;
				case "g10-d":
					$('#r10').html('Gift cards might be the most practical gift to give or recieve for the holidays: it will help offset the increased hike in gas and food prices, and there is no shipping to worry about.')
					break;
				case "g10-e":
					$('#r10').html('While <mark>toys haven\'t seen any price hikes stateside at 0.07% since last October</mark>, you may still face delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services as well as a shortage in plastics and raw materials needed to make a toy. A severe dip in inventory holdings since the start of the pandemic, with stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of toys to pick and choose from for gifting.')
					break;
				case "g10-f":
					$('#r10').html('Household furnishings and items will make for expensive gifts this year at 6.25% increase since the last year as of October. You may also face delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services. A severe dip in inventory holdings since the start of the pandemic, with most retail stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of household items to pick and choose from for gifting.')
					break;
				// case "g10-g":
				// 	$('#r10').html('g10-g')
				// 	break;
				case "g10-h":
					$('#r10').html('Pet supplies and accessories have seen a <mark>slight increase in prices</mark> as of last year at (5.39%), but even without the price increase, you may still see delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services. A severe dip in inventory holdings since the start of the pandemic, with stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of pet toys and accessories to pick and choose from for gifting.')
					break;
			}

			switch($('#g11').val()) {
				case "g11-a":
						if ($('#g10').val() == 'g10-a') {$('#r11').html('')
					} else {
							$('#r11').html('As for any electronics you\'re expecting for the holidays, expect to receive new gaming consoles or any other electronic gifts the year after: shortages in semiconductor chips have affected not just cars that rely on computer chips to function, but also kept many other popular electronic items <a href="https://www.forbes.com/sites/paultassi/2021/09/04/ps5-and-xbox-series-x-shortages-will-continue-through-2023-most-likely/" target="_blank">like Xboxes and Playstations</a> on limited supply since the start of the pandemic.')
					}
					break;
				case "g11-b":
						if ($('#g10').val() == 'g10-b') {$('#r11').html('')
					} else {
							$('#r11').html('Clothing can be a significant increase from last year as of October depending on who you\'re shopping for: the <mark>biggest increase in price as of October has been in men\'s (6.33%) and boy\'s (6%) apparel</mark>, with modest hikes in the women\'s (2.46%) and girl\'s (0.25%) category. Buying for infants and toddlers will cost as well, <mark>at 7.65% price increase</mark> as of last year.')
					}
					break;
				case "g11-c":
						if ($('#g10').val() == 'g10-c') {$('#r11').html('')
					} else {
							$('#r11').html('Experiences might be the best thing to gift or recieve for the holidays: gifting a cooking class can help circumvent the shortages and price hikes affecting material things that require plastic or other raw materials to make.')
					}
					break;
				case "g11-d":
						if ($('#g10').val() == 'g10-d') { $('#r11').html('')
					} else {
							$('#r11').html('Gift cards might be the most practical gift to give or recieve for the holidays: it will help offset the increased hike in gas and food prices, and there is no shipping to worry about.')
					}
					break;
				case "g11-e":
						if ($('#g10').val() == 'g10-e') { $('#r11').html('')
					} else {
							$('#r11').html('While <mark>toys haven\'t seen any price hikes stateside at 0.07% since last October</mark>, you may still face delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services as well as a shortage in plastics and raw materials needed to make a toy. A severe dip in inventory holdings since the start of the pandemic, with stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of toys to pick and choose from for gifting.')
					}
					break;
				case "g11-f":
						if ($('#g10').val() == 'g10-f') { $('#r11').html('')
					} else {
							$('#r11').html('<mark>Household furnishings and items will make for expensive gifts this year at 6.25% increase</mark> since the last year as of October. You may also face delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services. A severe dip in inventory holdings since the start of the pandemic, with most retail stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of household items to pick and choose from for gifting.')
					}
					break;
				// case "g11-g":
				// 		if ($('#g10').val() == 'g10-g') {$('#r11').html('')
				// 	} else {
				// 			$('#r11').html('Exercise equipment')
				// 	}
				// 	break;
				case "g11-h":
						if ($('#g10').val() == 'g10-h') {$('#r11').html('')
					} else {
							$('#r11').html('Pet supplies and accessories have seen a <mark>slight increase in prices</mark> as of last year at (5.39%), but even without the price increase, you may still see delays for specific items that are not in stock in stores due to the aforementioned labor shortage in delivery services. A severe dip in inventory holdings since the start of the pandemic, with stores only holding onto one month\'s worth of stock throughout 2021, will also mean a smaller selection of pet toys and accessories to pick and choose from for gifting.')
					}
					break;
			}

			//CHARTS
			// switch($('#c-house').val()) {
			// 	case "https://www.nbcnewyork.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcphiladelphia.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcmiami.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcwashington.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcconnecticut.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcboston.com/":
			//
			// 		break;
			//
			// 	case "https://www.necn.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcsandiego.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbclosangeles.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcbayarea.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcchicago.com/":
			//
			// 		break;
			//
			// 	case "https://www.nbcdfw.com/":
			//
			// 		break;
			// }

			$('#c-jobs').html('<iframe title="Monthly Job Openings by Industry" aria-label="Interactive line chart" id="datawrapper-chart-J461b" src="https://datawrapper.dwcdn.net/J461b/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>')

			switch(parentsite) {
				case "https://www.nbcnewyork.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-zc9b8" src="https://datawrapper.dwcdn.net/zc9b8/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600">');
					break;

				case "https://www.nbcphiladelphia.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-X4NsP" src="https://datawrapper.dwcdn.net/X4NsP/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbcmiami.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic " aria-label="Interactive line chart" id="datawrapper-chart-XoQQb" src="https://datawrapper.dwcdn.net/XoQQb/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbcwashington.com/":
					$('#c-home').html('<iframe title="Home Prices, Already High in D.C., Increased Marginally During the Pandemic Compared to Other Cities  " aria-label="Interactive line chart" id="datawrapper-chart-M19nt" src="https://datawrapper.dwcdn.net/M19nt/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbcconnecticut.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-zc9b8" src="https://datawrapper.dwcdn.net/zc9b8/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600">');
					break;

				case "https://www.nbcboston.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-4HDBc" src="https://datawrapper.dwcdn.net/4HDBc/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.necn.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-OqEuc" src="https://datawrapper.dwcdn.net/OqEuc/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600">');
					break;

				case "https://www.nbcsandiego.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic " aria-label="Interactive line chart" id="datawrapper-chart-tcmcB" src="https://datawrapper.dwcdn.net/tcmcB/2/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbclosangeles.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-oZxGU" src="https://datawrapper.dwcdn.net/oZxGU/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600">');
					break;

				case "https://www.nbcbayarea.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic " aria-label="Interactive line chart" id="datawrapper-chart-j7xsg" src="https://datawrapper.dwcdn.net/j7xsg/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbcchicago.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic" aria-label="Interactive line chart" id="datawrapper-chart-ahz39" src="https://datawrapper.dwcdn.net/ahz39/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600"></iframe>');
					break;

				case "https://www.nbcdfw.com/":
					$('#c-home').html('<iframe title="Home Prices Soared Months Into the Pandemic " aria-label="Interactive line chart" id="datawrapper-chart-wJuqk" src="https://datawrapper.dwcdn.net/wJuqk/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="600">');
					break;
			}

			//$(window).height(+ 50)

			$('mark').delay(500).animate({	opacity: 1 }, 1000);

			xtalk.signalIframe();
}




$(document).ready(function(){

  //xtalk.signalIframe();

	//$(window).height(+ 50)

	init();
});
