package com.reimii.atlasstudio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reimii.atlasstudio.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByProviderAndProviderId(String provider, String providerId);

    Optional<UserModel> findByEmail(String email);
}
