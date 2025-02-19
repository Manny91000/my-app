import { z } from "zod";
import { isValidDocumentId } from "./empleados";

export const clienteSchema = z.object({
    id: z.number().optional(),
    name: z.string({
        required_error: "El nombre es obligatorio.",
        invalid_type_error: "El nombre debe ser una cadena de texto.",
    }).nonempty({ message: "El nombre es obligatorio." }),
    documentId: z.string({
        required_error: "El documento es obligatorio.",
        invalid_type_error: "El documento debe ser cadena numérica.",
    }).nonempty({ message: "El documento es obligatorio." }),
    creditCard: z.string({
        required_error: "El número de tarjeta de crédito es obligatorio.",
        invalid_type_error: "El número de tarjeta de crédito debe ser una cadena numérica.",
    })
        .nonempty({ message: "El número de tarjeta de crédito es obligatorio." })
        .min(13, { message: "El número de tarjeta deber tener al menos 13 dígitos." })
        .max(19, { message: "El número de tarjeta deber tener un máximo de 19 dígitos." })
        .refine((value) => isValidCreditCard(value), {
            message: "El número de tarjeta de crédito proporcionado no es válido.",
        }),
    creditLimit: z.number({
        required_error: "Limite de Crédito es obligatorio.",
        invalid_type_error: "El limite de crédito debe ser un número.",
    })
        .int({ message: "El limite de crédito debe ser un número entero." })
        .positive({ message: "El limite de crédito debe ser positivo." }),
    personType: z.string({
        required_error: "Tipo de persona es obligatorio.",
        invalid_type_error: "El tipo de persona debe ser una cadena de texto.",
    }).nonempty({ message: "Tipo de persona es obligatorio." }).default("Física"),
    status: z.string({
        required_error: "El estado es obligatorio.",
        invalid_type_error: "El estado debe ser una cadena de texto.",
    }).nonempty({ message: "El estado es obligatorio." }).default("Activo"),
})
    .refine((data) => {
        if (data.personType === "Física" && data.documentId.length !== 11) {
            return false;
        }

        return true;
    }, {
        message: "El documento debe ser de 11 dígitos.", path: ["documentId"]
    })
    .refine((data) => {
        if (data.personType === "Física") {
            return isValidDocumentId(data.documentId);
        };

        return true;
    }, {
        message: "El id del documento no es válido.", path: ["documentId"]
        
    })
    .refine((data) => {
        if (data.personType === "Jurídica" && data.documentId.length !== 9) {
            return false;
        }

        return true;
    }, {
        message: "El RNC debe ser de 9 dígitos.", path: ["documentId"]
    })
    .refine((data) => {
        if (data.personType === "Jurídica") {
            return isValidRNC(data.documentId);
        }

        return true;
    }, {
        message: "El RNC no es válido.", path: ["documentId"]
    });

export type ClienteSchemaForm = z.infer<typeof clienteSchema>;

export const isValidCreditCard = (creditCard: string): boolean => {
    const cleanNumber: string = creditCard.replace(/\D/g, "");

    if(cleanNumber.length < 13 || cleanNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let alternate = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let currentDigit = parseInt(cleanNumber[i], 10);

        if (alternate) {
            currentDigit *= 2;

            if (currentDigit > 9) {
                currentDigit -= 9;
            }
        } 

        sum += currentDigit;
        alternate = !alternate;
    }

    return sum % 10 === 0;
}

export const isValidRNC = (rnc: string): boolean => {
    const weight: number[] = [7, 9, 8, 6, 5, 4, 3, 2];
    let sum: number = 0;

    if (!/^\d{9}$/.test(rnc) || rnc.length !== 9) {
        return false;
    }

    for (let i = 0; i < 8; i++) {
        const rncDigit: number = parseInt(rnc.charAt(i), 10);

        sum += rncDigit * weight[i];
    }

    const division: number = Math.floor(sum / 11);
    const rest = sum - (division * 11);
    let verificatorDigit: number;
    
    if (rest === 0) {
        verificatorDigit = 2;
    } else if (rest === 1) {
        verificatorDigit = 1;
    } else {
        verificatorDigit = 11 - rest;
    }
    
    const lastRncDigit: number = parseInt(rnc.charAt(8), 10);
    
    return verificatorDigit === lastRncDigit;
};
