let sheetsURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQY96sqjZNA0SSiTf5y0bmlQzr7ndM10_iUKIUWUkxVLdt_jKgjwLaLll6Lmj2ujLZH6LnDePVvMWkD/pub?gid=0&single=true&output=csv';

var counter = 0;
var data;

function init() {
  Papa.parse(sheetsURL, {
    download: true,
    header: true,
    complete: config
  });

  $('.filter').each(function(i) {
    $(this).addClass('f' + i)
  })

  $('.filter')
    .last().css('text-decoration', 'none').append('.')
};


function config(results) {
  data = results.data;

  data.forEach(function(d, i){

  $('#mainGrid').append('<div id="s'+i+'" class="slats"><a target="_blank" href="' + d.link + '"><img alt="'+ d.name +'" src="'+ d.media +'" /><div class="projectLabel"><span class="dateline">'+ d.date +'</span><span class="pName"> - '+ d.name +'</span></div></a></div>')



  })

};

$(document).ready(function(){
	init();
});
