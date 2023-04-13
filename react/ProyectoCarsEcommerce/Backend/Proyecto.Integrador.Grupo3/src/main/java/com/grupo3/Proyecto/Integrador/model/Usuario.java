package com.grupo3.Proyecto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.*;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar el nombre")
    private String nombre;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar el apellido")
    private String apellido;
    @Column(nullable = false)
    @Email
    @NotEmpty(message = "Debe ingresar un email válido")
    private String email;
    @Column(nullable = false)
    @NotEmpty(message = "Debe ingresar una contraseña válida")
    private String contrasenia;
    //saqué las puntuaciones porque entra en un bucle
    //@OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    //@JoinColumn(name = "usuario_id")
    //@JsonIgnore
    //private List<Reserva> reservas = new ArrayList<>();
    //@OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    //@JoinColumn(name = "usuario_id")
    //@JsonIgnore
    //private List<Puntuacion> puntuaciones = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

    public Usuario() { }

    public Usuario(String nombre, String apellido, String email, String contrasenia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
    }

    public Usuario(String nombre, String apellido, String email, String contrasenia, Rol rol) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.rol = rol;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
       Usuario usuario = (Usuario) o;
        return Objects.equals(nombre, usuario.nombre) && Objects.equals(apellido, usuario.apellido) && Objects.equals(rol, usuario.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nombre, apellido, rol);
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> roles = new ArrayList<>();
        roles.add(new SimpleGrantedAuthority(rol.getNombre()));
        return roles;
    }

    @Override
    public String getPassword() {
        return contrasenia;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", email='" + email + '\'' +
                ", contrasenia='" + contrasenia + '\'' +
                //", reservas=" + reservas +
                //", puntuaciones=" + puntuaciones +
                ", rol=" + rol +
                '}';
    }
}
