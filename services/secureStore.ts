import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function get(key: string) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
}

async function remove(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export default {
  save,
  get,
  remove,
};