package com.qualitysales.ventsoft.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qualitysales.ventsoft.exceptions.AppException;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.ErrorMessageEnum;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public JwtAuthenticationFilter(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Si no hay header de autorización o no comienza con "Bearer ", continuar con la cadena de filtros
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);

        // Validación básica del token
        if (jwt.isBlank()) {
            sendErrorResponse(response, ErrorMessageEnum.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
            return;
        }

        try {
            // Parsear el token JWT
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
            String username = claims.getSubject();

            // Si el token tiene un subject y no hay autenticación en el contexto
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } catch (UsernameNotFoundException e) {
                    log.warn("User not found for username: {}", username);
                    sendErrorResponse(response, ErrorMessageEnum.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
                    return;
                }
            }

            // Continuar con la cadena de filtros
            filterChain.doFilter(request, response);

        } catch (ExpiredJwtException e) {
            log.info("Token expired: {}", jwt);
            log.info("Expiration date: {}", e.getClaims().getExpiration());
            sendErrorResponse(response, ErrorMessageEnum.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
        } catch (MalformedJwtException | SignatureException | UnsupportedJwtException e) {
            log.error("Invalid JWT token: {} {} {}", request.getMethod(), request.getRequestURI(), e.getMessage());
            sendErrorResponse(response, ErrorMessageEnum.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            // Propagamos excepciones no relacionadas con JWT (por ejemplo, errores de base de datos)
            log.error("Unexpected error while processing JWT: {}", e.getMessage());
            throw e; // Permitir que el error sea manejado por un controlador de excepciones global
        }
    }

    // Método auxiliar para enviar respuestas de error
    private void sendErrorResponse(HttpServletResponse response, ErrorMessageEnum errorMessage, HttpStatus status)
            throws IOException {
        response.setStatus(status.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        GenericDTO errorResponse = GenericDTO.error(errorMessage, status.value());
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        response.getWriter().flush();
    }
}