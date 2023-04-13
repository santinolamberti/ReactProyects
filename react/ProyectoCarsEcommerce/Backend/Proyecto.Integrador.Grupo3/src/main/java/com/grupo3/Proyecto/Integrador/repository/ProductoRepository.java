package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findAllByCategoriaTitulo(String titulo);

    List<Producto> findAllByCiudadNombre(String nombre);

    @Query("FROM Producto p WHERE p.nombre like %:nombre%")
    Optional<Producto> findByNombre(String nombre);

    @Query("SELECT p.id FROM Producto p")
    List<Long> cantProductos();

    @Query("SELECT DISTINCT p.id FROM Producto p WHERE p.id NOT IN (SELECT DISTINCT r.producto.id FROM Reserva r WHERE r.usuario.id = ?1)")
    List<Long> cantProductosUsuario(Long usuarioId);

}
