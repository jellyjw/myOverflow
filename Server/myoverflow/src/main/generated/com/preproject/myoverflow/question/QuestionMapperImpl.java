package com.preproject.myoverflow.question;

import com.preproject.myoverflow.member.Member;
import com.preproject.myoverflow.question.Question.QuestionAnswerStatus;
import com.preproject.myoverflow.question.Question.QuestionOpenStatus;
import com.preproject.myoverflow.question.QuestionDto.Patch;
import com.preproject.myoverflow.question.QuestionDto.Response;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-28T02:12:14+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public Question questionPatchDtoToQuestion(Patch patch) {
        if ( patch == null ) {
            return null;
        }

        Question question = new Question();

        question.setQuestionId( patch.getQuestionId() );
        question.setTitle( patch.getTitle() );
        question.setContent( patch.getContent() );
        List<String> list = patch.getCategory();
        if ( list != null ) {
            question.setCategory( new ArrayList<String>( list ) );
        }
        question.setQuestionAnswerStatus( patch.getQuestionAnswerStatus() );
        question.setQuestionOpenStatus( patch.getQuestionOpenStatus() );

        return question;
    }

    @Override
    public Response questionToResponseDto(Question question) {
        if ( question == null ) {
            return null;
        }

        String questionAnswerStatus = null;
        String questionOpenStatus = null;
        Long memberId = null;
        String nickname = null;
        List<String> category = null;
        String questionId = null;
        String title = null;
        String content = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        questionAnswerStatus = questionQuestionAnswerStatusStatus( question );
        questionOpenStatus = questionQuestionOpenStatusStatus( question );
        memberId = questionMemberMemberId( question );
        nickname = questionMemberNickname( question );
        List<String> list = question.getCategory();
        if ( list != null ) {
            category = new ArrayList<String>( list );
        }
        questionId = String.valueOf( question.getQuestionId() );
        title = question.getTitle();
        content = question.getContent();
        createdAt = question.getCreatedAt();
        modifiedAt = question.getModifiedAt();

        int likeCount = 0;
        int answerCount = 0;

        Response response = new Response( questionId, title, content, category, questionAnswerStatus, questionOpenStatus, createdAt, modifiedAt, memberId, nickname, likeCount, answerCount );

        return response;
    }

    @Override
    public List<Response> questionsToResponseDtos(List<Question> questions) {
        if ( questions == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToResponseDto( question ) );
        }

        return list;
    }

    private String questionQuestionAnswerStatusStatus(Question question) {
        if ( question == null ) {
            return null;
        }
        QuestionAnswerStatus questionAnswerStatus = question.getQuestionAnswerStatus();
        if ( questionAnswerStatus == null ) {
            return null;
        }
        String status = questionAnswerStatus.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
    }

    private String questionQuestionOpenStatusStatus(Question question) {
        if ( question == null ) {
            return null;
        }
        QuestionOpenStatus questionOpenStatus = question.getQuestionOpenStatus();
        if ( questionOpenStatus == null ) {
            return null;
        }
        String status = questionOpenStatus.getStatus();
        if ( status == null ) {
            return null;
        }
        return status;
    }

    private Long questionMemberMemberId(Question question) {
        if ( question == null ) {
            return null;
        }
        Member member = question.getMember();
        if ( member == null ) {
            return null;
        }
        long memberId = member.getMemberId();
        return memberId;
    }

    private String questionMemberNickname(Question question) {
        if ( question == null ) {
            return null;
        }
        Member member = question.getMember();
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
