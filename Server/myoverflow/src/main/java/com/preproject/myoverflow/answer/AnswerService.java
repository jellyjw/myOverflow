package com.preproject.myoverflow.answer;

import com.preproject.myoverflow.answer.Answer;
import com.preproject.myoverflow.answer.AnswerRepository;
import com.preproject.myoverflow.exception.BusinessLogicException;
import com.preproject.myoverflow.exception.ExceptionCode;
import com.preproject.myoverflow.member.Member;
import com.preproject.myoverflow.member.MemberService;
import com.preproject.myoverflow.question.Question;
import com.preproject.myoverflow.question.QuestionService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.preproject.myoverflow.question.Question.QuestionAnswerStatus.QUESTION_ANSWERED;
import static com.preproject.myoverflow.question.Question.QuestionAnswerStatus.QUESTION_NOT_ANSWERED;
@Transactional
@Service
public class AnswerService {

    private AnswerRepository answerRepository;

    private QuestionService questionService;

    private MemberService memberService;

    public AnswerService(AnswerRepository answerRepository,
                         QuestionService questionService,
                         MemberService memberService) {
        this.answerRepository = answerRepository;
        this.questionService = questionService;
        this.memberService = memberService;
    }
    public Answer createAnswer(Answer answer){
        Answer createdAnswer = answerRepository.save(answer);
        return createdAnswer;
    }

    public Answer updateAnswer(Answer answer){
        Answer foundAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getContent()).ifPresent(content -> foundAnswer.setContent(content));
        foundAnswer.setModifiedAt(LocalDateTime.now());
        return answerRepository.save(foundAnswer);
    }
    @Transactional(readOnly = true)
    public Answer findAnswer(long answerId){
        return findVerifiedAnswer(answerId);
    }
    @Transactional(readOnly = true)
    public List<Answer> findAllQuestionAnswers(long questionId){
        return answerRepository.
                findAllByQuestion(
                        questionService.findVerifiedQuestion(questionId),
                        Sort.by("createdAt").descending());
    }

    public void deleteAnswer(long answerId){
        Question foundQuestion = answerRepository.
                findById(answerId).
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND)).
                getQuestion();

        answerRepository.deleteById(answerId);
    }

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
