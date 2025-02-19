"use client";

import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Customer, Employee, Rent, Vehicle } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useReactToPrint, UseReactToPrintFn } from "react-to-print";

const PdfDelReporte = ({
    alquileres,
    empleados,
    clientes,
    vehiculos,
}: {
    alquileres: Rent[],
    empleados: Employee[],
    clientes: Customer[],
    vehiculos: Vehicle[],
}) => {
    const [alquilerSelecionado, setAlquilerSelecionado] = useState<Rent[]>(alquileres);
    const [timeSelecionado, setTimeSelecionado] = useState<string>("dia");
    const contentRef = useRef<HTMLDivElement>(null);
    
    const reactToPrintFn: UseReactToPrintFn = useReactToPrint({
        contentRef, documentTitle: `reportes ${timeSelecionado === "semana" ? "de la " : "del " + timeSelecionado}`,
        pageStyle: '12px 8px'
    });

    useEffect(() => {
        // const obtenerAlquileres = () => {
        //     const alquileresEncontrado = alquileres.filter((alquiler) => {
        //         if (timeSelecionado === "dia") {
        //             return alquiler.rentDate.toLocaleDateString() === new Date().toLocaleDateString();
        //         } else if (timeSelecionado === "semana") {
        //             return alquiler.rentDate.toLocaleDateString() === new Date().toLocaleDateString();
        //         } else if (timeSelecionado === "mes") {
        //             return alquiler.rentDate.toLocaleDateString() === new Date().toLocaleDateString();
        //         } else if (timeSelecionado === "año") {
        //             return alquiler.rentDate.toLocaleDateString() === new Date().toLocaleDateString();
        //         }
        //     });

        //     setAlquilerSelecionado(alquileresEncontrado);
        // }

        // obtenerAlquileres();
    }, [timeSelecionado, alquileres]);

    return (
        <div className="grid gap-5">
            <div className="float-right mt-5">
                <Button onClick={() => reactToPrintFn()}>
                    Descarga el reporte
                </Button>
            </div>

            <div ref={contentRef} className="space-y-5">
                <div className="flex items-center justify-between gap-6">
                    <h1 className="font-bold text-lg">Lista de reporte {timeSelecionado === "semana" ? "de la " : "del " + timeSelecionado}</h1>

                    <div className="w-[110px]">
                        <Select value={timeSelecionado} onValueChange={(value) => setTimeSelecionado(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona por fecha" />
                            </SelectTrigger>

                            <SelectContent className="w-full">
                                <SelectItem value="dia">Dia</SelectItem>
                                <SelectItem value="semana">Semana</SelectItem>
                                <SelectItem value="Mes">Mes</SelectItem>
                                <SelectItem value="año">Año</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className=" overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        {alquilerSelecionado.length === 0 ? (
                            <div className="flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        No hay alquileres para este periodo
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-hidden border rounded-lg border-gray-300">
                                <table className=" min-w-full  rounded-xl">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Empleado</th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Vehiculo</th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Cliente</th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Fecha de renta</th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Dia</th>
                                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Diario</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-300 ">
                                        {alquilerSelecionado.map((alquiler) => (
                                            <tr key={alquiler.id}>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{alquiler.id}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{empleados.find(empleado => empleado.id === alquiler.employeeId)?.name}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{vehiculos.find(vehiculo => vehiculo.id === alquiler.vehicleId)?.description}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{clientes.find(cliente => cliente.id === alquiler.customerId)?.name}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.rentDate.toLocaleDateString()}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.days}</td>
                                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{alquiler.dailyRate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                    
                                <div className="float-right p-4 font-medium">
                                    Total ingresados: $RD - {alquilerSelecionado.reduce((acum, alquiler) => acum + (alquiler.dailyRate * alquiler.days), 0)}.00
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PdfDelReporte;