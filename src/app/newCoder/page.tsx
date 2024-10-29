"use client"
import { CoderService } from '@/services/coders.service'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function NewCoder() {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [error, setError] = useState<string | null>(null)
    const coderService = new CoderService()
    const router = useRouter()

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            const newCoder = { name, avatar }
            const response = await coderService.create(newCoder)
            if (response) {
                router.push("/")
                router.refresh() // Forzar una actualización de la página
            } else {
                setError("No se pudo crear el coder. Por favor, inténtalo de nuevo.")
            }
        } catch (error) {
            console.error("Error al crear el coder:", error)
            setError("Ocurrió un error al crear el coder. Por favor, inténtalo de nuevo.")
        }
    }

    return (
        <form onSubmit={handleCreate}>
            <label htmlFor="name">Name: </label>
            <input
                id="name"
                className='text-black'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor="avatar">Avatar:</label>
            <input
                id="avatar"
                type="url"
                className='text-black'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                required
            />
            <button type='submit' className='p-4 border-2 border-white'>Send</button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}