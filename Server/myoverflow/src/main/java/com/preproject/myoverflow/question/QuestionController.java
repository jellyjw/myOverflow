package com.preproject.myoverflow.question;

import com.google.gson.Gson;
import com.preproject.myoverflow.response.MultiResponseDto;
import com.preproject.myoverflow.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/questions")
@Validated
@Slf4j
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/questions";
    //@Autowired
    private final QuestionService service;
    private final QuestionMapper mapper;
    @Autowired
    private Gson gson;

    public QuestionController(QuestionMapper mapper, QuestionService service){
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody){
        Question question = mapper.questionPostDtoToQuestion(requestBody);

        Question createdQuestion = service.createQuestion(question);

        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToResponseDto(createdQuestion))
                ,HttpStatus.CREATED);
    }

    @PatchMapping("{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                         @RequestBody QuestionDto.Patch requestBody){
        requestBody.setQuestionId(questionId);

        Question question = mapper.questionPatchDtoToQuestion(requestBody);
        Question updatedQuestion = service.updateQuestion(question);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.questionToResponseDto(updatedQuestion)),HttpStatus.OK);
    }

    @GetMapping("{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){
        Question foundQuestion = service.getQuestion(questionId);
        return new ResponseEntity(
                new SingleResponseDto<>(mapper.questionToResponseDto(foundQuestion))
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@RequestParam List<String> category,
                                       @Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Question> pageQuestions = category.isEmpty()?
                service.getQuestions(page - 1,size) :
                service.getCategoryQuestions(category, page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity(
                new MultiResponseDto<>(
                        mapper.questionsToResponseDtos(questions), pageQuestions), HttpStatus.OK);
    }

    @DeleteMapping("{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId){
        service.deleteQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
