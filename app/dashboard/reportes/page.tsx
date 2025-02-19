import { prisma } from "@/prisma/prisma.config";
import PdfDelReporte from "./pdfdelreporte";

const Reporte = async () => {
    const alquileres = await prisma.rent.findMany();
    const empleados = await prisma.employee.findMany();
    const clientes = await prisma.customer.findMany();
    const vehiculos = await prisma.vehicle.findMany();

    return (
        <div className="w-full space-y-4">
            <PdfDelReporte alquileres={alquileres} empleados={empleados}
                clientes={clientes} vehiculos={vehiculos}
            />
        </div>
    );
}

export default Reporte;