package pl.backend.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheckBackend {

    @CrossOrigin
    @GetMapping(value = "/")
    public ResponseEntity checkBackend() {
        return ResponseEntity.status(200).build();
    }

}
