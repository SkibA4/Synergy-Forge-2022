package pl.backend.backend.subcategory;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Subcategory {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private int cost;

}
