package com.pfe.marchepublic.services;

import com.pfe.marchepublic.entities.jury;
import com.pfe.marchepublic.entities.user;
import com.pfe.marchepublic.repositories.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class userService {
    @Autowired
    private userRepository repo;

    public List<user> listAll() {
        return repo.findAll(
                Sort.by(Sort.Direction.DESC, "id")
        );
    }
    public   user save(user user) {
        repo.save(user);
        return user;
    }

    public user get(Long id) {
        return repo.findById(id).get();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public user update(user user,Long id)  {
        repo.findById(id).get();
        repo.save(user);
        return user;
    }
    public List<user> search(String searchTerm) {
        return repo.findByNumContainingIgnoreCase(searchTerm);

    }
}
