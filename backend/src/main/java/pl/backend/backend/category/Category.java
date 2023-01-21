package pl.backend.backend.category;

import lombok.*;
import pl.backend.backend.subcategory.Subcategory;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Category {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private int cost;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private List<Subcategory> subcategories;

}
