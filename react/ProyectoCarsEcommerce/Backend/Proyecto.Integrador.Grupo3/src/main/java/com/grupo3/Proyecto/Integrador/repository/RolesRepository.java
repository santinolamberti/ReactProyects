package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RolesRepository extends JpaRepository<Rol, Long> {

    @Query("FROM Rol r WHERE r.nombre like %:nombre%")
    Optional<Rol> buscarPorNombre(String nombre);

}
