import { useState } from "react"
import { Navigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Reset({ user }) {

    const [email, setEmail] = useState('');

    const handleReset = (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, email).then(data => {
            toast('Un email vous à été envoyé !', {
                icon: '✅',
                style: {
                    borderRadius: '5px',
                    background: '#171717',
                    color: '#fff',
                },
            });
        }).catch(err => {
            toast('Veuillez réesayer ultèrierement!', {
                icon: '❌',
                style: {
                    borderRadius: '5px',
                    background: '#171717',
                    color: '#fff',
                },
            });
        })

    }

    const handleEmailChange = (event) => setEmail(event.target.value);

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

                <div className="w-full max-w-md pl-8 flex flex-col h-1/5 justify-evenly">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                        Reset
                    </h2>
                    <p className="text-start text-sm text-gray-500">
                        Vous allez recevoir un mail pour la réinitialisation du mot de passe, vérifiez vos spams !
                    </p>
                </div>

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
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                onClick={handleReset}
                            >
                                Réinitialiser
                            </button>
                        </div>

                        <p className="mt-4 text-end text-sm text-gray-400">
                            <a href="/" className="font-semibold leading-6 hover:text-sky-900">
                                {'<- '} Annuler
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );

}