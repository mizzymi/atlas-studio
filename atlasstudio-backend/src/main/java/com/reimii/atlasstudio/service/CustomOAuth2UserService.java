package com.reimii.atlasstudio.service;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reimii.atlasstudio.model.UserModel;
import com.reimii.atlasstudio.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); 
        Map<String, Object> attributes = oauth2User.getAttributes();

        String provider = registrationId;
        String providerId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        UserModel user = userRepository
                .findByProviderAndProviderId(provider, providerId)
                .orElseGet(() -> {
                    UserModel u = new UserModel();
                    u.setProvider(provider);
                    u.setProviderId(providerId);
                    u.setEmail(email);
                    return u;
                });

        user.setName(name);
        user.setAvatarUrl(picture);
        userRepository.save(user);

        return new DefaultOAuth2User(
                oauth2User.getAuthorities(),
                oauth2User.getAttributes(),
                "sub"
        );
    }
}
