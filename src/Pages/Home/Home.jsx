import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../db/firebase'
import { Navigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import ggLogo from '../../assets/google.svg'
import apLogo from '../../assets/apple.svg'

export default function Home({ user }) {

    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormChange = () => {
        setIsSignUpActive(!isSignUpActive)
    }

    const handleClickGG = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((userCskyential) => {
                const user = userCskyential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }
    const handleClickApple = (event) => {
        event.preventDefault();
        toast('Tu crois je vais payer pour toi !', {
            icon: '🖕🏾',
            style: {
                borderRadius: '5px',
                background: '#171717',
                color: '#fff',
            },
        });
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
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-slate-50 to-slate-200">
                {/* <div className="flex flex-col justify-center items-center h-screen"> */}
                <h2 className="text-slate-900 w-full max-w-md pl-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightmb-8">
                    {isSignUpActive ? "Login" : "Inscription"}
                </h2>
                <div className="w-full max-w-md p-8">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-700">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="bg-slate-100 block w-full rounded-md border-0 py-1.5 pl-2 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-950 sm:text-sm sm:leading-6 focus:outline-none"
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-700">
                                    Mot de passe
                                </label>
                                {isSignUpActive && (
                                    <div className="text-sm">
                                        <a href="/reset" className="font-semibold text-sky-800 hover:text-sky-900">
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
                                    className="bg-slate-100 block w-full rounded-md border-0 py-1.5 pl-2 text-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-950 sm:text-sm sm:leading-6 focus:outline-none"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        {isSignUpActive && (
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-gray-700"
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
                                    className="w-full rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-100 shadow-sm hover:bg-gray-700"
                                    onClick={handleSignUp}
                                >
                                    Créer un compte
                                </button>
                            </div>
                        )}

                        {!isSignUpActive && (
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Déjà un compte ?{'    '}
                                <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-sky-800 hover:text-sky-900">
                                    Se connecter
                                </a>
                            </p>
                        )}

                        {isSignUpActive && (
                            <p className="mt-4 text-center text-sm text-gray-500">
                                Pas de compte ?{'    '}
                                <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-sky-800 hover:text-sky-900">
                                    Créer un compte
                                </a>
                            </p>
                        )}

                    </form>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-400">ou</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="mt-4 space-y-4">
                        <button type="submit" onClick={handleClickGG} className="w-full py-2 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400">
                            <img src={ggLogo} alt="Google" className="w-5 h-5" />
                            <span>Continuer avec Google</span>
                        </button>

                        <button type="submit" onClick={handleClickApple} className="w-full py-2 px-4 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400">
                            <img src={apLogo} alt="Apple" className="w-5 h-5 fill-black" />
                            <span>Continuer avec Apple</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}