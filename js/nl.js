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

      window.addEventListener('load', resizeAllItems);
      window.addEventListener('resize', resizeAllItems);
    })
    .catch(error => {
      console.error('Error:', error)
    });


  function config() {
    let grid = document.getElementById('mainGrid');

    data.forEach((d, i) => {
      let slat = document.createElement('div');
      slat.id = `s${i}`
      slat.className = 'slat'

      let wrapper = document.createElement('div')
      wrapper.className = 'wrapper'

      let link = document.createElement('a')
      link.target = '_blank';
      link.href = d.link;

      let img = document.createElement('img')
      img.alt = d.name;
      img.src = d.media;

      //resize item after img load
      img.addEventListener('load', function(){ resizeGridItems(slat)})

      let labelDiv = document.createElement('div')
      labelDiv.className = 'projectLabel'
      labelDiv.innerHTML = `<span class="dateline"></span><span class="pName">${d.name}</span>`

      link.appendChild(img)
      link.appendChild(labelDiv)
      wrapper.appendChild(link)
      slat.appendChild(wrapper)
      grid.appendChild(slat)
    })
  }

  function resizeGridItems(item){
    let grid = document.getElementById('mainGrid')
    
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))

    let rowSpan = Math.ceil((item.querySelector('.wrapper').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))

    window.innerWidth < 400 ? 
      item.style.gridRowEnd = 'span ' + (rowSpan + 1):
      item.style.gridRowEnd = 'span ' + (rowSpan + 2);

  }

  function resizeAllItems(){
    let allItems = document.querySelectorAll('.slat')

    allItems.forEach(item => {
      resizeGridItems(item)
    })
  }

})();
