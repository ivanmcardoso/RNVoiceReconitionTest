import { PermissionsAndroid } from "react-native"

export const getVoicePermission = async () =>{
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
} 