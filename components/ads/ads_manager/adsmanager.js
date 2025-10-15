import AsyncStorage from "@react-native-async-storage/async-storage";

const MIN_DELAY_MS_INTERFACE = 86400000; // 24 hours
const LAST_SHOWN_KEY = 'last_ad_shown_at';


export const canShowAdInterface = async () => {
    const last = await AsyncStorage.getItem(LAST_SHOWN_KEY);
    const lastShownAt = parseInt(last, 10) || 10000;
    const now = Date.now();
  
    return (now - lastShownAt) >= MIN_DELAY_MS_INTERFACE;
};

export const showModalPremiumIfReady = async () => {
    const isReady = await canShowAdInterface();

    if (!isReady) {
        return false;
    }
    
    await AsyncStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());

    return true;
};





