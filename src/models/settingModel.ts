import {SettingStoreType} from "@/models/types/SettingType";
import {proxyWithPersist} from "@/utils/Store/ValtioUtils";

//存储key
const SettingLocalStorageKey = "setting"

const settingStore = proxyWithPersist<SettingStoreType>({
    page: {
        dark: true
    }
}, {key: SettingLocalStorageKey})


export default {
    settingStore,
}
