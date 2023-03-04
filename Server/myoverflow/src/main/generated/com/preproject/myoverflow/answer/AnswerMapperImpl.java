package com.preproject.myoverflow.answer;

import com.preproject.myoverflow.answer.Answer.AnswerOpenStatus;
import com.preproject.myoverflow.answer.AnswerDto.Patch;
import com.preproject.myoverflow.answer.AnswerDto.Response;
import com.preproject.myoverflow.member.Member;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-28T02:22:38+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Answer answerPatchDtoToAnswer(Patch answerPatchDto) {
        if ( answerPatchDto == null ) {
            return null;
        }

        Answer answer = new Answer();

        answer.setAnswerId( answerPatchDto.getAnswerId() );
        answer.setContent( answerPatchDto.getContent() );

        return answer;
    }

    @Override
    public Response answerToAnswerResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        String answerOpenStatus = null;
        String memberId = null;
        String nickname = null;
        long answerId = 0L;
        String content = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        answerOpenStatus = answerAnswerOpenStatusStatus( answer );
        Long memberId1 = answerMemberMemberId( answer );
        if ( memberId1 != null ) {
            memberId = String.valueOf( memberId1 );
        }
        nickname = answerMemberNickname( answer );
        answerId = answer.getAnswerId();
        content = answer.getContent();
        createdAt = answer.getCreatedAt();
        modifiedAt = answer.getModifiedAt();

        Response response = new Response( answerId, content, createdAt, modifiedAt, answerOpenStatus, memberId, nickname );

        return response;
    }

    @Override
    public List<Response> answerListToAnswerResponseDtos(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponseDto( answer ) );
        }

        return list;
    }

    private String answerAnswerOpenStatusStatus(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        AnswerOpenStatus answerOpenStatus = answer.getAnswerOpenStatus();
        if ( answerOpenStatus == null ) {
            return null;
        }
        String status = answerOpenStatus.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
    }

    private Long answerMemberMemberId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Member member = answer.getMember();
        if ( member == null ) {
            return null;
        }
        long memberId = member.getMemberId();
        return memberId;
    }

    private String answerMemberNickname(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Member member = answer.getMember();
        if ( member == null ) {
            return null;
        }
        String nickname = member.getNickname();
        if ( nickname == null ) {
            return null;
        }
        return nickname;
    }
}
