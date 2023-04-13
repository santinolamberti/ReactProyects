package com.grupo3.Proyecto.Integrador.service.security;


import com.grupo3.Proyecto.Integrador.dto.UsuarioDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.Key;
import java.time.LocalDateTime;


@CrossOrigin
@Service
public class TokenService {
    private static Key key;

    public TokenService() {
        key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    private String json(UsuarioDTO usuarioDTO) {
        return "{" +
                "id='" + usuarioDTO.getId() +
                "', Email='" + usuarioDTO.getEmail() + '\'' +
                ", expirationTime='" + LocalDateTime.now().plusHours(1) + '\'' +
                '}';
    }

    public String getToken(UsuarioDTO usuarioDTO) {
        String jws = Jwts.builder().setSubject(json(usuarioDTO)).signWith(key).compact();

        return jws;
    }

    public UsuarioDTO decodeToken(String jwsString) {
        Jws<Claims> jws;

        jws = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwsString);

        String[] data = jws.getBody().toString().split("'");
        UsuarioDTO usuarioDTO = new UsuarioDTO(Integer.parseInt(data[1]), data[3], LocalDateTime.parse(data[5]));

        return usuarioDTO;
    }
}
