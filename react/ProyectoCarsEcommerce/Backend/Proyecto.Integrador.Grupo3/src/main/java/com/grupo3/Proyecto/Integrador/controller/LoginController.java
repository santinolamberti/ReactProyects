package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.dto.UsuarioLoginDTO;
import com.grupo3.Proyecto.Integrador.model.Rol;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.service.RolService;
import com.grupo3.Proyecto.Integrador.service.UsuarioService;
import com.grupo3.Proyecto.Integrador.service.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping()
public class LoginController {

    private UsuarioService usuarioService;
    private RolService rolService;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    @Autowired
    public LoginController(UsuarioService usuarioService, RolService rolService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.usuarioService = usuarioService;
        this.rolService = rolService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    @PostMapping("/registro")
    public ResponseEntity<?> registroUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> userOptional = usuarioService.findByEmail(usuario.getEmail());
        if (userOptional.isEmpty()) {
            if (usuario.getRol() == null) {
                Optional<Rol> roleOptional;
                roleOptional = rolService.buscarPorNombre("cliente");
                if (roleOptional.isEmpty()) {
                    roleOptional = Optional.ofNullable(rolService.crearRol(new Rol("cliente")));
                }
                usuario.setRol(roleOptional.get());
            }
            Usuario usuario1 = usuarioService.crearUsuario(usuario);
            Optional<UsuarioLoginDTO> usuarioLoginDto = usuarioService.login(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioLoginDto.get());
        }
        return ResponseEntity.badRequest().build();
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getContrasenia()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<UsuarioLoginDTO> userLoginDto = usuarioService.login(usuario);
        return userLoginDto.isPresent() ? ResponseEntity.ok(userLoginDto.get()) : ResponseEntity.badRequest().build();
    }
}


