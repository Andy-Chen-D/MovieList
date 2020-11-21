const addMoiveBtn = document.getElementById('add-movie-btn')
const searchBtn = document.getElementById('search-btn')
const movies = []

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list')

  if (movies.length === 0) {
    movieList.classList.remove('visible')
  } else {

    movieList.classList.add('visible')
  }
  movieList.innerHTML = ''
  console.log(filter)
  const filteredMovies = !filter ?
    //參數進來先反轉因為加! 若是''沒有要過濾的會truthy
    movies :
    //若是falsy 走array.filter (boolean) 
    //movie.info.title是不是包含搜尋文字  最後回傳array 

    movies.filter((movie) => movie.info.title.includes(filter))

  //用處理過的array
  filteredMovies.forEach((movie) => {

    const movieEl = document.createElement('li')

    //Destruturing 解構附值
    const {
      info,
      ...other
    } = movie
    const {
      title: titlevalue
    } = info
    // let {
    //   getTitle
    // } = movie
    // getTitle = getTitle.bind(movie)
    let text = titlevalue + ' - '
    console.log("剩下屬性加值 " + other)
    for (const key in info) {
      if (key !== 'title')
        //key 是property 動態屬性
        text += `${key} : ${info[key]}`
    }
    movieEl.textContent = text
    movieList.append(movieEl)

  })
}

const addMovieHandler = () => {

  const title = document.getElementById('title').value
  const extraName = document.getElementById('extra-name').value
  const extraValue = document.getElementById('extra-value').value
  console.log(title)
  // title.trim() === '' ||
  if (
    extraName.trim() === '' ||
    extraValue.trim() === '') {
    return

  }
  const newMovie = {
    info: {
      //定義進這
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT'
          return;
        }
        this._title = val
      },
      //取得 進這
      get title() {
        return this._title.toUpperCase()
        // return this._title
      },
      //動態屬性
      [extraName]: extraValue
    },
    id: Math.random().toString()
  }
    // getTitle: function () {
    //   // getTitle:()=> {
    //   console.log(this)
    //   const value = this.info.title

    //   return value.toUpperCase()
    // }
  // }
  
  //Setter使用 定義他進Setter函式裡
  newMovie.info.title = title
  //會跑getter
  console.log(newMovie.info.title)



  movies.push(newMovie)
  console.log(movies)
  renderMovies()

}

//fuction this會是指向 DOM call他event的物件
//()=> 會是gobal 他不會綁定任何物件
const searchMovieHandler = () => {
  //取值
  const filterterm = document.getElementById('filter-title').value
  console.log(this)
  renderMovies(filterterm)

};
addMoiveBtn.addEventListener('click', addMovieHandler)
searchBtn.addEventListener('click', searchMovieHandler)