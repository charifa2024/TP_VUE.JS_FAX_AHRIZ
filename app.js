const TaskList = {
  template: `
    <div>
      <p>Nombre total de tâches : {{ total }}</p>

      <div class="filtres">
        <button :class="{ actif: filtre === 'toutes' }" @click="filtre = 'toutes'">Toutes</button>
        <button :class="{ actif: filtre === 'aFaire' }" @click="filtre = 'aFaire'">À faire</button>
        <button :class="{ actif: filtre === 'terminees' }" @click="filtre = 'terminees'">Terminées</button>
      </div>

      <p v-if="erreur" class="erreur">{{ erreur }}</p>
      <p v-else-if="tachesAffichees.length === 0">Aucune tâche à afficher.</p>

      <div v-for="task in tachesAffichees" :key="task.id" class="task" :class="{ terminee: task.completed }">
        <h2>{{ task.title }}</h2>
        <p>{{ task.description }}</p>
        <span v-if="task.completed" class="statut">Terminée</span>
        <button v-show="!task.completed" @click="terminer(task.id)">Marquer comme terminée</button>
      </div>
    </div>
  `,
  data() {
    return {
      tasks: [],
      filtre: 'toutes',
      erreur: ''
    }
  },
  computed: {
    total() {
      return this.tasks.length
    },
    tachesAffichees() {
      if (this.filtre === 'aFaire') {
        return this.tasks.filter(task => !task.completed)
      }
      if (this.filtre === 'terminees') {
        return this.tasks.filter(task => task.completed)
      }
      return this.tasks
    }
  },
  methods: {
    terminer(id) {
      const task = this.tasks.find(task => task.id === id)
      if (task) {
        task.completed = true
      }
    }
  },
  mounted() {
    fetch('taskList.json')
      .then(response => response.json())
      .then(data => {
        this.tasks = data
      })
      .catch(() => {
        this.erreur = 'Erreur de chargement des tâches.'
      })
  }
}

const app = Vue.createApp({})
app.component('task-list', TaskList)
app.mount('#app')
