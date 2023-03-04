package com.preproject.myoverflow.answer;

import com.preproject.myoverflow.answer.AnswerDto;
import com.preproject.myoverflow.answer.Answer;
import com.preproject.myoverflow.member.Member;
import com.preproject.myoverflow.question.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
//11
@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerDto.Post answerPostDto){
        Answer answer = new Answer();
        Question question = new Question();
        Member member = new Member();

        question.setQuestionId(answerPostDto.getQuestionId());
        member.setMemberId(answerPostDto.getMemberId());

        answer.setContent(answerPostDto.getContent());
        answer.setQuestion(question);
        answer.setMember(member);

        return answer;
    }

    Answer answerPatchDtoToAnswer(AnswerDto.Patch answerPatchDto);
    @Mapping(source = "answerOpenStatus.status",  target = "answerOpenStatus")
    @Mapping(source = "member.memberId",  target = "memberId")
    @Mapping(source = "member.nickname",  target = "nickname")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);

    @Mapping(source = "answerOpenStatus.status",  target = "answerOpenStatus")
    List<AnswerDto.Response> answerListToAnswerResponseDtos(List<Answer> answers);
}
