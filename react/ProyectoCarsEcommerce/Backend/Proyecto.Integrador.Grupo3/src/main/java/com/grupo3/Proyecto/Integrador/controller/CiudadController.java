package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Ciudad;
import com.grupo3.Proyecto.Integrador.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/ciudades")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @PostMapping()
    public ResponseEntity<Ciudad> agregarCiudad(@RequestBody Ciudad ciudad) {
        return ResponseEntity.ok(ciudadService.crearCiudad(ciudad));
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Ciudad>> traerCiudades() {
        return ResponseEntity.ok(ciudadService.traerTodas());
    }
}
