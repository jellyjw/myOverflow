package com.preproject.myoverflow.answer;

import com.preproject.myoverflow.answer.Answer;
import com.preproject.myoverflow.question.Question;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findAllByQuestion(Question question, Sort sort);
}
