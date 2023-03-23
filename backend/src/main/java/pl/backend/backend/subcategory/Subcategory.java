package pl.backend.backend.subcategory;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private UUID id;

    private String name;

    private int cost;

}
