import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

export const getUserState = () =>
new Promise((resolve, reject) =>
  onAuthStateChanged(getAuth(), resolve, reject)
)

export const useAuthState = () => {
const user = ref(null)
const error = ref(null)

const auth = getAuth()
let unsubscribe
onMounted(() => {
  unsubscribe = onAuthStateChanged(
    auth,
    u => (user.value = u),
    e => (error.value = e)
  )
})
onUnmounted(() => unsubscribe())

const isAuthenticated = computed(() => user.value != null)

return { user, error, isAuthenticated }
}

// Reference to Youtube Video

// const firebaseApp = firebase.initializeApp(config)

// const db = firebaseApp.firestore()
// const usersCollection = db.collection('users')

// export const createUser = user => {
//   return usersCollection.add(user)
// }

// export const getUser = async id => {
//   const user = await usersCollection.doc(id).get()
//   return user.exists ? user.data() : null
// }

// export const updateUser = (id, user) => {
//   return usersCollection.doc(id).update(user)
// }

// export const deleteUser = id => {
//   return usersCollection.doc(id).delete()
// }

// export const useLoadUsers = () => {
//   const users = ref([])
//   const close = usersCollection.onSnapshot(snapshot => {
//     users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//   })
//   onUnmounted(close)
//   return users
// }