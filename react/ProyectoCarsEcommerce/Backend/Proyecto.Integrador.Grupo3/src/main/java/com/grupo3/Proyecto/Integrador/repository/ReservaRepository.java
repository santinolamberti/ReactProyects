package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
     @Query("SELECT DISTINCT p FROM Producto p WHERE p.id NOT IN (SELECT r.producto.id FROM Reserva r WHERE r.fechaInicial >= ?1 AND r.fechaFinal <= ?2)")
     List<Producto> findAllByFechaInicialAndFechaFinal(LocalDate fechaInicial, LocalDate fechaFinal);

     @Query("SELECT DISTINCT p FROM Producto p WHERE p.id NOT IN (SELECT r.producto.id FROM Reserva r WHERE r.fechaInicial >= ?2 AND r.fechaFinal <= ?3) AND p.ciudad.nombre = ?1")
     List<Producto> findAllByCiudadYFechas(String ciudad, LocalDate fechaInicial, LocalDate fechaFinal);

     @Query("SELECT r FROM Reserva r WHERE r.producto.id = ?1")
     List<Reserva> findByProductoId(Long id);

     @Query("SELECT r FROM Reserva r WHERE r.usuario.id = ?1")
     List<Reserva> findByUsuarioId(Integer id);

}
