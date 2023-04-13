package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import com.grupo3.Proyecto.Integrador.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria crearCategoria(Categoria categoria) { return categoriaRepository.save(categoria); }

    public Optional<Categoria> buscarCategoriaPorID(Long id) { return categoriaRepository.findById((id)); }

    public Optional<Categoria> buscarCategoria(String titulo) { return categoriaRepository.findByTitulo(titulo); }

    public Categoria actualizarCategoria(Categoria categoria) { return categoriaRepository.save(categoria); }

    public void eliminarCategoriaPorID(Long id) { categoriaRepository.deleteById((id)); }

    public void eliminarCategoria(String titulo) { categoriaRepository.eliminarPorTitulo(titulo); ; }

    public List<Categoria> traerTodas() { return categoriaRepository.findAll(); }

}
