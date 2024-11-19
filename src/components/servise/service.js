export default class Service {
  state = {
    listGanges: [],
  }

  async getMovie(keyword, page) {
    const resGuest = await this.getAccess(keyword, page)
    const proverka = await Promise.all(resGuest.results.map(this._transformData))

    return proverka
  }

  async getAccess(url, page) {
    const apiBase = 'https://api.themoviedb.org/3'
    const apiKey = 'ebfde52ea649f852ab8ef2c3835d90a0'
    if (!localStorage.getItem('token')) {
      const searchToken = await fetch(`${apiBase}/authentication/token/new?api_key=${apiKey}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      })
      if (!searchToken.ok) {
        throw new Error(`Not fetch, received ${searchToken.status}`)
      }
      const neToken = await searchToken.json()
      const newToken = neToken.request_token

      localStorage.setItem('token', JSON.stringify(newToken))
      window.location.href = `https://www.themoviedb.org/authenticate/${newToken}?redirect_to=http://localhost:3000`
    }

    return this.getRes(url, page)
  }

  async getRes(url, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ebfde52ea649f852ab8ef2c3835d90a0&page=${page}&query=${url}`
    )

    if (!res.ok) {
      throw new Error(`Not fetch ${url}`, `, received ${res.status}`)
    }

    return await res.json()
  }

  _transformData = async (data) => {
    const posterPath = data.poster_path
      ? `https://image.tmdb.org/t/p/original${data.poster_path}`
      : 'https://avatars.mds.yandex.net/i?id=2423d9e9297944364aecc34085962b0438a7e7c3-7761179-images-thumbs&n=13'

    return {
      poster: posterPath,
      id: data.id,
      title: data.original_title,
      release: data.release_date,
      overview: data.overview,
      average: data.vote_average,
      stars: data.stars,
      genreArr: data.genre_ids,
    }
  }
}
