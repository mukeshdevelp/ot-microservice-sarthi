package com.opstree.microservice.salary;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class SalaryApplicationTests {
	@MockBean
    private com.datastax.oss.driver.api.core.CqlSession cqlSession;

	@Test
	void contextLoads() {
	}

}
