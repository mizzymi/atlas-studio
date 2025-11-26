package com.reimii.atlasstudio.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.reimii.atlasstudio.model.UserModel;
import com.reimii.atlasstudio.repository.UserRepository;

/**
 * Expone endpoints de autenticación.
 *
 *   GET  /api/me
 *   POST /api/auth/register
 */
@RestController
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public record RegisterRequest(String email, String password, String name) {}

    /**
     * Registro de usuario local (sin Google).
     * Crea un usuario con provider = "local".
     */
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (req.email() == null || req.password() == null
                || req.email().isBlank() || req.password().isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email and password are required"));
        }

        if (userRepository.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already in use"));
        }

        UserModel user = new UserModel();
        user.setProvider("local");
        user.setProviderId(req.email());
        user.setEmail(req.email());
        user.setName(req.name());
        user.setPassword(passwordEncoder.encode(req.password()));

        UserModel saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Devuelve la info del usuario autenticado.
     * - Si viene de Google → usa OAuth2User y provider "google".
     * - Si es login local → usa UserDetails y busca por email.
     */
    @GetMapping("/api/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2User oauth2User) {
            String provider   = "google";
            String providerId = oauth2User.getAttribute("sub");
            String email      = oauth2User.getAttribute("email");
            String name       = oauth2User.getAttribute("name");
            String picture    = oauth2User.getAttribute("picture");

            return userRepository
                    .findByProviderAndProviderId(provider, providerId)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> {
                        UserModel user = new UserModel();
                        user.setProvider(provider);
                        user.setProviderId(providerId);
                        user.setEmail(email);
                        user.setName(name);
                        user.setAvatarUrl(picture);

                        UserModel saved = userRepository.save(user);
                        return ResponseEntity.ok(saved);
                    });
        }

        if (principal instanceof UserDetails userDetails) {
            String email = userDetails.getUsername();

            return userRepository
                    .findByEmail(email)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
