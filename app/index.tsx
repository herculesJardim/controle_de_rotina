import { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { router } from 'expo-router'
import { Session } from '@supabase/supabase-js'

import { supabase } from '../src/lib/supabase'

export default function Index() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.replace('/home')
      } else {
        router.replace('/login')
      }

      setLoading(false)
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return null
}