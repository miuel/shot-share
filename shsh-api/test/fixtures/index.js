module.exports = {
  getImage () {
    return {
      id: '6a238b19-3ee3-4d5c-acb5-944a3c1fb407',
      publicId: '3ehqEZvwZByc6hjzgEZU5p',
      userId: 'shot&share',
      liked: false,
      likes: 0,
      src: 'http://shsh.test/3ehqEZvwZByc6hjzgEZU5p.jpg',
      description: '#awesome',
      tags: [ 'awesome' ],
      createdAt: new Date().toString()
    }
  },

  getImages () {
    return [
      this.getImage(),
      this.getImage(),
      this.getImage()
    ]
  },

  getImagesByTag () {
    return [
      this.getImage(),
      this.getImage()
    ]
  },

  getUser () {
    return {
      id: '3423203sosungil235',
      name: 'Miguel Rivas',
      username: 'maikol',
      email: 'mr@test.com',
      password: 'shshcl4v3',
      createdAt: new Date().toString()

    }
  }
}
