package pl.backend.backend.budget;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pl.backend.backend.category.Category;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Budget {

    @Id
    @GeneratedValue
    @JsonIgnore
    private UUID id;

    private String name;

    private int cost;

    private int peopleCount;

    private boolean mainBudget;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "budget_id")
    private List<Category> categories = new ArrayList<>();

}
