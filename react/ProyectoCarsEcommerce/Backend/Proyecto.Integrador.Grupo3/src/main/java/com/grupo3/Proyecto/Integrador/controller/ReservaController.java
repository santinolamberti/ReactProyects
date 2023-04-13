package com.grupo3.Proyecto.Integrador.controller;


import com.grupo3.Proyecto.Integrador.model.Producto;
import com.grupo3.Proyecto.Integrador.model.Reserva;
import com.grupo3.Proyecto.Integrador.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping()
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.crearReserva(reserva));
    }

    @GetMapping("/buscar/{id}")
    public Optional<Reserva> buscarPorID(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @GetMapping("/producto/{id}")
    public List<Reserva> buscarPorIDProducto(@PathVariable Long id) { return reservaService.buscarPorIDProducto(id); }

    @GetMapping("/usuario/{id}")
    public List<Reserva> buscarPorIDUsuario(@PathVariable Integer id) { return reservaService.buscarPorIDUsuario(id); }

    @GetMapping("/fechas")
    public ResponseEntity<List<Producto>> buscarPorFecha(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fechaInicial, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fechaFinal)
    { return ResponseEntity.ok(reservaService.buscarPorFecha(fechaInicial, fechaFinal)); }

    @GetMapping("/ciudadYFechas")
    public ResponseEntity<List<Producto>> buscarPorCiudadYFecha(@RequestParam String ciudad, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fechaInicial, @RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate fechaFinal)
    { return ResponseEntity.ok(reservaService.buscarPorCiudadYFecha(ciudad, fechaInicial, fechaFinal)); }


    @PutMapping("/modificar")
    @ResponseBody
    public ResponseEntity<Reserva> actualizarReserva(@RequestParam Long id, @RequestBody Reserva r) {
        ResponseEntity<Reserva> respuesta = null;

        if (reservaService.buscarPorId(id).isPresent()) {
            Reserva reserva = reservaService.buscarPorId(id).get();
            reserva.setFechaInicial(r.getFechaInicial());
            reserva.setFechaFinal(r.getFechaFinal());
            reserva.setHora(r.getHora());

            respuesta = ResponseEntity.ok(reservaService.actualizarReserva(reserva));
        } else {
            respuesta = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return respuesta;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Reserva>> traerReservas() {
        return ResponseEntity.ok(reservaService.traerTodas());
    }

}
