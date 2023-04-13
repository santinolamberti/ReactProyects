package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping()
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.crearProducto(producto));
    }

    @GetMapping("buscar/{id}")
    public Optional<Producto> buscarProductoPorID(@PathVariable Long id) {
        return productoService.buscarPorId(id);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Producto> buscarPorNombre(@RequestParam String nombre) {
        Producto producto = productoService.buscarPorNombre(nombre).orElse(null);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarPorID(@PathVariable Long id) {
        ResponseEntity<String> respuesta = null;

        if (productoService.buscarPorId(id).isPresent()) {
            productoService.eliminarProductoPorID(id);
            respuesta = ResponseEntity.status(HttpStatus.OK).body("¡Producto Eliminado!");
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Producto>> traerProductos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @PutMapping("/modificar")
    @ResponseBody
    public ResponseEntity<Producto> actualizarProducto(@RequestParam Long id, @RequestBody Producto p) {
        ResponseEntity<Producto> respuesta = null;

        if (productoService.buscarPorId(id).isPresent()) {
            Producto producto = productoService.buscarPorId(id).get();
            producto.setNombre(p.getNombre());
            producto.setDescripcion(p.getDescripcion());
            producto.setCategoria(p.getCategoria());
            producto.setCiudad(p.getCiudad());
            producto.setImagenes(p.getImagenes());
            producto.setCaracteristicas(p.getCaracteristicas());
            producto.setReservas(p.getReservas());
            respuesta = ResponseEntity.ok(productoService.actualizarProducto(producto));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }


    //Listar productos según categoría, es decir, nos deberá devolver los productos que pertenezcan a cierta categoría.

    @GetMapping("/categoria")
    public ResponseEntity<List<Producto>> listarPorCategoria(@RequestParam("titulo") String titulo){
        return ResponseEntity.ok(productoService.listarPorCategoria(titulo));}

    //Listar productos según ciudad, es decir, nos deberá devolver los productos que pertenezcan a cierta ciudad

    @GetMapping("/ciudad")
    public ResponseEntity<List<Producto>> listarPorCiudad(@RequestParam("nombre") String nombre) {
        return ResponseEntity.ok(productoService.listarPorCiudad(nombre));}


    @GetMapping("/cantidad")
    public ResponseEntity<List<Long>> cantidadProductos(){ return ResponseEntity.ok(productoService.cantProductos());}

    @GetMapping("/cantidad/usuario/{id}")
    public ResponseEntity<List<Long>> cantidadProductosUsuario(@PathVariable Long id){ return ResponseEntity.ok(productoService.cantProductosUsuario(id));}

}

