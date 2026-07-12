import { MMKV, createMMKV } from "react-native-mmkv";


export const storage = createMMKV({
  id: "expenseit-storage",
})