package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Rol;
import com.grupo3.Proyecto.Integrador.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private RolesRepository rolesRepository;

    @Autowired
    public RolService(RolesRepository rolesRepository) { this.rolesRepository = rolesRepository; }

    public Rol crearRol(Rol rol) { return rolesRepository.save(rol);}

    public List<Rol> traerTodos() { return rolesRepository.findAll(); }

    public Optional<Rol>  buscarPorNombre(String nombre) { return rolesRepository.buscarPorNombre(nombre); }
    
}
