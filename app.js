Vue.createApp({
  data() {
    return {
      favorisSeulement: false,
      details: {},
      books: [
        { "id": 1, "title": "L'Étranger", "author": "Albert Camus", "year": 1942, "genre": "Roman", "isFav": true },
        { "id": 2, "title": "Le Petit Prince", "author": "Antoine de Saint-Exupéry", "year": 1943, "genre": "Conte", "isFav": false },
        { "id": 3, "title": "1984", "author": "George Orwell", "year": 1949, "genre": "Dystopie", "isFav": true },
        { "id": 4, "title": "Les Misérables", "author": "Victor Hugo", "year": 1862, "genre": "Roman historique", "isFav": false },
        { "id": 5, "title": "Le Pain nu", "author": "Mohamed Choukri", "year": 1973, "genre": "Autobiographie", "isFav": true },
        { "id": 6, "title": "Clean Code", "author": "Robert C. Martin", "year": 2008, "genre": "Informatique", "isFav": false }
      ]
    }
  },
  computed: {
    nbFavoris() {
      return this.books.filter(book => book.isFav).length
    },
    livresTries() {
      return [...this.books].sort((a, b) => b.year - a.year)
    },
    livresAffiches() {
      return this.favorisSeulement
        ? this.livresTries.filter(book => book.isFav)
        : this.livresTries
    }
  }
}).mount('#app')
