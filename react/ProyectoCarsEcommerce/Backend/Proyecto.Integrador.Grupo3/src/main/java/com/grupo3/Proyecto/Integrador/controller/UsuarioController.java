package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.crearUsuario(usuario));
    }

    @GetMapping("buscar/{id}")
    public Optional<Usuario> buscarUsuarioPorID(@PathVariable Integer id) {
        return usuarioService.buscarPorId(id);
    }

    @PutMapping("/modificar")
    @ResponseBody
    public ResponseEntity<Usuario> actualizarUsuario(@RequestParam Integer id, @RequestBody Usuario u) {
        ResponseEntity<Usuario> respuesta = null;

        if (usuarioService.buscarPorId(id).isPresent()) {
            Usuario usuario = usuarioService.buscarPorId(id).get();
            usuario.setNombre(u.getNombre());
            usuario.setApellido(u.getApellido());
            usuario.setContrasenia(u.getContrasenia());
            usuario.setRol(u.getRol());

            respuesta = ResponseEntity.ok(usuarioService.actualizarUsuario(usuario));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }


}
