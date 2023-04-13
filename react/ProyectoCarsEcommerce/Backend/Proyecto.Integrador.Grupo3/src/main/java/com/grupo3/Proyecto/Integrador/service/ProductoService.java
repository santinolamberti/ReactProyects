package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Producto crearProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Optional<Producto> buscarPorId(Long id) {
        return productoRepository.findById(id);
    }

    public Optional<Producto> buscarPorNombre(String nombre) { return productoRepository.findByNombre(nombre); }

    public Producto actualizarProducto(Producto producto) { return productoRepository.save(producto);}

    public void eliminarProductoPorID(Long id) { productoRepository.deleteById(id);}

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public List<Producto> listarPorCategoria(String titulo) { return productoRepository.findAllByCategoriaTitulo(titulo);}

    public List<Producto> listarPorCiudad(String nombre) { return productoRepository.findAllByCiudadNombre(nombre);}

    public List<Long> cantProductos() { return productoRepository.cantProductos(); }

    public List<Long> cantProductosUsuario(Long usuarioId) { return productoRepository.cantProductosUsuario(usuarioId); }

    }

