package com.grupo3.Proyecto.Integrador.controller;

import com.grupo3.Proyecto.Integrador.dto.UsuarioDTO;
import com.grupo3.Proyecto.Integrador.model.Usuario;
import com.grupo3.Proyecto.Integrador.service.security.TokenService;
import com.grupo3.Proyecto.Integrador.service.UsuarioService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@CrossOrigin
@RestController
    public class RequestFilter extends OncePerRequestFilter {
        private TokenService tokenService;
        private UsuarioService usuarioService;

        public RequestFilter(TokenService tokenService, UsuarioService usuarioService) {
            this.tokenService = tokenService;
            this.usuarioService = usuarioService;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse httpServletResponse,
                                        FilterChain filterChain) throws ServletException, IOException {
            String path = request.getRequestURI();
            String token = request.getHeader("Authorization");
            //agregué el patch contains de /productos para que si tienen token puedan hacer post
            if (path.contains("/productos") || path.contains("/reservas") && token != null && !token.isEmpty()) {
                UsuarioDTO usuarioDTO = null;
                try {
                    usuarioDTO = tokenService.decodeToken(token);
                } catch (Exception e) {

                }
                if (usuarioDTO != null) {
                    Optional<Usuario> userOptional = usuarioService.findByEmail(usuarioDTO.getEmail());
                    if (LocalDateTime.now().isBefore(usuarioDTO.getDateTime()) && userOptional.isPresent()) {
                        UsernamePasswordAuthenticationToken authenticationToken =
                                new UsernamePasswordAuthenticationToken(userOptional.get().getEmail(),
                                        userOptional.get().getContrasenia());
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            }
            filterChain.doFilter(request, httpServletResponse);
        }
    }
