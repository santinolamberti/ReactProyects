export type CheckoutInput = {
    usuario: {
        nombre: string,
        apellido: string,
        email: string
        entrega: {
            direccion: string,
            departamento: string | null,
            ciudad: string,
            provincia: string,
            codPostal: string
        }
    },
    tarjeta: {
        nroTarjeta: string,
        CVV: string,
        expTarjeta: string,
        nombreTarjeta: string
    },
    orden: {
        nombre: string;
        imagen: string;
        precio: number;
    }
}

export type DatosPersonalesFull = {
    nombre: string;
    apellido: string;
    email: string;
    entrega: {
        direccion: string,
        departamento: string | null,
        ciudad: string,
        provincia: string,
        codPostal: string
    }
  };