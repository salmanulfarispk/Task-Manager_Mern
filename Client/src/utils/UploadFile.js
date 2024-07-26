import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from './firebase'



const UploadFile = async (file) => {
    
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("Uploading...");
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL); 
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

export default UploadFile
