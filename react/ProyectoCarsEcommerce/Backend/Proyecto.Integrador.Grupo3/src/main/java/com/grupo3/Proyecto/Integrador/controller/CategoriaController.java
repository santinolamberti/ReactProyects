package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/categorias")
public class CategoriaController {


    @Autowired
    private CategoriaService categoriaService;

    @PostMapping()
    public ResponseEntity<Categoria> agregarCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.crearCategoria(categoria));
    }

    @GetMapping("buscar/{id}")
    public Optional<Categoria> buscarCategoriaPorID(@PathVariable Long id) {
        return categoriaService.buscarCategoriaPorID(id);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Categoria> buscarCategoria(@RequestParam String titulo) {
        Categoria categoria = categoriaService.buscarCategoria(titulo).orElse(null);
        return ResponseEntity.ok(categoria);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Categoria>> traerCategorias() {
        return ResponseEntity.ok(categoriaService.traerTodas());
    }

    @PutMapping("/modificar/{id}")
    public ResponseEntity<Categoria> modificarCategoriaPorID(@PathVariable Long id, @RequestBody Categoria c) {
        ResponseEntity<Categoria> respuesta = null;
        if (categoriaService.buscarCategoriaPorID(id).isPresent()) {
            Categoria categoria = categoriaService.buscarCategoriaPorID(id).get();
            categoria.setTitulo(c.getTitulo());
            categoria.setDescripcion(c.getDescripcion());
            categoria.setUrl(c.getUrl());
            respuesta = ResponseEntity.ok(categoriaService.actualizarCategoria(categoria));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @PutMapping("/modificar")
    @ResponseBody
    public ResponseEntity<Categoria> modificarCategoria(@RequestParam String titulo, @RequestBody Categoria c) {
        ResponseEntity<Categoria> respuesta = null;

        if (categoriaService.buscarCategoria(titulo).isPresent()) {
            Categoria categoria = categoriaService.buscarCategoria(titulo).get();
            categoria.setDescripcion(c.getDescripcion());
            categoria.setUrl(c.getUrl());
            respuesta = ResponseEntity.ok(categoriaService.actualizarCategoria(categoria));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPorID(@PathVariable Long id) {
        ResponseEntity<String> respuesta = null;

        if (categoriaService.buscarCategoriaPorID(id).isPresent()) {
            categoriaService.eliminarCategoriaPorID(id);
            respuesta = ResponseEntity.status(HttpStatus.OK).body("¡Categoría Eliminada!");
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<String> eliminarCategoria(String titulo) {
        ResponseEntity<String> respuesta = null;

        if (categoriaService.buscarCategoria(titulo).isPresent()) {
            categoriaService.eliminarCategoria(titulo);
            respuesta = ResponseEntity.ok("La categoría ha sido eliminada");
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }
}
