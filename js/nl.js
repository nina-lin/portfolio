//Masonry layout adapted from Andy Barefoot's CSS Grid tutorial https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb

(function(){
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
  
  Promise.all([parseCSV(url)])
    .then(results => {
      data = results[0].data;

      config(); 

      window.onload = setTimeout(resizeAllItems, 100)
      window.addEventListener('resize', resizeAllItems);
    })
    .catch(error => {
      console.error('Error:', error)
    });


  function config() {
    data.forEach((d, i) => {
      let grid = document.getElementById('mainGrid')

      let slat = `
        <div id="s`+ i +`" class="slat">
          <div class="wrapper">
            <a target="_blank" href="${d.link} ">
              <img alt="${d.name}" src="${d.media}" />
              <div class="projectLabel"><span class="dateline"></span><span class="pName">${d.name}</span></div>
            </a>
          </div>
        </div>
      `

      grid.insertAdjacentHTML('beforeend', slat)
    })
  }

  function resizeGridItems(item){
    grid = document.getElementById('mainGrid')
    
    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))

    rowSpan = Math.ceil((item.querySelector('.wrapper').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))

    window.innerWidth < 400 ? 
      item.style.gridRowEnd = 'span ' + (rowSpan + 1):
      item.style.gridRowEnd = 'span ' + (rowSpan + 2);

  }

  function resizeAllItems(){
    allItems = document.querySelectorAll('.slat')

    allItems.forEach(item => {
      resizeGridItems(item)
    })
  }

})();
