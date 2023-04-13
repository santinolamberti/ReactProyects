package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

@Entity
@Table(name = "puntuaciones")
@Getter
@Setter
public class Puntuacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    @JsonIgnore
    private Producto producto;
    //saqué las puntuaciones porque entra en un bucle
    //@ManyToOne
    //@JoinColumn(name = "usuario_id")
    //@JsonIgnore
    //private Usuario usuario;
    @Value("puntuacion")
    @Min(value = 1, message = "La puntuación no puede ser menor que 1")
    @Max(value = 5, message = "La puntuación no puede ser mayor que 5")
    private Integer puntuacion;

    public Puntuacion() { }


    public Puntuacion(Producto producto, Usuario usuario, Integer puntuacion) {
        this.producto = producto;
        //this.usuario = usuario;
        this.puntuacion = puntuacion;
    }

    @Override
    public String toString() {
        return "Puntuacion{" +
                "id=" + id +
                ", producto=" + producto +
             //   ", usuario=" + usuario +
                ", puntuacion=" + puntuacion +
                '}';
    }
}
