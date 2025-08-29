import React, { useCallback, useState } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import toast from 'react-hot-toast'
import axios from "axios"

const loginUser = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:3000/api/v1/user/login", { email, password })
    if (res.status !== 200) {
        throw new Error("Unable to login")
    }
    const data = await res.data
    return data
}

const signupUser = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signup", { email, password })
    if (res.status !== 201) {
        throw new Error("Unable to signup")
    }
    const data = await res.data
    return data
}

// Componente principal de la aplicación
const Auth: React.FC = () => {

    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            toast.loading("Iniciando sesion", { id: "login" })
            console.log(await loginUser(email, password))
            toast.success("Se inicio sesion", { id: "login" })
        } catch (error) {
            console.log(error)
            toast.error('Inicio de sesion fallido', { id: 'login' })
        }
    }
    const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            toast.loading("Creando cuenta", { id: "signup" })
            await signupUser(email, password)
            toast.success("Cuenta creada con exito", { id: "signup" })
        } catch (error) {
            console.log(error)
            toast.error('Creacion de cuenta fallido', { id: 'signup' })
        }
    }
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);
    return (
        <div className="relative min-h-screen bg-slate-100  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            < div className="absolute inset-0 z-0" >
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        background: {
                            color: {
                                value: "transparent",
                            },
                        },
                        fpsLimit: 120,
                        particles: {
                            color: {
                                value: "#59334E",
                            },
                            links: {
                                color: "#D24D55",
                                distance: 150,
                                enable: true,
                                opacity: 0.3,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 0.8,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 50,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 3 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
            </div >
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="relative bg-slate-50  py-8 px-4 shadow sm:rounded-lg sm:px-10 z-10">
                    {authMode == 'login' ?
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Inicio de Sesion
                            </h2>
                        </div> :
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Crear cuenta
                            </h2>
                        </div>}

                    {authMode == 'login' ?
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="shadow-sm -space-y-px">
                                <div>
                                    <div>
                                        <label htmlFor="password" className="block p-2 text-sm">Correo Electrónico</label>
                                    </div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Correo Electrónico"
                                    />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="password" className="block p-2 text-sm">Contraseña</label>
                                    </div>

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleSubmit}
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {/* Heroicon name: solid/lock-closed */}
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Iniciar Sesión
                                </button>
                                <span>No tienes una cuenta? </span>
                                <a className='text-blue-500 hover:text-blue-800 hover:underline cursor-pointer' onClick={() => { setAuthMode('register') }}>Registrate aqui</a>
                            </div>
                        </form>
                        :
                        <form className="mt-8 space-y-6" onSubmit={handleSubmitSignup} method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="password" className="block p-2 text-sm">Correo Electrónico</label>
                                </div>
                                <div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Correo Electrónico"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block p-2 text-sm">Contraseña</label>
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Contraseña</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {/* Heroicon name: solid/lock-closed */}
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Registrarse
                                </button>
                                <span>Ya tienes una cuenta? </span>
                                {authMode == 'register' ? <a className='text-blue-500 hover:text-blue-800 cursor-pointer hover:underline' onClick={() => { setAuthMode('login') }}>Iniciar Sesion</a> :
                                    <a className='text-blue-500 hover:text-blue-800 cursor-pointer hover:underline' onClick={() => { setAuthMode('register') }}>Registrarse</a>
                                }
                            </div>
                        </form>}

                </div>
            </div >
        </div >
    );
};

export default Auth;
