package com.grupo3.Proyecto.Integrador.repository;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findById(Integer id);

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByEmailAndContrasenia(String email, String contrasenia);

}
