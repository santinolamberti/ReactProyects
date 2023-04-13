package com.grupo3.Proyecto.Integrador.repository;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("FROM Categoria c WHERE c.titulo like %:titulo%")
    Optional<Categoria> findByTitulo(String titulo);

    @Transactional
    @Modifying
    @Query("DELETE FROM Categoria c WHERE c.titulo like %:titulo%")
    void eliminarPorTitulo(@Param("titulo") String titulo);




}
