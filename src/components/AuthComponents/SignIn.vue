<template>
  <div>
    <h2>Sign in to your account</h2>
    <form @submit.prevent="handleSignin">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { supabase } from '../../supabase'

// export default {
//   setup() {
//     const email = ref('')
//     const password = ref('')

//     const handleSignin = async () => {
//       try {
//         const { error } = await supabase.auth.signIn({
//           email: email.value,
//           password: password.value
//         })
//         if (error) throw error
//       } catch (error) {
//         alert(error.error_description || error.message)
//       }
//     }

//     return {
//       email,
//       password,
//       handleSignin
//     }
//   }
// }
import { ref } from 'vue'
import { supabase } from '../../supabase'

let email = ref('')
let password = ref('')
async function handleSignin() {
  // console.log(email.value, password.value)
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert(error.error_description || error.message)
  }

  if (data) {
    console.log(data)
  }
}
</script>
