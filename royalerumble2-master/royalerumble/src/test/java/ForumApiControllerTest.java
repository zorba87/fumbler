import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({
        "classpath:servlet-context.xml",
        "classpath:database-context.xml"})
@WebAppConfiguration
public class ForumApiControllerTest {

    @Autowired
    WebApplicationContext webApplicationContext;


    @Before
    public void before() {

    }
    @Test
    public void getListTest() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        ResultActions result = mockMvc.perform(get("/api/forums?page=2"));

        result.andDo(print());
        result.andExpect(status().isOk());
    }

    @Test
    public void getForumTest() throws Exception {
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        ResultActions result = mockMvc.perform(get("/api/forums/57"));

        result.andDo(print());
        result.andExpect(status().isOk());
    }

}
