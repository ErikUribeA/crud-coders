'use client';

import IconWithTooltip from "@/components/IconWithTooltip";
import { ICoder } from "@/models/coders/coder.model";
import { CoderService } from "@/services/coders.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

interface IProps {
    data: ICoder[];
}

const Td = styled.td`
    border: 2px solid white;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
`

const Th = styled.th`
    padding: 20px;
    border: 2px solid #22c55e;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
`

export default function CoderTable({ data }: IProps) {
    const [editingCoder, setEditingCoder] = useState<ICoder | null>(null);
    const coderService = new CoderService();
    const router = useRouter();

    // Manejar la eliminación de un coder
    const handleDelete = async (id: string) => {
        await coderService.destroy(id);
        router.refresh();
    };

    // Activar edición de un coder
    const handleDoubleClickName = (coder: ICoder) => {
        setEditingCoder(coder);
    };

    // Manejar el cambio del nombre mientras se edita
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (editingCoder) {
            setEditingCoder({ ...editingCoder, name: event.target.value });
        }
    };

    // Guardar cambios del nombre
    const handleSave = async () => {
        if (editingCoder) {
            await coderService.save(editingCoder.id, editingCoder.name);
            setEditingCoder(null); // Limpiar estado de edición
            router.refresh(); // Refrescar la página
        }
    };

    // Cancelar edición
    const handleCancel = () => {
        setEditingCoder(null);
    };

    // Manejar teclas dentro del campo de texto
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSave(); // Guardar si presionan "Enter"
        } else if (event.key === "Escape") {
            handleCancel(); // Cancelar si presionan "Escape"
        }
    };

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Avatar</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody >
                    {data.map((coder) => (
                        <tr key={coder.id} >
                            <Td>{coder.id}</Td>
                            <Td>
                                {editingCoder?.id === coder.id ? (
                                    <input
                                        className="text-black"
                                        type="text"
                                        value={editingCoder.name}
                                        onChange={handleNameChange}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    />
                                ) : (
                                    <span onDoubleClick={() => handleDoubleClickName(coder)}>
                                        <IconWithTooltip text={coder.name} tooltipText="Do a double click to change the name" />
                                    </span>
                                )}
                            </Td>
                            <Td>
                                <img src={coder.avatar} alt="image" width={200} height={200} className="rounded-[]" />
                            </Td >
                            <Td>
                                <button className="p-3 border-2 rounded-xl" onClick={() => handleDelete(coder.id)}> Delete</button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
