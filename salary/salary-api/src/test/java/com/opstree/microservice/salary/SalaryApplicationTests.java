package com.opstree.microservice.salary;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
//added lines for unit testing
import org.springframework.test.context.ActiveProfiles;
@SpringBootTest
// added lines for unit testing
@ActiveProfiles("test")
class SalaryApplicationTests {

	@Test
	void contextLoads() {
	}

}
