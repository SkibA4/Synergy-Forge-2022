package pl.backend.backend.integration;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
@Data
public class IntegrationResponse {

    private long id;

    private String name;

    private String imgUrl;

}
