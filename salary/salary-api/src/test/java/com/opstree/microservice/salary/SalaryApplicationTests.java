package com.opstree.microservice.salary;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
//added lines for unit testing
import org.springframework.test.context.ActiveProfiles;
@SpringBootTest(
  properties = {
    "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration"
  }
)
// added lines for unit testing
@ActiveProfiles("test")
class SalaryApplicationTests {

	@Test
	void contextLoads() {
	}

}
