import { storage } from 'config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const getURLImage = async (file: any, folder?: string) => {
  try {
    const storageRef = ref(
      storage,
      `/${folder || 'items'}/${file.name + new Date().getTime()}`
    )
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    if (url) {
      return url
    }
  } catch (error) {
    return null
  }
}
