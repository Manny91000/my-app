import { Rent } from "@prisma/client";
import { useEffect, useState, useCallback } from "react";

export type TimeSeleccionado = "dia" | "semana" | "mes" | "año";

export const useFiltrarAlquileres = (alquileres: Rent[], timeSelecionado: TimeSeleccionado) => {
    const [alquilerSelecionado, setAlquilerSelecionado] = useState<Rent[]>([]);

    const obtenerAlquileres = useCallback(() => {
        if (!Array.isArray(alquileres)) {
            setAlquilerSelecionado([]);
            return;
        }

        const fechaActual = new Date(); // Calculamos la fecha actual una sola vez

        const filters = {
            dia: (alquiler: Rent) => alquiler.rentDate.getDate() === fechaActual.getDate(),
            semana: (alquiler: Rent) => {
                const inicioSemana = new Date(fechaActual);
                inicioSemana.setDate(fechaActual.getDate() - fechaActual.getDay()); // Primer día de la semana (domingo)
                const finSemana = new Date(inicioSemana);
                finSemana.setDate(inicioSemana.getDate() + 6); // Último día de la semana (sábado)
                return alquiler.rentDate >= inicioSemana && alquiler.rentDate <= finSemana;
            },
            mes: (alquiler: Rent) => alquiler.rentDate.getMonth() === fechaActual.getMonth(),
            año: (alquiler: Rent) => alquiler.rentDate.getFullYear() === fechaActual.getFullYear(),
        };

        const filtro = filters[timeSelecionado] || (() => true); // Si no hay filtro seleccionado, devuelve todos los alquileres
        const alquileresFiltrados = alquileres.filter(filtro);

        setAlquilerSelecionado(alquileresFiltrados);
    }, [timeSelecionado, alquileres]);

    useEffect(() => {
        obtenerAlquileres();
    }, [obtenerAlquileres]);

    return alquilerSelecionado;
};
