package info.fumbler.royalerumble.dao;



import org.springframework.stereotype.Component;

import java.util.Map;


@Component
public class TestDao {
    private Map<String, Object> map;

    public TestDao() {
    }

    public Map<String, Object> getMap() {
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }
}
