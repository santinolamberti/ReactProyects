package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.dto.UsuarioDTO;
import com.grupo3.Proyecto.Integrador.dto.UsuarioLoginDTO;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.repository.UsuarioRepository;
import com.grupo3.Proyecto.Integrador.service.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    private UsuarioRepository usuarioRepository;
    private TokenService tokenService;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.tokenService = tokenService;
    }

    public Usuario crearUsuario(Usuario usuario) { return usuarioRepository.save(usuario); }

    public Optional<Usuario> buscarPorId(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario actualizarUsuario(Usuario usuario) { return usuarioRepository.save(usuario);}

    public Optional<Usuario> findByEmail(String email) { return usuarioRepository.findByEmail(email);}

    public Optional<Usuario> findByEmailAndContrasenia(String email, String contrasenia) { return usuarioRepository.findByEmailAndContrasenia(email, contrasenia);}

    public Optional<UsuarioLoginDTO> login(Usuario usuario) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(usuario.getEmail());
        Usuario usuario1 = usuarioOptional.get();
        String token = tokenService.getToken(new UsuarioDTO(usuario1.getId(), usuario1.getEmail()));

        return Optional.of(new UsuarioLoginDTO(usuario1.getNombre(), usuario1.getApellido(), usuario1.getEmail(), usuario1.getRol().getId(), token));

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return usuarioRepository.findByEmail(email).isPresent() ?
                usuarioRepository.findByEmail(email).get() :
                null;
    }


}
