package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String titulo;
private String descripcion;
private String url;
@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, mappedBy = "categoria")
@JsonIgnore
private List<Producto> productos = new ArrayList<>();

    public Categoria() { }

    public Categoria(String titulo, String descripcion, String url) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
    }

    public Categoria(String titulo, String descripcion, String url, List<Producto> productos) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.url = url;
        this.productos = productos;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", url='" + url + '\'' +
                ", productos=" + productos +
                '}';
    }
}
