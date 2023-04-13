package com.grupo3.Proyecto.Integrador.service;

import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class ReservaService {

    private ReservaRepository reservaRepository;
    private UsuarioService usuarioService;
    private ProductoService productoService;

    public ReservaService(ReservaRepository reservaRepository, UsuarioService usuarioService, ProductoService productoService) {
        this.reservaRepository = reservaRepository;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
    }


    public Reserva crearReserva(Reserva reserva) {
        Optional<Usuario> usuarioOptional = usuarioService.buscarPorId(reserva.getUsuario().getId());
        Optional<Producto> productoOptional = productoService.buscarPorId(reserva.getProducto().getId());
        if (usuarioOptional.isPresent() && productoOptional.isPresent()) {
            reserva.setUsuario(usuarioOptional.get());
            reserva.setProducto(productoOptional.get());
            return reservaRepository.save(reserva);
        }
        return null ;}


    public Optional<Reserva> buscarPorId(Long id) {
        return reservaRepository.findById(id);
    }

    public List<Producto> buscarPorFecha(LocalDate fechaInicial, LocalDate fechaFinal) { return reservaRepository.findAllByFechaInicialAndFechaFinal(fechaInicial, fechaFinal); }

    public List<Producto> buscarPorCiudadYFecha(String ciudad, LocalDate fechaInicial, LocalDate fechaFinal) { return reservaRepository.findAllByCiudadYFechas(ciudad, fechaInicial, fechaFinal); };

    public Reserva actualizarReserva(Reserva reserva) { return reservaRepository.save(reserva);}

    public List<Reserva> traerTodas() { return reservaRepository.findAll(); }

    public List<Reserva> buscarPorIDProducto(Long id) { return reservaRepository.findByProductoId(id); }

    public List<Reserva> buscarPorIDUsuario(Integer id) { return reservaRepository.findByUsuarioId(id); }

}
