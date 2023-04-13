package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Rol;
import com.grupo3.Proyecto.Integrador.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RolController {

    private RolService rolService;

    @Autowired
    public RolController(RolService rolService) { this.rolService = rolService; }

    @PostMapping()
    public ResponseEntity<Rol> crearRol(@RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.crearRol(rol));
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Rol>> traerRoles() {
        return ResponseEntity.ok(rolService.traerTodos());
    }


}
