package com.preproject.myoverflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MyoverflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyoverflowApplication.class, args);
	}

}
