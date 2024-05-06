import { useEffect, useState } from "react";
import { auth, storage } from "./../../db/firebase";
import toast, { Toaster } from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);

    updateProfile(auth.currentUser, { photoURL }); // Correction: Utilisez auth.currentUser au lieu de currentUser pour mettre à jour le profil

    setLoading(false);

    toast('Photo de profil mise à jour!', {
      icon: '📸',
      style: {
        borderRadius: '5px',
        background: '#171717',
        color: '#fff',
      },
    });
  }

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [choose, setChoose] = useState(false);

  function handleChange(e) {
    setChoose(true)
    if (e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      setPhotoURL(URL.createObjectURL(selectedPhoto));
    }
  }

  function handleClick() {
    upload(photo, auth.currentUser, setLoading);
    setChoose(false)
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50 to-slate-200">
        <div className="flex items-start justify-start p-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            édition du profile
          </h2>
        </div>
        <div className="w-100 flex-grow flex flex-col items-center justify-around">
          <div className="border-b border-gray-400 w-80 h-1/6 flex items-center justify-between">
            <img className="w-20 h-20 rounded-full" src={photoURL} alt="Rounded avatar"></img>
            <div className="h-full flex flex-col">  
              <div className="file-input h-full flex items-center justify-center">
                <label htmlFor="fileInput" className="w-full h-1/2 flex items-center justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-gray-700">Changer la photo</label>
                <input type="file" id="fileInput" onChange={handleChange} />
              </div>
              <button disabled={loading || !photo} onClick={handleClick} className="block w-full rounded-md border-0 py-1.5 pl-2 text-wrap text-slate-700 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-gray-950 sm:text-sm sm:leading-6 focus:outline-none">Supprimer la photo</button>
            </div>

          </div>

        </div>
        <div className="flex">
          <p className="text-xl sm:text-lg font-semibold leading-6 text-slate-900">
            Email:
          </p>
          <p className="text-xl sm:text-lg leading-6 text-slate-900">
            exemple@gmail.com
          </p>
        </div>
        <div className="flex justify-end p-8">
          <button disabled={loading || !photo} onClick={handleClick} className="w-50 rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-gray-700">Modifier</button>

          <button type="button" className="w-50 rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-gray-700" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>

    </>
  );
}
