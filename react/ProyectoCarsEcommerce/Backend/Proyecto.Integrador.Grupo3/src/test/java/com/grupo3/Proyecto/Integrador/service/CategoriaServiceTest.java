package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Categoria;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest

public class CategoriaServiceTest {

    @Autowired
    private CategoriaService categoriaService;

    public void crearCategoria() {
        Categoria autos = categoriaService.crearCategoria(new Categoria("Autos", "Gama Alta", "www.autos.com"));
        Categoria motos = categoriaService.crearCategoria(new Categoria("Motos", "Gama Baja", "www.motos.com"));
    }

    @Test
    public void CategoriaTest() {
        this.crearCategoria();
        Categoria camiones = categoriaService.crearCategoria(new Categoria("Camiones", "Gama Media", "www.camiones.com"));
    }

    @Test
    public void eliminarCategoriaTest(){
    categoriaService.eliminarCategoria("Autos");
    Assert.assertTrue(categoriaService.buscarCategoria("Autos").isEmpty());
    }
}