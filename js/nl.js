(function(){
  let counter;

  let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQY96sqjZNA0SSiTf5y0bmlQzr7ndM10_iUKIUWUkxVLdt_jKgjwLaLll6Lmj2ujLZH6LnDePVvMWkD/pub?gid=0&single=true&output=csv';

  //parser
  function parseCSV(url) {
    return new Promise((resolve, reject) => {
      Papa.parse(url, {
        download: true, //for remote files
        header: true,
        error: reject,
        complete: resolve
      });
    });
  }

  //if multiple datasets
  // let urls = ['url.csv', 'url2.csv', ..., 'url-n.csv']

  // let promises = urls.map(url => parseCSV(url))

  // Promise.all(promises)
  
  Promise.all([parseCSV(url)])
    .then(results => {
      data = results[0].data;

      config()
    })
    .catch(error => {
      console.error('Error:', error)
    });


  function config() {
    data.forEach(function(d, i){
      let main = document.getElementById('mainGrid')

      let slats = `<div id="s`+ i +`" class="slats"><a target="_blank" href="${d.link} "><img alt="${d.name}" src="${d.media}" /><div class="projectLabel"><span class="dateline">${d.date}</span><span class="pName"> - ${d.name}</span></div></a></div>`

      main.insertAdjacentHTML('beforeend', slats)
    })
  }

})();