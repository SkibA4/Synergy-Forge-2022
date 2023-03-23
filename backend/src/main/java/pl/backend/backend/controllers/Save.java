package pl.backend.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.backend.budget.Budget;
import pl.backend.backend.budget.BudgetRepository;
import pl.backend.backend.category.Category;
import pl.backend.backend.integration.Integration;
import pl.backend.backend.integration.IntegrationRepository;
import pl.backend.backend.integration.IntegrationResponse;
import pl.backend.backend.subcategory.Subcategory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static java.lang.Long.parseLong;

@RestController
@CrossOrigin
public class Save {

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    IntegrationRepository integrationRepository;

    @PostMapping(value = "/budget/{id}")
    public ResponseEntity<Integration> updateBudget(@RequestBody List<Budget> data, @PathVariable String id) {
        Optional<Integration> integration = integrationRepository.findById(parseLong(id));

        List<Budget> budgetList = new ArrayList<>();

        for (Budget budget : data) {
            List<Category> categoryList = new ArrayList<>();

            for (Category category : budget.getCategories()) {

                List<Subcategory> subcategoryList = new ArrayList<>(category.getSubcategories());

                category.setSubcategories(subcategoryList);
                categoryList.add(category);
            }

            budget.setCategories(categoryList);
            budgetList.add(budget);
        }
        if (integration.isPresent()) {
            Integration integration1 = integration.get();
            integration1.setBudgets(budgetList);
            integrationRepository.save(integration1);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.ok().body(integration.get());
    }
}
