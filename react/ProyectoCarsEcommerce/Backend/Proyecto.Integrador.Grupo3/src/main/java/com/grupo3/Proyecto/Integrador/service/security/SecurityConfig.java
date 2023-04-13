package com.grupo3.Proyecto.Integrador.service.security;


import com.grupo3.Proyecto.Integrador.controller.RequestFilter;
import com.grupo3.Proyecto.Integrador.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Service
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RequestFilter requestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usuarioService);
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }


    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
  //              .antMatchers("/registro").permitAll()
                .antMatchers(HttpMethod.POST,"/reservas").hasAuthority("cliente")
                .antMatchers(HttpMethod.POST,"/reservas/**").hasAuthority("cliente");
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/reservas/buscar/**").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/reservas/producto/**").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/reservas/fechas").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/reservas/ciudadYFechas").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.GET,"/reservas/usuario/**").hasAuthority("cliente");
                http.authorizeRequests().antMatchers(HttpMethod.GET,"/productos/**").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.GET, "/productos/todos").permitAll();
                http.authorizeRequests().antMatchers(HttpMethod.POST, "/productos").hasAuthority("admin");
                http.authorizeRequests().antMatchers(HttpMethod.PUT, "/productos/modificar").hasAuthority("admin");
                http.authorizeRequests().antMatchers(HttpMethod.DELETE, "/productos/eliminar/**").hasAuthority("admin")
  //            http.authorizeRequests().antMatchers("/productos/**").hasAuthority("admin") //esta linea cancelaba las demás
                .anyRequest().permitAll()
  //            .and()
 //             .exceptionHandling().authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}

