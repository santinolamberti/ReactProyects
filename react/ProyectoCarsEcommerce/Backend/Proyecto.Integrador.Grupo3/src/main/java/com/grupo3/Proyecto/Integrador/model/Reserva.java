package com.grupo3.Proyecto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "reservas")
@Getter
@Setter
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaInicial;
    private LocalDate fechaFinal;
    private String hora;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "producto_id")
    private Producto producto;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Reserva() { }

    public Reserva(LocalDate fechaInicial, LocalDate fechaFinal) {
        this.fechaInicial = fechaInicial;
        this.fechaFinal = fechaFinal;
    }

    public Reserva(LocalDate fechaInicial, LocalDate fechaFinal, String hora, Producto producto, Usuario usuario) {
        this.fechaInicial = fechaInicial;
        this.fechaFinal = fechaFinal;
        this.hora = hora;
        this.producto = producto;
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Reserva{" +
                "id=" + id +
                ", fechaInicial='" + fechaInicial + '\'' +
                ", fechaFinal='" + fechaFinal + '\'' +
                ", hora='" + hora + '\'' +
                ", producto=" + producto +
                ", usuario=" + usuario +
                '}';
    }
}
