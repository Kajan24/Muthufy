import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../db/firebase'
import { Navigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Home({ user }) {

    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormChange = () => {
        setIsSignUpActive(!isSignUpActive)
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!email || !password) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCskyential) => {
                const user = userCskyential.user;
                toast('Compte créé avec succès !', {
                    icon: '✅',
                    style: {
                        borderRadius: '5px',
                        background: '#171717',
                        color: '#fff',
                    },
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/email-already-in-use") {
                    toast('Cet email est déjà utilisé par un autre compte.', {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                } else if (errorCode === "auth/weak-password") {
                    toast("Votre mot de passe n'est pas assez robuste.", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                } else if (errorCode === "auth/invalid-email") {
                    toast("L'email saisi n'est pas valide.", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                } else {
                    toast("Une erreur s'est produite lors de la création du compte.", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                }
            })
    }


    const handleSignIn = (event) => {
        event.preventDefault();
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCskyential) => {
                const user = userCskyential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found") {
                    toast("Aucun utilisateur trouvé avec cet email.", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                } else if (errorCode === "auth/invalid-cskyential") {
                    toast("Vos informations sont incorrect", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                } else {
                    toast("Une erreur s'est produite lors de la connexion.", {
                        style: {
                            borderRadius: '5px',
                            background: '#171717',
                            color: '#fff',
                        },
                    });
                }
            })
    }


    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);


    if (user) {
        return <Navigate to="/dashboard"></Navigate>
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col h-screen bg-zinc-950">
                <div className="flex items-start justify-center p-8">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        {isSignUpActive ? "Login" : "Inscription"}
                    </h2>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center w-80 h-3/5 bg-pink-700">
                    <form className="w-full space-y-6 mt-0 mb-0">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-50">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-zinc-950 shadow-sm ring-gray-300 placeholder:text-gray-950 sm:text-sm sm:leading-6 focus:outline-none"
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-50">
                                    Mot de passe
                                </label>
                                {isSignUpActive && (
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-sky-800 hover:text-sky-500">
                                            Mot de passe oublié?
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-zinc-950 shadow-sm ring-gray-300 placeholder:text-gray-950 sm:text-sm sm:leading-6 focus:outline-none"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>



                        {isSignUpActive && (
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                    onClick={handleSignIn}
                                >
                                    Se connecter
                                </button>
                            </div>
                        )}

                        {!isSignUpActive && (
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                    onClick={handleSignUp}
                                >
                                    Créer un compte
                                </button>
                            </div>
                        )}


                        {!isSignUpActive && (
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Déjà un compte?{'    '}
                                <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-sky-700 hover:text-sky-900">
                                    Se connecter
                                </a>
                            </p>
                        )}

                        {isSignUpActive && (
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Pas de compte ?{'    '}
                                <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-sky-700 hover:text-sky-900">
                                    Créer un compte
                                </a>
                            </p>
                        )}

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="flex-shrink mx-4 text-gray-400">ou</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" onClick={handleClickGG} className="w-full py-2 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                <img src={ggLogo} alt="Google" className="w-5 h-5" />
                                <span>Continuer avec Google</span>
                            </button>
                        </div>

                        <div className="mt-4">
                            <button type="submit" onClick={handleClickApple} className="w-full py-2 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                <img src={apLogo} alt="Apple" className="w-5 h-5" />
                                <span>Continuer avec Apple</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}