package pl.backend.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.backend.budget.Budget;
import pl.backend.backend.category.Category;
import pl.backend.backend.integration.Integration;
import pl.backend.backend.integration.IntegrationRepository;
import pl.backend.backend.integration.IntegrationResponse;
import pl.backend.backend.subcategory.Subcategory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.lang.Long.parseLong;

@RestController
public class Integrations {

    @Autowired
    IntegrationRepository integrationRepository;

    @CrossOrigin
    @GetMapping("/integrations")
    public ResponseEntity getIntegrations() throws JsonProcessingException {

        List<Integration> integrationList = integrationRepository.findAll();
        List<IntegrationResponse> integrationResponseList = new ArrayList<>();

        for (Integration integration : integrationList) {
            IntegrationResponse integrationResponse = new IntegrationResponse();
            integrationResponse.setId(integration.getId());
            integrationResponse.setName(integration.getName());
            integrationResponse.setImgUrl(integration.getImgUrl());
            integrationResponseList.add(integrationResponse);
        }

        return ResponseEntity.ok(integrationResponseList);
    }

    @CrossOrigin
    @GetMapping(value = "integrations/{id}")
    public ResponseEntity getIntegration(@PathVariable("id") String id) {

        Optional<Integration> integration = integrationRepository.findById(parseLong(id));

        if (!integration.isEmpty()) {
            return ResponseEntity.ok(integration);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @CrossOrigin
    @PostMapping("/integrations")
    public ResponseEntity addIntegration(@RequestBody Integration data) {

        Integration integration = new Integration();
        integration.setName(data.getName());
        integration.setImgUrl(data.getImgUrl());

        List<Category> categoryList = new ArrayList<>();
        List<Budget> budgetList = new ArrayList<>();

        for (Budget budget : data.getBudgets()) {

            for (Category category : budget.getCategories()) {

                List<Subcategory> subcategoryList = new ArrayList<>();
                category.setSubcategories(subcategoryList);
                categoryList.add(category);
            }

            budget.setCategories(categoryList);
            budgetList.add(budget);
        }

        integration.setBudgets(budgetList);
        integrationRepository.save(integration);

        return ResponseEntity.ok(integrationRepository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping(value = "/integrations/{id}")
    public ResponseEntity deleteIntegration(@PathVariable("id") String id) {
        Optional<Integration> integration = integrationRepository.findById(parseLong(id));

        if (!integration.isEmpty()) {
            integrationRepository.deleteById(integration.get().getId());
            return ResponseEntity.ok(integrationRepository.findAll());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
